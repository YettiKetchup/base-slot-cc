import { UITransform, Vec2 } from 'cc';
import {
  AnchorPointComponent,
  ECSSystem,
  Entity,
  Filtered,
  Includes,
  OnEvent,
  ResizeEvent,
  ResizeEventData,
} from 'shared/ECS';

type EventType = ResizeEventData;

@Includes(AnchorPointComponent, UITransform)
@OnEvent(ResizeEvent)
export class AnchorPointSystem extends ECSSystem<EventType> {
  protected onExecute(filtered: Filtered<Entity>, data: EventType): void {
    filtered.loop((entity) => {
      const anchorPoint = entity.get(AnchorPointComponent);
      const transform = entity.get(UITransform);

      const { isLandscape } = data;
      const { x, y } = isLandscape
        ? anchorPoint.landscape
        : anchorPoint.portrait;

      transform.anchorPoint = new Vec2(x, y);
    });
  }
}
