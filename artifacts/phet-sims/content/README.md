# Content Model / 内容模型

This directory contains the standardized content format for learning modules. Anyone can contribute new modules by following this schema.

这个目录包含学习模块的标准化内容格式。任何人都可以按照这个格式贡献新的模块。

## Directory Structure / 目录结构

```
content/
  schema.ts           # TypeScript type definitions / 类型定义
  README.md           # This file / 本文件
  modules/
    friction-lab/     # Each module gets its own folder / 每个模块一个文件夹
      module.json     # Module content data / 模块内容数据
```

## How to Contribute / 如何贡献

1. Create a new folder under `content/modules/` with your module ID
2. Create a `module.json` file following the schema below
3. Add any images to `public/images/`
4. Submit a Pull Request

---

1. 在 `content/modules/` 下创建一个新文件夹，用你的模块ID命名
2. 创建一个 `module.json` 文件，按照下面的格式
3. 将图片放到 `public/images/`
4. 提交 Pull Request

## Module JSON Schema / 模块JSON格式

### Bilingual Text / 双语文本

All text fields use a bilingual object:

```json
{ "zh": "中文文本", "en": "English text" }
```

### Metadata / 元数据

```json
{
  "metadata": {
    "id": "module-id",
    "version": "1.0.0",
    "title": { "zh": "模块标题", "en": "Module Title" },
    "description": { "zh": "描述", "en": "Description" },
    "grade": "3-4",
    "subjects": ["science", "chinese", "english"],
    "curriculumStandard": "2022",
    "topic": { "zh": "主题", "en": "Topic" },
    "duration": "40min",
    "costPerStudent": "1 RMB",
    "authors": [{ "name": "Author", "role": "Content Designer" }],
    "tags": { "zh": ["标签"], "en": ["tag"] }
  }
}
```

### Step Types / 步骤类型

Each module contains a `steps` array. Available step types:

| Type | Description (EN) | Description (ZH) |
|------|------------------|-------------------|
| `story` | Narrative introduction with character and scenario | 故事引入，包含角色和情境 |
| `prediction` | Multiple-choice prediction questions | 多选预测题 |
| `explore` | Interactive simulation | 互动模拟实验 |
| `challenge` | Knowledge challenge (rank, true/false, etc.) | 知识挑战（排序、判断等） |
| `language-arts` | Writing templates, vocabulary, songs | 语文写作、英语词汇、歌曲 |
| `hands-on` | Physical experiment instructions | 动手实验指导 |
| `reflection` | Summary, journal, self-assessment | 总结、日志、自我评价 |

### Example: Story Step

```json
{
  "type": "story",
  "title": { "zh": "故事标题", "en": "Story Title" },
  "subtitle": { "zh": "副标题", "en": "Subtitle" },
  "image": "images/story-image.png",
  "paragraphs": [
    { "zh": "第一段中文", "en": "First paragraph English" }
  ],
  "hint": { "zh": "提示", "en": "Hint" },
  "listenLabel": { "zh": "听故事", "en": "Listen" },
  "nextLabel": { "zh": "下一步", "en": "Next" }
}
```

### Example: Prediction Step

```json
{
  "type": "prediction",
  "title": { "zh": "预测", "en": "Prediction" },
  "questions": [
    {
      "question": { "zh": "问题", "en": "Question" },
      "image": "images/quiz-image.png",
      "options": [
        { "zh": "选项A", "en": "Option A" },
        { "zh": "选项B", "en": "Option B" }
      ],
      "correctIndex": 1,
      "explanation": { "zh": "解释", "en": "Explanation" }
    }
  ]
}
```

### Example: Language Arts Step

```json
{
  "type": "language-arts",
  "title": { "zh": "语文与英语", "en": "Language Arts" },
  "writing": {
    "title": { "zh": "写作", "en": "Writing" },
    "template": { "zh": "模板……", "en": "Template..." },
    "tips": [{ "zh": "提示", "en": "Tip" }]
  },
  "vocabulary": [
    {
      "zh": "词语",
      "pinyin": "ci yu",
      "en": "word",
      "sentenceZh": "例句中文",
      "sentenceEn": "Example sentence"
    }
  ],
  "song": {
    "title": { "zh": "歌名", "en": "Song Title" },
    "melody": "(Tune: ...)",
    "lines": [{ "en": "English lyrics", "zh": "中文歌词" }],
    "keyWords": ["word1", "word2"]
  }
}
```

### Example: Hands-On Step

```json
{
  "type": "hands-on",
  "title": { "zh": "动手实验", "en": "Hands-On Experiment" },
  "cost": { "zh": "~1 元", "en": "~1 RMB" },
  "time": { "zh": "~20 分钟", "en": "~20 min" },
  "materials": [
    {
      "name": { "zh": "材料名", "en": "Material name" },
      "note": { "zh": "备注", "en": "Note" }
    }
  ],
  "experimentSteps": [
    { "zh": "步骤1", "en": "Step 1" }
  ],
  "record": {
    "title": { "zh": "记录表", "en": "Record Sheet" },
    "headers": [{ "zh": "列标题", "en": "Column Header" }],
    "rows": [{ "zh": "行名", "en": "Row name" }]
  }
}
```

## Curriculum Alignment / 课标对齐

Modules should align with the 2022 Chinese Compulsory Education Curriculum Standards (义务教育课程标准2022版). Reference the specific standard in your metadata.

## Cross-Curricular Design / 跨学科设计

The recommended flow for a complete learning module:

```
Science Sim (探索理解) -> 语文 Writing (表达) -> English Vocab/Song (语言) -> Hands-On (实践)
```

Each module should aim to integrate at least 2 subjects.

## Cost Constraint / 成本限制

Hands-on experiments must cost no more than 5 RMB per student (动手实验每个学生不超过5元).
