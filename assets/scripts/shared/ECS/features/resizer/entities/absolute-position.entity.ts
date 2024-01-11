import { _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { AbsolutePositionComponent } from '../components';
const { ccclass, type, menu } = _decorator;

@ccclass('AbsolutePositionEntity')
@menu('Modules/ResizerModule/Entities/AbsolutePositionEntity')
export class AbsolutePositionEntity extends Entity {
  @type(AbsolutePositionComponent)
  public absolutePosition: AbsolutePositionComponent =
    new AbsolutePositionComponent();
}
