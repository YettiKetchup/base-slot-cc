import { _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { RelativePositionComponent } from '../components';
const { ccclass, type, menu } = _decorator;

@ccclass('RelativePositionEntity')
@menu('Modules/ResizerModule/Entities/RelativePositionEntity')
export class RelativePositionEntity extends Entity {
  @type(RelativePositionComponent)
  public relativePosition: RelativePositionComponent =
    new RelativePositionComponent();
}
