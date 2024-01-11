import { SystemConstructor } from '../data/types';
import { LifecycleSystemDistributor } from '../../distributor/lifecycle-system-distributor';
import { Lifecycle } from '../data/enums';

export function OnHook(hook: Lifecycle) {
  return function (constructor: SystemConstructor) {
    LifecycleSystemDistributor.add(constructor, hook);
  };
}
