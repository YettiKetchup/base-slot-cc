import { Vec2, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';

const { ccclass, property } = _decorator;

@ccclass('AbsolutePositionComponent')
export class AbsolutePositionComponent extends ECSComponent {
  @property({
    tooltip: 'Absolute position of element on landscape layout.',
  })
  public landscape: Vec2 = new Vec2();

  @property({
    tooltip: 'Absolute position of element on portrait layout.',
  })
  public portrait: Vec2 = new Vec2();
}
