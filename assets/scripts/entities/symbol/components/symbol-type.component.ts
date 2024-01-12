import { CCInteger, CCString, SpriteFrame, _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property } = _decorator;

@ccclass('SymbolTypeComponent')
export class SymbolTypeComponent extends ECSComponent {
  @property([CCInteger])
  public ids: number[] = [];

  @property([CCString])
  public names: string[] = [];

  @property([SpriteFrame])
  public frames: SpriteFrame[] = [];
}
