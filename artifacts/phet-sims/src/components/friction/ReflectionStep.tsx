import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Volume2, Hammer, BookOpen, Lightbulb } from 'lucide-react';
import { Link } from 'wouter';
const handsOnImg = `${import.meta.env.BASE_URL}images/friction-handson.png`;

interface Props {
  language: 'en' | 'zh';
  speakText: (text: string) => void;
  onPrev: () => void;
}

const content = {
  zh: {
    title: '你学到了什么？',
    subtitle: '让我们回顾今天的发现',
    keyFindings: [
      {
        icon: '1',
        title: '摩擦产生热',
        desc: '两个表面互相摩擦时，表面的原子发生碰撞，碰撞产生热能——这就是搓手变热的原因！',
      },
      {
        icon: '2',
        title: '表面越粗糙，摩擦力越大',
        desc: '砂纸比冰面产生更多摩擦力，因为粗糙表面有更多凹凸不平的地方，原子碰撞更多。',
      },
      {
        icon: '3',
        title: '速度越快，热量越多',
        desc: '搓得越快，原子碰撞越剧烈，产生的热量也越多，温度升得越快。',
      },
    ],
    handsOn: {
      title: '动手项目：摩擦力大比拼',
      desc: '现在轮到你亲手验证了！用一块小木块和橡皮筋在不同表面上拖动，看看哪个表面摩擦力最大。',
      materials: '材料：小木块、橡皮筋、不同表面（桌面、砂纸、毛巾）',
      cost: '成本：约1元',
      time: '时间：20分钟',
    },
    scienceJournal: {
      title: '科学日志',
      prompt: '用2-3句话写下你今天学到的关于摩擦力的知识：',
      placeholder: '今天我学到了……\n摩擦力是……\n让我最惊讶的是……',
    },
    vocabTitle: '科学词汇卡',
    vocab: [
      { word: '摩擦力', pinyin: 'm\u00F3 c\u0101 l\u00EC', english: 'friction', def: '两个接触表面之间阻碍运动的力' },
      { word: '热能', pinyin: 'r\u00E8 n\u00E9ng', english: 'thermal energy', def: '物体内部粒子运动产生的能量' },
      { word: '原子', pinyin: 'yu\u00E1n z\u01D0', english: 'atom', def: '构成物质的最小粒子' },
      { word: '粗糙', pinyin: 'c\u016B c\u0101o', english: 'rough', def: '表面不光滑，有凹凸不平' },
    ],
    backHome: '返回首页',
    backSim: '重新模拟',
    listenSummary: '听总结',
  },
  en: {
    title: 'What Did You Learn?',
    subtitle: "Let's review today's discoveries",
    keyFindings: [
      {
        icon: '1',
        title: 'Friction Produces Heat',
        desc: 'When two surfaces rub together, atoms on the surfaces collide, and these collisions produce thermal energy — that\'s why rubbing your hands warms them up!',
      },
      {
        icon: '2',
        title: 'Rougher Surfaces = More Friction',
        desc: 'Sandpaper creates more friction than ice because rough surfaces have more bumps, causing more atomic collisions.',
      },
      {
        icon: '3',
        title: 'Faster Speed = More Heat',
        desc: 'Rubbing faster means more intense atomic collisions, producing more heat and a faster temperature rise.',
      },
    ],
    handsOn: {
      title: 'Hands-On Project: Friction Challenge',
      desc: 'Now it\'s your turn to test it for real! Drag a small wooden block with a rubber band across different surfaces and see which has the most friction.',
      materials: 'Materials: Wooden block, rubber band, different surfaces (desk, sandpaper, towel)',
      cost: 'Cost: About 1 RMB',
      time: 'Time: 20 minutes',
    },
    scienceJournal: {
      title: 'Science Journal',
      prompt: 'Write 2-3 sentences about what you learned about friction today:',
      placeholder: 'Today I learned...\nFriction is...\nWhat surprised me most was...',
    },
    vocabTitle: 'Science Vocabulary Cards',
    vocab: [
      { word: 'Friction', pinyin: 'm\u00F3 c\u0101 l\u00EC', english: 'friction', def: 'A force between two touching surfaces that resists motion' },
      { word: 'Thermal Energy', pinyin: 'r\u00E8 n\u00E9ng', english: 'thermal energy', def: 'Energy from the movement of particles inside an object' },
      { word: 'Atom', pinyin: 'yu\u00E1n z\u01D0', english: 'atom', def: 'The smallest particle that makes up matter' },
      { word: 'Rough', pinyin: 'c\u016B c\u0101o', english: 'rough', def: 'A surface that is not smooth, with bumps and grooves' },
    ],
    backHome: 'Back to Home',
    backSim: 'Try Again',
    listenSummary: 'Listen to Summary',
  },
};

export function ReflectionStep({ language, speakText, onPrev }: Props) {
  const c = content[language];
  const [journalText, setJournalText] = useState('');

  const handleListen = () => {
    const text = c.keyFindings.map(f => `${f.title}. ${f.desc}`).join(' ');
    speakText(text);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {c.title}
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </div>

        <div className="space-y-4 mb-8">
          {c.keyFindings.map((f, i) => (
            <div
              key={i}
              className="flex gap-4 p-5 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5 transition-all hover:border-white/10"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shrink-0">
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-center mt-2">
            <Button variant="ghost" size="sm" onClick={handleListen} className="text-purple-400 gap-2">
              <Volume2 className="h-4 w-4" />
              {c.listenSummary}
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-950/30 to-amber-950/20 rounded-2xl border border-orange-500/10 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Hammer className="h-5 w-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-orange-300">{c.handsOn.title}</h3>
          </div>
          <div className="mb-4 rounded-xl overflow-hidden">
            <img
              src={handsOnImg}
              alt={language === 'zh' ? '摩擦力动手实验' : 'Hands-on friction experiment'}
              className="w-full h-36 object-cover"
            />
          </div>
          <p className="text-sm text-gray-300 leading-relaxed mb-4">{c.handsOn.desc}</p>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-black/20 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">{language === 'zh' ? '\u6750\u6599' : 'Materials'}</p>
              <p className="text-xs text-orange-200">{language === 'zh' ? '\u6728\u5757+\u6A61\u76AE\u7B4B' : 'Block + Band'}</p>
            </div>
            <div className="bg-black/20 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">{language === 'zh' ? '\u6210\u672C' : 'Cost'}</p>
              <p className="text-xs text-orange-200">{language === 'zh' ? '\u22481\u5143' : '~1 RMB'}</p>
            </div>
            <div className="bg-black/20 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-muted-foreground">{language === 'zh' ? '\u65F6\u95F4' : 'Time'}</p>
              <p className="text-xs text-orange-200">20min</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/20 rounded-2xl border border-blue-500/10 p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-300">{c.scienceJournal.title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">{c.scienceJournal.prompt}</p>
          <textarea
            value={journalText}
            onChange={e => setJournalText(e.target.value)}
            placeholder={c.scienceJournal.placeholder}
            className="w-full h-32 bg-black/30 border border-blue-500/20 rounded-xl p-4 text-sm text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-blue-400/40"
          />
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-300">{c.vocabTitle}</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {c.vocab.map((v, i) => (
              <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5 hover:border-green-500/20 transition-all">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-lg font-bold text-white">{v.word}</span>
                  <span className="text-xs text-green-400">{v.english}</span>
                </div>
                {language === 'zh' && (
                  <p className="text-xs text-muted-foreground mb-1">{v.pinyin}</p>
                )}
                <p className="text-xs text-muted-foreground">{v.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onPrev} className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            {c.backSim}
          </Button>
          <Link href="/">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white gap-2 px-8 rounded-full"
            >
              {c.backHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
