import { Canvas } from 'cc';

export type ResizeEventData = {
  isMobile: boolean;
  isLandscape: boolean;
  canvas: Canvas;
  element: HTMLCanvasElement;
};
