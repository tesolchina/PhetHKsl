# 项目路线图 | Project Roadmap

本文档列出了 PhET 中文学习平台的近期里程碑和社区参与目标。

This document outlines near-term milestones and community participation goals for the PhET Chinese Learning Platform.

---

## 里程碑总览 | Milestone Overview

| # | 里程碑 Milestone | 状态 Status | 目标 Target |
|---|-----------------|-----------|------------|
| 1 | 完善香港小学常识科课程映射 | 🟡 初稿完成，待社区审核 | 近期 |
| 2 | 完成中国大陆初中课程映射 | 🔴 未开始 | 近期 |
| 3 | 首批 5 个社区贡献学习模块 | 🔴 未开始 | 中期 |
| 4 | 常识科 / 常識科跨学科模块模板 | 🔴 未开始 | 中期 |

---

## Milestone 1: 完成香港小学常识科课程映射
**Complete HK Primary General Studies Curriculum Mapping**

**目标 Goal:** 将所有 PhET 模拟与香港小学常识科（P1-P6）进行系统对照，为香港教师提供课程资源指引。

**当前进展 Current Progress:**
- ✅ 初版映射文档已完成（`hk-curriculum-mapping.md`），含港陆并排对照
- ✅ 与大陆课标的交叉对比已完成
- 🔲 待社区审核验证：年级对齐准确性
- 🔲 待补充：具体教学建议和活动设计
- 🔲 待补充：繁体中文（正体字）版本

**社区可以做的 How to Contribute:**
- 审核映射准确性，特别是年级对齐是否符合实际教学经验
- 补充具体常识科教科书的章节对应
- 建议额外的 PhET 模拟匹配
- 提交 Issue: 使用 "📋 课程映射建议" 模板

---

## Milestone 2: 完成中国大陆初中（7-9年级）课程映射
**Complete Mainland China Junior Secondary Curriculum Mapping**

**目标 Goal:** 将现有的小学课程映射（`curriculum-mapping.md`）扩展到初中阶段，覆盖物理（8-9年级）、化学（9年级）、生物（7-8年级）和数学（7-9年级）。

**当前进展 Current Progress:**
- ✅ 小学（1-6年级）映射已完成（`artifacts/phet-sims/curriculum-mapping.md`）
- ✅ 初中部分在 `hk-curriculum-mapping.md` 的交叉对比中有概要
- 🔲 待创建：独立的初中课程映射详细文档
- 🔲 待补充：各版本教材（人教版、北师大版等）的章节对应
- 🔲 待补充：具体实验活动与 PhET 模拟的配合方案

**社区可以做的 How to Contribute:**
- 根据实际使用的教材版本，补充具体章节对应
- 为初中物理/化学实验提供 PhET 模拟配合建议
- 审核年级与课标条目的对齐
- 提交 Issue: 使用 "📋 课程映射建议" 模板

---

## Milestone 3: 首批 5 个社区贡献学习模块
**First 5 Community-Contributed Learning Modules**

**目标 Goal:** 接收并合并来自社区贡献者的 5 个学习模块，建立社区内容贡献的工作流程。

**当前进展 Current Progress:**
- ✅ 内容创作指南已完成（`CONTENT_GUIDE.md`）
- ✅ 模块 JSON 模式已定义（`artifacts/phet-sims/content/schema.ts`）
- ✅ 参考模块已有：摩擦力实验室（`friction-lab`）
- 🔲 待接收首个社区贡献

**建议的模块主题 Suggested Module Topics:**

| # | 模拟 Simulation | 建议主题 Suggested Topic | 年级 Grade | 优先级 |
|---|---------------|---------------------|-----------|--------|
| 1 | Forces and Motion: Basics | 推和拉的力 Push and Pull | 3-4年级/P3 | 高 |
| 2 | Color Vision | 光的颜色魔法 Color Magic of Light | 1-2年级/P2 | 高 |
| 3 | Balancing Act | 跷跷板的秘密 Seesaw Secrets | 3-4年级/P3-P4 | 中 |
| 4 | States of Matter: Basics | 冰水蒸气大变身 Ice Water Steam | 3-4年级/P3 | 中 |
| 5 | Energy Skate Park | 能量大冒险 Energy Adventure | 5-6年级/P5 | 中 |

**社区可以做的 How to Contribute:**
- 选择上述主题或提出新主题
- 参照 `CONTENT_GUIDE.md` 和 `friction-lab` 示例创建模块
- 提交 Issue: 使用 "📦 学习模块提案" 模板讨论方案
- 提交 PR: 将完成的 `module.json` 放在 `artifacts/phet-sims/content/modules/<模块ID>/`

---

## Milestone 4: 常识科跨学科模块模板
**Cross-Curricular Module Templates for General Studies / 常識科**

**目标 Goal:** 为香港常识科和大陆跨学科教学需求创建标准化的模块模板，融合科学、语文和英语。

**当前进展 Current Progress:**
- ✅ 跨学科融合方案已规划（`artifacts/phet-sims/cross-curricular-plan.md`）
- ✅ 摩擦力实验室模块已示范跨学科融合（含 language-arts 步骤）
- 🔲 待创建：面向常识科的专用模板
- 🔲 待创建：面向大陆小学的跨学科模板

**计划内容 Planned Content:**
- 常识科模块模板（繁体版+简体版）
- 科学×语文×英语融合指引
- 按照常识科六大学习范畴组织的模块索引
- 适合不同英语水平的语言融合层级指引

**社区可以做的 How to Contribute:**
- 提供常识科教学经验和建议
- 审核跨学科融合方案的可行性
- 贡献科学英语词汇表

---

## 未来展望 | Future Directions

以下方向将在上述里程碑完成后逐步推进：

- **内容自动验证**: 通过 CI/CD 自动检查 `module.json` 格式和必需字段
- **繁体中文全面支持**: 为香港用户提供完整的繁体中文界面和内容
- **台湾课程映射**: 将映射扩展到台湾十二年国教课程纲要
- **教师工具**: 提供教师端的进度追踪和内容管理功能
- **AI 辅助写作**: 在反思和写作环节加入 AI 批改和反馈

---

## 如何参与 | How to Get Involved

1. 阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解贡献流程
2. 阅读 [CONTENT_GUIDE.md](CONTENT_GUIDE.md) 了解内容格式
3. 浏览 [GitHub Issues](https://github.com/tesolchina/PhetHKsl/issues) 查找适合您的任务
4. 在 Issues 中提出问题或建议
5. Fork 仓库并提交 Pull Request

我们特别欢迎以下背景的贡献者：
- 🏫 小学/中学科学、数学教师
- 📚 课程专家和教育研究者
- 🌏 熟悉港、陆、台课程标准的教育工作者
- 🔬 科学教育爱好者
- 🌐 双语/多语内容创作者
