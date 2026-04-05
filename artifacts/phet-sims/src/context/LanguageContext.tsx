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
    'hero.badge': 'HKBU Service-Learning',
    'hero.title.line1': 'Explore the',
    'hero.title.highlight': 'world of science',
    'hero.title.line3': 'through interactive simulations.',
    'hero.subtitle': 'An AI-powered interactive science learning platform by Hong Kong Baptist University, bringing PhET simulations to K-12 students in China and Hong Kong.',
    'hero.cta': 'Start Exploring',
    'hero.about': 'About Us',
    'quote': '"We believe that AI-enhanced interactive simulations can transform how students discover and understand the fundamental laws of science."',
    'physics.title': 'Physics Gallery',
    'physics.subtitle': 'Motion, energy, and the fundamental forces.',
    'chemistry.title': 'Chemistry Lab',
    'chemistry.subtitle': 'Atoms, molecules, and transformations.',
    'biology.title': 'Life Sciences',
    'biology.subtitle': 'Cells, ecosystems, and living systems.',
    'footer.description': 'A service-learning project by Hong Kong Baptist University, using PhET simulations and AI to create an innovative science learning platform for K-12 students in mainland China and Hong Kong.',
    'footer.galleries': 'Galleries',
    'footer.lifesciences': 'Life Sciences',
    'footer.project': 'Project',
    'footer.aboutUs': 'About Us',
    'footer.supportPhet': 'Support PhET',
    'footer.forEducators': 'For Educators',
    'footer.copyright': 'HKBU Service-Learning Team. Built on PhET Interactive Simulations by University of Colorado Boulder.',
    'category.Physics': 'Physics',
    'category.Chemistry': 'Chemistry',
    'category.Biology': 'Biology',
    'grade.all': 'All Levels',
    'grade.elementary': 'Elementary',
    'grade.middle': 'Middle School',
    'grade.label.elementary': 'Elementary',
    'grade.label.middle': 'Middle School',
    'viewer.guide': 'Learning Guide',
    'viewer.narrate': 'Read Aloud',
    'viewer.stop': 'Stop',
    'viewer.simulation': 'Simulation',
    'viewer.showGuide': 'Show Guide',
    'viewer.hideGuide': 'Hide Guide',
  },
  zh: {
    'nav.exhibitionHall': '展览大厅',
    'nav.physics': '物理',
    'nav.chemistry': '化学',
    'nav.support': '支持项目',
    'hero.badge': '香港浸会大学服务学习',
    'hero.title.line1': '探索',
    'hero.title.highlight': '科学的世界',
    'hero.title.line3': '通过互动模拟实验。',
    'hero.subtitle': '香港浸会大学服务学习团队打造的AI赋能互动科学学习平台，为中国大陆和香港的K-12学生带来PhET互动模拟实验。',
    'hero.cta': '开始探索',
    'hero.about': '关于我们',
    'quote': '"我们相信，AI增强的互动模拟实验能够改变学生发现和理解科学基本规律的方式。"',
    'physics.title': '物理展厅',
    'physics.subtitle': '运动、能量和基本作用力。',
    'chemistry.title': '化学实验室',
    'chemistry.subtitle': '原子、分子和化学变化。',
    'biology.title': '生命科学',
    'biology.subtitle': '细胞、生态系统和生命系统。',
    'footer.description': '香港浸会大学服务学习项目，利用PhET模拟和AI技术，为中国大陆和香港的K-12学生打造创新的科学学习平台。',
    'footer.galleries': '展厅',
    'footer.lifesciences': '生命科学',
    'footer.project': '项目',
    'footer.aboutUs': '关于我们',
    'footer.supportPhet': '支持 PhET',
    'footer.forEducators': '教育者专区',
    'footer.copyright': '香港浸会大学服务学习团队。基于科罗拉多大学博尔德分校PhET互动模拟项目构建。',
    'category.Physics': '物理',
    'category.Chemistry': '化学',
    'category.Biology': '生物',
    'grade.all': '全部',
    'grade.elementary': '小学',
    'grade.middle': '初中',
    'grade.label.elementary': '小学',
    'grade.label.middle': '初中',
    'viewer.guide': '学习指南',
    'viewer.narrate': '朗读',
    'viewer.stop': '停止',
    'viewer.simulation': '模拟实验',
    'viewer.showGuide': '显示指南',
    'viewer.hideGuide': '隐藏指南',
  },
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('phet-lang');
    if (saved === 'en') return 'en';
    return 'zh';
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
