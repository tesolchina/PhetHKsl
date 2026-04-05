export interface BilingualText {
  zh: string;
  en: string;
}

export interface ModuleMetadata {
  id: string;
  version: string;
  title: BilingualText;
  description: BilingualText;
  grade: string;
  subjects: ('science' | 'chinese' | 'english' | 'math')[];
  curriculumStandard: string;
  topic: BilingualText;
  duration: string;
  costPerStudent: string;
  authors: { name: string; role: string }[];
  tags: { zh: string[]; en: string[] };
}

export interface StoryStep {
  type: 'story';
  title: BilingualText;
  subtitle: BilingualText;
  image?: string;
  imageAlt?: BilingualText;
  paragraphs: BilingualText[];
  hint: BilingualText;
  listenLabel: BilingualText;
  nextLabel: BilingualText;
}

export interface QuizQuestion {
  question: BilingualText;
  image?: string;
  imageAlt?: BilingualText;
  options: BilingualText[];
  correctIndex: number;
  explanation: BilingualText;
}

export interface PredictionStep {
  type: 'prediction';
  title: BilingualText;
  questions: QuizQuestion[];
}

export interface ExploreStep {
  type: 'explore';
  simulationType: string;
  config: Record<string, unknown>;
  instructions: BilingualText;
}

export interface ChallengeQuestion {
  question: BilingualText;
  image?: string;
  imageAlt?: BilingualText;
  questionType: 'rank' | 'truefalse' | 'multichoice';
  items?: BilingualText[];
  correctOrder?: number[];
  statement?: BilingualText;
  isTrue?: boolean;
  options?: BilingualText[];
  correctIndex?: number;
  explanation: BilingualText;
}

export interface ChallengeStep {
  type: 'challenge';
  title: BilingualText;
  questions: ChallengeQuestion[];
}

export interface VocabWord {
  zh: string;
  pinyin: string;
  en: string;
  sentenceZh: string;
  sentenceEn: string;
}

export interface SongLine {
  en: string;
  zh: string;
}

export interface LanguageArtsStep {
  type: 'language-arts';
  title: BilingualText;
  subtitle: BilingualText;
  writing: {
    title: BilingualText;
    subtitle: BilingualText;
    template: BilingualText;
    tips: BilingualText[];
    templateLabel: BilingualText;
    freeWriteLabel: BilingualText;
    placeholder: BilingualText;
  };
  vocabulary: VocabWord[];
  song: {
    title: BilingualText;
    subtitle: BilingualText;
    melody: string;
    lines: SongLine[];
    keyWords: string[];
  };
}

export interface MaterialItem {
  name: BilingualText;
  note: BilingualText;
}

export interface HandsOnStep {
  type: 'hands-on';
  title: BilingualText;
  subtitle: BilingualText;
  intro: BilingualText;
  image?: string;
  cost: BilingualText;
  time: BilingualText;
  curriculum: BilingualText;
  materials: MaterialItem[];
  experimentSteps: BilingualText[];
  record: {
    title: BilingualText;
    headers: BilingualText[];
    rows: BilingualText[];
  };
  verify: BilingualText;
}

export interface ReflectionStep {
  type: 'reflection';
  title: BilingualText;
  subtitle: BilingualText;
  journey: { step: BilingualText; desc: BilingualText }[];
  keyFindings: { title: BilingualText; desc: BilingualText }[];
  journal: {
    title: BilingualText;
    prompt: BilingualText;
    placeholder: BilingualText;
  };
  selfCheckTitle: BilingualText;
  selfCheckItems: BilingualText[];
  curriculum: BilingualText;
}

export type LearningStep =
  | StoryStep
  | PredictionStep
  | ExploreStep
  | ChallengeStep
  | LanguageArtsStep
  | HandsOnStep
  | ReflectionStep;

export interface LearningModule {
  metadata: ModuleMetadata;
  steps: LearningStep[];
}
