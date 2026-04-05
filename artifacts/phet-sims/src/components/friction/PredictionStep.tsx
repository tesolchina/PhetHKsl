import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface Props {
  language: 'en' | 'zh';
  onNext: () => void;
  onPrev: () => void;
}

const questions = {
  zh: [
    {
      question: '用手快速搓桌子表面，手会感觉怎样？',
      options: ['变冷', '变热', '没有变化'],
      correct: 1,
      explanation: '摩擦会产生热量！两个表面接触并移动时，微小的原子互相碰撞，产生了热能。',
    },
    {
      question: '哪个表面搓起来更费力？',
      options: ['光滑的玻璃', '粗糙的砂纸', '两个一样'],
      correct: 1,
      explanation: '粗糙的表面有更多凹凸不平的地方，原子之间的碰撞更多，所以摩擦力更大！',
    },
    {
      question: '搓得越快，温度会……',
      options: ['升得越高', '降得越低', '不变'],
      correct: 0,
      explanation: '搓得越快，原子碰撞越剧烈，产生的热量就越多，温度升得越高。',
    },
  ],
  en: [
    {
      question: 'If you rub the desk quickly with your hand, how will your hand feel?',
      options: ['Colder', 'Warmer', 'No change'],
      correct: 1,
      explanation: 'Friction generates heat! When two surfaces touch and slide, tiny atoms collide and produce thermal energy.',
    },
    {
      question: 'Which surface takes more effort to rub?',
      options: ['Smooth glass', 'Rough sandpaper', 'Both the same'],
      correct: 1,
      explanation: 'Rough surfaces have more bumps, causing more atomic collisions, which means greater friction!',
    },
    {
      question: 'If you rub faster, the temperature will...',
      options: ['Go higher', 'Go lower', 'Stay the same'],
      correct: 0,
      explanation: 'Faster rubbing means more intense atomic collisions, producing more heat, so the temperature rises higher.',
    },
  ],
};

export function PredictionStep({ language, onNext, onPrev }: Props) {
  const qs = questions[language];
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = qs[currentQ];

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === q.correct) setScore(s => s + 1);
  };

  const handleNextQ = () => {
    if (currentQ < qs.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl text-center">
          <div className="text-6xl mb-4">{score === qs.length ? '\u{1F389}' : '\u{1F44D}'}</div>
          <h2 className="text-3xl font-bold mb-3">
            {language === 'zh' ? '预测完成！' : 'Predictions Complete!'}
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {language === 'zh'
              ? `你答对了 ${score}/${qs.length} 道题`
              : `You got ${score}/${qs.length} correct`}
          </p>
          <p className="text-muted-foreground mb-8">
            {language === 'zh'
              ? '现在让我们进入模拟实验，亲眼看看原子是怎么运动的！'
              : 'Now let\'s enter the simulation and see how atoms actually move!'}
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={onPrev} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              {language === 'zh' ? '回到故事' : 'Back to Story'}
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white gap-2 px-8 rounded-full shadow-lg shadow-blue-500/20"
              onClick={onNext}
            >
              {language === 'zh' ? '开始模拟' : 'Start Simulation'}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {language === 'zh' ? '你来预测' : 'Make Your Prediction'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'zh'
              ? `第 ${currentQ + 1} / ${qs.length} 题`
              : `Question ${currentQ + 1} of ${qs.length}`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/20 rounded-2xl border border-blue-500/10 p-8 mb-6">
          <h3 className="text-xl font-semibold mb-6 text-blue-100">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = i === q.correct;
              const isSelected = i === selected;
              let classes = 'w-full text-left px-5 py-4 rounded-xl border-2 transition-all duration-300 text-base ';
              if (!showExplanation) {
                classes += 'border-white/10 hover:border-blue-400/40 hover:bg-blue-500/5 cursor-pointer';
              } else if (isCorrect) {
                classes += 'border-green-500/50 bg-green-500/10 text-green-200';
              } else if (isSelected && !isCorrect) {
                classes += 'border-red-500/50 bg-red-500/10 text-red-200';
              } else {
                classes += 'border-white/5 opacity-40';
              }
              return (
                <button key={i} className={classes} onClick={() => handleSelect(i)}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      showExplanation && isCorrect
                        ? 'bg-green-500/20 text-green-300'
                        : showExplanation && isSelected && !isCorrect
                        ? 'bg-red-500/20 text-red-300'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {showExplanation && isCorrect ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {showExplanation && (
          <div className="bg-gradient-to-r from-amber-950/30 to-orange-950/20 rounded-xl border border-amber-500/20 p-5 mb-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <p className="text-amber-200 text-sm leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <div className="flex justify-end">
            <Button
              onClick={handleNextQ}
              className="bg-blue-500 hover:bg-blue-600 gap-1 rounded-full px-6"
            >
              {currentQ < qs.length - 1
                ? (language === 'zh' ? '下一题' : 'Next Question')
                : (language === 'zh' ? '查看结果' : 'See Results')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
