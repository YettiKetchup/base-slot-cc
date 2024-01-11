import { Sprite } from 'cc';
import {
  ECSSystem,
  Entity,
  Filtered,
  Includes,
  OnEvent,
  ResizeEvent,
  ResizeEventData,
  SpriteFrameComponent,
} from 'shared/ECS';

type EventType = ResizeEventData;

@Includes(Sprite, SpriteFrameComponent)
@OnEvent(ResizeEvent)
export class SpriteFrameSystem extends ECSSystem<EventType> {
  protected onExecute(filtered: Filtered<Entity>, data: EventType): void {
    filtered.loop((entity) => {
      const spriteFrame = entity.get(SpriteFrameComponent);
      const sprite = entity.get(Sprite);

      const { isLandscape } = data;
      const newFrame = isLandscape
        ? spriteFrame.landscape
        : spriteFrame.portrait;

      sprite.spriteFrame = newFrame;
    });
  }
}
