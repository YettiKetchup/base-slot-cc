import { Disposable, Listener } from './data/interfaces';

export class Event<T> {
  private _listeners: Listener<T>[] = [];

  public on(listener: Listener<T>): Disposable {
    this._listeners.push(listener);
    return {
      dispose: () => this.off(),
    };
  }

  public off() {
    this._listeners.length = 0;
  }

  emit(event: T) {
    this._listeners.forEach((listener) => listener(event));
  }
}
