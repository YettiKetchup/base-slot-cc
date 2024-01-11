import { SystemsCaching } from '../caching';
import { Event } from '../event';
import { SystemConstructor } from '../system';
import { EventSystem } from './data/types';

export class EventDistributor {
  private static _events: EventSystem[] = [];

  public static add(event: Event<any>, systemConstructor: SystemConstructor) {
    const system = SystemsCaching.create(systemConstructor);
    this._events.push({ event, system });
  }

  public static get(systemConstructor: SystemConstructor): EventSystem | null {
    return (
      this._events.find((event) => event.system instanceof systemConstructor) ||
      null
    );
  }
}
