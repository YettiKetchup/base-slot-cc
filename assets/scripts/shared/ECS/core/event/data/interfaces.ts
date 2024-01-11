export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose(): void;
}
