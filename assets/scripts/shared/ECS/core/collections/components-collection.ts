import { UnionComponent, ComponentType } from '../component';

export class ComponentsCollection {
  public get items(): UnionComponent[] {
    return this._items;
  }

  public get count(): number {
    return this._items.length;
  }

  private _items: UnionComponent[] = [];

  public add(...components: UnionComponent[]): void {
    this._items.push(...components);
  }

  public get<T extends UnionComponent>(type: ComponentType<T>): T | undefined {
    const component = this._items.find(
      (component) => component instanceof type
    );

    return component as T;
  }

  public remove<T extends UnionComponent>(
    type: ComponentType<T>
  ): T | undefined {
    const component = this.get(type);

    this._items = this.items.filter(
      (component) => component.constructor !== type
    );

    return component as T;
  }

  public has<T extends UnionComponent>(type: ComponentType<T>): boolean {
    return !!this.get(type);
  }
}
