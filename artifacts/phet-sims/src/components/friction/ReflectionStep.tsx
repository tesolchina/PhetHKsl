import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Volume2, BookOpen, Lightbulb, Trophy } from 'lucide-react';
import { Link } from 'wouter';

interface Props {
  language: 'en' | 'zh';
  speakText: (text: string) => void;
  onPrev: () => void;
}

const content = {
  zh: {
    title: '总结与反思',
    subtitle: '回顾你今天的学习旅程',
    journey: [
      { step: '故事', desc: '小明搓手取暖，发现摩擦生热' },
      { step: '预测', desc: '预测摩擦力的效果' },
      { step: '模拟', desc: '拖动木块，观察原子碰撞产生热量' },
      { step: '挑战', desc: '回答问题巩固知识' },
      { step: '读写', desc: '用中英文表达科学发现' },
      { step: '动手', desc: '亲手验证摩擦力' },
    ],
    keyFindings: [
      { title: '摩擦产生热', desc: '两个表面互相摩擦时，原子碰撞产生热能——搓手变热的原因！' },
      { title: '粗糙 = 摩擦力大', desc: '砂纸比冰面产生更多摩擦力，因为粗糙表面原子碰撞更多。' },
      { title: '速度快 = 热量多', desc: '搓得越快，原子碰撞越剧烈，温度升得越快。' },
    ],
    journalTitle: '科学日志',
    journalPrompt: '写下你最大的发现和还想知道的问题：',
    journalPlaceholder: '今天我最大的发现是……\n我还想知道……\n下次我想试试……',
    selfCheck: '自我评价',
    selfCheckItems: [
      '我能解释摩擦力是怎么产生热量的',
      '我能说出表面粗糙度如何影响摩擦力',
      '我能用中文和英文说出"摩擦力"等科学词汇',
      '我完成了动手实验并记录了结果',
    ],
    curriculum: '课标对应：义务教育科学课程标准（2022） > 物质科学 > 力的作用',
    backHome: '返回首页',
    backPrev: '上一步',
    listenSummary: '听总结',
  },
  en: {
    title: 'Summary & Reflection',
    subtitle: "Review your learning journey today",
    journey: [
      { step: 'Story', desc: 'Xiao Ming rubbed his hands and discovered friction creates heat' },
      { step: 'Predict', desc: 'Predicted the effects of friction' },
      { step: 'Simulate', desc: 'Dragged a block and observed atoms colliding to produce heat' },
      { step: 'Challenge', desc: 'Answered questions to reinforce knowledge' },
      { step: 'Language', desc: 'Expressed scientific discoveries in Chinese and English' },
      { step: 'Hands-On', desc: 'Verified friction through physical experiments' },
    ],
    keyFindings: [
      { title: 'Friction Produces Heat', desc: 'When surfaces rub together, atoms collide and produce thermal energy!' },
      { title: 'Rougher = More Friction', desc: 'Sandpaper creates more friction than ice due to more atomic collisions.' },
      { title: 'Faster = More Heat', desc: 'Rubbing faster means more intense collisions and faster temperature rise.' },
    ],
    journalTitle: 'Science Journal',
    journalPrompt: 'Write about your biggest discovery and questions you still have:',
    journalPlaceholder: 'My biggest discovery today was...\nI still want to know...\nNext time I want to try...',
    selfCheck: 'Self-Assessment',
    selfCheckItems: [
      'I can explain how friction produces heat',
      'I can describe how surface roughness affects friction',
      'I can say science vocabulary in both Chinese and English',
      'I completed the hands-on experiment and recorded results',
    ],
    curriculum: 'Curriculum: Compulsory Education Science Standards (2022) > Physical Science > Forces',
    backHome: 'Back to Home',
    backPrev: 'Previous',
    listenSummary: 'Listen to Summary',
  },
};

export function ReflectionStep({ language, speakText, onPrev }: Props) {
  const c = content[language];
  const [journalText, setJournalText] = useState('');
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggleCheck = (i: number) => {
    const n = new Set(checked);
    if (n.has(i)) n.delete(i); else n.add(i);
    setChecked(n);
  };

  const handleListen = () => {
    const text = c.keyFindings.map(f => `${f.title}. ${f.desc}`).join(' ');
    speakText(text);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            {c.title}
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/5 p-5 mb-6">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            {language === 'zh' ? '学习旅程' : 'Learning Journey'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {c.journey.map((j, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
                <span className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[9px] text-white font-bold shrink-0">
                  {i + 1}
                </span>
                <div>
                  <p className="text-xs font-medium text-white">{j.step}</p>
                  <p className="text-[10px] text-muted-foreground">{j.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {c.keyFindings.map((f, i) => (
            <div key={i} className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border border-white/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shrink-0">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
          <div className="flex justify-center">
            <Button variant="ghost" size="sm" onClick={handleListen} className="text-purple-400 gap-2 text-xs">
              <Volume2 className="h-3.5 w-3.5" />
              {c.listenSummary}
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-950/30 to-cyan-950/20 rounded-2xl border border-blue-500/10 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-4 w-4 text-blue-400" />
            <h3 className="text-base font-semibold text-blue-300">{c.journalTitle}</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{c.journalPrompt}</p>
          <textarea
            value={journalText}
            onChange={e => setJournalText(e.target.value)}
            placeholder={c.journalPlaceholder}
            className="w-full h-28 bg-black/30 border border-blue-500/20 rounded-xl p-4 text-sm text-white placeholder:text-white/20 resize-none focus:outline-none focus:border-blue-400/40"
          />
        </div>

        <div className="bg-gradient-to-br from-green-950/30 to-emerald-950/20 rounded-2xl border border-green-500/10 p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="h-4 w-4 text-green-400" />
            <h3 className="text-base font-semibold text-green-300">{c.selfCheck}</h3>
          </div>
          <div className="space-y-2">
            {c.selfCheckItems.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left text-sm transition-all ${
                  checked.has(i) ? 'bg-green-500/10 text-green-200' : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                }`}
              >
                <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 text-xs transition-all ${
                  checked.has(i) ? 'bg-green-500/30 text-green-300' : 'bg-white/10'
                }`}>
                  {checked.has(i) ? '\u2713' : ''}
                </div>
                {item}
              </button>
            ))}
          </div>
          {checked.size === c.selfCheckItems.length && (
            <div className="mt-3 text-center p-3 bg-green-500/10 rounded-lg animate-in fade-in">
              <p className="text-green-300 font-semibold text-sm">
                {language === 'zh' ? '太棒了！你完成了所有学习目标！' : 'Amazing! You completed all learning goals!'}
              </p>
            </div>
          )}
        </div>

        <p className="text-center text-[10px] text-muted-foreground mb-6">{c.curriculum}</p>

        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={onPrev} className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            {c.backPrev}
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
