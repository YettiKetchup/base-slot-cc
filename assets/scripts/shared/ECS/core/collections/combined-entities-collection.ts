import { ComponentFilter } from '../component';
import { Entity } from '../entity';
import { IEntitiesCollection } from './data/interfaces';
import { Filtered } from './filtered-collection';

export class CombinedEntitiesCollection implements IEntitiesCollection {
  _entities: Entity[] = [];

  public get entities(): Entity[] {
    const entities = [];
    this._colelctions.forEach((collection) => {
      entities.push(...collection.entities);
    });

    entities.push(...this._entities);

    return entities;
  }

  constructor(private _colelctions: IEntitiesCollection[]) {}

  public add(entity: Entity): void {
    if (this._entities.find((e) => e.uuid === entity.uuid)) return;

    this._entities.push(entity);
  }

  public remove(entity: Entity): void {}

  public get(filter: ComponentFilter): Filtered<Entity> {
    let result: Entity[] = [];
    let index = 0;
    let entity = this.entities[index];

    while (entity) {
      const isActive = entity.enabledInHierarchy;
      const isSatisfied = entity.isSatisfiedFilter(filter);

      const condition = filter.withDisabled
        ? isSatisfied
        : isSatisfied && isActive;

      if (condition) result.push(entity);

      index += 1;
      entity = this.entities[index];
    }

    return new Filtered(result);
  }
}
