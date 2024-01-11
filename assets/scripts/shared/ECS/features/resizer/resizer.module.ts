import { Canvas, ResolutionPolicy, Vec2, _decorator, view } from 'cc';
import { ECSModule, RegisterSystems, nextFrame } from 'shared/ECS';
import { isLandscape, isMobile } from './utils';
import { ResizeEvent } from './data';
import {
  AbsolutePositionSystem,
  AbsoluteScaleSystem,
  AnchorPointSystem,
  RelativePositionSystem,
  SizeSystem,
  SpriteFrameSystem,
} from './systems';

const { ccclass, property, menu } = _decorator;

@RegisterSystems([
  { provide: AbsolutePositionSystem },
  { provide: RelativePositionSystem },
  { provide: AnchorPointSystem },
  { provide: AbsoluteScaleSystem },
  { provide: SpriteFrameSystem },
  { provide: SizeSystem },
])
@ccclass('ResizerModule')
@menu('Modules/ResizerModule/ResizerModule')
export class ResizerModule extends ECSModule {
  @property({
    tooltip: 'Id of canvas element where game is rendered.',
  })
  public elementRef: string = '#GameCanvas';

  @property({
    type: Canvas,
    tooltip: 'Scene canvas component.',
  })
  public canvas!: Canvas;

  @property({
    tooltip: 'Landscape layout size in pixels.',
  })
  public designLandscape: Vec2 = new Vec2();

  @property({
    tooltip: 'Portrait layout size in pixels.',
  })
  public designPortrait: Vec2 = new Vec2();

  private _element!: HTMLCanvasElement;
  private _observer!: ResizeObserver;

  protected start(): void {
    this._element = document.querySelector(this.elementRef);
    this._observer = new ResizeObserver(() => {
      this.onResize();
    });

    this._observer.observe(this._element);

    super.start();
  }

  protected onDestroy(): void {
    this._observer.unobserve(this._element);
    super.onDestroy();
  }

  private async onResize(): Promise<void> {
    const landscape = isLandscape(this._element);
    const mobile = isMobile();

    const { x, y } = landscape ? this.designLandscape : this.designPortrait;

    const policy = landscape
      ? ResolutionPolicy.SHOW_ALL
      : ResolutionPolicy.FIXED_WIDTH;

    view.setDesignResolutionSize(x, y, policy);

    await nextFrame();

    ResizeEvent.emit({
      isMobile: mobile,
      isLandscape: landscape,
      canvas: this.canvas,
      element: this._element,
    });
  }
}
