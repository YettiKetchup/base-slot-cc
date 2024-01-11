import { _decorator, Component } from 'cc';
import { ObservableEntity } from './observable-entity';
import { EntityStorage } from '../storage';
import { ComponentsCollection, IEntitiesCollection } from '../collections';
import { EntitySubject, ObserversCollector, WatchFor } from '../observable';
import {
  ComponentFilter,
  ComponentType,
  ECSComponent,
  ObservableComponent,
  ObservableComponentWrapper,
  UnionComponent,
} from '../component';

const { ccclass, property, menu } = _decorator;

@ccclass('Entity')
@menu('ECS/Entity/Entity')
export class Entity extends Component {
  @property
  public collectionName: string = 'game';

  public get observable(): ObservableEntity {
    return this._observable;
  }

  public get components(): UnionComponent[] {
    return this._components.items;
  }

  public get collection(): IEntitiesCollection {
    return this._entityCollection;
  }

  private _observable: ObservableEntity = new ObservableEntity(this);
  private _components: ComponentsCollection = new ComponentsCollection();
  private _entityCollection!: IEntitiesCollection;

  protected onLoad(): void {
    this.collectECSComponents();
    this.collectCCComponents();

    this._entityCollection = EntityStorage.get(this.collectionName);
    this._entityCollection.add(this);
  }

  protected start(): void {
    EntitySubject.notify(WatchFor.EntityInit, this);
  }

  protected onDestroy(): void {
    this._entityCollection.remove(this);
    this.node.destroy();

    ObserversCollector.clearForEntity(this);
    EntitySubject.notify(WatchFor.EntityDestroy, this);
  }

  public add(component: ECSComponent): void {
    const ctor = component.constructor as ComponentType<ECSComponent>;

    if (this._components.has(ctor)) {
      this._components.get(ctor).enabled = true;
    }

    this._components.add(component);
    component.enabled = true;
    component.entity = this;
  }

  public get<T extends UnionComponent>(
    type: ComponentType<T>,
    isObservable: boolean = false
  ): T | null {
    const component = this._components.get(type);

    if (!component) {
      throw new Error(`${type.name} didn't exist in ${this.name}`);
    }

    return isObservable && component instanceof ECSComponent
      ? this.createObservableComponent(component)
      : (component as T);
  }

  public remove<T extends UnionComponent>(type: ComponentType<T>): T {
    const component = this._components.get(type) as T;
    component.enabled = false;

    if (!component) {
      throw new Error(`${type.name} didn't exist in ${this.name}`);
    }

    return component;
  }

  public has(types: ComponentType<any>[]): boolean {
    return types.every((component) => {
      const c = this._components.get(component);
      return c && c.enabled;
    });
  }

  public isSatisfiedFilter(filter: ComponentFilter): boolean {
    const includes = filter.includes || [];
    const excludes = filter.excludes || [];

    return this.has(includes) && (!excludes.length || !this.has(excludes));
  }

  public collectECSComponents(): void {
    for (let key in this) {
      if (this[key] instanceof ECSComponent) {
        const component: ECSComponent = this[key] as ECSComponent;
        const isDuplicate = !!this._components.items.find(
          (c) => c === component
        );

        component.entity = this;
        !isDuplicate && this._components.add(component);
      }
    }
  }

  public collectCCComponents(): void {
    const components = this.node.components.filter((component) => {
      const isDuplicate = !!this._components.items.find((c) => c === component);

      if (!(component instanceof Entity) && !isDuplicate) {
        return component;
      }
    });

    this._components.add(...components);
  }

  private createObservableComponent<T extends ECSComponent>(
    component: T
  ): ObservableComponent<T> {
    return new ObservableComponentWrapper(
      component
    ) as unknown as ObservableComponent<T>;
  }
}
