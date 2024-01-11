import { Vec2, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property, menu } = _decorator;

@ccclass('RelativePositionComponent')
@menu('Modules/ResizerModule/RelativePositionComponent')
export class RelativePositionComponent extends ECSComponent {
  @property({
    tooltip: 'Relative position of element on landscape layout.',
  })
  public landscape: Vec2 = new Vec2();

  @property({
    tooltip: 'Relative position of element on portrait layout.',
  })
  public portrait: Vec2 = new Vec2();

  @property
  public isRelativeToParent: boolean = false;
}
