import { ComponentType } from '../../component';
import { Entity } from '../../entity';
import { ObserverConditionPipe } from '../data/types';

export function includesPipe(
  ...types: ComponentType<any>[]
): ObserverConditionPipe {
  return (entity: Entity) => entity.has(types);
}
