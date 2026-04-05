# Content Model / 内容模型

> **For DocAI (aitutor.ink) users**: See [Section 4: Creating Modules from DocAI](#4-从-docai-创建模块--creating-modules-from-docai)

This directory defines the standardized content format for cross-curricular learning modules. Modules are JSON files that describe complete lesson experiences — from story introduction through hands-on experiments — in bilingual Chinese/English.

这个目录定义了跨学科学习模块的标准化内容格式。模块是JSON文件，用中英文双语描述完整的课程体验——从故事引入到动手实验。

---

## Table of Contents / 目录

1. [Architecture Overview / 架构概览](#1-架构概览--architecture-overview)
2. [Quick Start / 快速开始](#2-快速开始--quick-start)
3. [Complete Schema Reference / 完整格式参考](#3-完整格式参考--complete-schema-reference)
4. [Creating Modules from DocAI / 从 DocAI 创建模块](#4-从-docai-创建模块--creating-modules-from-docai)
5. [Design Principles / 设计原则](#5-设计原则--design-principles)
6. [API Reference / API 接口](#6-api-接口--api-reference)
7. [Validation & Testing / 验证与测试](#7-验证与测试--validation--testing)

---

## 1. 架构概览 / Architecture Overview

```
                                    GitHub PR
DocAI (aitutor.ink)  ─────────────────────────────> PhET Science Platform
  AI Agent generates                                  (this repo)
  module.json + images                                   │
                                                         ├── content/
                                                         │   ├── schema.ts     (type definitions)
                                                         │   ├── index.ts      (module registry)
                                                         │   └── modules/
                                                         │       ├── friction-lab/
                                                         │       │   └── module.json
                                                         │       ├── water-cycle/      (example)
                                                         │       │   └── module.json
                                                         │       └── ...
                                                         ├── public/images/     (shared images)
                                                         └── src/              (React components)
```

**Two platforms, two roles:**

| | DocAI (aitutor.ink) | PhET Science Platform (this repo) |
|---|---|---|
| Role | Authoring / collaboration / AI agent | Student-facing / publishing |
| Users | LANG 2077 university students, volunteers | Elementary school students (10 tablets/class) |
| What it does | Generate lesson content via AI chat | Render interactive learning experiences |

**Connection via GitHub:**
- This repo is open-source
- Contributors create `module.json` files (manually or via DocAI AI agent)
- Submit Pull Requests to add new modules
- Merged modules appear in the Content Catalog (`/content`) and Content API (`/api/content`)
- **Note:** New modules are immediately discoverable (catalog + API) after merge, but interactive learning routes (like `/friction-lab`) require a corresponding route and renderer to be built. Contact the maintainer to request a route for your module.

---

## 2. 快速开始 / Quick Start

### Step 1: Create module folder / 创建模块文件夹

```bash
mkdir content/modules/your-module-id
```

Module ID rules:
- Lowercase, hyphen-separated: `water-cycle`, `light-and-shadow`, `plant-growth`
- Descriptive and unique
- No spaces, no Chinese characters

### Step 2: Create module.json / 创建 module.json

Create `content/modules/your-module-id/module.json` with this minimal structure:

```json
{
  "metadata": {
    "id": "your-module-id",
    "version": "1.0.0",
    "title": { "zh": "模块中文标题", "en": "Module English Title" },
    "description": { "zh": "一句话描述", "en": "One-line description" },
    "grade": "3-4",
    "subjects": ["science"],
    "curriculumStandard": "2022",
    "topic": { "zh": "学科领域 > 具体主题", "en": "Domain > Specific Topic" },
    "duration": "40min",
    "costPerStudent": "5 RMB",
    "authors": [
      { "name": "Your Name", "role": "Content Designer / 内容设计师" }
    ],
    "tags": { "zh": ["标签1", "标签2"], "en": ["tag1", "tag2"] }
  },
  "steps": [
    // ... steps go here (see Section 3)
  ]
}
```

### Step 3: Add images / 添加图片

Place images in `public/images/`. Reference them in JSON as relative paths:

```json
"image": "images/your-image-name.png"
```

Image guidelines:
- Format: PNG or JPG
- Recommended size: 800x400px for story/quiz illustrations
- File naming: `moduleid-purpose.png` (e.g., `water-cycle-story.png`)
- Keep file size under 500KB

### Step 4: Register the module / 注册模块

Add your module to `content/index.ts`:

```typescript
import yourModule from './modules/your-module-id/module.json';

export const modules: Record<string, LearningModule> = {
  'friction-lab': frictionLabModule as unknown as LearningModule,
  'your-module-id': yourModule as unknown as LearningModule, // add this line
};
```

### Step 5: Submit PR / 提交 Pull Request

```bash
git checkout -b add-module-your-module-id
git add content/modules/your-module-id/ public/images/your-*
git add content/index.ts
git commit -m "Add module: your-module-id"
git push origin add-module-your-module-id
# Then create PR on GitHub
```

---

## 3. 完整格式参考 / Complete Schema Reference

### Core Rule: Bilingual Text / 核心规则：双语文本

Most text fields use bilingual format:

```json
{ "zh": "中文内容", "en": "English content" }
```

**Exceptions** (non-bilingual fields):
- `metadata.id` — string (lowercase-hyphen, e.g., `"water-cycle"`)
- `metadata.version` — string (semver, e.g., `"1.0.0"`)
- `metadata.grade` — string (e.g., `"3-4"`)
- `metadata.subjects` — string array (e.g., `["science","chinese"]`)
- `metadata.curriculumStandard` — string (e.g., `"2022"`)
- `metadata.duration` — string (e.g., `"40min"`)
- `metadata.costPerStudent` — string (e.g., `"5 RMB"`)
- `authors[].name`, `authors[].role` — plain strings
- `vocabulary[].pinyin` — plain string (e.g., `"mo ca li"`)
- `song.melody` — plain string (e.g., `"(Tune: Row Row Row Your Boat)"`)
- `song.keyWords` — string array (e.g., `["friction","heat"]`)
- `explore.simulationType` — string
- `explore.config` — object (simulation-specific)
- `challenge.questions[].questionType` — `"rank"` | `"truefalse"` | `"multichoice"`
- `challenge.questions[].isTrue` — boolean
- `challenge.questions[].correctIndex`, `prediction.questions[].correctIndex` — number
- `challenge.questions[].correctOrder` — number array

### Metadata (required) / 元数据（必填）

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | string | Unique module ID, lowercase-hyphen | `"water-cycle"` |
| `version` | string | Semver version | `"1.0.0"` |
| `title` | BilingualText | Module title | `{"zh":"水循环","en":"Water Cycle"}` |
| `description` | BilingualText | One-line summary | |
| `grade` | string | Target grade range | `"3-4"`, `"5-6"`, `"1-2"` |
| `subjects` | string[] | Subject areas | `["science","chinese","english"]` |
| `curriculumStandard` | string | Curriculum year | `"2022"` |
| `topic` | BilingualText | Curriculum topic path | |
| `duration` | string | Estimated class time | `"40min"` |
| `costPerStudent` | string | Hands-on cost per student | `"3 RMB"` |
| `authors` | array | Contributors | `[{"name":"...","role":"..."}]` |
| `tags` | {zh,en} | Search tags | |

Valid `subjects` values: `"science"`, `"chinese"`, `"english"`, `"math"`

### Steps Array / 步骤数组

The `steps` array defines the learning flow. The recommended order:

```
story -> prediction -> explore -> challenge -> language-arts -> hands-on -> reflection
```

Not all steps are required. Minimum: at least 2 steps. You can also repeat step types (e.g., two prediction steps).

---

### Step Type: `story`

The narrative introduction. Sets context with a relatable character and scenario.

```json
{
  "type": "story",
  "title": { "zh": "搓搓手，暖暖手", "en": "Rub Your Hands, Warm Your Hands" },
  "subtitle": { "zh": "一个关于摩擦力的小故事", "en": "A Story About Friction" },
  "image": "images/friction-story.png",
  "imageAlt": { "zh": "小明在操场上搓手取暖", "en": "Xiao Ming rubbing hands" },
  "paragraphs": [
    { "zh": "冬天的早晨，小明在操场上冻得直哆嗦。", "en": "On a cold winter morning, Xiao Ming was shivering." },
    { "zh": "他把两只手掌合在一起，快速地搓了起来。", "en": "He pressed his palms together and rubbed them quickly." },
    { "zh": "神奇的事情发生了——手掌变暖了！", "en": "Something magical happened - his palms felt warm!" },
    { "zh": "可是，热量是从哪里来的呢？", "en": "But where did the heat come from?" },
    { "zh": "让我们一起来探索摩擦力的秘密吧！", "en": "Let's explore the secret of friction together!" }
  ],
  "hint": { "zh": "试试搓搓你自己的双手！", "en": "Try rubbing your own hands!" },
  "listenLabel": { "zh": "听故事", "en": "Listen" },
  "nextLabel": { "zh": "我准备好了", "en": "I'm Ready" }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Story title |
| `subtitle` | Yes | Short description |
| `image` | No | Illustration path |
| `imageAlt` | No | Alt text for image |
| `paragraphs` | Yes | Array of story paragraphs (3-6 recommended) |
| `hint` | Yes | Interactive hint for students |
| `listenLabel` | Yes | Button label for text-to-speech |
| `nextLabel` | Yes | "Next" button text |

**Writing tips:**
- Use a child character the students can relate to (e.g., classmates, siblings)
- Start with a familiar everyday scenario
- End with a question that leads to the science topic
- 3-6 paragraphs, each 1-2 sentences
- Use simple vocabulary appropriate for the target grade

---

### Step Type: `prediction`

Multiple-choice questions students answer BEFORE the simulation. Tests prior knowledge and builds curiosity.

```json
{
  "type": "prediction",
  "title": { "zh": "你来预测", "en": "Make Your Prediction" },
  "questions": [
    {
      "question": { "zh": "用手快速搓桌子表面，手会感觉怎样？", "en": "If you rub the desk quickly, how will your hand feel?" },
      "image": "images/quiz-rub-desk.png",
      "imageAlt": { "zh": "手快速搓桌面", "en": "Hand rubbing desk surface" },
      "options": [
        { "zh": "变冷", "en": "Colder" },
        { "zh": "变热", "en": "Warmer" },
        { "zh": "没有变化", "en": "No change" }
      ],
      "correctIndex": 1,
      "explanation": { "zh": "摩擦会产生热量！", "en": "Friction generates heat!" }
    }
  ]
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Section title |
| `questions` | Yes | Array of quiz questions (2-4 recommended) |
| `questions[].question` | Yes | The question text |
| `questions[].image` | No | Illustration for the question |
| `questions[].imageAlt` | No | Alt text |
| `questions[].options` | Yes | Answer choices (2-4 options) |
| `questions[].correctIndex` | Yes | 0-based index of correct answer |
| `questions[].explanation` | Yes | Why this answer is correct |

**Writing tips:**
- Questions should be answerable from everyday experience
- Include a mix of easy and slightly tricky questions
- Explanations should connect to the science concepts they'll explore later
- 2-4 questions is ideal

---

### Step Type: `explore`

Configuration for the interactive simulation. Currently used to specify which simulation to show.

```json
{
  "type": "explore",
  "simulationType": "friction",
  "config": {
    "surfaces": ["wood", "sandpaper", "ice"],
    "showAtoms": true,
    "showThermometer": true,
    "showForceArrow": true
  },
  "instructions": { "zh": "拖动木块来回摩擦", "en": "Drag the block back and forth" }
}
```

| Field | Required | Description |
|-------|----------|-------------|
| `simulationType` | Yes | Which simulation to use |
| `config` | Yes | Simulation parameters |
| `instructions` | Yes | Brief usage instructions |

Currently available simulation types: `"friction"`. More will be added as we build them.

---

### Step Type: `challenge`

Post-simulation knowledge assessment. Supports ranking and true/false question types.

```json
{
  "type": "challenge",
  "title": { "zh": "知识挑战", "en": "Knowledge Challenge" },
  "questions": [
    {
      "question": { "zh": "把这些表面按摩擦力从小到大排列：", "en": "Rank from least to most friction:" },
      "image": "images/quiz-rank-surfaces.png",
      "imageAlt": { "zh": "三种表面", "en": "Three surfaces" },
      "questionType": "rank",
      "items": [
        { "zh": "冰面", "en": "Ice" },
        { "zh": "木头", "en": "Wood" },
        { "zh": "砂纸", "en": "Sandpaper" }
      ],
      "correctOrder": [0, 1, 2],
      "explanation": { "zh": "冰面最光滑，砂纸最粗糙", "en": "Ice is smoothest, sandpaper is roughest" }
    },
    {
      "question": { "zh": "判断对错：", "en": "True or False:" },
      "image": "images/quiz-rub-desk.png",
      "questionType": "truefalse",
      "statement": { "zh": "搓手会变热是因为摩擦产生热量", "en": "Rubbing hands gets warm because friction produces heat" },
      "isTrue": true,
      "explanation": { "zh": "正确！", "en": "Correct!" }
    }
  ]
}
```

Question types:

**`rank`** — Students arrange items in correct order:
| Field | Required | Description |
|-------|----------|-------------|
| `items` | Yes | Array of items to rank |
| `correctOrder` | Yes | Correct 0-based index order |

**`truefalse`** — Students judge a statement:
| Field | Required | Description |
|-------|----------|-------------|
| `statement` | Yes | The statement to judge |
| `isTrue` | Yes | Whether statement is true |

**`multichoice`** — Same as prediction questions:
| Field | Required | Description |
|-------|----------|-------------|
| `options` | Yes | Answer choices |
| `correctIndex` | Yes | 0-based index of correct answer |

---

### Step Type: `language-arts`

Cross-curricular language integration. Three sub-sections: writing, vocabulary, and song.

```json
{
  "type": "language-arts",
  "title": { "zh": "语文与英语", "en": "Language Arts & English" },
  "subtitle": { "zh": "用文字表达你的科学发现", "en": "Express your discoveries through language" },
  "writing": {
    "title": { "zh": "科学小作文", "en": "Science Writing" },
    "subtitle": { "zh": "用你学到的知识写一段话", "en": "Write about what you learned" },
    "template": {
      "zh": "今天我学到了______。当______时，______。我做了一个实验：______。",
      "en": "Today I learned ______. When ______, ______. I did an experiment: ______."
    },
    "tips": [
      { "zh": "先写你观察到了什么", "en": "First, write what you observed" },
      { "zh": "再写为什么会这样", "en": "Then, write why it happened" },
      { "zh": "最后写你的结论", "en": "Finally, write your conclusion" }
    ],
    "templateLabel": { "zh": "填空模板", "en": "Fill-in Template" },
    "freeWriteLabel": { "zh": "自由写作", "en": "Free Writing" },
    "placeholder": {
      "zh": "请在这里写下你的科学发现……",
      "en": "Write about your science discovery here..."
    }
  },
  "vocabulary": [
    {
      "zh": "摩擦力",
      "pinyin": "mo ca li",
      "en": "friction",
      "sentenceZh": "摩擦力让我的手变热了。",
      "sentenceEn": "Friction made my hands warm."
    }
  ],
  "song": {
    "title": { "zh": "摩擦力之歌", "en": "The Friction Song" },
    "subtitle": { "zh": "用英语唱出科学知识", "en": "Learn science through singing" },
    "melody": "(Tune: Row Row Row Your Boat)",
    "lines": [
      { "en": "Rub, rub, rub your hands,", "zh": "搓搓搓你的手，" },
      { "en": "Feel the friction heat!", "zh": "感受摩擦的热！" },
      { "en": "", "zh": "" }
    ],
    "keyWords": ["friction", "heat", "atoms", "rough", "smooth"]
  }
}
```

**Writing section:**
- `template`: Fill-in-the-blank template using `______` for blanks
- `tips`: 3 writing tips (observation, reasoning, conclusion)
- Support both template mode and free writing mode

**Vocabulary section (6-8 words recommended):**
| Field | Description |
|-------|-------------|
| `zh` | Chinese word |
| `pinyin` | Pinyin with tone marks |
| `en` | English translation |
| `sentenceZh` | Example sentence in Chinese |
| `sentenceEn` | Example sentence in English |

**Song section:**
- `melody`: Reference a familiar tune students know
- `lines`: Array of lyric lines. Use `{"en":"","zh":""}` for stanza breaks
- `keyWords`: Science vocabulary highlighted in the song

---

### Step Type: `hands-on`

Physical experiment students do with real materials. Must be low-cost and classroom-safe.

```json
{
  "type": "hands-on",
  "title": { "zh": "动手实验：摩擦力大比拼", "en": "Hands-On: Friction Challenge" },
  "subtitle": { "zh": "现在轮到你亲手验证了！", "en": "Your turn to test it!" },
  "intro": {
    "zh": "用真实的材料来做一次实验，看看现实和模拟是不是一样！",
    "en": "Use real materials to experiment and compare with the simulation!"
  },
  "image": "images/friction-handson.png",
  "cost": { "zh": "~1 元", "en": "~1 RMB" },
  "time": { "zh": "~20 分钟", "en": "~20 minutes" },
  "curriculum": {
    "zh": "课标对应：物质科学 > 力的作用 > 摩擦力（3-4年级）",
    "en": "Curriculum: Physical Science > Forces > Friction (Grade 3-4)"
  },
  "materials": [
    {
      "name": { "zh": "小木块 1 个", "en": "1 small wooden block" },
      "note": { "zh": "可以用橡皮代替", "en": "An eraser works too" }
    },
    {
      "name": { "zh": "橡皮筋 1 根", "en": "1 rubber band" },
      "note": { "zh": "用来测量拉力", "en": "To measure pulling force" }
    }
  ],
  "experimentSteps": [
    { "zh": "用橡皮筋绑住小木块", "en": "Tie the rubber band around the block" },
    { "zh": "在光滑桌面上拉着木块滑动", "en": "Drag the block across the smooth desk" },
    { "zh": "把砂纸铺在桌上，再拉一次", "en": "Put sandpaper on desk, drag again" }
  ],
  "record": {
    "title": { "zh": "实验记录表", "en": "Experiment Record Sheet" },
    "headers": [
      { "zh": "表面", "en": "Surface" },
      { "zh": "橡皮筋拉长(cm)", "en": "Band stretch (cm)" },
      { "zh": "温度感觉", "en": "Temperature feel" }
    ],
    "rows": [
      { "zh": "光滑桌面", "en": "Smooth desk" },
      { "zh": "砂纸", "en": "Sandpaper" },
      { "zh": "毛巾", "en": "Towel" }
    ]
  },
  "verify": {
    "zh": "做完实验后，回到模拟中对比结果！",
    "en": "After the experiment, compare with the simulation!"
  }
}
```

**IMPORTANT constraints:**
- **Cost: max 5 RMB per student** (成本不超过5元/学生)
- Materials must be readily available in rural Chinese schools or homes
- No dangerous chemicals, sharp objects, or fire for elementary students
- Include substitution notes for every material

---

### Step Type: `reflection`

Summary, journal writing, and self-assessment. Wraps up the entire learning experience.

```json
{
  "type": "reflection",
  "title": { "zh": "总结与反思", "en": "Summary & Reflection" },
  "subtitle": { "zh": "回顾你今天的学习旅程", "en": "Review your learning journey" },
  "journey": [
    { "step": { "zh": "故事", "en": "Story" }, "desc": { "zh": "小明搓手取暖", "en": "Xiao Ming rubbed hands" } },
    { "step": { "zh": "预测", "en": "Predict" }, "desc": { "zh": "预测摩擦力的效果", "en": "Predicted friction effects" } }
  ],
  "keyFindings": [
    {
      "title": { "zh": "摩擦产生热", "en": "Friction Produces Heat" },
      "desc": { "zh": "两个表面摩擦时原子碰撞产生热能", "en": "Atoms collide when surfaces rub, producing heat" }
    }
  ],
  "journal": {
    "title": { "zh": "科学日志", "en": "Science Journal" },
    "prompt": { "zh": "写下你最大的发现：", "en": "Write about your biggest discovery:" },
    "placeholder": { "zh": "今天我最大的发现是……", "en": "My biggest discovery today was..." }
  },
  "selfCheckTitle": { "zh": "自我评价", "en": "Self-Assessment" },
  "selfCheckItems": [
    { "zh": "我能解释摩擦力如何产生热量", "en": "I can explain how friction produces heat" },
    { "zh": "我能说出科学词汇的中英文", "en": "I can say science vocabulary in both languages" }
  ],
  "curriculum": {
    "zh": "课标：义务教育科学课程标准（2022）> 物质科学 > 力的作用",
    "en": "Curriculum: Science Standards (2022) > Physical Science > Forces"
  }
}
```

---

## 4. 从 DocAI 创建模块 / Creating Modules from DocAI

### Workflow / 工作流程

```
DocAI Chat (aitutor.ink)
  │
  │  1. Student chats with AI: "帮我设计一个关于水循环的学习模块"
  │     (Help me design a learning module about the water cycle)
  │
  │  2. AI generates module.json following this schema
  │
  │  3. AI generates illustration descriptions
  │     (use DocAI's image generation, or describe for manual creation)
  │
  │  4. Student reviews and refines content
  │
  └──> 5. Export module.json
           │
           │  6. Fork this GitHub repo
           │  7. Add module.json to content/modules/your-id/
           │  8. Add images to public/images/
           │  9. Register in content/index.ts
           │  10. Submit Pull Request
           │
           └──> Merged & auto-deployed to student site
```

### AI Prompt Template for DocAI / DocAI 的 AI 提示模板

Copy this prompt into a DocAI chat session to generate a module:

```
你是一个小学科学课程设计师。请按照以下JSON格式，为我设计一个关于"[主题]"的跨学科学习模块。

目标年级：[3-4年级 / 5-6年级]
课标对齐：义务教育科学课程标准（2022版）
语言：大部分文本字段中英双语，格式为 {"zh": "...", "en": "..."}。例外字段（不双语）：id、version、grade、duration、costPerStudent、pinyin、melody、keyWords、simulationType、questionType、correctIndex、correctOrder、isTrue等。

模块必须包含以下步骤（按顺序）：
1. story - 用一个小学生能理解的生活故事引入科学概念（3-5段）
2. prediction - 3道选择题，考查学生的日常经验（每题3个选项）
3. explore - 模拟实验的配置（simulationType 和 config）
4. challenge - 4道知识挑战题（混合排序题和判断题）
5. language-arts - 包含：
   - writing: 语文写作模板（用______表示填空）+ 3个写作提示
   - vocabulary: 6个科学词汇（含拼音、英文、例句）
   - song: 一首英文科学歌曲（套用熟悉旋律）+ 关键词列表
6. hands-on - 动手实验（成本不超过5元/学生，材料在农村学校可获得）
7. reflection - 学习旅程回顾 + 3个核心发现 + 科学日志 + 4个自评项目

输出格式：一个完整的JSON对象，顶层有 metadata 和 steps 两个字段。
metadata 必须包含：id, version("1.0.0"), title, description, grade, subjects, curriculumStandard("2022"), topic, duration, costPerStudent, authors, tags

请直接输出JSON，不要有其他说明文字。
```

### Example Topics for New Modules / 可以尝试的主题

| Grade | Topic (ZH) | Topic (EN) | Curriculum Area |
|-------|-----------|------------|-----------------|
| 1-2 | 光和影子 | Light and Shadow | 物质科学 > 能的转化 |
| 1-2 | 推和拉 | Push and Pull | 物质科学 > 力的作用 |
| 3-4 | 水循环 | Water Cycle | 地球与宇宙科学 > 水循环 |
| 3-4 | 植物生长 | Plant Growth | 生命科学 > 生物体的结构 |
| 3-4 | 声音的传播 | Sound Travel | 物质科学 > 能的转化 |
| 3-4 | 简单电路 | Simple Circuits | 物质科学 > 能的转化 |
| 5-6 | 杠杆原理 | Levers | 物质科学 > 力的作用 |
| 5-6 | 食物链 | Food Chains | 生命科学 > 生物与环境 |
| 5-6 | 月相变化 | Moon Phases | 地球与宇宙科学 > 天体运动 |

---

## 5. 设计原则 / Design Principles

### Cross-Curricular Flow / 跨学科流程

```
Science Sim        语文 Writing       English Vocab/Song     Hands-On
(探索理解)    -->    (表达)       -->    (语言)          -->    (实践验证)
Understand          Express             Language               Verify
```

Each module should integrate at least 2 subjects. The ideal is all 3: science + Chinese + English.

### Constraints / 约束

| Rule | Details |
|------|---------|
| **Cost** | Hands-on materials: max 5 RMB/student (农村学校经济考虑) |
| **Language** | ALL text bilingual zh/en, Chinese is default |
| **Grade level** | Language complexity must match target grade |
| **Safety** | No fire, chemicals, sharp objects for grades 1-4 |
| **Accessibility** | Materials available in rural Chinese schools |
| **Duration** | Single class period (~40 min) unless noted |
| **Curriculum** | Must align with 2022 义务教育课程标准 |

### Writing Guide for Different Grades / 不同年级的写作指南

**Grades 1-2 (6-8 years old):**
- Use very simple sentences (subject + verb + object)
- Story characters should be peers (classmates)
- 1-2 prediction questions, 2-3 options each
- Vocabulary: 4 words max, basic nouns
- Writing template: fill-in single words/phrases
- Experiment: observation only, no measurement

**Grades 3-4 (8-10 years old):**
- Can handle cause-and-effect reasoning
- Story can include "why" questions
- 3 prediction + 4 challenge questions
- Vocabulary: 6 words, include verbs and adjectives
- Writing template: fill-in phrases and short sentences
- Experiment: simple measurements (length, temperature feel)

**Grades 5-6 (10-12 years old):**
- Can handle abstract concepts
- Story can include hypothetical scenarios
- More complex challenge questions (multi-step ranking)
- Vocabulary: 8 words, include process words
- Writing: free writing encouraged, template as scaffold
- Experiment: precise measurements, data recording, graphing

---

## 6. API 接口 / API Reference

The platform exposes a REST API for content access:

### List all modules / 列出所有模块

```
GET /api/content
```

Response:
```json
[
  {
    "id": "friction-lab",
    "metadata": {
      "id": "friction-lab",
      "version": "1.0.0",
      "title": { "zh": "摩擦力实验室", "en": "Friction Lab" },
      ...
    }
  }
]
```

### Get module detail / 获取模块详情

```
GET /api/content/{module-id}
```

Response: Full `module.json` content.

Example:
```bash
curl https://your-domain.replit.app/api/content/friction-lab
```

### Future: Push content from DocAI / 未来：从 DocAI 推送内容

```
POST /api/content/{module-id}
Content-Type: application/json
Authorization: Bearer <token>

{ "metadata": {...}, "steps": [...] }
```

(Not yet implemented. Currently use GitHub PR workflow.)

---

## 7. 验证与测试 / Validation & Testing

### Manual validation checklist / 手动验证清单

Before submitting a PR, check:

- [ ] All text fields have both `zh` and `en`
- [ ] `metadata.id` matches the folder name
- [ ] `metadata.grade` is a valid range (e.g., "3-4")
- [ ] `metadata.subjects` only contains valid values
- [ ] All `correctIndex` values are within the options array bounds
- [ ] All `correctOrder` arrays have the same length as `items`
- [ ] All `isTrue` values are boolean (`true` or `false`)
- [ ] Image paths start with `images/` and files exist in `public/images/`
- [ ] Hands-on cost is within 5 RMB/student budget
- [ ] Vocabulary includes pinyin with tone marks
- [ ] Song melody references a tune familiar to Chinese elementary students
- [ ] Writing template uses `______` for blanks (6 underscores)

### Validate JSON syntax / 验证JSON语法

```bash
# Check JSON is valid
node -e "JSON.parse(require('fs').readFileSync('content/modules/your-id/module.json'))"
```

### Test in browser / 在浏览器中测试

After adding the module, start the dev server and visit:
```
http://localhost:PORT/content
```

Your new module should appear in the catalog with all metadata displayed correctly.

---

## Reference: Complete module.json Template / 完整模板

See `content/modules/friction-lab/module.json` for a production-ready example with all 7 steps fully populated. This is the gold standard reference.

File size: ~307 lines of JSON.

---

## Contact / 联系

- **Platform**: [DocAI (aitutor.ink)](https://agent.aitutor.ink)
- **Course**: LANG 2077 - Language Skills for Human-AI Partnership (HKBU)
- **Owner**: Simon Wang
