import { SystemProvider } from '../data/types';

export function RegisterSystems(providers: SystemProvider[]) {
  return function (constructor: Function) {
    if (!constructor.prototype.hasOwnProperty('providers')) {
      constructor.prototype.providers = [] as SystemProvider[];
    }

    providers.forEach((provider) => {
      constructor.prototype.providers.push(provider);
    });
  };
}
