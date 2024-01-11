export function WithDisabled(withDisabled: boolean) {
  return function (constructor: Function) {
    constructor.prototype.withDisabled = withDisabled;
  };
}
