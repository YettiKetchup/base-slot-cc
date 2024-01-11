import { ComponentType } from '../component';
import { Entity } from '../entity';
import { WatchFor } from './data/enums';
import { EntityObserver } from './entity-observer';

export class EntitySubject {
  private static _observers: EntityObserver[] = [];

  public static register(observer: EntityObserver): void {
    this._observers.push(observer);
  }

  public static destroy(observer: EntityObserver): void {
    this._observers = this._observers.filter((item) => item !== observer);
  }

  public static notify(
    type: WatchFor,
    entity: Entity,
    watch?: ComponentType<any>
  ): void {
    const observers = watch
      ? this.getComponentSubjects(type, watch)
      : this.getEntitySubjects(type);

    observers.forEach((observer) => observer.execute(entity));
  }

  private static getComponentSubjects(
    type: WatchFor,
    watch: ComponentType<any>
  ): EntityObserver[] {
    return this._observers.filter(
      (observer) => observer.type === type && observer.watch === watch
    );
  }

  private static getEntitySubjects(type: WatchFor): EntityObserver[] {
    return this._observers.filter((observer) => observer.type === type);
  }

  public static on(
    watch: WatchFor,
    component?: ComponentType<any>
  ): EntityObserver {
    return new EntityObserver(watch, component);
  }
}
