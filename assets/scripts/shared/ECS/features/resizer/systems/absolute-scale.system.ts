import { Vec3 } from 'cc';
import {
  AbsoluteScaleComponent,
  ECSSystem,
  Entity,
  Filtered,
  Includes,
  OnEvent,
  ResizeEvent,
  ResizeEventData,
} from 'shared/ECS';

type EventType = ResizeEventData;

@Includes(AbsoluteScaleComponent)
@OnEvent(ResizeEvent)
export class AbsoluteScaleSystem extends ECSSystem<EventType> {
  protected onExecute(filtered: Filtered<Entity>, data: EventType): void {
    filtered.loop((entity) => {
      const absolute = entity.get(AbsoluteScaleComponent);

      const { isLandscape } = data;
      const { x, y } = isLandscape ? absolute.landscape : absolute.portrait;

      const scale = new Vec3(x, y);
      entity.node.scale = scale;
    });
  }
}
