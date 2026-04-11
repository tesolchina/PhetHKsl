import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Home, BookOpen, Users, School, ClipboardList, GraduationCap, ChevronDown, ChevronUp, MessageSquare, Lightbulb, Target, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { curriculumData, visitQuestions, volunteerRoles, landingPlan } from './teacher-guide/data';

type TabId = 'curriculum' | 'visit' | 'volunteers' | 'landing';

function CollapsibleSection({ title, icon: Icon, children, defaultOpen = false }: { title: string; icon: typeof BookOpen; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 transition-colors text-left"
      >
        <div className="flex items-center gap-3">
          <Icon className="h-5 w-5 text-primary" />
          <span className="font-semibold text-white">{title}</span>
        </div>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
      </button>
      {open && <div className="p-4">{children}</div>}
    </div>
  );
}

export default function TeacherGuide() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('curriculum');

  const tabs: { id: TabId; label: string; icon: typeof BookOpen }[] = [
    { id: 'curriculum', label: language === 'zh' ? '课标对照' : 'Curriculum', icon: BookOpen },
    { id: 'visit', label: language === 'zh' ? '调研问题' : 'Visit Questions', icon: ClipboardList },
    { id: 'volunteers', label: language === 'zh' ? '支教团角色' : 'Volunteer Roles', icon: GraduationCap },
    { id: 'landing', label: language === 'zh' ? '落地方案' : 'Implementation', icon: Target },
  ];

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
                {language === 'zh' ? '教学指南与调研手册' : 'Teaching Guide & Research Manual'}
              </h1>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {language === 'zh' ? '跨学科教学指南' : 'Cross-Curricular Teaching Guide'}
            </h1>
            <p className="text-muted-foreground">
              {language === 'zh'
                ? '课标对照 | 实地调研 | 支教团角色 | 落地方案'
                : 'Curriculum Alignment | Field Research | Volunteer Roles | Implementation'}
            </p>
          </div>

          <div className="flex gap-1 mb-6 bg-white/5 rounded-xl p-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              {Object.entries(curriculumData).map(([key, subject]) => (
                <CollapsibleSection
                  key={key}
                  title={language === 'zh' ? subject.title.zh : subject.title.en}
                  icon={BookOpen}
                  defaultOpen={key === 'science'}
                >
                  <div className="space-y-4">
                    {subject.grades.map((grade, gi) => (
                      <div key={gi} className="bg-white/5 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <GraduationCap className="h-4 w-4 text-primary" />
                          <span className="font-medium text-white">
                            {language === 'zh' ? grade.range.zh : grade.range.en}
                            {'age' in grade && (
                              <span className="text-muted-foreground text-sm ml-2">
                                ({language === 'zh' ? (grade as any).age.zh : (grade as any).age.en})
                              </span>
                            )}
                          </span>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
                            {language === 'zh' ? '课标要求' : 'Standards'}
                          </p>
                          <ul className="space-y-1">
                            {(language === 'zh' ? grade.goals.zh : grade.goals.en).map((goal, i) => (
                              <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="text-primary mt-1 text-xs">&#9679;</span>
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                        {'simFit' in grade && (
                          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <Lightbulb className="h-3.5 w-3.5 text-primary" />
                              <span className="text-xs font-medium text-primary">
                                {language === 'zh' ? '模拟适配度' : 'Simulation Fit'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">
                              {language === 'zh' ? (grade as any).simFit.zh : (grade as any).simFit.en}
                            </p>
                          </div>
                        )}
                        {'integration' in grade && (
                          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <FileText className="h-3.5 w-3.5 text-blue-400" />
                              <span className="text-xs font-medium text-blue-400">
                                {language === 'zh' ? '与模拟整合' : 'Integration'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-300">
                              {language === 'zh' ? (grade as any).integration.zh : (grade as any).integration.en}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              ))}
            </div>
          )}

          {activeTab === 'visit' && (
            <div className="space-y-4">
              {Object.entries(visitQuestions).map(([key, section]) => (
                <CollapsibleSection
                  key={key}
                  title={language === 'zh' ? section.title.zh : section.title.en}
                  icon={key === 'forTeachers' ? School : Users}
                  defaultOpen={key === 'forTeachers'}
                >
                  <div className="space-y-3">
                    {(language === 'zh' ? section.questions.zh : section.questions.en).map((item, i) => (
                      <div key={i} className="bg-white/5 rounded-lg p-3">
                        <div className="flex items-start gap-3">
                          <div className="bg-primary/20 text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                            {i + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white mb-1">{item.q}</p>
                            <div className="flex items-center gap-1.5">
                              <MessageSquare className="h-3 w-3 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">{item.why}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleSection>
              ))}
            </div>
          )}

          {activeTab === 'volunteers' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">
                {language === 'zh' ? volunteerRoles.zh.title : volunteerRoles.en.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                {(language === 'zh' ? volunteerRoles.zh.roles : volunteerRoles.en.roles).map((role, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-primary/20 text-primary rounded-lg w-8 h-8 flex items-center justify-center text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{role.title}</h3>
                        <p className="text-xs text-muted-foreground">{role.desc}</p>
                      </div>
                    </div>
                    <ul className="space-y-1.5 mt-3">
                      {role.tasks.map((task, j) => (
                        <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-green-400 mt-0.5 text-xs">&#10003;</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'landing' && (
            <div>
              <h2 className="text-xl font-bold mb-4 text-center">
                {language === 'zh' ? landingPlan.zh.title : landingPlan.en.title}
              </h2>
              <div className="space-y-4 mb-8">
                {(language === 'zh' ? landingPlan.zh.scenarios : landingPlan.en.scenarios).map((scenario, i) => (
                  <CollapsibleSection key={i} title={scenario.name} icon={Target} defaultOpen={i === 0}>
                    <p className="text-sm text-muted-foreground mb-3">{scenario.desc}</p>
                    <ol className="space-y-2">
                      {scenario.steps.map((step, j) => (
                        <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="bg-primary/20 text-primary rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                            {j + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CollapsibleSection>
                ))}
              </div>

              <h3 className="text-lg font-semibold mb-3 text-center">
                {language === 'zh' ? '实施时间线' : 'Implementation Timeline'}
              </h3>
              <div className="space-y-3">
                {(language === 'zh' ? landingPlan.zh.timeline : landingPlan.en.timeline).map((phase, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold text-white">
                        {i + 1}
                      </div>
                      <h4 className="font-medium text-white">{phase.phase}</h4>
                    </div>
                    <ul className="space-y-1 ml-8">
                      {phase.tasks.map((task, j) => (
                        <li key={j} className="text-sm text-gray-300 flex items-start gap-2">
                          <span className="text-muted-foreground mt-1 text-xs">&#9679;</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
