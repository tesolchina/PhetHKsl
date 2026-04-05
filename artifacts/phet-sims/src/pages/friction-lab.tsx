import { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ChevronLeft, Home, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { Link } from 'wouter';
import { FrictionSimCanvas } from '@/components/friction/FrictionSimCanvas';
import { StoryIntro } from '@/components/friction/StoryIntro';
import { PredictionStep } from '@/components/friction/PredictionStep';
import { ChallengeStep } from '@/components/friction/ChallengeStep';
import { ReflectionStep } from '@/components/friction/ReflectionStep';

const STEPS = [
  { id: 'story', icon: '1' },
  { id: 'predict', icon: '2' },
  { id: 'explore', icon: '3' },
  { id: 'challenge', icon: '4' },
  { id: 'reflect', icon: '5' },
] as const;

type StepId = typeof STEPS[number]['id'];

const stepLabels: Record<StepId, { en: string; zh: string }> = {
  story: { en: 'Story', zh: '故事' },
  predict: { en: 'Predict', zh: '预测' },
  explore: { en: 'Explore', zh: '探索' },
  challenge: { en: 'Challenge', zh: '挑战' },
  reflect: { en: 'Reflect', zh: '反思' },
};

export default function FrictionLab() {
  const { language, t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const stepId = STEPS[currentStep].id;

  const markComplete = useCallback((step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step));
  }, []);

  const stopSpeaking = useCallback(() => {
    if (canSpeak) window.speechSynthesis.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, [canSpeak]);

  const speakText = useCallback((text: string) => {
    if (!canSpeak) return;
    stopSpeaking();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = language === 'zh' ? 'zh-CN' : 'en-US';
    u.rate = language === 'zh' ? 0.85 : 0.95;
    u.onend = () => setIsSpeaking(false);
    u.onerror = () => setIsSpeaking(false);
    utteranceRef.current = u;
    setIsSpeaking(true);
    window.speechSynthesis.speak(u);
  }, [canSpeak, language, stopSpeaking]);

  useEffect(() => {
    return () => { if (canSpeak) window.speechSynthesis.cancel(); };
  }, [canSpeak]);

  useEffect(() => {
    stopSpeaking();
  }, [currentStep, stopSpeaking]);

  const goNext = useCallback(() => {
    markComplete(currentStep);
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  }, [currentStep, markComplete]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a1a] via-[#0f0f2a] to-[#0a0a1a] text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-white">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">{language === 'zh' ? '返回首页' : 'Home'}</span>
              </Button>
            </Link>
            <div className="h-5 w-px bg-white/10" />
            <div>
              <h1 className="text-sm font-semibold">
                {language === 'zh' ? '摩擦力实验室' : 'Friction Lab'}
              </h1>
              <p className="text-[10px] text-muted-foreground">
                {language === 'zh' ? '原创互动体验' : 'Original Interactive Experience'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px]">
              {language === 'zh' ? '小学' : 'Elementary'}
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px]">
              {language === 'zh' ? '原创' : 'Original'}
            </Badge>
            {canSpeak && (
              <Button
                variant="ghost" size="icon"
                className="h-8 w-8"
                onClick={() => isSpeaking ? stopSpeaking() : null}
              >
                {isSpeaking ? <VolumeX className="h-4 w-4 text-primary" /> : null}
              </Button>
            )}
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="fixed top-14 left-0 right-0 z-40 bg-black/30 backdrop-blur-md border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-2 flex items-center justify-center gap-1">
          {STEPS.map((step, i) => {
            const isActive = i === currentStep;
            const isCompleted = completedSteps.has(i);
            const label = stepLabels[step.id][language];
            return (
              <button
                key={step.id}
                onClick={() => (isCompleted || i <= currentStep) ? setCurrentStep(i) : null}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground scale-105'
                    : isCompleted
                    ? 'bg-primary/20 text-primary cursor-pointer'
                    : 'bg-white/5 text-muted-foreground'
                } ${!isCompleted && i > currentStep ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  isActive ? 'bg-white/20' : isCompleted ? 'bg-primary/30' : 'bg-white/10'
                }`}>
                  {isCompleted && !isActive ? '\u2713' : step.icon}
                </span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="pt-[7.5rem] pb-24 px-4">
        <div className="max-w-4xl mx-auto">
          {stepId === 'story' && (
            <StoryIntro language={language} speakText={speakText} onNext={goNext} />
          )}
          {stepId === 'predict' && (
            <PredictionStep language={language} onNext={goNext} onPrev={goPrev} />
          )}
          {stepId === 'explore' && (
            <FrictionSimCanvas language={language} speakText={speakText} onNext={goNext} onPrev={goPrev} />
          )}
          {stepId === 'challenge' && (
            <ChallengeStep language={language} onNext={goNext} onPrev={goPrev} />
          )}
          {stepId === 'reflect' && (
            <ReflectionStep language={language} speakText={speakText} onPrev={goPrev} />
          )}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/40 backdrop-blur-xl border-t border-white/5">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost" size="sm"
            onClick={goPrev}
            disabled={currentStep === 0}
            className="gap-1 text-muted-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            {language === 'zh' ? '上一步' : 'Previous'}
          </Button>

          <span className="text-xs text-muted-foreground">
            {currentStep + 1} / {STEPS.length}
          </span>

          <Button
            variant="default" size="sm"
            onClick={goNext}
            disabled={currentStep === STEPS.length - 1}
            className="gap-1"
          >
            {language === 'zh' ? '下一步' : 'Next'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
