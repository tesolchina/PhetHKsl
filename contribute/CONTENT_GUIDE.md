# 内容创作指南 | Content Guide

本指南帮助贡献者了解如何创建和编辑学习模块内容。

This guide helps contributors understand how to create and edit learning module content.

---

## 目录 | Table of Contents

- [文件组织 | File Organization](#文件组织--file-organization)
- [模块 JSON 结构 | Module JSON Structure](#模块-json-structure)
- [双语文本格式 | Bilingual Text Format](#双语文本格式--bilingual-text-format)
- [模块元数据 | Module Metadata](#模块元数据--module-metadata)
- [步骤类型 | Step Types](#步骤类型--step-types)
- [命名约定 | Naming Conventions](#命名约定--naming-conventions)
- [完整示例 | Complete Example](#完整示例--complete-example)

---

## 文件组织 | File Organization

学习模块存放在 `artifacts/phet-sims/content/modules/` 目录下。每个模块有自己的文件夹：

Learning modules are stored under `artifacts/phet-sims/content/modules/`. Each module has its own folder:

```
artifacts/phet-sims/
├── content/
│   ├── schema.ts              # TypeScript 类型定义（参考用）
│   └── modules/
│       ├── friction-lab/      # 摩擦力实验室模块
│       │   └── module.json    # 模块主文件（必需）
│       ├── energy-park/       # 另一个模块示例
│       │   └── module.json
│       └── ...
└── public/
    └── images/                # 模块共享图片目录
        ├── friction-story.png
        ├── quiz-rub-desk.png
        └── ...
```

### 关键规则 | Key Rules

- 每个模块目录名使用小写字母和连字符（如 `friction-lab`）
- 主文件必须命名为 `module.json`
- 图片放在 `artifacts/phet-sims/public/images/` 共享目录中（由 Vite 静态文件服务器提供）
- 在 `module.json` 中，图片路径使用 `"images/文件名.png"` 格式引用
- 模块 ID 应与目录名一致

- Each module directory uses lowercase letters and hyphens (e.g., `friction-lab`)
- The main file must be named `module.json`
- Images go in the shared `artifacts/phet-sims/public/images/` directory (served by Vite's static file server)
- In `module.json`, reference images using the `"images/filename.png"` format
- Module ID should match the directory name

---

## 模块 JSON 结构 | Module JSON Structure

每个 `module.json` 文件包含两个顶层字段：

Each `module.json` file contains two top-level fields:

```json
{
  "metadata": { ... },
  "steps": [ ... ]
}
```

- `metadata` — 模块的基本信息（标题、年级、学科等）
- `steps` — 学习步骤数组，按学习顺序排列

- `metadata` — Basic module info (title, grade, subjects, etc.)
- `steps` — Array of learning steps in order

---

## 双语文本格式 | Bilingual Text Format

所有面向用户的文本使用 `BilingualText` 格式：

All user-facing text uses the `BilingualText` format:

```json
{
  "zh": "中文内容",
  "en": "English content"
}
```

### 要求 | Requirements

- `zh` 和 `en` 字段都必须提供，不能留空
- 中英文内容应表达相同的含义，但不需要逐字翻译
- 中文使用简体字
- 英文应适合目标年级的学生理解

- Both `zh` and `en` fields are required and cannot be empty
- Chinese and English should convey the same meaning, but word-for-word translation is not required
- Chinese uses simplified characters
- English should be appropriate for the target grade level

### 示例 | Example

```json
{
  "zh": "摩擦力就是两个东西互相摩擦时产生的力。",
  "en": "Friction is the force produced when two objects rub against each other."
}
```

---

## 模块元数据 | Module Metadata

`metadata` 对象包含以下字段：

The `metadata` object contains these fields:

| 字段 Field | 类型 Type | 必需 Required | 说明 Description |
|-----------|----------|:------------:|-----------------|
| `id` | string | ✅ | 模块唯一标识符，与目录名一致 / Unique module ID, matches directory name |
| `version` | string | ✅ | 语义化版本号 / Semantic version (e.g., `"1.0.0"`) |
| `title` | BilingualText | ✅ | 模块标题 / Module title |
| `description` | BilingualText | ✅ | 简短描述（1-2句话） / Brief description (1-2 sentences) |
| `grade` | string | ✅ | 目标年级范围 / Target grade range (e.g., `"3-4"`) |
| `subjects` | string[] | ✅ | 涉及学科 / Subjects involved |
| `curriculumStandard` | string | ✅ | 对应的课程标准 / Curriculum standard (e.g., `"2022"`) |
| `topic` | BilingualText | ✅ | 课标主题路径 / Curriculum topic path |
| `duration` | string | ✅ | 预计时长 / Estimated duration (e.g., `"40min"`) |
| `costPerStudent` | string | ✅ | 每人材料费用 / Material cost per student |
| `authors` | Author[] | ✅ | 作者列表 / Author list |
| `tags` | {zh: string[], en: string[]} | ✅ | 中英文标签 / Bilingual tags |

### subjects 可选值 | Allowed values for subjects

- `"science"` — 科学
- `"chinese"` — 语文
- `"english"` — 英语
- `"math"` — 数学

### 元数据示例 | Metadata Example

```json
{
  "metadata": {
    "id": "friction-lab",
    "version": "1.0.0",
    "title": { "zh": "摩擦力实验室", "en": "Friction Lab" },
    "description": {
      "zh": "通过故事、预测、模拟和动手挑战，探索摩擦力如何产生热量！",
      "en": "Explore how friction creates heat through story, prediction, simulation, and hands-on challenges!"
    },
    "grade": "3-4",
    "subjects": ["science", "chinese", "english"],
    "curriculumStandard": "2022",
    "topic": {
      "zh": "物质科学 > 力的作用 > 摩擦力",
      "en": "Physical Science > Forces > Friction"
    },
    "duration": "40min",
    "costPerStudent": "1 RMB",
    "authors": [],
    "tags": {
      "zh": ["摩擦力", "热量", "原子", "跨学科"],
      "en": ["Friction", "Heat", "Atoms", "Cross-curricular"]
    }
  }
}
```

---

## 步骤类型 | Step Types

每个模块由一系列学习步骤组成。目前支持 7 种步骤类型：

Each module consists of a series of learning steps. Currently 7 step types are supported:

### 1. 📖 故事引入 | Story (`type: "story"`)

用故事引入学习主题，激发学生兴趣。

Introduce the topic through a story to spark student interest.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"story"` | 固定值 / Fixed value |
| `title` | BilingualText | 故事标题 / Story title |
| `subtitle` | BilingualText | 副标题 / Subtitle |
| `image` | string (可选) | 插图路径 / Illustration path |
| `imageAlt` | BilingualText (可选) | 图片描述 / Image alt text |
| `paragraphs` | BilingualText[] | 故事段落数组 / Array of story paragraphs |
| `hint` | BilingualText | 互动提示 / Interactive hint |
| `listenLabel` | BilingualText | 听故事按钮文字 / Listen button label |
| `nextLabel` | BilingualText | 下一步按钮文字 / Next button label |

```json
{
  "type": "story",
  "title": { "zh": "搓搓手，暖暖手", "en": "Rub Your Hands, Warm Your Hands" },
  "subtitle": { "zh": "一个关于摩擦力的小故事", "en": "A Story About Friction" },
  "paragraphs": [
    { "zh": "冬天的早晨，小明在操场上冻得直哆嗦。", "en": "On a cold winter morning, Xiao Ming was shivering on the playground." },
    { "zh": "他把两只手掌合在一起，快速地搓了起来。", "en": "He pressed his palms together and rubbed them quickly back and forth." }
  ],
  "hint": { "zh": "试试搓搓你自己的双手！", "en": "Try rubbing your own hands together!" },
  "listenLabel": { "zh": "听故事", "en": "Listen" },
  "nextLabel": { "zh": "我准备好了", "en": "I'm Ready" }
}
```

### 2. 🔮 预测环节 | Prediction (`type: "prediction"`)

让学生在实验前做出预测，培养科学思维。

Have students make predictions before experimenting, developing scientific thinking.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"prediction"` | 固定值 / Fixed value |
| `title` | BilingualText | 标题 / Title |
| `questions` | QuizQuestion[] | 预测问题数组 / Array of prediction questions |

**QuizQuestion 结构 | QuizQuestion Structure:**

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `question` | BilingualText | 问题文本 / Question text |
| `image` | string (可选) | 问题图片 / Question image |
| `imageAlt` | BilingualText (可选) | 图片描述 / Image alt text |
| `options` | BilingualText[] | 选项数组 / Array of options |
| `correctIndex` | number | 正确答案索引（从0开始） / Correct answer index (0-based) |
| `explanation` | BilingualText | 答案解释 / Answer explanation |

```json
{
  "type": "prediction",
  "title": { "zh": "你来预测", "en": "Make Your Prediction" },
  "questions": [
    {
      "question": { "zh": "用手快速搓桌子表面，手会感觉怎样？", "en": "If you rub the desk quickly, how will your hand feel?" },
      "options": [
        { "zh": "变冷", "en": "Colder" },
        { "zh": "变热", "en": "Warmer" },
        { "zh": "没有变化", "en": "No change" }
      ],
      "correctIndex": 1,
      "explanation": {
        "zh": "摩擦会产生热量！",
        "en": "Friction generates heat!"
      }
    }
  ]
}
```

### 3. 🔬 模拟探索 | Explore (`type: "explore"`)

让学生操作 PhET 模拟进行探究。

Let students operate the PhET simulation to investigate.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"explore"` | 固定值 / Fixed value |
| `simulationType` | string | 模拟类型标识 / Simulation type identifier |
| `config` | object | 模拟配置参数 / Simulation configuration |
| `instructions` | BilingualText | 操作说明 / Instructions |

```json
{
  "type": "explore",
  "simulationType": "friction",
  "config": {
    "surfaces": ["wood", "sandpaper", "ice"],
    "showAtoms": true,
    "showThermometer": true
  },
  "instructions": {
    "zh": "拖动木块来回摩擦，观察原子碰撞和温度变化",
    "en": "Drag the block back and forth to observe atomic collisions and temperature changes"
  }
}
```

### 4. 🏆 知识挑战 | Challenge (`type: "challenge"`)

通过多种题型测试学生的理解。

Test student understanding through various question types.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"challenge"` | 固定值 / Fixed value |
| `title` | BilingualText | 标题 / Title |
| `questions` | ChallengeQuestion[] | 挑战问题数组 / Array of challenge questions |

**题型 | Question Types:**

- `"rank"` — 排序题：将选项按正确顺序排列 / Ranking: arrange items in correct order
  - 需要 `items` (BilingualText[]) 和 `correctOrder` (number[])
- `"truefalse"` — 判断题：判断陈述是否正确 / True/False: judge if statement is correct
  - 需要 `statement` (BilingualText) 和 `isTrue` (boolean)
- `"multichoice"` — 选择题：从多个选项中选择 / Multiple choice: select from options
  - 需要 `options` (BilingualText[]) 和 `correctIndex` (number)

所有题型都需要 `question`、`explanation` 字段，可选 `image` 和 `imageAlt`。

All types require `question` and `explanation` fields, with optional `image` and `imageAlt`.

### 5. ✍️ 语文与英语 | Language Arts (`type: "language-arts"`)

融合语文写作和英语词汇学习。

Integrate Chinese writing and English vocabulary learning.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"language-arts"` | 固定值 / Fixed value |
| `title` | BilingualText | 标题 / Title |
| `subtitle` | BilingualText | 副标题 / Subtitle |
| `writing` | WritingSection | 写作部分 / Writing section |
| `vocabulary` | VocabWord[] | 词汇列表 / Vocabulary list |
| `song` | SongSection | 歌曲部分 / Song section |

**VocabWord 结构 | VocabWord Structure:**

```json
{
  "zh": "摩擦力",
  "pinyin": "mó cā lì",
  "en": "friction",
  "sentenceZh": "摩擦力让我的手变热了。",
  "sentenceEn": "Friction made my hands warm."
}
```

**WritingSection** 包含写作模板 (`template`)、写作技巧 (`tips`)、占位符文本 (`placeholder`) 等。

**WritingSection** includes a writing template (`template`), writing tips (`tips`), placeholder text (`placeholder`), etc.

### 6. 🧪 动手实验 | Hands-On (`type: "hands-on"`)

引导学生使用真实材料做实验，与模拟结果对照。

Guide students to experiment with real materials and compare with simulation results.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"hands-on"` | 固定值 / Fixed value |
| `title` | BilingualText | 标题 / Title |
| `subtitle` | BilingualText | 副标题 / Subtitle |
| `intro` | BilingualText | 实验介绍 / Experiment introduction |
| `image` | string (可选) | 实验图片 / Experiment image |
| `cost` | BilingualText | 材料费用 / Material cost |
| `time` | BilingualText | 预计时间 / Estimated time |
| `curriculum` | BilingualText | 课标对应 / Curriculum alignment |
| `materials` | MaterialItem[] | 材料清单 / Material list |
| `experimentSteps` | BilingualText[] | 实验步骤 / Experiment steps |
| `record` | RecordSection | 记录表 / Record sheet |
| `verify` | BilingualText | 验证说明 / Verification instruction |

**MaterialItem:**
```json
{
  "name": { "zh": "小木块 1 个", "en": "1 small wooden block" },
  "note": { "zh": "可以用橡皮代替", "en": "An eraser works too" }
}
```

### 7. 💭 总结反思 | Reflection (`type: "reflection"`)

引导学生回顾学习历程并进行自我评价。

Guide students to review their learning journey and self-assess.

| 字段 Field | 类型 Type | 说明 Description |
|-----------|----------|-----------------|
| `type` | `"reflection"` | 固定值 / Fixed value |
| `title` | BilingualText | 标题 / Title |
| `subtitle` | BilingualText | 副标题 / Subtitle |
| `journey` | JourneyItem[] | 学习旅程回顾 / Learning journey review |
| `keyFindings` | FindingItem[] | 关键发现 / Key findings |
| `journal` | JournalSection | 科学日志 / Science journal |
| `selfCheckTitle` | BilingualText | 自我评价标题 / Self-check title |
| `selfCheckItems` | BilingualText[] | 自我评价项目 / Self-check items |
| `curriculum` | BilingualText | 课标对应 / Curriculum alignment |

---

## 命名约定 | Naming Conventions

| 项目 Item | 约定 Convention | 示例 Example |
|-----------|----------------|-------------|
| 模块目录名 Module directory | 小写字母+连字符 / lowercase + hyphens | `friction-lab`, `energy-park` |
| 模块 ID | 与目录名一致 / Same as directory name | `"friction-lab"` |
| 图片文件 Image files | 小写字母+连字符 / lowercase + hyphens | `friction-story.png` |
| 图片目录 Image directory | 固定为 `images/` | `images/` |
| 主文件 Main file | 固定为 `module.json` | `module.json` |

---

## 完整示例 | Complete Example

以下是摩擦力实验室模块 (`friction-lab`) 的简化结构概览。完整文件请参考 `artifacts/phet-sims/content/modules/friction-lab/module.json`。

Below is a simplified structural overview of the friction lab module (`friction-lab`). For the complete file, refer to `artifacts/phet-sims/content/modules/friction-lab/module.json`.

```json
{
  "metadata": {
    "id": "friction-lab",
    "version": "1.0.0",
    "title": { "zh": "摩擦力实验室", "en": "Friction Lab" },
    "description": { "zh": "探索摩擦力如何产生热量！", "en": "Explore how friction creates heat!" },
    "grade": "3-4",
    "subjects": ["science", "chinese", "english"],
    "curriculumStandard": "2022",
    "topic": { "zh": "物质科学 > 力的作用 > 摩擦力", "en": "Physical Science > Forces > Friction" },
    "duration": "40min",
    "costPerStudent": "1 RMB",
    "authors": [],
    "tags": {
      "zh": ["摩擦力", "热量"],
      "en": ["Friction", "Heat"]
    }
  },
  "steps": [
    { "type": "story", "title": { "zh": "...", "en": "..." }, "..." : "..." },
    { "type": "prediction", "title": { "zh": "...", "en": "..." }, "..." : "..." },
    { "type": "explore", "simulationType": "friction", "..." : "..." },
    { "type": "challenge", "title": { "zh": "...", "en": "..." }, "..." : "..." },
    { "type": "language-arts", "title": { "zh": "...", "en": "..." }, "..." : "..." },
    { "type": "hands-on", "title": { "zh": "...", "en": "..." }, "..." : "..." },
    { "type": "reflection", "title": { "zh": "...", "en": "..." }, "..." : "..." }
  ]
}
```

### 推荐步骤顺序 | Recommended Step Order

虽然步骤顺序可以灵活调整，但推荐的学习流程为：

While step order is flexible, the recommended learning flow is:

1. **Story** → 激发兴趣 / Spark interest
2. **Prediction** → 建立预期 / Set expectations
3. **Explore** → 操作模拟 / Interact with simulation
4. **Challenge** → 巩固知识 / Reinforce knowledge
5. **Language Arts** → 语言表达 / Language expression
6. **Hands-On** → 真实验证 / Real-world verification
7. **Reflection** → 总结反思 / Summarize and reflect

并非所有模块都需要包含全部 7 种步骤。最小可行模块至少需要包含 `explore` 步骤和 1-2 种其他步骤。

Not all modules need to include all 7 step types. A minimum viable module needs at least an `explore` step and 1-2 other step types.

---

## 验证您的内容 | Validating Your Content

在提交之前，请确保：

Before submitting, please verify:

1. **JSON 有效性** — 使用 JSON 验证工具检查语法 / Use a JSON validator to check syntax
2. **必需字段** — 所有标记为必需的字段都已提供 / All required fields are provided
3. **双语完整性** — 每个 BilingualText 都有 `zh` 和 `en` / Every BilingualText has both `zh` and `en`
4. **答案正确性** — 所有测验的 `correctIndex` 和 `correctOrder` 都正确 / All quiz `correctIndex` and `correctOrder` are correct
5. **文件位置** — 文件放在正确的目录结构中 / Files are in the correct directory structure

```bash
# 快速验证 JSON 格式 / Quick JSON validation
cat artifacts/phet-sims/content/modules/your-module/module.json | python3 -m json.tool > /dev/null && echo "Valid JSON" || echo "Invalid JSON"
```
