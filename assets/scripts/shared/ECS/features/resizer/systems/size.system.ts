import { UITransform, Vec2, math } from 'cc';
import {
  ECSSystem,
  Entity,
  Filtered,
  Includes,
  OnEvent,
  ResizeEvent,
  ResizeEventData,
  SizeComponent,
} from 'shared/ECS';

type EventType = ResizeEventData;

@Includes(SizeComponent, UITransform)
@OnEvent(ResizeEvent)
export class SizeSystem extends ECSSystem<EventType> {
  protected onExecute(filtered: Filtered<Entity>, data: EventType): void {
    filtered.loop((entity) => {
      const size = entity.get(SizeComponent);
      const transform = entity.get(UITransform);

      const { isLandscape } = data;
      const { x, y } = isLandscape ? size.landscape : size.portrait;

      transform.contentSize = new math.Size(x, y);
    });
  }
}
