import { Vec2, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property } = _decorator;

@ccclass('SizeComponent')
export class SizeComponent extends ECSComponent {
  @property({
    tooltip: 'Size of element on landscape layout.',
  })
  public landscape: Vec2 = new Vec2(100, 100);

  @property({
    tooltip: 'Size of element on portrait layout.',
  })
  public portrait: Vec2 = new Vec2(100, 100);
}
