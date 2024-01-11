import { ComponentType } from '../component';
import { Entity } from '../entity';
import { WatchFor } from './data/enums';
import { ObserverConditionPipe, ObserverSubscribeCallback } from './data/types';
import { EntitySubject } from './entity-subject';

export class EntityObserver {
  public get type(): WatchFor {
    return this._type;
  }

  public get watch(): ComponentType<any> | undefined {
    return this._watch;
  }

  private _pipes: ObserverConditionPipe[] = [];
  private _callback: ObserverSubscribeCallback = () => {};

  constructor(private _type: WatchFor, private _watch?: ComponentType<any>) {}

  public pipe(condition: ObserverConditionPipe): EntityObserver {
    this._pipes.push(condition);
    return this;
  }

  public subscribe(callback: ObserverSubscribeCallback): void {
    this._callback = callback;
    EntitySubject.register(this);
  }

  public unsubscribe(): void {
    EntitySubject.destroy(this);
  }

  public execute(entity: Entity): void {
    if (this.isCanExecute(entity)) {
      this._callback(entity);
    }
  }

  private isCanExecute(entity: Entity): boolean {
    for (let i = 0; i < this._pipes.length; i++) {
      const isCan = this._pipes[i](entity);
      if (!isCan) return false;
    }

    return true;
  }
}
