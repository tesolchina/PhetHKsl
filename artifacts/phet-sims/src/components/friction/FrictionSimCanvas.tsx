import { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, RotateCcw, Eye, EyeOff } from 'lucide-react';
import type { FrictionSimProps, SurfaceType, Spark } from './types';
import { surfaceLabels, frictionCoefficients } from './constants';
import { createAtomGrid, updateAtoms } from './physics';
import { drawBlock3D, drawAtom, drawBonds, drawThermometer, drawArrow } from './renderers';

export function FrictionSimCanvas({ language, onNext, onPrev }: FrictionSimProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const sparksRef = useRef<Spark[]>([]);
  const [temperature, setTemperature] = useState(20);
  const [surface, setSurface] = useState<SurfaceType>('wood');
  const [isDragging, setIsDragging] = useState(false);
  const [dragSpeed, setDragSpeed] = useState(0);
  const [showAtomView, setShowAtomView] = useState(true);
  const [totalFriction, setTotalFriction] = useState(0);

  const stateRef = useRef({
    topBlockX: 0,
    topBlockTargetX: 0,
    temperature: 20,
    dragSpeed: 0,
    friction: frictionCoefficients.wood,
    mouseX: 0,
    isDragging: false,
    showAtomView: true,
    lastMouseX: 0,
    instantSpeed: 0,
    time: 0,
    surfaceType: 'wood' as SurfaceType,
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
    sparksRef.current = [];
  }, []);

  useEffect(() => {
    stateRef.current.friction = frictionCoefficients[surface];
    stateRef.current.surfaceType = surface;
    resetSim();
  }, [surface, resetSim]);

  useEffect(() => {
    stateRef.current.showAtomView = showAtomView;
  }, [showAtomView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;
    const s = stateRef.current;
    const blockW = 200;
    const blockH = 70;
    const contactY = H * 0.52;
    const bottomBlockW = 360;
    const bottomBlockH = 70;

    const topAtoms = createAtomGrid(3, 9, 0, 0, 20, 0, 7);
    const bottomAtoms = createAtomGrid(3, 9, 0, 0, 20, 170, 7);

    function draw() {
      s.time += 0.016;
      ctx.clearRect(0, 0, W, H);

      const bgGrad = ctx.createRadialGradient(W / 2, H / 2, 50, W / 2, H / 2, W * 0.7);
      bgGrad.addColorStop(0, '#12122a');
      bgGrad.addColorStop(1, '#08081a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      if (s.isDragging) {
        s.instantSpeed = Math.abs(s.mouseX - s.lastMouseX);
        s.lastMouseX = s.mouseX;
        s.topBlockTargetX = s.mouseX - W / 2;
      } else {
        s.instantSpeed *= 0.92;
      }
      s.topBlockX += (s.topBlockTargetX - s.topBlockX) * 0.15;
      s.dragSpeed = s.instantSpeed;
      const heatRate = s.dragSpeed * s.friction * 0.12;
      s.temperature = Math.max(20, Math.min(100, s.temperature + heatRate - (s.temperature - 20) * 0.004));
      setTemperature(s.temperature);
      setDragSpeed(s.dragSpeed);
      if (s.dragSpeed > 0.5) setTotalFriction(prev => prev + s.dragSpeed * s.friction * 0.01);

      const vibration = (s.temperature - 20) / 80;
      const bottomX = W / 2 - bottomBlockW / 2;
      drawBlock3D(ctx, bottomX, contactY, bottomBlockW, bottomBlockH, s.surfaceType, false, language);
      const topX = W / 2 - blockW / 2 + s.topBlockX;
      drawBlock3D(ctx, topX, contactY - blockH, blockW, blockH, s.surfaceType, true, language);

      if (s.dragSpeed > 0.5) {
        const forceLen = Math.min(60, s.dragSpeed * s.friction * 3);
        const dir = s.topBlockTargetX > s.topBlockX ? -1 : 1;
        const arrowY = contactY + 2;
        const arrowX = topX + blockW / 2;
        drawArrow(ctx, arrowX, arrowY, forceLen * dir, language === 'zh' ? '摩擦力' : 'Friction', 'rgba(255,200,80,0.8)');
      }

      if (s.dragSpeed > 1.5) {
        const spawnCount = Math.min(4, Math.floor(s.dragSpeed * s.friction * 0.3));
        for (let i = 0; i < spawnCount; i++) {
          sparksRef.current.push({
            x: topX + Math.random() * blockW,
            y: contactY - 2 + Math.random() * 4,
            vx: (Math.random() - 0.5) * 3,
            vy: -Math.random() * 4 - 1,
            life: 1,
            maxLife: 0.4 + Math.random() * 0.5,
            size: 1 + Math.random() * 2.5,
          });
        }
      }
      sparksRef.current = sparksRef.current.filter(sp => {
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vy += 0.15;
        sp.life -= 0.016 / sp.maxLife;
        if (sp.life <= 0) return false;
        const alpha = sp.life;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${150 + Math.random() * 100},0,${alpha})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * sp.life * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,200,${alpha * 0.6})`;
        ctx.fill();
        return true;
      });

      if (s.temperature > 30) {
        const gi = Math.min(0.25, (s.temperature - 30) / 300);
        const glow = ctx.createRadialGradient(W / 2 + s.topBlockX * 0.5, contactY, 5, W / 2 + s.topBlockX * 0.5, contactY, 180);
        glow.addColorStop(0, `rgba(255,120,40,${gi})`);
        glow.addColorStop(0.5, `rgba(255,80,20,${gi * 0.3})`);
        glow.addColorStop(1, 'rgba(255,60,20,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, contactY - 120, W, 240);
      }

      if (s.showAtomView) {
        const zoomX = W / 2 - 130;
        const zoomY = contactY + bottomBlockH + 20;
        const zoomW = 260;
        const zoomH = 130;

        ctx.fillStyle = 'rgba(5,5,20,0.85)';
        ctx.beginPath();
        ctx.roundRect(zoomX, zoomY, zoomW, zoomH, 12);
        ctx.fill();
        ctx.strokeStyle = 'rgba(100,180,255,0.25)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const lineY = zoomY + 60;
        ctx.strokeStyle = 'rgba(200,200,255,0.1)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(zoomX + 10, lineY);
        ctx.lineTo(zoomX + zoomW - 10, lineY);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = 'rgba(100,180,255,0.5)';
        ctx.font = 'bold 10px system-ui';
        ctx.textAlign = 'left';
        ctx.fillText(language === 'zh' ? '原子放大视图' : 'Atom Zoom View', zoomX + 10, zoomY + 14);

        ctx.save();
        ctx.beginPath();
        ctx.roundRect(zoomX + 5, zoomY + 20, zoomW - 10, zoomH - 25, 8);
        ctx.clip();

        const atomBaseX = zoomX + 40;
        topAtoms.forEach((a, i) => {
          a.baseX = atomBaseX + (i % 9) * 20 + (Math.floor(i / 9) % 2 === 0 ? 0 : 10);
          a.baseY = zoomY + 28 + Math.floor(i / 9) * 17;
        });
        bottomAtoms.forEach((a, i) => {
          a.baseX = atomBaseX + (i % 9) * 20 + (Math.floor(i / 9) % 2 === 0 ? 0 : 10);
          a.baseY = zoomY + 75 + Math.floor(i / 9) * 17;
        });

        updateAtoms(topAtoms, vibration, s.topBlockX * 0.2);
        updateAtoms(bottomAtoms, vibration, 0);
        drawBonds(ctx, topAtoms, 28, s.temperature);
        drawBonds(ctx, bottomAtoms, 28, s.temperature);
        topAtoms.forEach(a => drawAtom(ctx, a, s.temperature));
        bottomAtoms.forEach(a => drawAtom(ctx, a, s.temperature));

        ctx.restore();

        ctx.fillStyle = 'rgba(255,100,100,0.6)';
        ctx.font = '9px system-ui';
        ctx.textAlign = 'right';
        ctx.fillText(language === 'zh' ? '上方木块原子' : 'Top block atoms', zoomX + zoomW - 10, zoomY + 55);
        ctx.fillStyle = 'rgba(100,200,255,0.6)';
        ctx.fillText(language === 'zh' ? '下方表面原子' : 'Bottom surface atoms', zoomX + zoomW - 10, zoomY + zoomH - 8);
      }

      drawThermometer(ctx, W - 55, 40, s.temperature);

      if (!s.isDragging && s.dragSpeed < 1) {
        const pulse = 0.4 + 0.3 * Math.sin(s.time * 3);
        ctx.globalAlpha = pulse;
        ctx.fillStyle = '#fff';
        ctx.font = '13px system-ui';
        ctx.textAlign = 'center';
        ctx.fillText(
          language === 'zh' ? '\u2190 \u62D6\u52A8\u4E0A\u65B9\u7684\u6728\u5757 \u2192' : '\u2190 Drag the top block \u2192',
          W / 2, contactY - blockH - 20
        );
        ctx.globalAlpha = 1;

        ctx.strokeStyle = `rgba(255,255,255,${pulse * 0.3})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(topX + 10, contactY - blockH / 2);
        ctx.lineTo(topX - 25, contactY - blockH / 2);
        ctx.stroke();
        ctx.moveTo(topX + blockW - 10, contactY - blockH / 2);
        ctx.lineTo(topX + blockW + 25, contactY - blockH / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = `rgba(255,255,255,${pulse * 0.4})`;
        ctx.beginPath();
        ctx.moveTo(topX - 25, contactY - blockH / 2);
        ctx.lineTo(topX - 18, contactY - blockH / 2 - 4);
        ctx.lineTo(topX - 18, contactY - blockH / 2 + 4);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(topX + blockW + 25, contactY - blockH / 2);
        ctx.lineTo(topX + blockW + 18, contactY - blockH / 2 - 4);
        ctx.lineTo(topX + blockW + 18, contactY - blockH / 2 + 4);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [language, surface]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const getPos = (e: MouseEvent | Touch) => {
      const r = canvas.getBoundingClientRect();
      return { x: ((e.clientX - r.left) / r.width) * canvas.width, y: ((e.clientY - r.top) / r.height) * canvas.height };
    };

    const contactY = canvas.height * 0.52;
    const blockH = 70;
    const blockW = 200;

    const isInBlock = (px: number, py: number) => {
      const s = stateRef.current;
      const topX = canvas.width / 2 - blockW / 2 + s.topBlockX;
      return px >= topX - 10 && px <= topX + blockW + 10 && py >= contactY - blockH - 10 && py <= contactY + 10;
    };

    const onDown = (e: MouseEvent) => {
      const p = getPos(e);
      if (isInBlock(p.x, p.y)) {
        stateRef.current.isDragging = true;
        stateRef.current.mouseX = p.x;
        stateRef.current.lastMouseX = p.x;
        setIsDragging(true);
      }
    };
    const onMove = (e: MouseEvent) => {
      if (stateRef.current.isDragging) {
        stateRef.current.mouseX = getPos(e).x;
      }
    };
    const onUp = () => { stateRef.current.isDragging = false; setIsDragging(false); };

    const onTS = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const p = getPos(e.touches[0]);
        if (isInBlock(p.x, p.y)) {
          stateRef.current.isDragging = true;
          stateRef.current.mouseX = p.x;
          stateRef.current.lastMouseX = p.x;
          setIsDragging(true);
          e.preventDefault();
        }
      }
    };
    const onTM = (e: TouchEvent) => {
      if (stateRef.current.isDragging && e.touches.length > 0) {
        stateRef.current.mouseX = getPos(e.touches[0]).x;
        e.preventDefault();
      }
    };
    const onTE = () => { stateRef.current.isDragging = false; setIsDragging(false); };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTS, { passive: false });
    canvas.addEventListener('touchmove', onTM, { passive: false });
    canvas.addEventListener('touchend', onTE);
    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onTS);
      canvas.removeEventListener('touchmove', onTM);
      canvas.removeEventListener('touchend', onTE);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {language === 'zh' ? '摩擦力模拟实验' : 'Friction Simulation'}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {language === 'zh' ? '拖动上方木块，观察原子运动和温度变化' : 'Drag the top block and observe atom movement and temperature change'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {(Object.keys(surfaceLabels) as SurfaceType[]).map(st => (
            <button
              key={st}
              onClick={() => setSurface(st)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                surface === st
                  ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                  : 'bg-white/5 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {surfaceLabels[st][language]}
              <span className="text-xs ml-1 opacity-50">
                ({Math.round(frictionCoefficients[st] * 100)}%)
              </span>
            </button>
          ))}
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-blue-500/5">
          <canvas
            ref={canvasRef}
            width={750}
            height={450}
            className="w-full cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
          />
          {isDragging && (
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-[10px] font-medium animate-pulse">
              {language === 'zh' ? '正在拖动...' : 'Dragging...'}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/20 rounded-xl p-3 text-center border border-blue-500/10">
            <p className="text-[10px] text-blue-400/70 mb-1 font-medium uppercase tracking-wide">
              {language === 'zh' ? '温度' : 'Temperature'}
            </p>
            <p className={`text-2xl font-bold tabular-nums ${temperature > 50 ? 'text-orange-400' : temperature > 30 ? 'text-yellow-400' : 'text-blue-400'}`}>
              {Math.round(temperature)}
              <span className="text-sm font-normal ml-0.5">{"\u00B0C"}</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-950/50 to-green-900/20 rounded-xl p-3 text-center border border-green-500/10">
            <p className="text-[10px] text-green-400/70 mb-1 font-medium uppercase tracking-wide">
              {language === 'zh' ? '速度' : 'Speed'}
            </p>
            <p className="text-2xl font-bold text-green-400 tabular-nums">
              {Math.round(dragSpeed)}
              <span className="text-sm font-normal ml-0.5">cm/s</span>
            </p>
          </div>
          <div className="bg-gradient-to-br from-red-950/50 to-red-900/20 rounded-xl p-3 text-center border border-red-500/10">
            <p className="text-[10px] text-red-400/70 mb-1 font-medium uppercase tracking-wide">
              {language === 'zh' ? '热量' : 'Heat'}
            </p>
            <p className="text-2xl font-bold text-red-400 tabular-nums">
              {totalFriction.toFixed(1)}
              <span className="text-sm font-normal ml-0.5">J</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <Button
              variant="outline" size="sm"
              onClick={() => setShowAtomView(!showAtomView)}
              className={`gap-1.5 text-xs ${showAtomView ? 'border-cyan-500/30 text-cyan-400' : ''}`}
            >
              {showAtomView ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              {language === 'zh' ? '原子视图' : 'Atom View'}
            </Button>
            <Button variant="outline" size="sm" onClick={resetSim} className="gap-1.5 text-xs">
              <RotateCcw className="h-3 w-3" />
              {language === 'zh' ? '重置' : 'Reset'}
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onPrev} className="gap-1 text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 gap-1 rounded-full px-6"
              onClick={onNext}
            >
              {language === 'zh' ? '进入挑战' : 'Challenge'}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
