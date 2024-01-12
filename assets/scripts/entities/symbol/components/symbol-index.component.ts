import { _decorator } from 'cc';
import { ECSComponent } from 'shared/ECS/core/component';
const { ccclass, property } = _decorator;

@ccclass('SymbolIndexComponent')
export class SymbolIndexComponent extends ECSComponent {
  @property
  public value: number = 0;
}
