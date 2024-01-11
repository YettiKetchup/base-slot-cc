import {
  OnCancelCallback,
  OnFulfilledCallback,
  OnRejectedCallback,
  RejectCallback,
  ResolveCallback,
} from './data/types';

export class CancelablePromise<T> implements Promise<T> {
  private promise: Promise<T>;
  private cancelCallback: () => void;

  constructor(
    executor: (resolve: ResolveCallback<T>, reject: RejectCallback) => void
  ) {
    this.promise = new Promise(executor);
  }

  public then<TResult1 = T, TResult2 = never>(
    onfulfilled?: OnFulfilledCallback<T, TResult1>,
    onrejected?: OnRejectedCallback<TResult2>
  ): Promise<TResult1 | TResult2> {
    return this.promise.then(onfulfilled, onrejected);
  }

  public catch<TResult = never>(
    onrejected: OnRejectedCallback<TResult>
  ): Promise<T | TResult> {
    return this.promise.catch(onrejected);
  }

  public finally(onfinally?: () => void): Promise<T> {
    return this.promise.finally(onfinally);
  }

  [Symbol.toStringTag]: string;

  public cancel() {
    this.cancelCallback && this.cancelCallback();
  }

  public static from<T>(
    executor: (
      resolve: ResolveCallback<T>,
      reject: RejectCallback,
      onCancel: OnCancelCallback
    ) => void
  ): CancelablePromise<T> {
    let cancelCallback: () => void;

    const promise = new CancelablePromise<T>((resolve, reject) => {
      executor(resolve, reject, (callback) => {
        cancelCallback = () => {
          callback();
          reject({ canceled: true });
        };
      });
    });

    promise.cancelCallback = cancelCallback;

    return promise;
  }
}
