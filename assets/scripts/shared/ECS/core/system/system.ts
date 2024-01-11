import { IEntitiesCollection, Filtered } from '../collections';
import { ComponentFilter } from '../component';
import { Excludes, Includes, WithDisabled } from './decorators';

@Includes()
@Excludes()
@WithDisabled(false)
export abstract class ECSSystem<T = any> {
  private _collection: IEntitiesCollection | null = null;

  protected get collection(): IEntitiesCollection {
    return this._collection as IEntitiesCollection;
  }

  public execute(
    collection: IEntitiesCollection,
    decorator: ComponentFilter,
    data?: T
  ): void {
    this._collection = (this as any).redefinedCollection || collection;

    const filter = this.filter(decorator);
    const filtered = this.collection.get(filter) as Filtered;

    this.onExecute(filtered, data);
  }

  protected abstract onExecute(filtered: Filtered, data?: T): void;

  private filter(decorator: ComponentFilter): ComponentFilter {
    let { includes, excludes, withDisabled } = this as any;

    includes = [...includes, ...(decorator.includes || [])];
    excludes = [...excludes, ...(decorator.excludes || [])];

    if (Object.hasOwn(decorator, 'withDisabled')) {
      withDisabled = decorator.withDisabled as boolean;
    }

    return { includes, excludes, withDisabled };
  }
}
