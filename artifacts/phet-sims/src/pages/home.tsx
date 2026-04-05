import { useEffect, useState } from 'react';
import { useListSimulations, type SimulationItem } from '@workspace/api-client-react';
import { SimulationCard } from '@/components/SimulationCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { ArrowDown, Atom, Beaker, Globe, Activity, ChevronRight, GraduationCap, BookOpen, Calculator, Mountain, Loader2, Users, Target, Lightbulb, School } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'wouter';

type GradeFilter = 'all' | 'elementary' | 'middle';

export default function Home() {
  const { language, t } = useLanguage();
  const [gradeFilter, setGradeFilter] = useState<GradeFilter>('all');

  const { data: simulations = [], isLoading, error } = useListSimulations();

  const filtered = gradeFilter === 'all'
    ? simulations
    : simulations.filter(s => s.gradeLevel === gradeFilter);

  const physicsSims = filtered.filter(s => s.category === 'Physics');
  const chemistrySims = filtered.filter(s => s.category === 'Chemistry');
  const biologySims = filtered.filter(s => s.category === 'Biology');
  const mathSims = filtered.filter(s => s.category === 'Math');
  const earthScienceSims = filtered.filter(s => s.category === 'Earth Science');

  const elementaryCount = simulations.filter(s => s.gradeLevel === 'elementary').length;
  const middleCount = simulations.filter(s => s.gradeLevel === 'middle').length;

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const scrollToSims = () => {
    document.getElementById('exhibition')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const gradeButtons: { value: GradeFilter; count?: number }[] = [
    { value: 'all' },
    { value: 'elementary', count: elementaryCount },
    { value: 'middle', count: middleCount },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <nav className="fixed top-0 left-0 right-0 z-50 museum-glass border-b-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-serif text-lg">
              S
            </div>
            <span className="font-serif font-semibold text-xl tracking-wide">{language === 'zh' ? 'STEM探索' : 'STEM Explore'} <span className="text-primary font-sans font-light">{language === 'zh' ? '互动平台' : 'Interactive'}</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#exhibition" className="hover:text-primary transition-colors">{t('nav.exhibitionHall')}</a>
            <a href="#physics" className="hover:text-primary transition-colors">{t('nav.physics')}</a>
            <a href="#chemistry" className="hover:text-primary transition-colors">{t('nav.chemistry')}</a>
            <a href="#about" className="hover:text-primary transition-colors">{language === 'zh' ? '关于我们' : 'About Us'}</a>
            <Link href="/teacher-guide" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              {t('nav.support') === 'Support the Project' ? 'Teaching Guide' : '教学指南'}
            </Link>
            <Link href="/content" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <GraduationCap className="h-3.5 w-3.5" />
              {t('nav.support') === 'Support the Project' ? 'Content' : '内容目录'}
            </Link>
            <LanguageToggle />
          </div>
          <div className="md:hidden flex items-center gap-3">
            <LanguageToggle />
          </div>
        </div>
      </nav>

      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-10" />
          <img 
            src="/hero-bg.png" 
            alt="Science Museum Background" 
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-6 border-primary text-primary px-4 py-1.5 text-sm uppercase tracking-widest bg-primary/5 museum-glass">
              {t('hero.badge')}
            </Badge>
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[1.1] mb-6 text-glow tracking-tight text-white">
              {t('hero.title.line1')} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-200 to-primary">{t('hero.title.highlight')}</span><br/>
              {t('hero.title.line3')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed font-light max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-8 text-lg font-medium"
                onClick={scrollToSims}
                data-testid="button-enter-exhibit"
              >
                {t('hero.cta')} <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="museum-glass border-white/20 hover:bg-white/10 h-14 px-8 text-lg font-medium"
                onClick={scrollToAbout}
              >
                {t('hero.about')}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <button onClick={scrollToSims} className="text-muted-foreground hover:text-primary transition-colors" aria-label="Scroll down">
            <ArrowDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      <section className="py-24 bg-card/30 border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Activity className="w-12 h-12 text-primary mx-auto mb-8 opacity-50" />
          <p className="font-serif text-3xl md:text-4xl leading-relaxed text-foreground/90 italic">
            {t('quote')}
          </p>
        </div>
      </section>

      <section id="about" className="py-24 bg-card/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary text-primary px-4 py-1.5 text-sm uppercase tracking-widest bg-primary/5">
              {language === 'zh' ? '关于项目' : 'About the Project'}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              {language === 'zh' ? '香港浸会大学服务学习团队' : 'HKBU Service-Learning Team'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {language === 'zh'
                ? '我们是来自香港浸会大学的服务学习团队，致力于将人工智能融入基础教育，为中国大陆和香港的K-12学生打造创新的科学学习平台。'
                : 'We are a service-learning team from Hong Kong Baptist University (HKBU), dedicated to integrating AI into basic education and creating innovative science learning platforms for K-12 students in mainland China and Hong Kong.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <School className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{language === 'zh' ? '服务学习' : 'Service Learning'}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? '香港浸会大学服务学习项目，将专业知识与社会服务相结合'
                  : 'HKBU service-learning program combining academic expertise with community service'}
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{language === 'zh' ? 'AI赋能教育' : 'AI in Education'}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? '运用人工智能技术，为基础教育带来更丰富的互动体验和个性化学习'
                  : 'Leveraging AI technology to bring richer interactive experiences and personalized learning to basic education'}
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                <Target className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{language === 'zh' ? '二次开发' : 'Enhanced Content'}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? '以PhET模拟为基础进行二次开发，融入更丰富的内容和更强的互动性'
                  : 'Secondary development based on PhET simulations with richer content and stronger interactivity'}
              </p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-card/50 border border-white/5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 text-amber-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{language === 'zh' ? '跨学科教学' : 'Cross-disciplinary'}</h3>
              <p className="text-sm text-muted-foreground">
                {language === 'zh'
                  ? '跨学科综合教学：语文、英语、科学实践、社会实践多维度融合'
                  : 'Cross-disciplinary integrated teaching: Chinese, English, science practice, and social practice'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id="exhibition" className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-primary" />
              <span className="text-lg font-medium text-foreground">
                {t('grade.all')} ({simulations.length} {language === 'zh' ? '个模拟' : 'simulations'})
              </span>
            </div>
            <div className="flex gap-2" role="group" aria-label="Grade level filter">
              {gradeButtons.map(({ value, count }) => {
                const label = t(`grade.${value}`);
                const isActive = gradeFilter === value;
                return (
                  <button
                    key={value}
                    onClick={() => setGradeFilter(value)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground'
                    }`}
                  >
                    {label}{count !== undefined ? ` (${count})` : ''}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="max-w-7xl mx-auto px-6 py-32 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">{language === 'zh' ? '加载模拟实验中...' : 'Loading simulations...'}</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="max-w-7xl mx-auto px-6 py-32 text-center">
            <p className="text-destructive text-lg mb-4">{language === 'zh' ? '加载失败，请重试。' : 'Failed to load simulations. Please try again.'}</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              {language === 'zh' ? '重新加载' : 'Reload'}
            </Button>
          </div>
        )}

        {!isLoading && physicsSims.length > 0 && (
          <section id="physics" className="py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-20 pointer-events-none">
              <img src="/physics-bg.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-secondary/20 text-secondary border border-secondary/30">
                  <Atom className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-serif font-bold">{t('physics.title')}</h2>
                  <p className="text-muted-foreground mt-2">{t('physics.subtitle')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {physicsSims.map((sim) => (
                  <SimulationCard key={sim.slug} simulation={sim} />
                ))}
              </div>
            </div>
          </section>
        )}

        {!isLoading && chemistrySims.length > 0 && (
          <section id="chemistry" className="py-20 bg-card/20 relative overflow-hidden border-y border-white/5">
            <div className="absolute top-0 left-0 w-1/2 h-full z-0 opacity-20 pointer-events-none">
              <img src="/chemistry-bg.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background" />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex items-center gap-4 mb-12 justify-end text-right">
                <div>
                  <h2 className="text-4xl font-serif font-bold">{t('chemistry.title')}</h2>
                  <p className="text-muted-foreground mt-2">{t('chemistry.subtitle')}</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Beaker className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chemistrySims.map((sim) => (
                  <SimulationCard key={sim.slug} simulation={sim} />
                ))}
              </div>
            </div>
          </section>
        )}

        {!isLoading && biologySims.length > 0 && (
          <section id="biology" className="py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full z-0 opacity-20 pointer-events-none">
              <img src="/biology-bg.png" alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-background" />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-green-500/20 text-green-400 border border-green-500/30">
                  <Globe className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-serif font-bold">{t('biology.title')}</h2>
                  <p className="text-muted-foreground mt-2">{t('biology.subtitle')}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {biologySims.map((sim) => (
                  <SimulationCard key={sim.slug} simulation={sim} />
                ))}
              </div>
            </div>
          </section>
        )}

        {!isLoading && mathSims.length > 0 && (
          <section id="math" className="py-20 bg-card/20 relative overflow-hidden border-y border-white/5">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex items-center gap-4 mb-12 justify-end text-right">
                <div>
                  <h2 className="text-4xl font-serif font-bold">{language === 'zh' ? '数学探索' : 'Mathematics'}</h2>
                  <p className="text-muted-foreground mt-2">{language === 'zh' ? '数字、代数和几何。' : 'Numbers, algebra, and geometry.'}</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Calculator className="w-8 h-8" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mathSims.map((sim) => (
                  <SimulationCard key={sim.slug} simulation={sim} />
                ))}
              </div>
            </div>
          </section>
        )}

        {!isLoading && earthScienceSims.length > 0 && (
          <section id="earth-science" className="py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="flex items-center gap-4 mb-12">
                <div className="p-4 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  <Mountain className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-serif font-bold">{language === 'zh' ? '地球科学' : 'Earth Science'}</h2>
                  <p className="text-muted-foreground mt-2">{language === 'zh' ? '地球系统和自然现象。' : 'Earth systems and natural phenomena.'}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {earthScienceSims.map((sim) => (
                  <SimulationCard key={sim.slug} simulation={sim} />
                ))}
              </div>
            </div>
          </section>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="max-w-7xl mx-auto px-6 py-32 text-center">
            <p className="text-2xl text-muted-foreground">{t('grade.all')}</p>
          </div>
        )}
      </div>

      <footer className="border-t border-white/10 bg-card py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-serif">
                  S
                </div>
                <span className="font-serif font-semibold text-xl">{language === 'zh' ? 'STEM探索 互动平台' : 'STEM Explore Interactive'}</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.galleries')}</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#physics" className="hover:text-primary transition-colors">{t('nav.physics')}</a></li>
                <li><a href="#chemistry" className="hover:text-primary transition-colors">{t('nav.chemistry')}</a></li>
                <li><a href="#biology" className="hover:text-primary transition-colors">{t('footer.lifesciences')}</a></li>
                <li><a href="#math" className="hover:text-primary transition-colors">{language === 'zh' ? '数学' : 'Math'}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.project')}</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#about" className="hover:text-primary transition-colors">{t('footer.aboutUs')}</a></li>
                <li><a href="https://www.hkbu.edu.hk" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{language === 'zh' ? '香港浸会大学' : 'HKBU'}</a></li>
                <li><a href="https://phet.colorado.edu" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t('footer.supportPhet')}</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/5 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
