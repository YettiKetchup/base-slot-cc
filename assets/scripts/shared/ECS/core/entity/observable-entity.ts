import { debounce } from '../../utils';
import { ComponentType, ECSComponent } from '../component';
import { ObserversCollector, WatchFor } from '../observable';
import { Entity } from './entity';

export class ObservableEntity {
  private _componentAdeddPool: ECSComponent[] = [];

  private _addComponentsDebounced = debounce(
    this.emitComponentsAdded.bind(this)
  );

  constructor(private _entity: Entity) {}

  public add(component: ECSComponent): void {
    this._entity.add(component);
    this._componentAdeddPool.push(component);
    this._addComponentsDebounced();
  }

  public remove(type: ComponentType<ECSComponent>): ECSComponent {
    const component = this._entity.remove(type);
    const event = WatchFor.Removed;
    ObserversCollector.add(event, component);
    return component;
  }

  private emitComponentsAdded(): void {
    const event = WatchFor.Added;
    this._componentAdeddPool.forEach((component) => {
      ObserversCollector.add(event, component);
    });

    this._componentAdeddPool.length = 0;
  }
}
