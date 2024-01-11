import { ECSSystem, SystemConstructor } from '../system';

export class SystemsCaching {
  private static _cahce: ECSSystem[] = [];

  public static create(ctor: SystemConstructor): ECSSystem {
    let system = this.get(ctor) || new ctor();
    return system;
  }

  public static get(ctor: SystemConstructor): ECSSystem | null {
    return this._cahce.find((system) => system instanceof ctor) || null;
  }
}
