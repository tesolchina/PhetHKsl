import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, RotateCcw, Info } from 'lucide-react';

interface Props {
  language: 'en' | 'zh';
  speakText: (text: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

interface Atom {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

type SurfaceType = 'wood' | 'sandpaper' | 'ice';

const surfaceLabels: Record<SurfaceType, { zh: string; en: string }> = {
  wood: { zh: '木头', en: 'Wood' },
  sandpaper: { zh: '砂纸', en: 'Sandpaper' },
  ice: { zh: '冰面', en: 'Ice' },
};

const frictionCoefficients: Record<SurfaceType, number> = {
  wood: 0.5,
  sandpaper: 0.9,
  ice: 0.1,
};

const surfaceColors: Record<SurfaceType, { top: string; bottom: string }> = {
  wood: { top: '#8B6914', bottom: '#A0522D' },
  sandpaper: { top: '#C4A35A', bottom: '#8B7355' },
  ice: { top: '#B0E0E6', bottom: '#87CEEB' },
};

function createAtomGrid(
  rows: number,
  cols: number,
  startX: number,
  startY: number,
  spacing: number,
  color: string,
  radius: number
): Atom[] {
  const atoms: Atom[] = [];
  for (let r = 0; r < rows; r++) {
    const offset = r % 2 === 0 ? 0 : spacing * 0.5;
    for (let c = 0; c < cols; c++) {
      const x = startX + c * spacing + offset;
      const y = startY + r * (spacing * 0.866);
      atoms.push({ x, y, baseX: x, baseY: y, vx: 0, vy: 0, radius, color });
    }
  }
  return atoms;
}

export function FrictionSimCanvas({ language, speakText, onNext, onPrev }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [temperature, setTemperature] = useState(20);
  const [surface, setSurface] = useState<SurfaceType>('wood');
  const [isDragging, setIsDragging] = useState(false);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [showAtomView, setShowAtomView] = useState(true);
  const [totalFriction, setTotalFriction] = useState(0);

  const stateRef = useRef({
    topBlockX: 0,
    topBlockTargetX: 0,
    topAtoms: [] as Atom[],
    bottomAtoms: [] as Atom[],
    temperature: 20,
    dragSpeed: 0,
    friction: frictionCoefficients.wood,
    mouseX: 0,
    mouseY: 0,
    isDragging: false,
    showAtomView: true,
    lastMouseX: 0,
    instantSpeed: 0,
  });

  const resetSim = useCallback(() => {
    setTemperature(20);
    setDragSpeed(0);
    setTotalFriction(0);
    const s = stateRef.current;
    s.temperature = 20;
    s.dragSpeed = 0;
    s.topBlockX = 0;
    s.topBlockTargetX = 0;
    s.instantSpeed = 0;
  }, []);

  useEffect(() => {
    stateRef.current.friction = frictionCoefficients[surface];
    resetSim();
  }, [surface, resetSim]);

  useEffect(() => {
    stateRef.current.showAtomView = showAtomView;
  }, [showAtomView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const s = stateRef.current;
    const blockW = 180;
    const blockH = 60;
    const contactY = H * 0.55;

    s.topAtoms = createAtomGrid(3, 8, W / 2 - 80, contactY - 50, 22, '#FF6B6B', 8);
    s.bottomAtoms = createAtomGrid(3, 14, W / 2 - 150, contactY + 10, 22, '#4ECDC4', 8);

    function tempToColor(temp: number): string {
      const t = Math.min(1, Math.max(0, (temp - 20) / 80));
      const r = Math.round(30 + t * 225);
      const g = Math.round(100 - t * 60);
      const b = Math.round(200 - t * 180);
      return `rgb(${r},${g},${b})`;
    }

    function drawBlock(x: number, y: number, w: number, h: number, colors: { top: string; bottom: string }, isTop: boolean) {
      const grad = ctx!.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, colors.top);
      grad.addColorStop(1, colors.bottom);
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.roundRect(x, y, w, h, 6);
      ctx!.fill();
      ctx!.strokeStyle = 'rgba(255,255,255,0.15)';
      ctx!.lineWidth = 1;
      ctx!.stroke();

      if (!isTop) {
        ctx!.fillStyle = 'rgba(0,0,0,0.15)';
        for (let i = 0; i < w; i += 4) {
          if (Math.random() > 0.6) {
            ctx!.fillRect(x + i, y + Math.random() * h, 2, 2);
          }
        }
      }
    }

    function drawAtoms(atoms: Atom[], vibration: number) {
      atoms.forEach(atom => {
        const shake = vibration * 3;
        atom.vx += (Math.random() - 0.5) * shake;
        atom.vy += (Math.random() - 0.5) * shake;
        atom.vx *= 0.85;
        atom.vy *= 0.85;
        atom.x = atom.baseX + atom.vx;
        atom.y = atom.baseY + atom.vy;

        const grd = ctx!.createRadialGradient(atom.x - 2, atom.y - 2, 1, atom.x, atom.y, atom.radius);
        grd.addColorStop(0, 'rgba(255,255,255,0.4)');
        grd.addColorStop(0.5, atom.color);
        grd.addColorStop(1, 'rgba(0,0,0,0.3)');
        ctx!.fillStyle = grd;
        ctx!.beginPath();
        ctx!.arc(atom.x, atom.y, atom.radius, 0, Math.PI * 2);
        ctx!.fill();
      });

      for (let i = 0; i < atoms.length; i++) {
        for (let j = i + 1; j < atoms.length; j++) {
          const dx = atoms[j].x - atoms[i].x;
          const dy = atoms[j].y - atoms[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 30) {
            ctx!.strokeStyle = `rgba(255,255,255,${0.06 * (1 - dist / 30)})`;
            ctx!.lineWidth = 0.5;
            ctx!.beginPath();
            ctx!.moveTo(atoms[i].x, atoms[i].y);
            ctx!.lineTo(atoms[j].x, atoms[j].y);
            ctx!.stroke();
          }
        }
      }
    }

    function drawThermometer(x: number, y: number, temp: number) {
      const h = 160;
      const w = 20;
      const fillH = ((temp - 10) / 90) * (h - 20);

      ctx!.fillStyle = '#1a1a2e';
      ctx!.beginPath();
      ctx!.roundRect(x, y, w, h, 10);
      ctx!.fill();
      ctx!.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx!.lineWidth = 1;
      ctx!.stroke();

      const grad = ctx!.createLinearGradient(x, y + h, x, y + h - fillH);
      grad.addColorStop(0, '#ff4444');
      grad.addColorStop(1, '#ff8888');
      ctx!.fillStyle = grad;
      ctx!.beginPath();
      ctx!.roundRect(x + 3, y + h - 3 - fillH, w - 6, fillH, 4);
      ctx!.fill();

      ctx!.fillStyle = '#ff4444';
      ctx!.beginPath();
      ctx!.arc(x + w / 2, y + h + 8, 14, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = '#cc0000';
      ctx!.beginPath();
      ctx!.arc(x + w / 2, y + h + 8, 10, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = '#fff';
      ctx!.font = 'bold 14px system-ui';
      ctx!.textAlign = 'center';
      ctx!.fillText(`${Math.round(temp)}\u00B0C`, x + w / 2, y + h + 35);

      for (let i = 0; i <= 4; i++) {
        const ty = y + h - 10 - (i / 4) * (h - 20);
        ctx!.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx!.lineWidth = 0.5;
        ctx!.beginPath();
        ctx!.moveTo(x + w, ty);
        ctx!.lineTo(x + w + 6, ty);
        ctx!.stroke();
        ctx!.fillStyle = 'rgba(255,255,255,0.5)';
        ctx!.font = '9px system-ui';
        ctx!.textAlign = 'left';
        ctx!.fillText(`${10 + i * 20}`, x + w + 8, ty + 3);
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      const bg = ctx!.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, '#0a0a1a');
      bg.addColorStop(1, '#0f0f2a');
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, W, H);

      if (s.isDragging) {
        s.instantSpeed = Math.abs(s.mouseX - s.lastMouseX);
        s.lastMouseX = s.mouseX;
        s.topBlockTargetX = s.mouseX - W / 2;
      } else {
        s.instantSpeed *= 0.92;
      }

      s.topBlockX += (s.topBlockTargetX - s.topBlockX) * 0.15;
      s.dragSpeed = s.instantSpeed;

      const heatRate = s.dragSpeed * s.friction * 0.15;
      s.temperature = Math.max(20, Math.min(100, s.temperature + heatRate - (s.temperature - 20) * 0.005));

      setTemperature(s.temperature);
      setDragSpeed(s.dragSpeed);

      if (s.dragSpeed > 0.5) {
        setTotalFriction(prev => prev + s.dragSpeed * s.friction * 0.01);
      }

      const vibration = (s.temperature - 20) / 80;
      const colors = surfaceColors[surface as SurfaceType];

      const bottomBlockX = W / 2 - 160;
      const bottomBlockW = 320;
      drawBlock(bottomBlockX, contactY, bottomBlockW, blockH, colors, false);

      const topX = W / 2 - blockW / 2 + s.topBlockX;
      drawBlock(topX, contactY - blockH, blockW, blockH, { top: '#8B4513', bottom: '#654321' }, true);

      if (s.isDragging) {
        ctx!.strokeStyle = 'rgba(255,200,50,0.4)';
        ctx!.setLineDash([5, 5]);
        ctx!.lineWidth = 2;
        ctx!.beginPath();
        ctx!.moveTo(s.mouseX, contactY - blockH - 20);
        ctx!.lineTo(topX + blockW / 2, contactY - blockH - 5);
        ctx!.stroke();
        ctx!.setLineDash([]);
      }

      if (s.dragSpeed > 1) {
        const sparkCount = Math.min(8, Math.floor(s.dragSpeed * s.friction * 0.5));
        for (let i = 0; i < sparkCount; i++) {
          const sx = topX + Math.random() * blockW;
          const sy = contactY + (Math.random() - 0.5) * 6;
          const sparkR = 1 + Math.random() * 2;
          ctx!.fillStyle = `rgba(255, ${150 + Math.random() * 105}, 0, ${0.5 + Math.random() * 0.5})`;
          ctx!.beginPath();
          ctx!.arc(sx, sy, sparkR, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      if (s.temperature > 30) {
        const glowIntensity = Math.min(0.3, (s.temperature - 30) / 200);
        const glow = ctx!.createRadialGradient(W / 2, contactY, 10, W / 2, contactY, 150);
        glow.addColorStop(0, `rgba(255, 100, 50, ${glowIntensity})`);
        glow.addColorStop(1, 'rgba(255, 100, 50, 0)');
        ctx!.fillStyle = glow;
        ctx!.fillRect(0, contactY - 100, W, 200);
      }

      if (s.showAtomView) {
        const zoomX = W / 2 - 120;
        const zoomY = contactY + 90;
        const zoomW = 240;
        const zoomH = 120;

        ctx!.fillStyle = 'rgba(0,0,0,0.6)';
        ctx!.beginPath();
        ctx!.roundRect(zoomX, zoomY, zoomW, zoomH, 12);
        ctx!.fill();
        ctx!.strokeStyle = 'rgba(100,200,255,0.3)';
        ctx!.lineWidth = 1;
        ctx!.stroke();

        ctx!.fillStyle = 'rgba(100,200,255,0.5)';
        ctx!.font = '10px system-ui';
        ctx!.textAlign = 'left';
        const atomLabel = language === 'zh' ? '\u{1F52C} \u539F\u5B50\u653E\u5927\u89C6\u56FE' : '\u{1F52C} Atom Zoom View';
        ctx!.fillText(atomLabel, zoomX + 10, zoomY + 15);

        ctx!.save();
        ctx!.beginPath();
        ctx!.roundRect(zoomX + 5, zoomY + 22, zoomW - 10, zoomH - 28, 8);
        ctx!.clip();

        const topAtomsZoom = createAtomGrid(2, 6, zoomX + 30, zoomY + 30, 20, '#FF6B6B', 7);
        const bottomAtomsZoom = createAtomGrid(2, 6, zoomX + 30, zoomY + 70, 20, '#4ECDC4', 7);

        topAtomsZoom.forEach(a => { a.baseX += s.topBlockX * 0.3; });

        drawAtoms(topAtomsZoom, vibration);
        drawAtoms(bottomAtomsZoom, vibration);

        ctx!.restore();
      }

      drawThermometer(W - 60, H * 0.15, s.temperature);

      ctx!.fillStyle = 'rgba(255,255,255,0.6)';
      ctx!.font = '12px system-ui';
      ctx!.textAlign = 'center';

      const dragLabel = language === 'zh' ? '\u2190 \u62D6\u52A8\u4E0A\u65B9\u7684\u65B9\u5757 \u2192' : '\u2190 Drag the top block \u2192';
      if (!s.isDragging && s.dragSpeed < 1) {
        ctx!.globalAlpha = 0.5 + 0.3 * Math.sin(Date.now() * 0.003);
        ctx!.fillText(dragLabel, W / 2, contactY - blockH - 25);
        ctx!.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => cancelAnimationFrame(animRef.current);
  }, [language, surface]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = () => canvas.getBoundingClientRect();

    const getPos = (e: MouseEvent | Touch) => {
      const r = rect();
      return {
        x: ((e.clientX - r.left) / r.width) * canvas.width,
        y: ((e.clientY - r.top) / r.height) * canvas.height,
      };
    };

    const onDown = (e: MouseEvent) => {
      const pos = getPos(e);
      const s = stateRef.current;
      const contactY = canvas.height * 0.55;
      const blockH = 60;
      const blockW = 180;
      const topX = canvas.width / 2 - blockW / 2 + s.topBlockX;
      if (pos.x >= topX && pos.x <= topX + blockW && pos.y >= contactY - blockH && pos.y <= contactY) {
        s.isDragging = true;
        s.mouseX = pos.x;
        s.lastMouseX = pos.x;
        setIsDragging(true);
      }
    };
    const onMove = (e: MouseEvent) => {
      if (stateRef.current.isDragging) {
        const pos = getPos(e);
        stateRef.current.mouseX = pos.x;
        stateRef.current.mouseY = pos.y;
      }
    };
    const onUp = () => {
      stateRef.current.isDragging = false;
      setIsDragging(false);
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const pos = getPos(e.touches[0]);
        const s = stateRef.current;
        const contactY = canvas.height * 0.55;
        const blockH = 60;
        const blockW = 180;
        const topX = canvas.width / 2 - blockW / 2 + s.topBlockX;
        if (pos.x >= topX && pos.x <= topX + blockW && pos.y >= contactY - blockH && pos.y <= contactY) {
          s.isDragging = true;
          s.mouseX = pos.x;
          s.lastMouseX = pos.x;
          setIsDragging(true);
          e.preventDefault();
        }
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (stateRef.current.isDragging && e.touches.length > 0) {
        const pos = getPos(e.touches[0]);
        stateRef.current.mouseX = pos.x;
        stateRef.current.mouseY = pos.y;
        e.preventDefault();
      }
    };
    const onTouchEnd = () => {
      stateRef.current.isDragging = false;
      setIsDragging(false);
    };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: false });
    canvas.addEventListener('touchmove', onTouchMove, { passive: false });
    canvas.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {language === 'zh' ? '摩擦力模拟实验' : 'Friction Simulation'}
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {(Object.keys(surfaceLabels) as SurfaceType[]).map(s => (
            <button
              key={s}
              onClick={() => setSurface(s)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                surface === s
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {surfaceLabels[s][language]}
              <span className="text-xs ml-1 opacity-60">
                ({language === 'zh' ? `\u7C97\u7CD9${Math.round(frictionCoefficients[s] * 100)}%` : `${Math.round(frictionCoefficients[s] * 100)}%`})
              </span>
            </button>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl">
          <canvas
            ref={canvasRef}
            width={700}
            height={420}
            className="w-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <p className="text-xs text-muted-foreground mb-1">
              {language === 'zh' ? '\u6E29\u5EA6' : 'Temperature'}
            </p>
            <p className={`text-2xl font-bold ${temperature > 50 ? 'text-orange-400' : temperature > 30 ? 'text-yellow-400' : 'text-blue-400'}`}>
              {Math.round(temperature)}\u00B0C
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <p className="text-xs text-muted-foreground mb-1">
              {language === 'zh' ? '\u62D6\u52A8\u901F\u5EA6' : 'Drag Speed'}
            </p>
            <p className="text-2xl font-bold text-green-400">
              {Math.round(dragSpeed)}
            </p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
            <p className="text-xs text-muted-foreground mb-1">
              {language === 'zh' ? '\u4EA7\u751F\u70ED\u91CF' : 'Heat Generated'}
            </p>
            <p className="text-2xl font-bold text-red-400">
              {totalFriction.toFixed(1)}J
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline" size="sm"
              onClick={() => setShowAtomView(!showAtomView)}
              className={`gap-1 text-xs ${showAtomView ? 'border-cyan-500/30 text-cyan-400' : ''}`}
            >
              <Info className="h-3 w-3" />
              {language === 'zh' ? '\u539F\u5B50\u89C6\u56FE' : 'Atom View'}
            </Button>
            <Button
              variant="outline" size="sm"
              onClick={resetSim}
              className="gap-1 text-xs"
            >
              <RotateCcw className="h-3 w-3" />
              {language === 'zh' ? '\u91CD\u7F6E' : 'Reset'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onPrev} className="gap-1 text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
              {language === 'zh' ? '\u4E0A\u4E00\u6B65' : 'Back'}
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 gap-1 rounded-full px-6"
              onClick={onNext}
            >
              {language === 'zh' ? '\u8FDB\u5165\u6311\u6218' : 'Challenge'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
