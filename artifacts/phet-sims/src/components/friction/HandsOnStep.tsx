import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, Hammer, Printer, CheckSquare } from 'lucide-react';

const BASE = import.meta.env.BASE_URL;
const handsOnImg = `${BASE}images/friction-handson.png`;

interface Props {
  language: 'en' | 'zh';
  onNext: () => void;
  onPrev: () => void;
}

const content = {
  zh: {
    title: '动手实验：摩擦力大比拼',
    subtitle: '现在轮到你亲手验证了！',
    intro: '你在模拟中看到了摩擦力如何让原子抖动、产生热量。现在用真实的材料来做一次实验，看看现实和模拟是不是一样！',
    materials: {
      title: '准备材料',
      items: [
        { name: '小木块 1 个', note: '可以用橡皮代替' },
        { name: '橡皮筋 1 根', note: '用来测量拉力' },
        { name: '光滑桌面', note: '教室课桌就可以' },
        { name: '砂纸 1 小片', note: '五金店几毛钱一片' },
        { name: '毛巾 1 条', note: '家里的毛巾即可' },
      ],
    },
    steps: [
      '用橡皮筋绑住小木块',
      '在光滑桌面上拉着木块滑动，观察橡皮筋拉长了多少厘米',
      '把砂纸铺在桌上，再拉一次——橡皮筋拉得更长了！',
      '换成毛巾铺在桌上，再试一次',
      '用手摸一摸滑动后的木块底部——感觉温度变化了吗？',
    ],
    record: {
      title: '实验记录表',
      headers: ['表面', '橡皮筋拉长(cm)', '木块底部温度感觉'],
      rows: ['光滑桌面', '砂纸', '毛巾'],
    },
    verify: '做完实验后，回到模拟中切换不同表面（木头/砂纸/冰面），看看模拟结果和你的实验是不是一致！',
    cost: '成本：约 1 元',
    time: '时间：约 20 分钟',
    curriculum: '课标对应：物质科学 > 力的作用 > 摩擦力（3-4年级）',
    next: '总结反思',
  },
  en: {
    title: 'Hands-On: Friction Challenge',
    subtitle: "Now it's your turn to test it for real!",
    intro: "You saw in the simulation how friction makes atoms vibrate and produce heat. Now use real materials to experiment and see if reality matches the simulation!",
    materials: {
      title: 'Prepare Materials',
      items: [
        { name: '1 small wooden block', note: 'An eraser works too' },
        { name: '1 rubber band', note: 'To measure pulling force' },
        { name: 'Smooth desk surface', note: 'Your classroom desk' },
        { name: '1 piece of sandpaper', note: 'A few cents at hardware store' },
        { name: '1 towel', note: 'Any towel from home' },
      ],
    },
    steps: [
      'Tie the rubber band around the wooden block',
      'Drag the block across the smooth desk — observe how many cm the rubber band stretches',
      'Put sandpaper on the desk and drag again — the rubber band stretches more!',
      'Replace sandpaper with a towel and try again',
      'Touch the bottom of the block after sliding — can you feel any temperature change?',
    ],
    record: {
      title: 'Experiment Record Sheet',
      headers: ['Surface', 'Band stretch (cm)', 'Block bottom temperature'],
      rows: ['Smooth desk', 'Sandpaper', 'Towel'],
    },
    verify: 'After the experiment, go back to the simulation and switch surfaces (wood/sandpaper/ice) to compare!',
    cost: 'Cost: ~1 RMB',
    time: 'Time: ~20 minutes',
    curriculum: 'Curriculum: Physical Science > Forces > Friction (Grade 3-4)',
    next: 'Reflect',
  },
};

export function HandsOnStep({ language, onNext, onPrev }: Props) {
  const c = content[language];
  const [checkedSteps, setCheckedSteps] = useState<Set<number>>(new Set());

  const toggleStep = (i: number) => {
    const next = new Set(checkedSteps);
    if (next.has(i)) next.delete(i);
    else next.add(i);
    setCheckedSteps(next);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
            {c.title}
          </h2>
          <p className="text-muted-foreground">{c.subtitle}</p>
        </div>

        <div className="mb-5 rounded-2xl overflow-hidden border border-orange-500/10">
          <img src={handsOnImg} alt={c.title} className="w-full h-44 object-cover" />
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-6">{c.intro}</p>

        <div className="flex gap-3 mb-6">
          <div className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">{language === 'zh' ? '成本' : 'Cost'}</p>
            <p className="text-sm font-semibold text-orange-300">{language === 'zh' ? '~1 元' : '~1 RMB'}</p>
          </div>
          <div className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">{language === 'zh' ? '时间' : 'Time'}</p>
            <p className="text-sm font-semibold text-orange-300">20 min</p>
          </div>
          <div className="flex-1 bg-orange-500/5 border border-orange-500/10 rounded-xl p-3 text-center">
            <p className="text-xs text-muted-foreground">{language === 'zh' ? '地点' : 'Location'}</p>
            <p className="text-sm font-semibold text-orange-300">{language === 'zh' ? '教室/家里' : 'Class/Home'}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-950/30 to-amber-950/20 rounded-2xl border border-orange-500/10 p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Hammer className="h-5 w-5 text-orange-400" />
            <h3 className="text-base font-semibold text-orange-300">{c.materials.title}</h3>
          </div>
          <div className="space-y-2">
            {c.materials.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-1.5">
                <span className="w-6 h-6 rounded-md bg-orange-500/10 flex items-center justify-center text-xs text-orange-400 font-bold shrink-0">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-200">{item.name}</span>
                <span className="text-xs text-muted-foreground">({item.note})</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/5 p-6 mb-5">
          <h3 className="text-base font-semibold text-white mb-4">
            {language === 'zh' ? '实验步骤' : 'Experiment Steps'}
          </h3>
          <div className="space-y-3">
            {c.steps.map((step, i) => (
              <button
                key={i}
                onClick={() => toggleStep(i)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
                  checkedSteps.has(i) ? 'bg-green-500/5 border border-green-500/20' : 'bg-white/5 border border-transparent hover:bg-white/10'
                }`}
              >
                <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  checkedSteps.has(i) ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/40'
                }`}>
                  {checkedSteps.has(i) ? <CheckSquare className="h-4 w-4" /> : <span className="text-xs">{i + 1}</span>}
                </div>
                <p className={`text-sm leading-relaxed ${checkedSteps.has(i) ? 'text-green-200' : 'text-gray-300'}`}>
                  {step}
                </p>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl border border-white/5 p-6 mb-5 overflow-x-auto">
          <h3 className="text-base font-semibold text-white mb-4">{c.record.title}</h3>
          <table className="w-full text-sm">
            <thead>
              <tr>
                {c.record.headers.map((h, i) => (
                  <th key={i} className="text-left text-xs text-muted-foreground font-medium pb-2 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.record.rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5">
                  <td className="py-3 pr-4 text-gray-300">{row}</td>
                  <td className="py-3 pr-4">
                    <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-400/40" placeholder="___" />
                  </td>
                  <td className="py-3">
                    <input type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-orange-400/40" placeholder="___" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-4 mb-5">
          <p className="text-sm text-blue-300 leading-relaxed">{c.verify}</p>
        </div>

        <div className="text-center mb-4">
          <p className="text-[10px] text-muted-foreground">{c.curriculum}</p>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onPrev} className="gap-1 text-muted-foreground">
            <ChevronLeft className="h-4 w-4" />
            {language === 'zh' ? '语文英语' : 'Language'}
          </Button>
          <Button
            size="sm"
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 gap-1 rounded-full px-6"
            onClick={onNext}
          >
            {c.next}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
