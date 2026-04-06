# 贡献指南 | Contributing Guide

欢迎来到 PhET 中文学习平台项目！我们非常感谢您有兴趣为这个教育项目做出贡献。本指南将帮助您了解如何参与。

Welcome to the PhET Chinese Learning Platform project! We greatly appreciate your interest in contributing to this educational project. This guide will help you understand how to participate.

---

## 目录 | Table of Contents

- [贡献方式 | Ways to Contribute](#贡献方式--ways-to-contribute)
- [入门指南 | Getting Started](#入门指南--getting-started)
- [提交流程 | Submission Process](#提交流程--submission-process)
- [内容贡献类型 | Content Contribution Types](#内容贡献类型--content-contribution-types)
- [质量标准 | Quality Standards](#质量标准--quality-standards)
- [审核流程 | Review Process](#审核流程--review-process)
- [行为准则 | Code of Conduct](#行为准则--code-of-conduct)

---

## 贡献方式 | Ways to Contribute

我们欢迎以下类型的贡献：

We welcome the following types of contributions:

| 类型 Type | 说明 Description |
|-----------|-----------------|
| **课程映射 Curriculum Mapping** | 将 PhET 模拟与各地区课程标准对应 / Map PhET simulations to regional curriculum standards |
| **学习模块 Learning Modules** | 创建基于模拟的跨学科学习模块 / Create simulation-based cross-curricular learning modules |
| **翻译 Translations** | 改善中英双语内容质量 / Improve bilingual content quality |
| **跨学科方案 Cross-curricular Ideas** | 提出科学×语文×英语的融合教学建议 / Suggest science × Chinese × English integration ideas |
| **内容纠错 Content Corrections** | 修正学科内容、翻译或格式错误 / Fix subject content, translation, or formatting errors |

### 工具中立原则 | Tool-Neutral Approach

本项目采用工具中立原则。您可以使用任何工具来创作内容——手动编写、使用 AI 辅助工具、或其他任何方法都可以。我们关注的是内容质量，而不是创作工具。

This project follows a tool-neutral approach. You may use any tool to create content — manual writing, AI-assisted tools, or any other method. We focus on content quality, not the tools used to create it.

---

## 入门指南 | Getting Started

### 1. Fork 仓库 | Fork the Repository

点击 GitHub 页面右上角的 "Fork" 按钮，将仓库复制到您的帐户。

Click the "Fork" button in the upper right corner of the GitHub page to copy the repository to your account.

### 2. 克隆仓库 | Clone Your Fork

```bash
git clone https://github.com/YOUR-USERNAME/PhetHKsl.git
cd PhetHKsl
```

### 3. 创建分支 | Create a Branch

请使用描述性的分支名称：

Use a descriptive branch name:

```bash
# 课程映射 / Curriculum mapping
git checkout -b curriculum/hk-primary-general-studies

# 新学习模块 / New learning module
git checkout -b module/energy-skate-park

# 内容修正 / Content correction
git checkout -b fix/friction-lab-typo
```

**分支命名约定 | Branch Naming Convention:**

| 前缀 Prefix | 用途 Purpose |
|-------------|-------------|
| `curriculum/` | 课程映射相关 / Curriculum mapping |
| `module/` | 新学习模块 / New learning module |
| `fix/` | 内容修正 / Content corrections |
| `docs/` | 文档改进 / Documentation improvements |
| `translation/` | 翻译改进 / Translation improvements |

### 4. 进行修改 | Make Your Changes

编辑或添加文件。请参阅 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) 了解内容格式要求。完整的 JSON schema 和 DocAI 提示模板请查看 [content/README.md](../artifacts/phet-sims/content/README.md)。

Edit or add files. See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for content formatting requirements. For the complete JSON schema and DocAI prompt template, see [content/README.md](../artifacts/phet-sims/content/README.md).

### 5. 提交更改 | Commit Your Changes

```bash
git add .
git commit -m "Add HK primary P3 General Studies mapping for forces"
```

请用清晰的提交信息，说明您做了什么。中英文均可。

Use clear commit messages describing what you did. Either Chinese or English is fine.

### 6. 推送并创建 PR | Push and Create a PR

```bash
git push origin your-branch-name
```

然后在 GitHub 上创建 Pull Request。请填写 PR 模板中的所有必要信息。

Then create a Pull Request on GitHub. Please fill in all required information in the PR template.

---

## 提交流程 | Submission Process

```
Fork → Branch → Edit → Commit → Push → Pull Request → Review → Merge
```

1. **创建 PR** — 填写 PR 模板，描述您的更改
2. **自动检查** — 格式和结构将被检查（未来将添加自动化）
3. **同行评审** — 至少一位维护者将审核您的内容
4. **修改反馈** — 根据评审意见进行必要的修改
5. **合并** — 通过审核后，您的贡献将被合并到主分支

1. **Create PR** — Fill in the PR template describing your changes
2. **Automated checks** — Format and structure will be checked (automation coming soon)
3. **Peer review** — At least one maintainer will review your content
4. **Address feedback** — Make necessary changes based on review comments
5. **Merge** — After approval, your contribution will be merged into the main branch

---

## 内容贡献类型 | Content Contribution Types

### 课程映射 | Curriculum Mapping

将 PhET 模拟与特定地区/国家的课程标准进行对应。请参考：
- 现有的中国大陆课程映射：`artifacts/phet-sims/curriculum-mapping.md`
- 香港课程映射：[`hk-curriculum-mapping.md`](./hk-curriculum-mapping.md)
- PhET 完整目录：`artifacts/phet-sims/phet-full-catalog.md`

Map PhET simulations to specific regional/national curriculum standards. Reference:
- Existing mainland China mapping: `artifacts/phet-sims/curriculum-mapping.md`
- Hong Kong mapping: [`hk-curriculum-mapping.md`](./hk-curriculum-mapping.md)
- Full PhET catalog: `artifacts/phet-sims/phet-full-catalog.md`

### 学习模块 | Learning Modules

创建新的学习模块需要遵循 `module.json` 格式。详见 [CONTENT_GUIDE.md](./CONTENT_GUIDE.md)。

Creating new learning modules requires following the `module.json` format. See [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) for details.

每个模块应放在 `artifacts/phet-sims/content/modules/<module-id>/` 目录下。

Each module should be placed under `artifacts/phet-sims/content/modules/<module-id>/`.

### 翻译改进 | Translation Improvements

所有内容都使用 `BilingualText` 格式（`{ "zh": "...", "en": "..." }`）。您可以改进现有翻译的准确性或自然度。

All content uses `BilingualText` format (`{ "zh": "...", "en": "..." }`). You can improve the accuracy or naturalness of existing translations.

---

## 质量标准 | Quality Standards

### 学科内容 | Subject Content
- ✅ 学科内容准确无误 / Subject content is accurate
- ✅ 与相关课程标准正确对应 / Correctly mapped to relevant curriculum standards
- ✅ 年级水平适当 / Appropriate grade level
- ✅ 符合科学共识 / Consistent with scientific consensus

### 双语内容 | Bilingual Content
- ✅ 中英文内容含义一致 / Chinese and English content convey the same meaning
- ✅ 中文使用简体字（可根据地区补充繁体字） / Chinese uses simplified characters (traditional can be added for specific regions)
- ✅ 英文表达简洁自然 / English is concise and natural
- ✅ 专业术语使用标准译名 / Technical terms use standard translations

### 学习模块 | Learning Modules
- ✅ 符合 `module.json` 模式定义 / Follows the `module.json` schema
- ✅ 包含所有必需字段 / Contains all required fields
- ✅ 包含完整的中英文内容 / Contains complete bilingual content
- ✅ 测验题目答案正确 / Quiz answers are correct
- ✅ 步骤类型使用正确 / Step types are used correctly

### 格式要求 | Formatting
- ✅ JSON 格式有效且缩进一致（2空格） / Valid JSON with consistent indentation (2 spaces)
- ✅ Markdown 文件格式规范 / Markdown files are properly formatted
- ✅ 文件命名使用小写字母和连字符 / File names use lowercase letters and hyphens

---

## 审核流程 | Review Process

所有贡献将根据以下标准进行审核：

All contributions will be reviewed against the following criteria:

| 审核要点 Review Criteria | 说明 Description |
|-------------------------|-----------------|
| **学科准确性** Content Accuracy | 内容是否准确？对应的课程标准是否正确？ / Is content accurate? Is curriculum mapping correct? |
| **双语质量** Bilingual Quality | 中英文是否都自然、准确？ / Are both languages natural and accurate? |
| **格式规范** Format Compliance | 是否遵循项目的格式要求？ / Does it follow project formatting requirements? |
| **年级适当性** Grade Appropriateness | 内容难度是否适合目标年级？ / Is difficulty level appropriate for the target grade? |
| **完整性** Completeness | 是否包含所有必需的部分？ / Does it include all required sections? |

---

## 行为准则 | Code of Conduct

作为教育项目的贡献者，我们承诺为所有人提供一个友好、安全和包容的环境。

As contributors to an educational project, we pledge to make participation a friendly, safe, and inclusive experience for everyone.

### 我们的承诺 | Our Pledge

- 🤝 **尊重** — 尊重所有参与者，无论背景和经验水平 / Respect all participants regardless of background and experience level
- 🌏 **包容** — 欢迎来自不同地区和教育体系的贡献 / Welcome contributions from different regions and education systems
- 📚 **教育为先** — 以提升教育质量为首要目标 / Prioritize improving educational quality
- 💬 **建设性反馈** — 提供具体、有帮助的反馈意见 / Provide specific, helpful feedback
- 🔍 **学术诚信** — 确保学科内容准确可靠 / Ensure subject content is accurate and reliable

### 不可接受的行为 | Unacceptable Behavior

- 发布不准确的学科内容而不加注明 / Publishing inaccurate content without disclosure
- 对其他贡献者进行人身攻击或歧视 / Personal attacks or discrimination against contributors
- 发布与项目无关的广告或推广内容 / Posting ads or promotions unrelated to the project

### 报告问题 | Reporting Issues

如果您遇到不当行为，请通过 GitHub Issues 向维护者报告。

If you encounter inappropriate behavior, please report it to maintainers via GitHub Issues.

---

## 联系方式 | Contact

- **GitHub Issues**: 用于功能建议、内容纠错和问题讨论 / For feature suggestions, content corrections, and discussions
- **Pull Requests**: 用于提交具体的内容贡献 / For submitting specific content contributions

感谢您帮助我们让更多学生获得优质的科学教育资源！

Thank you for helping us bring quality science education resources to more students!
