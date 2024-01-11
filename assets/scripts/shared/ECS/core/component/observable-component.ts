import { ECSComponent } from '.';
import { ObserversCollector, WatchFor } from '../observable';

export class ObservableComponentWrapper<TComponent extends ECSComponent> {
  constructor(component: TComponent) {
    this.setAcessors(component);
  }

  private setAcessors(component: TComponent) {
    for (let key in component) {
      Object.defineProperty(this, key, {
        get: () => component[key],
        set: (value) => {
          this.setValue(value, component, key);
        },
      });
    }
  }

  private setValue(value: any, component: TComponent, key) {
    let event = WatchFor.Changed;

    if (key === 'enabled') {
      if (component[key] === value) return;
      event = value ? WatchFor.Enabled : WatchFor.Disabled;
    }

    component[key] = value;
    ObserversCollector.add(event, component);
  }
}
