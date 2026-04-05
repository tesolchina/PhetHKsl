import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Star, Check, X } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;

interface Props {
  language: 'en' | 'zh';
  onNext: () => void;
  onPrev: () => void;
}

interface Challenge {
  question: string;
  image?: string;
  imageAlt?: string;
  type: 'rank' | 'truefalse';
  items?: string[];
  correctOrder?: number[];
  statement?: string;
  isTrue?: boolean;
  explanation: string;
}

const challenges: Record<'zh' | 'en', Challenge[]> = {
  zh: [
    {
      question: '把这些表面按摩擦力从小到大排列：',
      image: `${BASE}images/quiz-rank-surfaces.png`,
      imageAlt: '冰面、木头、砂纸三种表面',
      type: 'rank',
      items: ['冰面', '木头', '砂纸'],
      correctOrder: [0, 1, 2],
      explanation: '冰面最光滑（摩擦力最小），砂纸最粗糙（摩擦力最大），木头在中间。表面越粗糙，原子之间的碰撞越多！',
    },
    {
      question: '判断对错：',
      image: `${BASE}images/quiz-rub-desk.png`,
      imageAlt: '搓手产生热量',
      type: 'truefalse',
      statement: '搓手的时候手会变热，这是因为摩擦产生了热量',
      isTrue: true,
      explanation: '正确！当两个表面互相摩擦时，表面的微小粒子（原子）互相碰撞，碰撞产生了热能，所以手会变热。',
    },
    {
      question: '判断对错：',
      image: `${BASE}images/quiz-surfaces.png`,
      imageAlt: '光滑和粗糙表面',
      type: 'truefalse',
      statement: '在冰面上滑动比在砂纸上滑动会产生更多的热量',
      isTrue: false,
      explanation: '错误！砂纸更粗糙，摩擦力更大，产生的热量更多。冰面很光滑，摩擦力小，产生的热量很少。',
    },
    {
      question: '判断对错：',
      image: `${BASE}images/quiz-speed.png`,
      imageAlt: '不同速度搓手',
      type: 'truefalse',
      statement: '搓得越快，产生的热量越多',
      isTrue: true,
      explanation: '正确！速度越快，原子碰撞越剧烈、越频繁，产生的热能越多，温度上升越快。',
    },
  ],
  en: [
    {
      question: 'Rank these surfaces from least to most friction:',
      image: `${BASE}images/quiz-rank-surfaces.png`,
      imageAlt: 'Ice, wood, and sandpaper surfaces',
      type: 'rank',
      items: ['Ice', 'Wood', 'Sandpaper'],
      correctOrder: [0, 1, 2],
      explanation: 'Ice is the smoothest (least friction), sandpaper is the roughest (most friction), and wood is in between. Rougher surfaces cause more atomic collisions!',
    },
    {
      question: 'True or False:',
      image: `${BASE}images/quiz-rub-desk.png`,
      imageAlt: 'Rubbing hands together',
      type: 'truefalse',
      statement: 'When you rub your hands together they get warm because friction produces heat',
      isTrue: true,
      explanation: 'Correct! When two surfaces rub together, tiny particles (atoms) on the surfaces collide, and these collisions produce thermal energy, making your hands warm.',
    },
    {
      question: 'True or False:',
      image: `${BASE}images/quiz-surfaces.png`,
      imageAlt: 'Smooth vs rough surfaces',
      type: 'truefalse',
      statement: 'Sliding on ice produces more heat than sliding on sandpaper',
      isTrue: false,
      explanation: 'False! Sandpaper is rougher with more friction, so it produces more heat. Ice is smooth with little friction, producing very little heat.',
    },
    {
      question: 'True or False:',
      image: `${BASE}images/quiz-speed.png`,
      imageAlt: 'Different rubbing speeds',
      type: 'truefalse',
      statement: 'Rubbing faster produces more heat',
      isTrue: true,
      explanation: 'Correct! Higher speed means more intense and frequent atomic collisions, producing more thermal energy and a faster temperature rise.',
    },
  ],
};

export function ChallengeStep({ language, onNext, onPrev }: Props) {
  const ch = challenges[language];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [rankOrder, setRankOrder] = useState<number[]>([]);

  const current = ch[currentIdx];

  const handleTrueFalse = (answer: boolean) => {
    if (answered) return;
    setSelectedAnswer(answer);
    const correct = answer === current.isTrue;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setAnswered(true);
  };

  const handleNext = () => {
    if (currentIdx < ch.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setAnswered(false);
      setIsCorrect(false);
      setSelectedAnswer(null);
      setRankOrder([]);
    } else {
      setFinished(true);
    }
  };

  const handleRankSelect = (idx: number) => {
    if (answered) return;
    if (rankOrder.includes(idx)) {
      setRankOrder(rankOrder.filter(i => i !== idx));
    } else {
      const newOrder = [...rankOrder, idx];
      setRankOrder(newOrder);
      if (newOrder.length === current.items!.length) {
        const correct = newOrder.every((v, i) => v === current.correctOrder![i]);
        setIsCorrect(correct);
        if (correct) setScore(s => s + 1);
        setAnswered(true);
      }
    }
  };

  if (finished) {
    const stars = score >= ch.length ? 3 : score >= ch.length * 0.6 ? 2 : 1;
    return (
      <div className="flex flex-col items-center">
        <div className="w-full max-w-xl text-center">
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3].map(i => (
              <Star
                key={i}
                className={`h-12 w-12 transition-all duration-500 ${
                  i <= stars ? 'text-yellow-400 fill-yellow-400 scale-110' : 'text-gray-600'
                }`}
              />
            ))}
          </div>
          <h2 className="text-3xl font-bold mb-3">
            {language === 'zh' ? '挑战完成！' : 'Challenge Complete!'}
          </h2>
          <p className="text-xl text-muted-foreground mb-2">
            {language === 'zh'
              ? `得分：${score} / ${ch.length}`
              : `Score: ${score} / ${ch.length}`}
          </p>
          <p className="text-muted-foreground mb-8">
            {score === ch.length
              ? (language === 'zh' ? '太棒了！你已经完全掌握了摩擦力的知识！' : 'Amazing! You\'ve mastered friction!')
              : (language === 'zh' ? '做得不错！让我们继续学习。' : 'Good job! Let\'s keep learning.')}
          </p>
          <div className="flex justify-center gap-3">
            <Button variant="outline" onClick={onPrev} className="gap-1">
              <ChevronLeft className="h-4 w-4" />
              {language === 'zh' ? '回到模拟' : 'Back to Sim'}
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white gap-2 px-8 rounded-full"
              onClick={onNext}
            >
              {language === 'zh' ? '语文与英语' : 'Language Arts'}
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
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {language === 'zh' ? '知识挑战' : 'Knowledge Challenge'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {language === 'zh'
              ? `第 ${currentIdx + 1} / ${ch.length} 题 | 得分：${score}`
              : `Question ${currentIdx + 1} of ${ch.length} | Score: ${score}`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-950/30 to-pink-950/20 rounded-2xl border border-purple-500/10 p-6">
          {current.image && (
            <div className="mb-4 rounded-xl overflow-hidden">
              <img
                src={current.image}
                alt={current.imageAlt || ''}
                className="w-full h-36 object-cover"
              />
            </div>
          )}

          <h3 className="text-lg font-semibold mb-2 text-purple-100">{current.question}</h3>

          {current.type === 'truefalse' && (
            <>
              <p className="text-xl text-white mb-6 leading-relaxed">"{current.statement}"</p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleTrueFalse(true)}
                  className={`flex-1 py-4 rounded-xl border-2 font-semibold text-lg transition-all ${
                    answered && current.isTrue
                      ? 'border-green-500 bg-green-500/10 text-green-300'
                      : answered && selectedAnswer === true && !current.isTrue
                      ? 'border-red-500 bg-red-500/10 text-red-300'
                      : 'border-white/10 hover:border-green-400/40 hover:bg-green-500/5'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {answered && current.isTrue && <Check className="h-5 w-5" />}
                    {answered && selectedAnswer === true && !current.isTrue && <X className="h-5 w-5" />}
                    {language === 'zh' ? '对' : 'True'}
                  </div>
                </button>
                <button
                  onClick={() => handleTrueFalse(false)}
                  className={`flex-1 py-4 rounded-xl border-2 font-semibold text-lg transition-all ${
                    answered && !current.isTrue
                      ? 'border-green-500 bg-green-500/10 text-green-300'
                      : answered && selectedAnswer === false && current.isTrue
                      ? 'border-red-500 bg-red-500/10 text-red-300'
                      : 'border-white/10 hover:border-red-400/40 hover:bg-red-500/5'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {answered && !current.isTrue && <Check className="h-5 w-5" />}
                    {answered && selectedAnswer === false && current.isTrue && <X className="h-5 w-5" />}
                    {language === 'zh' ? '错' : 'False'}
                  </div>
                </button>
              </div>
            </>
          )}

          {current.type === 'rank' && current.items && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-4">
                {language === 'zh' ? '按顺序点击（从小到大）：' : 'Click in order (least to most):'}
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {current.items.map((item, i) => {
                  const orderIdx = rankOrder.indexOf(i);
                  const isSelected = orderIdx !== -1;
                  const isCorrectPos = answered && current.correctOrder![orderIdx] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleRankSelect(i)}
                      className={`px-6 py-3 rounded-xl border-2 font-medium text-base transition-all ${
                        answered && isCorrectPos
                          ? 'border-green-500 bg-green-500/10 text-green-300'
                          : answered && isSelected && !isCorrectPos
                          ? 'border-red-500 bg-red-500/10 text-red-300'
                          : isSelected
                          ? 'border-purple-500 bg-purple-500/10 text-purple-300'
                          : 'border-white/10 hover:border-purple-400/40'
                      }`}
                    >
                      {isSelected && (
                        <span className="text-xs mr-2 opacity-70">{orderIdx + 1}.</span>
                      )}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {answered && (
          <div className={`mt-4 rounded-xl border p-5 animate-in fade-in slide-in-from-bottom-2 duration-500 ${
            isCorrect
              ? 'bg-green-500/5 border-green-500/20'
              : 'bg-amber-500/5 border-amber-500/20'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                {isCorrect ? <Check className="h-4 w-4" /> : '!'}
              </div>
              <div>
                <p className={`font-semibold text-sm mb-1 ${isCorrect ? 'text-green-300' : 'text-amber-300'}`}>
                  {isCorrect
                    ? (language === 'zh' ? '回答正确！' : 'Correct!')
                    : (language === 'zh' ? '不太对哦' : 'Not quite')}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{current.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {answered && (
          <div className="flex justify-end mt-4">
            <Button
              onClick={handleNext}
              className="bg-purple-500 hover:bg-purple-600 gap-1 rounded-full px-6"
            >
              {currentIdx < ch.length - 1
                ? (language === 'zh' ? '下一题' : 'Next')
                : (language === 'zh' ? '查看结果' : 'See Results')}
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
