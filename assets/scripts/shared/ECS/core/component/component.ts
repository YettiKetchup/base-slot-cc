import { _decorator, Node } from 'cc';
import { Entity } from '../entity';

const { property } = _decorator;

export abstract class ECSComponent {
  @property
  public enabled: boolean = true;
  public entity!: Entity;

  public get node(): Node {
    return this.entity.node;
  }

  public get enabledInHierarchy(): boolean {
    return this.enabled && this.node.active;
  }
}
