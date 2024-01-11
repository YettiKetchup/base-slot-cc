import { ComponentFilter } from '../../component';
import { Entity } from '../../entity';
import { Filtered } from '../filtered-collection';

export interface IEntitiesCollection {
  entities: Entity[];
  add(entity: Entity): void;
  remove(entity: Entity): void;
  get(filter: ComponentFilter): Filtered<Entity>;
}
