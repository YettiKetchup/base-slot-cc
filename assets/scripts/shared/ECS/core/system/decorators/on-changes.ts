import { SystemConstructor } from '../data/types';
import { EntitySubject, WatchFor } from '../../observable';
import { ComponentType } from '../../component';
import { ObserverConditionPipe } from '../../observable/data/types';
import { EntityChangesDistributor } from '../../distributor';

export function OnChanges(
  hook: WatchFor,
  component: ComponentType<any>,
  pipe?: ObserverConditionPipe
) {
  return function (constructor: SystemConstructor) {
    const observer = EntitySubject.on(hook, component);
    if (pipe) observer.pipe(pipe);

    EntityChangesDistributor.add(observer, constructor);

    //Todo: Смотреть не зарегана ли эта Система уже в хуках
  };
}
