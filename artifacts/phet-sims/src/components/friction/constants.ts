import type { SurfaceType } from './types';

export const surfaceLabels: Record<SurfaceType, { zh: string; en: string }> = {
  wood: { zh: '木头', en: 'Wood' },
  sandpaper: { zh: '砂纸', en: 'Sandpaper' },
  ice: { zh: '冰面', en: 'Ice' },
};

export const frictionCoefficients: Record<SurfaceType, number> = {
  wood: 0.5,
  sandpaper: 0.9,
  ice: 0.1,
};
