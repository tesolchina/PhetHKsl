import type { LearningModule } from './schema';
import frictionLabModule from './modules/friction-lab/module.json';

export const modules: Record<string, LearningModule> = {
  'friction-lab': frictionLabModule as unknown as LearningModule,
};

export function getModule(id: string): LearningModule | undefined {
  return modules[id];
}

export function listModules(): { id: string; module: LearningModule }[] {
  return Object.entries(modules).map(([id, module]) => ({ id, module }));
}

export function getModulesByGrade(grade: string): { id: string; module: LearningModule }[] {
  return listModules().filter(({ module }) => module.metadata.grade === grade);
}

export function getModulesBySubject(subject: string): { id: string; module: LearningModule }[] {
  return listModules().filter(({ module }) =>
    module.metadata.subjects.includes(subject as any)
  );
}
