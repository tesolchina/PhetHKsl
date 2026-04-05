import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all text-sm font-medium text-muted-foreground hover:text-primary"
      data-testid="button-language-toggle"
      aria-label="Switch language"
    >
      <Languages className="h-4 w-4" />
      <span>{language === 'en' ? '中文' : 'EN'}</span>
    </button>
  );
}
