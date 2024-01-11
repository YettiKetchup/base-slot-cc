import { EntityStorage } from '../../storage';

export function Collection(name: string, keys: string[]) {
  return function (constructor: Function) {
    const collection = EntityStorage.combine(name, keys);
    constructor.prototype.redefinedCollection = collection;
  };
}
