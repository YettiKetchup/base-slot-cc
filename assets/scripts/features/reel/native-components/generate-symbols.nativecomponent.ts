import { _decorator, Component, instantiate, Prefab, Node, Vec3 } from 'cc';
import { slotMachineConfig } from 'shared/configs';
import { SetFrameNativeComponent } from 'entities/symbol';
const { ccclass, property, executeInEditMode } = _decorator;

@ccclass('GenerateSymbolsNativeComponent')
@executeInEditMode(true)
export class GenerateSymbolsNativeComponent extends Component {
  @property(Prefab)
  public symbolPrefab!: Prefab;

  protected start(): void {
    this.generateSymbols();
  }

  public generateSymbols(): void {
    this.node.children.forEach((child) => child.destroy());

    const rows = slotMachineConfig.rows + 2;

    for (let i = 0; i < rows; i++) {
      const symbol = instantiate(this.symbolPrefab);
      symbol.setParent(this.node);

      this.setSymbolPosition(symbol, i);

      symbol.getComponent(SetFrameNativeComponent).setRandomSymbol(i);
    }
  }

  private setSymbolPosition(symbol: Node, index: number): void {
    const { columns, symbolSize, padding } = slotMachineConfig;
    const { x, z } = symbol.position;

    let modifier = index - Math.floor(columns / 2);
    modifier = this.normalizeForEven(modifier);

    const y = symbolSize.height * modifier;

    symbol.position = new Vec3(x, -y, z);
  }

  private normalizeForEven(modifier: number): number {
    let newModifier = modifier;
    if (slotMachineConfig.rows % 2 === 0) {
      newModifier -= 0.5;
    }

    return newModifier;
  }
}
