import { ComponentType } from '../../component';

export function Includes(...includes: ComponentType<any>[]) {
  return function (constructor: Function) {
    constructor.prototype.includes = includes;
  };
}
