import { slotMachineConfig } from 'shared/configs';
import { GenerateSymbolsNativeComponent } from 'features/reel';
import {
  _decorator,
  Component,
  instantiate,
  math,
  Node,
  Prefab,
  UITransform,
  Vec3,
} from 'cc';

const { ccclass, property, executeInEditMode, requireComponent } = _decorator;

@ccclass('GenerateReelsNativeComponent')
@requireComponent(UITransform)
@executeInEditMode(true)
export class GenerateReelsNativeComponent extends Component {
  @property(Prefab)
  public reelPrefab!: Prefab;

  public onFocusInEditor(): void {
    this.generateReels();
  }

  private generateReels(): void {
    this.node.children.forEach((child) => child.destroy());

    for (let i = 0; i < slotMachineConfig.columns; i++) {
      const reel = instantiate(this.reelPrefab);
      reel.setParent(this.node);

      this.setReelSize(reel);
      this.setReelPosition(reel, i);

      reel.getComponent(GenerateSymbolsNativeComponent).generateSymbols();
    }
  }

  private setReelSize(reel: Node) {
    const width = slotMachineConfig.symbolSize.width;
    const height = this.getComponent(UITransform).contentSize.height;

    reel.getComponent(UITransform).contentSize = new math.Size(width, height);
  }

  private setReelPosition(reel: Node, index: number): void {
    const { columns, symbolSize, padding } = slotMachineConfig;
    const { y, z } = reel.position;

    let modifier = index - Math.floor(columns / 2);
    modifier = this.normalizeForEven(modifier);

    const newPadding = padding * modifier;
    const x = symbolSize.width * modifier + newPadding;

    reel.position = new Vec3(x, y, z);
  }

  private normalizeForEven(modifier: number): number {
    let newModifier = modifier;
    if (slotMachineConfig.columns % 2 === 0 && modifier >= 0) {
      newModifier += 1;
    }

    return newModifier;
  }
}
