import { _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { AbsoluteScaleComponent } from '../components';
const { ccclass, type, menu } = _decorator;

@ccclass('AbsoluteScaleEntity')
@menu('Modules/ResizerModule/Entities/AbsoluteScaleEntity')
export class AbsoluteScaleEntity extends Entity {
  @type(AbsoluteScaleComponent)
  public absoluteScale: AbsoluteScaleComponent = new AbsoluteScaleComponent();
}
