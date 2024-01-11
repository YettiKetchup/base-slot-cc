import { ECSSystem, Entity, Filtered, Includes, OnEvent } from 'shared/ECS';
import { ResizeEvent, ResizeEventData } from '../data';
import { RelativePositionComponent } from '../components';
import { UITransform, Vec2, Vec3 } from 'cc';

type EventType = ResizeEventData;

@Includes(RelativePositionComponent)
@OnEvent(ResizeEvent)
export class RelativePositionSystem extends ECSSystem<EventType> {
  protected onExecute(filtered: Filtered<Entity>, data: EventType): void {
    filtered.loop((entity) => {
      const relative = entity.get(RelativePositionComponent);

      const { x, y } = data.isLandscape
        ? relative.landscape
        : relative.portrait;

      const modifier = new Vec2(x, y);

      relative.isRelativeToParent
        ? this.setRelativeToParentPosition(entity, modifier)
        : this.setRelativeToWorldPosition(data, entity, modifier);
    });
  }

  private setRelativeToWorldPosition(
    data: EventType,
    entity: Entity,
    modifier: Vec2
  ): void {
    const { width, height } = data.element.getBoundingClientRect();
    const camera = data.canvas.cameraComponent?.camera;
    const screenPosition = new Vec3(width / 2, height / 2, 0);
    const position = new Vec3();

    camera.screenToWorld(position, screenPosition);

    position.x *= modifier.x;
    position.y *= modifier.y;
    position.z = entity.node.position.z;

    entity.node.position = position;
  }

  private setRelativeToParentPosition(entity: Entity, modifier: Vec2): void {
    const { width, height } = entity.node.parent.getComponent(UITransform);
    const position = new Vec3(width / 2, height / 2);

    position.x *= modifier.x;
    position.y *= modifier.y;

    entity.node.position = position;
  }
}
