import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Props {
  language: 'en' | 'zh';
}

const content = {
  zh: {
    toggle: '教师笔记',
    title: '关于本实验室',
    paragraphs: [
      '本"摩擦力实验室"是一个原创的多屏互动学习体验，借鉴了 PhET Interactive Simulations (科罗拉多大学博尔德分校) 的教育理念和模拟设计思路。',
      'PhET 的摩擦力模拟让学生通过拖动两本书来观察原子振动和温度变化。我们在此基础上增加了故事引入、预测环节、知识挑战和反思总结，形成了完整的"探究式学习"闭环。',
      '我们鼓励学生在完成数字模拟后，进行配套的动手实验（如"摩擦力大比拼"），将虚拟体验与真实触感相结合。',
    ],
    viewOriginal: '查看原版 PhET 模拟',
    credit: '致谢：PhET Interactive Simulations, University of Colorado Boulder',
    creditUrl: 'https://phet.colorado.edu',
  },
  en: {
    toggle: "Teacher's Note",
    title: 'About This Lab',
    paragraphs: [
      'This "Friction Lab" is an original multi-screen interactive learning experience, inspired by the pedagogical concepts and simulation design of PhET Interactive Simulations (University of Colorado Boulder).',
      "PhET's friction simulation lets students drag two books together to observe atomic vibration and temperature changes. We've built upon this foundation by adding story-based introduction, prediction activities, knowledge challenges, and reflection — creating a complete inquiry-based learning loop.",
      'We encourage students to follow the digital simulation with paired hands-on experiments (like the "Friction Challenge"), bridging virtual experiences with real-world tangible activities.',
    ],
    viewOriginal: 'View Original PhET Simulation',
    credit: 'Credit: PhET Interactive Simulations, University of Colorado Boulder',
    creditUrl: 'https://phet.colorado.edu',
  },
};

export function TeacherNote({ language }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const c = content[language];

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-300 hover:bg-violet-500/15 transition-all text-sm w-full justify-between"
      >
        <div className="flex items-center gap-2">
          <GraduationCap className="h-4 w-4" />
          <span className="font-medium">{c.toggle}</span>
        </div>
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {isOpen && (
        <div className="mt-3 bg-violet-950/20 border border-violet-500/10 rounded-xl p-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <h4 className="text-sm font-semibold text-violet-300 mb-3">{c.title}</h4>
          <div className="space-y-3">
            {c.paragraphs.map((p, i) => (
              <p key={i} className="text-xs text-muted-foreground leading-relaxed">{p}</p>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-violet-500/10 flex flex-col gap-2">
            <a
              href={c.creditUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-violet-400/60 hover:text-violet-400 transition-colors"
            >
              {c.credit}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
