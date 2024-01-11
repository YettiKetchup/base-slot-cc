import { Filtered } from '../../collections';
import { ECSSystem } from '../system';

export abstract class UpdatableSystem extends ECSSystem<number> {
  protected abstract onExecute(filtered: Filtered, dt: number): void;
}
