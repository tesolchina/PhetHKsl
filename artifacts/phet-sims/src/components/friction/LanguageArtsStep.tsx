import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, BookOpen, Globe, Music, Volume2, Pen, Check } from 'lucide-react';

interface Props {
  language: 'en' | 'zh';
  speakText: (text: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const vocabWords = [
  { zh: '摩擦力', pinyin: 'mo ca li', en: 'friction', sentence_zh: '摩擦力让我的手变热了。', sentence_en: 'Friction made my hands warm.' },
  { zh: '热能', pinyin: 'r\u00E8 n\u00E9ng', en: 'heat energy', sentence_zh: '摩擦产生了热能。', sentence_en: 'Friction produces heat energy.' },
  { zh: '原子', pinyin: 'yu\u00E1n z\u01D0', en: 'atom', sentence_zh: '原子碰撞会产生热量。', sentence_en: 'Atoms collide and produce heat.' },
  { zh: '粗糙', pinyin: 'c\u016B c\u0101o', en: 'rough', sentence_zh: '砂纸的表面很粗糙。', sentence_en: 'The surface of sandpaper is rough.' },
  { zh: '光滑', pinyin: 'gu\u0101ng hu\u00E1', en: 'smooth', sentence_zh: '冰面非常光滑。', sentence_en: 'The ice surface is very smooth.' },
  { zh: '温度', pinyin: 'w\u0113n d\u00F9', en: 'temperature', sentence_zh: '搓手后温度升高了。', sentence_en: 'The temperature rose after rubbing.' },
];

const songLyrics = {
  zh: {
    title: '摩擦力之歌',
    subtitle: '用英语唱出科学知识',
    lines: [
      { en: 'Rub, rub, rub your hands,', zh: '搓搓搓你的手，' },
      { en: 'Feel the friction heat!', zh: '感受摩擦的热！' },
      { en: 'Atoms bump and atoms shake,', zh: '原子碰撞原子抖，' },
      { en: 'Making warmth so sweet!', zh: '暖暖的真舒服！' },
      { en: '', zh: '' },
      { en: 'Rough, rough, rough the road,', zh: '粗糙粗糙路面粗，' },
      { en: 'Friction slows you down!', zh: '摩擦力让你慢！' },
      { en: 'Smooth, smooth, smooth the ice,', zh: '光滑光滑冰面滑，' },
      { en: 'You slide across the ground!', zh: '你在地上滑！' },
    ],
    melody: '(Tune: Row Row Row Your Boat)',
  },
  en: {
    title: 'The Friction Song',
    subtitle: 'Learn science words through singing',
    lines: [
      { en: 'Rub, rub, rub your hands,', zh: '搓搓搓你的手，' },
      { en: 'Feel the friction heat!', zh: '感受摩擦的热！' },
      { en: 'Atoms bump and atoms shake,', zh: '原子碰撞原子抖，' },
      { en: 'Making warmth so sweet!', zh: '暖暖的真舒服！' },
      { en: '', zh: '' },
      { en: 'Rough, rough, rough the road,', zh: '粗糙粗糙路面粗，' },
      { en: 'Friction slows you down!', zh: '摩擦力让你慢！' },
      { en: 'Smooth, smooth, smooth the ice,', zh: '光滑光滑冰面滑，' },
      { en: 'You slide across the ground!', zh: '你在地上滑！' },
    ],
    melody: '(Tune: Row Row Row Your Boat)',
  },
};

const writingPrompts = {
  zh: {
    title: '科学小作文',
    subtitle: '用你学到的知识写一段话',
    template: '今天我学到了关于摩擦力的知识。摩擦力是______。当两个表面互相摩擦时，______。表面越粗糙，______。我做了一个实验：______。我发现______。',
    tips: [
      '先写你观察到了什么（现象）',
      '再写你觉得为什么会这样（原因）',
      '最后写你的结论（总结）',
    ],
    templateLabel: '填空模板',
    freeWriteLabel: '自由写作',
    placeholder: '请在这里写下你的科学发现……\n\n提示：可以用"首先……然后……最后……"来组织你的文字。',
  },
  en: {
    title: 'Science Writing',
    subtitle: 'Write a paragraph about what you learned',
    template: 'Today I learned about friction. Friction is ______. When two surfaces rub together, ______. The rougher the surface, ______. I did an experiment: ______. I discovered ______.',
    tips: [
      'First, write what you observed (phenomenon)',
      'Then, write why you think it happened (reason)',
      'Finally, write your conclusion (summary)',
    ],
    templateLabel: 'Fill-in Template',
    freeWriteLabel: 'Free Writing',
    placeholder: 'Write about your science discovery here...\n\nTip: Use "First... Then... Finally..." to organize your writing.',
  },
};

type Tab = 'writing' | 'vocab' | 'song';

export function LanguageArtsStep({ language, speakText, onNext, onPrev }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('writing');
  const [writingText, setWritingText] = useState('');
  const [writingMode, setWritingMode] = useState<'template' | 'free'>('template');
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [completedSections, setCompletedSections] = useState<Set<Tab>>(new Set());

  const w = writingPrompts[language];
  const s = songLyrics[language];

  const toggleCard = (idx: number) => {
    const next = new Set(flippedCards);
    if (next.has(idx)) next.delete(idx);
    else next.add(idx);
    setFlippedCards(next);
    if (next.size >= 3 && !completedSections.has('vocab')) {
      setCompletedSections(prev => new Set(prev).add('vocab'));
    }
  };

  const markComplete = (tab: Tab) => {
    setCompletedSections(prev => new Set(prev).add(tab));
  };

  const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
    { id: 'writing', label: language === 'zh' ? '语文写作' : 'Writing', icon: Pen },
    { id: 'vocab', label: language === 'zh' ? '英语词汇' : 'English Vocab', icon: Globe },
    { id: 'song', label: language === 'zh' ? '英语歌曲' : 'English Song', icon: Music },
  ];

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-green-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
            {language === 'zh' ? '语文与英语' : 'Language Arts & English'}
          </h2>
          <p className="text-muted-foreground text-sm">
            {language === 'zh' ? '用文字和语言表达你的科学发现' : 'Express your scientific discoveries through language'}
          </p>
        </div>

        <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isComplete = completedSections.has(tab.id);
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                }`}
              >
                {isComplete ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Icon className="h-3.5 w-3.5" />}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'writing' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-950/30 to-teal-950/20 rounded-2xl border border-green-500/10 p-6">
              <div className="flex items-center gap-2 mb-2">
                <Pen className="h-5 w-5 text-green-400" />
                <h3 className="text-lg font-semibold text-green-300">{w.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{w.subtitle}</p>

              <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4 mb-4">
                <p className="text-xs font-medium text-green-400 mb-2">
                  {language === 'zh' ? '写作三步法：' : 'Three-step writing:'}
                </p>
                <div className="flex gap-2">
                  {w.tips.map((tip, i) => (
                    <div key={i} className="flex-1 bg-black/20 rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-green-400 mb-1">{i + 1}</div>
                      <p className="text-[10px] text-muted-foreground leading-tight">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 mb-3">
                <button
                  onClick={() => setWritingMode('template')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    writingMode === 'template' ? 'bg-green-500/20 text-green-300' : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  {w.templateLabel}
                </button>
                <button
                  onClick={() => setWritingMode('free')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    writingMode === 'free' ? 'bg-green-500/20 text-green-300' : 'bg-white/5 text-muted-foreground'
                  }`}
                >
                  {w.freeWriteLabel}
                </button>
              </div>

              {writingMode === 'template' ? (
                <div className="bg-black/30 border border-green-500/10 rounded-xl p-4">
                  <p className="text-sm text-gray-300 leading-[2.2] whitespace-pre-line">{w.template}</p>
                </div>
              ) : (
                <textarea
                  value={writingText}
                  onChange={e => {
                    setWritingText(e.target.value);
                    if (e.target.value.length > 20) markComplete('writing');
                  }}
                  placeholder={w.placeholder}
                  className="w-full h-40 bg-black/30 border border-green-500/10 rounded-xl p-4 text-sm text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-green-400/40"
                />
              )}
            </div>
          </div>
        )}

        {activeTab === 'vocab' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center mb-2">
              {language === 'zh' ? '点击卡片翻转，学习英语科学词汇' : 'Click cards to flip and learn science vocabulary'}
            </p>
            <div className="grid grid-cols-2 gap-3">
              {vocabWords.map((word, i) => {
                const isFlipped = flippedCards.has(i);
                return (
                  <button
                    key={i}
                    onClick={() => toggleCard(i)}
                    className="relative h-36 rounded-xl border border-blue-500/10 overflow-hidden transition-all hover:border-blue-400/30 hover:shadow-lg hover:shadow-blue-500/5 text-left"
                  >
                    <div className={`absolute inset-0 p-4 flex flex-col justify-between transition-all duration-500 ${
                      isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'
                    }`}
                      style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(6,182,212,0.05))' }}
                    >
                      <div>
                        <p className="text-2xl font-bold text-white">{word.zh}</p>
                        <p className="text-xs text-blue-400 mt-1">{word.pinyin}</p>
                      </div>
                      <p className="text-[10px] text-muted-foreground">
                        {language === 'zh' ? '点击查看英文' : 'Click to see English'}
                      </p>
                    </div>
                    <div className={`absolute inset-0 p-4 flex flex-col justify-between transition-all duration-500 ${
                      isFlipped ? 'opacity-100' : 'opacity-0'
                    }`}
                      style={{ backfaceVisibility: 'hidden', background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.05))' }}
                    >
                      <div>
                        <p className="text-xl font-bold text-green-300">{word.en}</p>
                        <p className="text-xs text-muted-foreground mt-1">{word.zh} ({word.pinyin})</p>
                      </div>
                      <p className="text-xs text-gray-400 italic leading-tight">{word.sentence_en}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'song' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-indigo-950/30 to-purple-950/20 rounded-2xl border border-indigo-500/10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-indigo-400" />
                  <h3 className="text-lg font-semibold text-indigo-300">{s.title}</h3>
                </div>
                <span className="text-xs text-muted-foreground">{s.melody}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{s.subtitle}</p>

              <div className="bg-black/30 rounded-xl p-5 space-y-2">
                {s.lines.map((line, i) => (
                  line.en === '' ? (
                    <div key={i} className="h-3" />
                  ) : (
                    <div key={i} className="flex gap-3 py-1 group hover:bg-white/5 rounded-lg px-2 -mx-2 transition-colors">
                      <p className="flex-1 text-base font-medium text-indigo-200">{line.en}</p>
                      <p className="flex-1 text-sm text-muted-foreground">{line.zh}</p>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const text = s.lines.filter(l => l.en).map(l => l.en).join('. ');
                    speakText(text);
                    markComplete('song');
                  }}
                  className="gap-2 border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10"
                >
                  <Volume2 className="h-3.5 w-3.5" />
                  {language === 'zh' ? '听英文朗读' : 'Listen to English'}
                </Button>
              </div>

              <div className="mt-4 bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-3">
                <p className="text-xs text-indigo-300 font-medium mb-1">
                  {language === 'zh' ? '歌词中的重点单词：' : 'Key words in the song:'}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {['friction', 'heat', 'atoms', 'rough', 'smooth', 'slide'].map(word => (
                    <span key={word} className="px-2.5 py-1 bg-indigo-500/10 rounded-md text-xs text-indigo-300 font-medium">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <Button variant="ghost" size="sm" onClick={onPrev} className="gap-1 text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            {language === 'zh' ? '回到挑战' : 'Back'}
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 gap-1 rounded-full px-6"
            onClick={onNext}
          >
            {language === 'zh' ? '动手实验' : 'Hands-On'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
