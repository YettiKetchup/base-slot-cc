import { SystemsCaching } from '../caching/systems-caching';
import { Lifecycle, ECSSystem, SystemConstructor } from '../system';

export class LifecycleSystemDistributor {
  public static _systems: Map<Lifecycle, ECSSystem[]> = new Map();

  public static add(
    systemConstructor: SystemConstructor,
    lifecycle: Lifecycle
  ): void {
    const systems = this._systems.get(lifecycle) || [];
    if (this.checkDuplicates(systemConstructor, systems)) return;

    const system = SystemsCaching.create(systemConstructor);
    systems.push(system);
    this._systems.set(lifecycle, systems);
  }

  public static get(
    systemConstructor: SystemConstructor,
    lifecycle: Lifecycle
  ): ECSSystem | null {
    const hoocked = this._systems.get(lifecycle) || [];
    return (
      hoocked.find((system) => system instanceof systemConstructor) || null
    );
  }

  private static checkDuplicates(
    systemConstructor: SystemConstructor,
    list: ECSSystem[]
  ): boolean {
    return !!list.find((s) => s instanceof systemConstructor);
  }
}
