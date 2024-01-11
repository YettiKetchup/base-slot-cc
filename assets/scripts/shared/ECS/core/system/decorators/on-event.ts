import { EventDistributor } from '../../distributor/event-distributor';
import { Event } from '../../event';
import { SystemConstructor } from '../data/types';

export function OnEvent(event: Event<any>) {
  return function (constructor: SystemConstructor) {
    EventDistributor.add(event, constructor);
  };
}
