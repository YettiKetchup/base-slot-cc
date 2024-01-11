import { ComponentFilter } from '../component';
import { Entity } from '../entity';
import { IEntitiesCollection } from './data/interfaces';
import { Filtered } from './filtered-collection';

export class EntitiesCollection implements IEntitiesCollection {
  public get entities(): Entity[] {
    return this._entities;
  }

  public get count(): number {
    return this._entities.length;
  }

  private _entities: Entity[] = [];

  public add(entity: Entity): void {
    if (this._entities.find((e) => e.uuid === entity.uuid)) return;

    this._entities.push(entity);
  }

  public remove(entity: Entity): void {
    this._entities = this._entities.filter((e) => e.uuid !== entity.uuid);
  }

  public get(filter: ComponentFilter): Filtered<Entity> {
    let result: Entity[] = [];
    let index = 0;
    let entity = this._entities[index];

    while (entity) {
      const isActive = entity.enabledInHierarchy;
      const isSatisfied = entity.isSatisfiedFilter(filter);

      const condition = filter.withDisabled
        ? isSatisfied
        : isSatisfied && isActive;

      if (condition) result.push(entity);

      index += 1;
      entity = this._entities[index];
    }

    return new Filtered(result);
  }
}
