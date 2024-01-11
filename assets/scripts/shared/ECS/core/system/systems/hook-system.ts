import { Filtered } from '../../collections';
import { ECSSystem } from '../system';

export abstract class HookSystem extends ECSSystem<null> {
  protected abstract onExecute(filtered: Filtered): void;
}
