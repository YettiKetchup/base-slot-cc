import { Filtered } from '../../collections';
import { Entity } from '../../entity';
import { ECSSystem } from '../system';

export abstract class ReactiveSystem extends ECSSystem<Entity> {
  protected abstract onExecute(filtered: Filtered, changed: Entity): void;
}
