import {
  IEntitiesCollection,
  EntitiesCollection,
  CombinedEntitiesCollection,
} from '../collections';

export class EntityStorage {
  private static _collections: Map<string, IEntitiesCollection> = new Map();

  public static get(key: string): IEntitiesCollection {
    let collection = this._collections.get(key) as IEntitiesCollection;
    if (!collection) collection = this.create(key);

    return collection;
  }

  public static create(key: string): IEntitiesCollection {
    if (this._collections.has(key)) {
      return this.get(key) as IEntitiesCollection;
    }

    const collection = new EntitiesCollection();
    this._collections.set(key, collection);
    return collection;
  }

  public static destroy(key: string): void {
    this._collections.delete(key);
  }

  public static clearAll(): void {
    this._collections = new Map();
  }

  public static combine(
    key: string,
    storageKeys: string[]
  ): IEntitiesCollection {
    const existed = this._collections.get(key);
    if (existed) return existed;

    const collections = storageKeys.map((key) => this.get(key));
    const collection = new CombinedEntitiesCollection(collections);

    this._collections.set(key, collection);

    return collection;
  }
}
