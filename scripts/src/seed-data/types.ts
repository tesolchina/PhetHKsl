export interface CurriculumMapping {
  standard: string;
  region: string;
  grade: string;
  subject: string;
  topic: string;
  description: string;
}

export interface SimDef {
  slug: string;
  nameEn: string;
  nameZh: string;
  descriptionEn: string;
  descriptionZh: string;
  category: string;
  gradeLevel: string;
  tagsEn: string[];
  tagsZh: string[];
  urlEn: string;
  urlZh: string;
  localDev?: boolean;
  customRoute?: string;
  guide?: Array<{ title: { en: string; zh: string }; content: { en: string; zh: string } }>;
  curriculumMappings?: CurriculumMapping[];
}

export interface StaticSim {
  slug: string;
  nameEn: string;
  nameZh: string;
  category: string;
  gradeLevel: string;
  hasZh: boolean;
  curriculumMappings?: CurriculumMapping[];
}

export interface PhetSimulation {
  simulations: Array<{
    name: string;
    localizedSimulations: Array<{
      locale: string;
      title: string;
    }>;
    topics: string[];
    type: string;
  }>;
}
