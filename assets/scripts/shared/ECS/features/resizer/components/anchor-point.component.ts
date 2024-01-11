import { Vec2, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property } = _decorator;

@ccclass('AnchorPointComponent')
export class AnchorPointComponent extends ECSComponent {
  @property({
    tooltip: 'Anchor point value for landscape',
  })
  public landscape: Vec2 = new Vec2(0.5, 0.5);

  @property({
    tooltip: 'Anchor point value for portrait',
  })
  public portrait: Vec2 = new Vec2(0.5, 0.5);
}
