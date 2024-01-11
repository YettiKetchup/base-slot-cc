import { Entity } from '../entity';
import { EntityIterationCallback } from './data/types';

export class Filtered<T extends Entity = Entity> {
  public get count(): number {
    return this._entities.length;
  }

  public get list(): T[] {
    return this._entities;
  }

  constructor(private _entities: T[]) {}

  public loop(callback: EntityIterationCallback<Entity>): void {
    for (let i = 0; i < this._entities.length; i++) {
      callback(this._entities[i], i);
    }
  }

  public async sequential(callback: EntityIterationCallback<T>): Promise<void> {
    let index = 0;
    for (const entity of this._entities) {
      await callback(entity, index);
      index += 1;
    }
  }

  public async parallel(callback: EntityIterationCallback<T>): Promise<void> {
    const promises = this._entities.map(callback);
    await Promise.all(promises);
  }
}
