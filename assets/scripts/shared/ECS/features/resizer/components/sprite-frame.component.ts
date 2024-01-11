import { SpriteFrame, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property } = _decorator;

@ccclass('SpriteFrameComponent')
export class SpriteFrameComponent extends ECSComponent {
  @property({
    tooltip: 'Spriteframe of element on landscape layout.',
  })
  public landscape: SpriteFrame = new SpriteFrame();

  @property({
    tooltip: 'Spriteframe of element on portrait layout.',
  })
  public portrait: SpriteFrame = new SpriteFrame();
}
