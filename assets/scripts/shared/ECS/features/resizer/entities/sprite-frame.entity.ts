import { Sprite, _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { SpriteFrameComponent } from '../components';
const { ccclass, type, menu, requireComponent } = _decorator;

@ccclass('SpriteFrameEntity')
@menu('Modules/ResizerModule/Entities/SpriteFrameEntity')
@requireComponent(Sprite)
export class SpriteFrameEntity extends Entity {
  @type(SpriteFrameComponent)
  public spriteFrame: SpriteFrameComponent = new SpriteFrameComponent();
}
