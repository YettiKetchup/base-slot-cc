import { SystemsCaching } from '../caching/systems-caching';
import { EntityObserver } from '../observable';
import { SystemConstructor } from '../system';
import { ReactiveSystem } from './data/types';

export class EntityChangesDistributor {
  private static _observers: ReactiveSystem[] = [];

  public static add(
    observer: EntityObserver,
    systemConstructor: SystemConstructor
  ) {
    const system = SystemsCaching.create(systemConstructor);
    this._observers.push({ observer, system });
  }

  public static get(
    systemConstructor: SystemConstructor
  ): ReactiveSystem | null {
    return (
      this._observers.find(
        (observer) => observer.system instanceof systemConstructor
      ) || null
    );
  }
}
