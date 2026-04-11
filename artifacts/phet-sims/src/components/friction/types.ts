export interface FrictionSimProps {
  language: 'en' | 'zh';
  speakText: (text: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export interface Atom {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
}

export interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export type SurfaceType = 'wood' | 'sandpaper' | 'ice';

export interface SimState {
  topBlockX: number;
  topBlockTargetX: number;
  temperature: number;
  dragSpeed: number;
  friction: number;
  mouseX: number;
  isDragging: boolean;
  showAtomView: boolean;
  lastMouseX: number;
  instantSpeed: number;
  time: number;
  surfaceType: SurfaceType;
}
