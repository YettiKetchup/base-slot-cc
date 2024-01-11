import { Vec3 } from 'cc';
import {
  AbsolutePositionComponent,
  ECSSystem,
  Entity,
  Filtered,
  Includes,
  OnEvent,
  ResizeEvent,
  ResizeEventData,
} from 'shared/ECS';

type EventType = ResizeEventData;

@Includes(AbsolutePositionComponent)
@OnEvent(ResizeEvent)
export class AbsolutePositionSystem extends ECSSystem<EventType> {
  protected onExecute(filtered: Filtered<Entity>, data: EventType): void {
    filtered.loop((entity) => {
      const absolute = entity.get(AbsolutePositionComponent);

      const { isLandscape } = data;
      const { x, y } = isLandscape ? absolute.landscape : absolute.portrait;

      const position = new Vec3(x, y, entity.node.position.z);
      entity.node.position = position;
    });
  }
}
