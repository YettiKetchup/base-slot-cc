import { Vec2, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property } = _decorator;

@ccclass('AbsoluteScaleComponent')
export class AbsoluteScaleComponent extends ECSComponent {
  @property({
    tooltip: 'Absolute scale of element on landscape layout.',
  })
  public landscape: Vec2 = new Vec2(1, 1);

  @property({
    tooltip: 'Absolute scale of element on portrait layout.',
  })
  public portrait: Vec2 = new Vec2(1, 1);
}
