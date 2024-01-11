export type Reason = { canceled: boolean; data?: any };

export type ResolveCallback<T> = (value?: T | PromiseLike<T>) => void;
export type RejectCallback = (reason: Reason) => void;
export type OnCancelCallback = (callback: () => void) => void;

export type OnFulfilledCallback<T, TResult> = (
  value: T
) => TResult | PromiseLike<TResult>;

export type OnRejectedCallback<TResult> = (
  reason: Reason
) => TResult | PromiseLike<TResult>;
