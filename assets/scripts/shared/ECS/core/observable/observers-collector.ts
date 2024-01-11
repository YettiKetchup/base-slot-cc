import { nextFrame } from 'shared/ECS/utils';
import { ComponentType, ECSComponent } from '../component';
import { WatchFor } from './data/enums';
import { EntitySubject } from './entity-subject';
import { Entity } from '../entity';

export class ObserversCollector {
  private static _pool: Map<WatchFor, Set<ECSComponent>> = new Map();
  private static _frameRequested: boolean = false;

  public static async add(type: WatchFor, watch?: ECSComponent): Promise<void> {
    let pool = this._pool.get(type);
    if (!pool) pool = new Set();

    this.tryAdd(pool, type, watch);
    this._pool.set(type, pool);

    if (!this._frameRequested) {
      this._frameRequested = true;
      await nextFrame();

      this._frameRequested = false;
      const pool = new Map(this._pool);
      this._pool.clear();
      this.notify(pool);
    }
  }

  public static clearForEntity(entity: Entity): void {
    const keys = Array.from(this._pool.keys());

    keys.forEach((key) => {
      const components = this._pool.get(key);

      components.forEach((component) => {
        if (component.entity.uuid === entity.uuid) {
          components.delete(component);
        }
      });
    });
  }

  private static notify(pool: Map<WatchFor, Set<ECSComponent>>): void {
    const events = pool.keys();
    const eventsArray = Array.from(events);

    eventsArray.forEach((event) => {
      const components = pool.get(event);
      components.forEach((component) => {
        const componentType = component.constructor;
        EntitySubject.notify(
          event,
          component.entity,
          componentType as ComponentType<ECSComponent>
        );
      });
    });
  }

  private static tryAdd(
    pool: Set<ECSComponent>,
    type: WatchFor,
    watch: ECSComponent
  ): void {
    if (type === WatchFor.Enabled) {
      const components = this._pool.get(WatchFor.Disabled);
      this.removeFromPool(watch, components);
    } else if (type === WatchFor.Disabled) {
      const components = this._pool.get(WatchFor.Enabled);
      this.removeFromPool(watch, components);
    }

    pool.add(watch);
  }

  public static removeFromPool(
    watch: ECSComponent,
    components: Set<ECSComponent>
  ): void {
    if (components) {
      if (components.has(watch)) components.delete(watch);
    }
  }
}
