import type { Atom } from './types';

export function createAtomGrid(
  rows: number, cols: number,
  startX: number, startY: number,
  spacing: number, hue: number, radius: number
): Atom[] {
  const atoms: Atom[] = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : spacing * 0.5;
    for (let c = 0; c < cols; c++) {
      const x = startX + c * spacing + offset;
      const y = startY + r * (spacing * 0.866);
      atoms.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0, radius, hue });
    }
  }
  return atoms;
}

export function updateAtoms(atoms: Atom[], vibration: number, offsetX: number) {
  atoms.forEach(atom => {
    const shake = vibration * 4;
    atom.vx += (Math.random() - 0.5) * shake;
    atom.vy += (Math.random() - 0.5) * shake;
    const spring = 0.15;
    atom.vx += (atom.baseX + offsetX - atom.x) * spring;
    atom.vy += (atom.baseY - atom.y) * spring;
    atom.vx *= 0.8;
    atom.vy *= 0.8;
    atom.x += atom.vx;
    atom.y += atom.vy;
  });
}
