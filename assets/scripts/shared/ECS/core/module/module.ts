import { _decorator, CCString, Component } from 'cc';
import { IEntitiesCollection } from '../collections';
import { EntityStorage } from '../storage';
import { ModuleWithRegistered, SystemProvider } from './data/types';
import { ECSSystem, Lifecycle } from '../system';
import { ComponentFilter } from '../component';
import {
  LifecycleSystemDistributor,
  DecorableEventSystem,
  DecorableReactiveSystem,
  EntityChangesDistributor,
  EventDistributor,
} from '../distributor';

const { ccclass, property, menu } = _decorator;

@ccclass('ECSModule')
@menu('ECS/Module/ECSModule')
export abstract class ECSModule extends Component {
  @property([CCString])
  public collections: string[] = ['game'];

  @property
  public combineBy: string = '';

  protected get collection(): IEntitiesCollection {
    return this._colelction as IEntitiesCollection;
  }

  private get _providers(): SystemProvider[] {
    return (this as unknown as ModuleWithRegistered).providers;
  }

  private _colelction!: IEntitiesCollection;
  private _observers: DecorableReactiveSystem[] = [];
  private _events: DecorableEventSystem[] = [];

  protected onLoad(): void {
    this.setupCollection();
    this.listenEntities();
    this.listenEvents();
    this.runSystems(Lifecycle.OnLoad);
  }

  protected start(): void {
    this.runSystems(Lifecycle.Start);
  }

  protected update(dt: number): void {
    this.runSystems(Lifecycle.Update, dt);
  }

  protected lateUpdate(dt: number): void {
    this.runSystems(Lifecycle.LateUpdate, dt);
  }

  protected onDestroy(): void {
    this.runSystems(Lifecycle.OnDestroy);
    this.unsubscribe();
  }

  private listenEntities(): void {
    if (!this._providers) return;

    this._providers.forEach((provider) => {
      this.setupWatchers(provider);
    });

    this._observers.forEach((item) => {
      const { observer, system, filterDecorator } = item;
      observer.subscribe((entity) => {
        system.execute(this.collection, filterDecorator, entity);
      });
    });
  }

  private setupWatchers(provider: SystemProvider): void {
    const watchers = EntityChangesDistributor.get(provider.provide);

    if (watchers) {
      const reactiveSystem: DecorableReactiveSystem = {
        observer: watchers.observer,
        system: watchers.system,
        filterDecorator: this.getFilterDecorator(provider),
      };
      this._observers.push(reactiveSystem);
    }
  }

  private listenEvents(): void {
    if (!this._providers) return;

    this._providers.forEach((provider) => {
      this.setupEvents(provider);
    });

    this._events.forEach((item) => {
      const { event, system, filterDecorator } = item;
      event.on((data: any) => {
        system.execute(this.collection, filterDecorator, data);
      });
    });
  }

  private setupEvents(provider: SystemProvider): void {
    const watchers = EventDistributor.get(provider.provide);

    if (watchers) {
      const eventSystem: DecorableEventSystem = {
        event: watchers.event,
        system: watchers.system,
        filterDecorator: this.getFilterDecorator(provider),
      };

      this._events.push(eventSystem);
    }
  }

  private runSystems(lifecycle: Lifecycle, deltaTime?: number): void {
    if (!this._providers) return;

    this._providers.forEach((provider) => {
      let filterDecorator = this.getFilterDecorator(provider);
      const system = this.getSystem(provider, lifecycle);

      if (system) {
        system.execute(this.collection, filterDecorator, deltaTime);
      }
    });
  }

  private getFilterDecorator(provider: SystemProvider): ComponentFilter {
    const { includes, excludes } = provider;
    let filterDecorator = null;

    if (Object.hasOwn(provider, 'withDisabled')) {
      filterDecorator = {
        includes,
        excludes,
        withDisabled: provider.withDisabled,
      };
    } else {
      filterDecorator = { includes, excludes };
    }
    return filterDecorator;
  }

  private getSystem(
    provider: SystemProvider,
    lifecycle: Lifecycle
  ): ECSSystem | null {
    return LifecycleSystemDistributor.get(provider.provide, lifecycle);
  }

  private setupCollection(): void {
    if (this.collections.length == 1) {
      this._colelction = EntityStorage.get(this.collections[0]);
    } else if (this.collections.length > 1) {
      this._colelction = EntityStorage.combine(
        this.combineBy,
        this.collections
      );
    }
  }

  private unsubscribe(): void {
    this._observers.forEach((item) => {
      const { observer } = item;
      observer.unsubscribe();
    });

    this._events.forEach((item) => {
      const { event } = item;
      event.off();
    });
  }
}
