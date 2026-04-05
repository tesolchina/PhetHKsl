import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.exhibitionHall': 'Exhibition Hall',
    'nav.physics': 'Physics',
    'nav.chemistry': 'Chemistry',
    'nav.support': 'Support the Project',
    'hero.badge': 'Interactive Science Museum',
    'hero.title.line1': 'Discover the',
    'hero.title.highlight': 'invisible forces',
    'hero.title.line3': 'of our world.',
    'hero.subtitle': 'Step into a beautifully curated digital exhibit space. Play, explore, and uncover the fundamental laws of physics, chemistry, and biology through interactive simulations.',
    'hero.cta': 'Enter the Exhibit',
    'hero.about': 'About PhET',
    'quote': '"We believe that engaging with science shouldn\'t feel like reading a textbook. It should feel like discovering a hidden world."',
    'physics.title': 'Physics Gallery',
    'physics.subtitle': 'Motion, energy, and the fundamental forces.',
    'chemistry.title': 'Chemistry Lab',
    'chemistry.subtitle': 'Atoms, molecules, and transformations.',
    'biology.title': 'Life Sciences',
    'biology.subtitle': 'Cells, ecosystems, and living systems.',
    'footer.description': 'Founded in 2002 by Nobel Laureate Carl Wieman, the PhET Interactive Simulations project at the University of Colorado Boulder creates free interactive math and science simulations.',
    'footer.galleries': 'Galleries',
    'footer.lifesciences': 'Life Sciences',
    'footer.project': 'Project',
    'footer.aboutUs': 'About Us',
    'footer.supportPhet': 'Support PhET',
    'footer.forEducators': 'For Educators',
    'footer.copyright': 'University of Colorado. This is a showcase redesign, not the official PhET website.',
    'category.Physics': 'Physics',
    'category.Chemistry': 'Chemistry',
    'category.Biology': 'Biology',
  },
  zh: {
    'nav.exhibitionHall': '展览大厅',
    'nav.physics': '物理',
    'nav.chemistry': '化学',
    'nav.support': '支持项目',
    'hero.badge': '互动科学博物馆',
    'hero.title.line1': '探索',
    'hero.title.highlight': '看不见的力量',
    'hero.title.line3': '发现世界的奥秘。',
    'hero.subtitle': '走进精心策划的数字展览空间。通过互动模拟，探索和发现物理、化学和生物学的基本规律。',
    'hero.cta': '进入展览',
    'hero.about': '关于 PhET',
    'quote': '"我们相信，与科学的互动不应该像阅读教科书那样枯燥。它应该像发现一个隐藏的世界一样令人兴奋。"',
    'physics.title': '物理展厅',
    'physics.subtitle': '运动、能量和基本作用力。',
    'chemistry.title': '化学实验室',
    'chemistry.subtitle': '原子、分子和化学变化。',
    'biology.title': '生命科学',
    'biology.subtitle': '细胞、生态系统和生命系统。',
    'footer.description': 'PhET 互动模拟项目由诺贝尔奖获得者 Carl Wieman 于 2002 年在科罗拉多大学博尔德分校创立，致力于创建免费的互动数学和科学模拟。',
    'footer.galleries': '展厅',
    'footer.lifesciences': '生命科学',
    'footer.project': '项目',
    'footer.aboutUs': '关于我们',
    'footer.supportPhet': '支持 PhET',
    'footer.forEducators': '教育者专区',
    'footer.copyright': '科罗拉多大学。这是一个展示性重新设计，非 PhET 官方网站。',
    'category.Physics': '物理',
    'category.Chemistry': '化学',
    'category.Biology': '生物',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('phet-lang');
    return (saved === 'zh' ? 'zh' : 'en') as Language;
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('phet-lang', lang);
  }, []);

  const t = useCallback((key: string): string => {
    return translations[language][key] ?? key;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
