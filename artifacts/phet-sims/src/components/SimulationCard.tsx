import { useState, useCallback, useRef, useEffect } from 'react';
import { type Simulation } from '@/data/simulations';
import { Play, Volume2, VolumeX, BookOpen, ChevronRight, PanelRightOpen, PanelRightClose } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/context/LanguageContext';

interface SimulationCardProps {
  simulation: Simulation;
}

export function SimulationCard({ simulation }: SimulationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const canSpeak = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const { language, t } = useLanguage();

  const name = simulation.name[language];
  const description = simulation.description[language];
  const tags = simulation.tags[language];
  const categoryLabel = t(`category.${simulation.category}`);
  const simUrl = simulation.url[language];

  const stopSpeaking = useCallback(() => {
    if (canSpeak) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, [canSpeak]);

  const speakText = useCallback((text: string) => {
    if (!canSpeak) return;
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
    utterance.rate = language === 'zh' ? 0.9 : 1;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    utteranceRef.current = utterance;
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }, [canSpeak, language, stopSpeaking]);

  const handleNarrate = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking();
      return;
    }
    const step = simulation.guide[activeStep];
    if (step) {
      const text = `${step.title[language]}. ${step.content[language]}`;
      speakText(text);
    }
  }, [isSpeaking, simulation.guide, activeStep, language, speakText, stopSpeaking]);

  useEffect(() => {
    return () => {
      if (canSpeak) {
        window.speechSynthesis.cancel();
      }
    };
  }, [canSpeak]);

  useEffect(() => {
    stopSpeaking();
  }, [activeStep, stopSpeaking]);

  const handleClose = useCallback((open: boolean) => {
    if (!open) {
      stopSpeaking();
      setActiveStep(0);
      setShowGuide(true);
    }
    setIsOpen(open);
  }, [stopSpeaking]);

  const currentStep = simulation.guide[activeStep];

  return (
    <>
      <div 
        className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/5 bg-card p-6 card-hover-glow cursor-pointer h-full"
        onClick={() => setIsOpen(true)}
        data-testid={`card-${simulation.id}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative z-10 flex-1">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-primary/20 text-primary uppercase tracking-wider text-xs font-semibold">
                {categoryLabel}
              </Badge>
              {simulation.localDev && (
                <Badge variant="outline" className="border-green-500/30 text-green-400 uppercase tracking-wider text-[10px] font-semibold">
                  {language === 'zh' ? '已修改' : 'Modified'}
                </Badge>
              )}
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
              <Play className="h-4 w-4" />
            </div>
          </div>
          
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-foreground mb-3 text-glow">
            {name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-muted-foreground/80 bg-white/5 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-[95vw] w-[95vw] h-[90vh] p-0 border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden flex flex-col">
          <DialogTitle className="sr-only">{name}</DialogTitle>

          <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 bg-card/50 shrink-0">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="font-serif text-xl font-medium text-glow">{name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{categoryLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (showGuide) stopSpeaking();
                  setShowGuide(!showGuide);
                }}
                className="border-white/10 hover:bg-white/10 gap-2"
                data-testid="button-toggle-guide"
              >
                {showGuide ? <PanelRightClose className="h-4 w-4" /> : <PanelRightOpen className="h-4 w-4" />}
                <span className="hidden sm:inline">{showGuide ? t('viewer.hideGuide') : t('viewer.showGuide')}</span>
              </Button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            <div className={`${showGuide ? 'w-[65%]' : 'w-full'} bg-black relative transition-all duration-300`}>
              {isOpen && (
                <iframe 
                  src={simUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                  title={name}
                />
              )}
            </div>

            {showGuide && (
              <div className="w-[35%] border-l border-white/10 bg-card/80 flex flex-col shrink-0">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-primary" />
                    <h3 className="font-semibold text-sm">{t('viewer.guide')}</h3>
                  </div>
                  {canSpeak && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleNarrate}
                      className={`gap-2 text-xs ${isSpeaking ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                      data-testid="button-narrate"
                    >
                      {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      {isSpeaking ? t('viewer.stop') : t('viewer.narrate')}
                    </Button>
                  )}
                </div>

                <div className="px-5 py-3 flex gap-1.5 overflow-x-auto border-b border-white/5 shrink-0">
                  {simulation.guide.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                        activeStep === index
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                      }`}
                      data-testid={`button-guide-step-${index}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <ScrollArea className="flex-1">
                  {currentStep && (
                    <div className="p-5">
                      <h4 className="font-serif text-lg font-semibold mb-3 text-glow">
                        {currentStep.title[language]}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                        {currentStep.content[language]}
                      </p>

                      <div className="mt-6 flex items-center justify-between">
                        {activeStep > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveStep(activeStep - 1)}
                            className="text-xs text-muted-foreground"
                            data-testid="button-prev-step"
                          >
                            <ChevronRight className="h-3 w-3 rotate-180 mr-1" />
                            {simulation.guide[activeStep - 1]?.title[language]}
                          </Button>
                        )}
                        <div className="flex-1" />
                        {activeStep < simulation.guide.length - 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveStep(activeStep + 1)}
                            className="text-xs text-primary"
                            data-testid="button-next-step"
                          >
                            {simulation.guide[activeStep + 1]?.title[language]}
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </ScrollArea>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
