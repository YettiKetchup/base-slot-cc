import { Entity } from '../../entity';

export type EntityIterationCallback<TEntity extends Entity> = (
  entity: TEntity,
  index?: number
) => void | Promise<void>;
