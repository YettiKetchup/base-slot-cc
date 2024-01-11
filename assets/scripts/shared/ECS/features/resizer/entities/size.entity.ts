import { UITransform, _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { SizeComponent } from '../components';
const { ccclass, type, menu, requireComponent } = _decorator;

@ccclass('SizeEntity')
@menu('Modules/ResizerModule/Entities/SizeEntity')
@requireComponent(UITransform)
export class SizeEntity extends Entity {
  @type(SizeComponent)
  public size: SizeComponent = new SizeComponent();
}
