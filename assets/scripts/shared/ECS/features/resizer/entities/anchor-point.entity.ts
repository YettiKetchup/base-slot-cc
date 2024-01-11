import { UITransform, _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { AnchorPointComponent } from '../components';
const { ccclass, type, menu, requireComponent } = _decorator;

@ccclass('AnchorPointEntity')
@menu('Modules/ResizerModule/Entities/AnchorPointEntity')
@requireComponent(UITransform)
export class AnchorPointEntity extends Entity {
  @type(AnchorPointComponent)
  public anchorPoint: AnchorPointComponent = new AnchorPointComponent();
}
