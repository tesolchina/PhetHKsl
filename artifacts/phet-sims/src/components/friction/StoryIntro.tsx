import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, Volume2 } from 'lucide-react';

const storyImg = `${import.meta.env.BASE_URL}images/friction-story.png`;

interface Props {
  language: 'en' | 'zh';
  speakText: (text: string) => void;
  onNext: () => void;
}

const content = {
  zh: {
    title: '搓搓手，暖暖手',
    subtitle: '一个关于摩擦力的小故事',
    paragraphs: [
      '冬天的早晨，小明在操场上冻得直哆嗦。',
      '他把两只手掌合在一起，快速地搓了起来。',
      '神奇的事情发生了——手掌变暖了！',
      '可是，热量是从哪里来的呢？',
      '让我们一起来探索"摩擦力"的秘密吧！',
    ],
    listen: '听故事',
    next: '我准备好了',
    hint: '试试搓搓你自己的双手，感受一下温度的变化！',
  },
  en: {
    title: 'Rub Your Hands, Warm Your Hands',
    subtitle: 'A Story About Friction',
    paragraphs: [
      'On a cold winter morning, Xiao Ming was shivering on the playground.',
      'He pressed his palms together and rubbed them quickly back and forth.',
      'Something magical happened - his palms felt warm!',
      'But where did the heat come from?',
      "Let's explore the secret of \"friction\" together!",
    ],
    listen: 'Listen',
    next: "I'm Ready",
    hint: 'Try rubbing your own hands together and feel the temperature change!',
  },
};

export function StoryIntro({ language, speakText, onNext }: Props) {
  const c = content[language];
  const [visibleParagraphs, setVisibleParagraphs] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setVisibleParagraphs(0);
    setShowHint(false);
    const timers: ReturnType<typeof setTimeout>[] = [];
    c.paragraphs.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleParagraphs(i + 1), 600 * (i + 1)));
    });
    timers.push(setTimeout(() => setShowHint(true), 600 * (c.paragraphs.length + 1)));
    return () => timers.forEach(clearTimeout);
  }, [language]);

  const handleListen = () => {
    speakText(c.paragraphs.join(''));
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
            {c.title}
          </h2>
          <p className="text-muted-foreground text-lg">{c.subtitle}</p>
        </div>

        <div className="mb-6 rounded-2xl overflow-hidden border border-orange-500/10 shadow-lg shadow-orange-500/5">
          <img
            src={storyImg}
            alt={language === 'zh' ? '小明在操场上搓手取暖' : 'Xiao Ming rubbing hands on the playground'}
            className="w-full h-48 object-cover"
          />
        </div>

        <div className="relative bg-gradient-to-br from-orange-950/30 via-red-950/20 to-transparent rounded-2xl border border-orange-500/10 p-8 mb-8">
          <div className="space-y-4">
            {c.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-lg leading-relaxed transition-all duration-700 ${
                  i < visibleParagraphs
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                } ${i === c.paragraphs.length - 1 ? 'text-orange-300 font-semibold' : 'text-gray-200'}`}
              >
                {p}
              </p>
            ))}
          </div>

          <div
            className={`mt-6 flex justify-center transition-all duration-500 ${
              showHint ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleListen}
              className="text-orange-400 hover:text-orange-300 gap-2"
            >
              <Volume2 className="h-4 w-4" />
              {c.listen}
            </Button>
          </div>
        </div>

        <div
          className={`text-center transition-all duration-700 ${
            showHint ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-block bg-amber-500/10 border border-amber-500/20 rounded-xl px-6 py-3 mb-8">
            <p className="text-amber-300 text-sm">{c.hint}</p>
          </div>

          <div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white gap-2 px-8 rounded-full shadow-lg shadow-orange-500/20"
              onClick={onNext}
            >
              {c.next}
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
