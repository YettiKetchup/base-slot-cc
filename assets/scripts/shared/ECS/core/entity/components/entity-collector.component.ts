import { _decorator, Component, Node } from 'cc';
import { Entity } from '../entity';
import { EntityStorage } from '../../storage';
const { ccclass, menu } = _decorator;

@ccclass('EntityCollectorComponent')
@menu('ECS/Entity/EntityCollector')
export class EntityCollectorComponent extends Component {
  protected onLoad(): void {
    this.node
      .getComponentsInChildren(Entity)
      .filter((entity) => !entity.node.active)
      .forEach((entity) => {
        entity.collectECSComponents();
        entity.collectCCComponents();
        EntityStorage.get(entity.collectionName).add(entity);
      });
  }
}
