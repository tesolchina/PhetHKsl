import type { Atom, SurfaceType } from './types';
import { surfaceLabels } from './constants';

export function drawWoodTexture(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, isDark: boolean) {
  const base = isDark ? '#6B4226' : '#A0784C';
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, isDark ? '#7B5236' : '#B8906A');
  grad.addColorStop(0.3, base);
  grad.addColorStop(0.7, isDark ? '#5A3520' : '#8B6840');
  grad.addColorStop(1, isDark ? '#4A2818' : '#7B5830');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.clip();
  ctx.strokeStyle = isDark ? 'rgba(100,60,30,0.3)' : 'rgba(80,50,20,0.2)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 8; i++) {
    const ly = y + (i / 8) * h + Math.sin(i * 2.5) * 3;
    ctx.beginPath();
    ctx.moveTo(x, ly);
    for (let px = 0; px < w; px += 10) {
      ctx.lineTo(x + px, ly + Math.sin(px * 0.03 + i) * 2);
    }
    ctx.stroke();
  }
  ctx.restore();

  ctx.strokeStyle = 'rgba(255,255,255,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x + 0.5, y + 0.5, w - 1, h - 1, 5);
  ctx.stroke();
}

export function drawSandpaperTexture(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, '#C9A96E');
  grad.addColorStop(0.5, '#B8945A');
  grad.addColorStop(1, '#A07848');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.clip();
  for (let i = 0; i < 300; i++) {
    const px = x + Math.random() * w;
    const py = y + Math.random() * h;
    const size = 0.5 + Math.random() * 2;
    const brightness = 140 + Math.random() * 80;
    ctx.fillStyle = `rgba(${brightness},${brightness * 0.7},${brightness * 0.4},0.5)`;
    ctx.fillRect(px, py, size, size);
  }
  ctx.restore();

  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.stroke();
}

export function drawIceTexture(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, '#D4F1F9');
  grad.addColorStop(0.3, '#A8E0EF');
  grad.addColorStop(0.7, '#7CC8DE');
  grad.addColorStop(1, '#5BB8D4');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.fill();

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.clip();
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.lineWidth = 0.5;
  for (let i = 0; i < 6; i++) {
    const sx = x + Math.random() * w;
    const sy = y + Math.random() * h;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(sx + (Math.random() - 0.5) * 40, sy + (Math.random() - 0.5) * 20);
    ctx.stroke();
  }

  const shine = ctx.createLinearGradient(x, y, x + w * 0.6, y + h * 0.4);
  shine.addColorStop(0, 'rgba(255,255,255,0.25)');
  shine.addColorStop(0.5, 'rgba(255,255,255,0.05)');
  shine.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = shine;
  ctx.fillRect(x, y, w, h);
  ctx.restore();

  ctx.strokeStyle = 'rgba(255,255,255,0.3)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, 5);
  ctx.stroke();
}

export function drawBlock3D(
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
  surfType: SurfaceType, isTop: boolean, language: 'en' | 'zh'
) {
  const depth = 12;

  if (isTop) {
    ctx.fillStyle = '#5A3820';
    ctx.beginPath();
    ctx.moveTo(x + w, y);
    ctx.lineTo(x + w + depth, y - depth);
    ctx.lineTo(x + w + depth, y + h - depth);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#8B6240';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + depth, y - depth);
    ctx.lineTo(x + w + depth, y - depth);
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();

    drawWoodTexture(ctx, x, y, w, h, true);

    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.font = 'bold 13px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(language === 'zh' ? '木 块' : 'BLOCK', x + w / 2, y + h / 2 + 5);
  } else {
    const sideColor = surfType === 'ice' ? '#4AA8C0' : surfType === 'sandpaper' ? '#8B6B3A' : '#6B4830';
    ctx.fillStyle = sideColor;
    ctx.beginPath();
    ctx.moveTo(x + w, y);
    ctx.lineTo(x + w + depth, y - depth);
    ctx.lineTo(x + w + depth, y + h - depth);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();

    const topColor = surfType === 'ice' ? '#90D4E8' : surfType === 'sandpaper' ? '#B09060' : '#9B7850';
    ctx.fillStyle = topColor;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + depth, y - depth);
    ctx.lineTo(x + w + depth, y - depth);
    ctx.lineTo(x + w, y);
    ctx.closePath();
    ctx.fill();

    if (surfType === 'sandpaper') drawSandpaperTexture(ctx, x, y, w, h);
    else if (surfType === 'ice') drawIceTexture(ctx, x, y, w, h);
    else drawWoodTexture(ctx, x, y, w, h, false);

    ctx.fillStyle = surfType === 'ice' ? 'rgba(0,60,80,0.6)' : 'rgba(255,255,255,0.6)';
    ctx.font = 'bold 12px system-ui';
    ctx.textAlign = 'center';
    ctx.fillText(surfaceLabels[surfType][language], x + w / 2, y + h / 2 + 4);
  }
}

export function drawAtom(ctx: CanvasRenderingContext2D, atom: Atom, temp: number) {
  const glow = Math.min(1, (temp - 20) / 60);
  const r = atom.radius;

  if (glow > 0.1) {
    ctx.beginPath();
    ctx.arc(atom.x, atom.y, r * 2, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${atom.hue}, 80%, 60%, ${glow * 0.15})`;
    ctx.fill();
  }

  const grad = ctx.createRadialGradient(
    atom.x - r * 0.3, atom.y - r * 0.3, r * 0.1,
    atom.x, atom.y, r
  );
  const light = Math.min(70, 50 + glow * 20);
  grad.addColorStop(0, `hsla(${atom.hue}, 70%, ${light + 20}%, 1)`);
  grad.addColorStop(0.6, `hsla(${atom.hue}, 80%, ${light}%, 1)`);
  grad.addColorStop(1, `hsla(${atom.hue}, 90%, ${light - 20}%, 0.8)`);

  ctx.beginPath();
  ctx.arc(atom.x, atom.y, r, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(atom.x - r * 0.2, atom.y - r * 0.2, r * 0.35, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fill();
}

export function drawBonds(ctx: CanvasRenderingContext2D, atoms: Atom[], maxDist: number, temp: number) {
  const bondAlpha = Math.max(0.03, 0.12 - (temp - 20) / 400);
  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const dx = atoms[j].x - atoms[i].x;
      const dy = atoms[j].y - atoms[i].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < maxDist) {
        const alpha = bondAlpha * (1 - dist / maxDist);
        ctx.strokeStyle = `rgba(200,220,255,${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(atoms[i].x, atoms[i].y);
        ctx.lineTo(atoms[j].x, atoms[j].y);
        ctx.stroke();
      }
    }
  }
}

export function drawThermometer(ctx: CanvasRenderingContext2D, x: number, y: number, temp: number) {
  const th = 170;
  const tw = 24;
  const bulbR = 16;
  const fillFrac = Math.min(1, Math.max(0, (temp - 10) / 90));
  const fillH = fillFrac * (th - 30);

  ctx.fillStyle = 'rgba(20,20,40,0.8)';
  ctx.beginPath();
  ctx.roundRect(x - 4, y - 4, tw + 8, th + bulbR * 2 + 14, 16);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.1)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#1a1a30';
  ctx.beginPath();
  ctx.roundRect(x, y, tw, th, 12);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.stroke();

  const mercGrad = ctx.createLinearGradient(x, y + th, x, y + th - fillH);
  if (temp > 60) {
    mercGrad.addColorStop(0, '#FF2020');
    mercGrad.addColorStop(1, '#FF6060');
  } else if (temp > 35) {
    mercGrad.addColorStop(0, '#FF4040');
    mercGrad.addColorStop(1, '#FF8888');
  } else {
    mercGrad.addColorStop(0, '#FF5555');
    mercGrad.addColorStop(1, '#FFAAAA');
  }
  ctx.fillStyle = mercGrad;
  if (fillH > 0) {
    ctx.beginPath();
    ctx.roundRect(x + 5, y + th - 8 - fillH, tw - 10, fillH, 4);
    ctx.fill();
  }

  ctx.fillStyle = '#CC1111';
  ctx.beginPath();
  ctx.arc(x + tw / 2, y + th + bulbR - 2, bulbR, 0, Math.PI * 2);
  ctx.fill();
  const bulbGrad = ctx.createRadialGradient(x + tw / 2 - 3, y + th + bulbR - 5, 2, x + tw / 2, y + th + bulbR, bulbR);
  bulbGrad.addColorStop(0, '#FF4444');
  bulbGrad.addColorStop(1, '#AA0000');
  ctx.fillStyle = bulbGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + tw / 2 - 3, y + th + bulbR - 5, 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255,255,255,0.2)';
  ctx.fill();

  for (let i = 0; i <= 4; i++) {
    const markY = y + th - 12 - (i / 4) * (th - 30);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(x + tw, markY);
    ctx.lineTo(x + tw + 5, markY);
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.4)';
    ctx.font = '9px system-ui';
    ctx.textAlign = 'left';
    ctx.fillText(`${10 + i * 20}`, x + tw + 7, markY + 3);
  }

  ctx.fillStyle = '#fff';
  ctx.font = 'bold 13px system-ui';
  ctx.textAlign = 'center';
  ctx.fillText(`${Math.round(temp)}\u00B0C`, x + tw / 2, y + th + bulbR * 2 + 10);
}

export function drawArrow(ctx: CanvasRenderingContext2D, x: number, y: number, len: number, label: string, color: string) {
  if (len < 2) return;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + len, y);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x + len + 8, y);
  ctx.lineTo(x + len - 2, y - 5);
  ctx.lineTo(x + len - 2, y + 5);
  ctx.closePath();
  ctx.fill();

  ctx.font = '10px system-ui';
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.fillText(label, x + len / 2, y - 10);
}
