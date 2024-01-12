import { _decorator, Component, Sprite } from 'cc';
import { SymbolEntity } from '../symbol.entity';
import { SymbolIndexComponent, SymbolTypeComponent } from '../components';
import { randomInteger } from 'shared/utils';
const { ccclass, executeInEditMode, requireComponent } = _decorator;

@ccclass('SetFrameNativeComponent')
@executeInEditMode(true)
@requireComponent(Sprite)
export class SetFrameNativeComponent extends Component {
  public setRandomSymbol(order: number): void {
    const sprite = this.getComponent(Sprite);
    const entity = this.getComponent(SymbolEntity);

    const types = entity.get(SymbolTypeComponent);
    const index = entity.get(SymbolIndexComponent);

    const random = randomInteger(0, types.frames.length);
    const frame = types.frames[random];

    index.value = order;
    sprite.spriteFrame = frame;
  }
}
