import { useEffect } from 'react';
import { simulations } from '@/data/simulations';
import { SimulationCard } from '@/components/SimulationCard';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { ArrowDown, Atom, Beaker, Globe, Activity, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useLanguage();
  const physicsSims = simulations.filter(s => s.category === 'Physics');
  const chemistrySims = simulations.filter(s => s.category === 'Chemistry');
  const biologySims = simulations.filter(s => s.category === 'Biology');

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const scrollToSims = () => {
    document.getElementById('exhibition')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      <nav className="fixed top-0 left-0 right-0 z-50 museum-glass border-b-0">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-serif text-lg">
              P
            </div>
            <span className="font-serif font-semibold text-xl tracking-wide">PhET <span className="text-primary font-sans font-light">Interactive</span></span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <a href="#exhibition" className="hover:text-primary transition-colors">{t('nav.exhibitionHall')}</a>
            <a href="#physics" className="hover:text-primary transition-colors">{t('nav.physics')}</a>
            <a href="#chemistry" className="hover:text-primary transition-colors">{t('nav.chemistry')}</a>
            <LanguageToggle />
            <Button variant="outline" className="border-primary/30 hover:bg-primary hover:text-primary-foreground">
              {t('nav.support')}
            </Button>
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

      <div id="exhibition" className="relative">
        <section id="physics" className="py-32 relative overflow-hidden">
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
                <SimulationCard key={sim.id} simulation={sim} />
              ))}
            </div>
          </div>
        </section>

        <section id="chemistry" className="py-32 bg-card/20 relative overflow-hidden border-y border-white/5">
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
                <SimulationCard key={sim.id} simulation={sim} />
              ))}
            </div>
          </div>
        </section>

        <section id="biology" className="py-32 relative overflow-hidden">
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
                <SimulationCard key={sim.id} simulation={sim} />
              ))}
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10 bg-card py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold font-serif">
                  P
                </div>
                <span className="font-serif font-semibold text-xl">PhET Interactive</span>
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
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('footer.project')}</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.aboutUs')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.supportPhet')}</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.forEducators')}</a></li>
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
