import { ComponentType } from '../../component';

export function Excludes(...excludes: ComponentType<any>[]) {
  return function (constructor: Function) {
    constructor.prototype.excludes = excludes;
  };
}
