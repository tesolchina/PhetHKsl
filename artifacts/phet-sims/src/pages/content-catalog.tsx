import { useLanguage } from '@/context/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Home, BookOpen, Users, Clock, Coins, ChevronRight, FileJson, GitBranch } from 'lucide-react';
import { Link } from 'wouter';
import { listModules } from '@content/index';
import type { LearningModule } from '@content/schema';

const subjectColors: Record<string, string> = {
  science: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  chinese: 'bg-red-500/20 text-red-400 border-red-500/30',
  english: 'bg-green-500/20 text-green-400 border-green-500/30',
  math: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const subjectLabels: Record<string, { zh: string; en: string }> = {
  science: { zh: '科学', en: 'Science' },
  chinese: { zh: '语文', en: 'Chinese' },
  english: { zh: '英语', en: 'English' },
  math: { zh: '数学', en: 'Math' },
};

const stepTypeLabels: Record<string, { zh: string; en: string }> = {
  story: { zh: '故事', en: 'Story' },
  prediction: { zh: '预测', en: 'Prediction' },
  explore: { zh: '探索', en: 'Explore' },
  challenge: { zh: '挑战', en: 'Challenge' },
  'language-arts': { zh: '读写', en: 'Language' },
  'hands-on': { zh: '动手', en: 'Hands-On' },
  reflection: { zh: '反思', en: 'Reflection' },
};

function ModuleCard({ module, language }: { module: LearningModule; language: 'en' | 'zh' }) {
  const m = module.metadata;
  const routeMap: Record<string, string> = {
    'friction-lab': '/friction-lab',
  };
  const route = routeMap[m.id];

  return (
    <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-primary/30 transition-all group">
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
            {m.title[language]}
          </h3>
          <Badge variant="outline" className="text-[10px] shrink-0">
            v{m.version}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {m.description[language]}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {m.subjects.map(sub => (
            <Badge key={sub} className={`text-[10px] ${subjectColors[sub] || ''}`}>
              {subjectLabels[sub]?.[language] || sub}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <Users className="h-3.5 w-3.5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">{language === 'zh' ? '年级' : 'Grade'}</p>
            <p className="text-xs font-semibold text-white">{m.grade}</p>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <Clock className="h-3.5 w-3.5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">{language === 'zh' ? '时长' : 'Duration'}</p>
            <p className="text-xs font-semibold text-white">{m.duration}</p>
          </div>
          <div className="bg-black/20 rounded-lg p-2 text-center">
            <Coins className="h-3.5 w-3.5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-[10px] text-muted-foreground">{language === 'zh' ? '成本' : 'Cost'}</p>
            <p className="text-xs font-semibold text-white">{m.costPerStudent}</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] text-muted-foreground mb-2">
            {language === 'zh' ? '学习步骤' : 'Learning Steps'}
          </p>
          <div className="flex flex-wrap gap-1">
            {module.steps.map((step, i) => (
              <span key={i} className="px-2 py-0.5 bg-white/5 rounded text-[10px] text-white/60">
                {i + 1}. {stepTypeLabels[step.type]?.[language] || step.type}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[10px] text-muted-foreground mb-1.5">
            {language === 'zh' ? '课标对齐' : 'Curriculum'}
          </p>
          <p className="text-xs text-white/70">{m.topic[language]}</p>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
          {m.tags[language].map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-primary/5 border border-primary/10 rounded text-[10px] text-primary/80">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {route && (
            <Link href={route}>
              <Button size="sm" className="gap-1.5 rounded-full">
                {language === 'zh' ? '进入学习' : 'Start Learning'}
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          )}
          <a
            href={`/api/content/${m.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-1.5 text-xs">
              <FileJson className="h-3 w-3" />
              JSON
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ContentCatalog() {
  const { language } = useLanguage();
  const allModules = listModules();

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
                {language === 'zh' ? '内容目录' : 'Content Catalog'}
              </h1>
              <p className="text-[10px] text-muted-foreground">
                {language === 'zh' ? '开源学习模块' : 'Open-Source Learning Modules'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="pt-20 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">
                {language === 'zh' ? '标准化内容模型' : 'Standardized Content Model'}
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-3">
              {language === 'zh' ? '学习模块目录' : 'Learning Module Catalog'}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
              {language === 'zh'
                ? '所有学习模块都使用标准化的JSON格式。任何团队都可以用任何工具创建内容，通过GitHub PR贡献到这个开源项目。'
                : 'All learning modules use a standardized JSON format. Any team can create content with any tool and contribute via GitHub PR.'}
            </p>
            <div className="flex justify-center gap-3">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                {allModules.length} {language === 'zh' ? '个模块' : 'modules'}
              </Badge>
              <a href="/api/content" target="_blank" rel="noopener noreferrer">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 cursor-pointer hover:bg-blue-500/30 transition-colors gap-1">
                  <FileJson className="h-3 w-3" />
                  API
                </Badge>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {allModules.map(({ id, module }) => (
              <ModuleCard key={id} module={module} language={language} />
            ))}
          </div>

          <div className="bg-white/5 rounded-2xl border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-4">
              <GitBranch className="h-6 w-6 text-primary" />
              <h2 className="text-xl font-bold">
                {language === 'zh' ? '如何贡献内容' : 'How to Contribute'}
              </h2>
            </div>

            <p className="text-sm text-muted-foreground mb-6">
              {language === 'zh'
                ? '两种方式创建模块：手动编写JSON，或使用DocAI的AI助手自动生成。详细的格式说明和AI提示模板请查看'
                : 'Two ways to create modules: write JSON manually, or use DocAI\'s AI assistant to auto-generate. See the complete format guide and AI prompt template in'}
              <a
                href="/api/content"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline ml-1"
              >
                content/README.md
              </a>
              {' '}
              {language === 'zh' ? '(GitHub仓库中)' : '(in the GitHub repo)'}
              
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                  {language === 'zh' ? '方式一' : 'Option A'}
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  {language === 'zh' ? '通过 DocAI (aitutor.ink)' : 'Via DocAI (aitutor.ink)'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {language === 'zh'
                    ? '在DocAI中与AI助手对话，自动生成符合格式的module.json文件。适合LANG 2077课程的同学。'
                    : 'Chat with DocAI\'s AI assistant to auto-generate a valid module.json file. Ideal for LANG 2077 students.'}
                </p>
                <a
                  href="https://agent.aitutor.ink"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  agent.aitutor.ink <ChevronRight className="h-3 w-3" />
                </a>
              </div>
              <div className="bg-black/20 rounded-xl p-5 border border-white/5">
                <div className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">
                  {language === 'zh' ? '方式二' : 'Option B'}
                </div>
                <h3 className="font-semibold text-sm mb-2">
                  {language === 'zh' ? '手动编写 JSON' : 'Write JSON Manually'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {language === 'zh'
                    ? '按照content/README.md中的schema文档，手动编写module.json文件。适合有编程经验的贡献者。'
                    : 'Follow the schema documented in content/README.md to write module.json by hand. For contributors with coding experience.'}
                </p>
                <a
                  href="/api/content/friction-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  {language === 'zh' ? '查看示例 JSON' : 'View example JSON'} <ChevronRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-black/20 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary mb-3">1</div>
                <h3 className="font-semibold text-sm mb-2">
                  {language === 'zh' ? '创建 module.json' : 'Create module.json'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'zh'
                    ? '用DocAI生成或手动编写。放在 content/modules/你的模块ID/ 下'
                    : 'Generate via DocAI or write by hand. Place under content/modules/your-module-id/'}
                </p>
              </div>
              <div className="bg-black/20 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary mb-3">2</div>
                <h3 className="font-semibold text-sm mb-2">
                  {language === 'zh' ? '注册并添加图片' : 'Register & Add Images'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'zh'
                    ? '在 content/index.ts 中注册模块，图片放到 public/images/'
                    : 'Register in content/index.ts, place images in public/images/'}
                </p>
              </div>
              <div className="bg-black/20 rounded-xl p-4">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary mb-3">3</div>
                <h3 className="font-semibold text-sm mb-2">
                  {language === 'zh' ? '提交 Pull Request' : 'Submit a PR'}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {language === 'zh'
                    ? '在GitHub上Fork仓库，提交PR。审核通过后自动部署到学生端'
                    : 'Fork on GitHub, submit PR. After review, auto-deploys to student site'}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-xl">
              <p className="text-xs text-primary/80 font-mono leading-relaxed">
                {language === 'zh' ? '内容API端点：' : 'Content API endpoints:'}<br />
                GET /api/content &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {language === 'zh' ? '— 列出所有模块' : '— List all modules'}<br />
                GET /api/content/{'{'}{language === 'zh' ? '模块ID' : 'module-id'}{'}'} &nbsp;
                {language === 'zh' ? '— 获取模块详情' : '— Get module details'}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
