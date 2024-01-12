import { _decorator } from 'cc';
import { Entity } from 'shared/ECS/core/entity';
import { SymbolTypeComponent } from './components';
import { SymbolIndexComponent } from './components/symbol-index.component';
const { ccclass, type, menu, executeInEditMode } = _decorator;

@ccclass('SymbolEntity')
@menu('Modules/Shared/Entities/SymbolEntity')
@executeInEditMode(true)
export class SymbolEntity extends Entity {
  @type(SymbolIndexComponent)
  public index = new SymbolIndexComponent();

  @type(SymbolTypeComponent)
  public type = new SymbolTypeComponent();
}
