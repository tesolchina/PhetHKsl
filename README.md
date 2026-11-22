# PhET 中文学习平台 | PhET Chinese Learning Platform

## Hosting migration / 托管迁移

See **[Railway migration and data-preservation guide](migration/RAILWAY.md)**.
It contains the database export, restore commands, production URL status, Railway
settings, and the mandatory checklist before deleting the Replit project.
**Production data has not yet been verified/exported; do not delete Replit yet.**

**让每个孩子都能通过互动模拟探索科学的奥秘**

**Helping every child explore the wonders of science through interactive simulations**

---

## 项目简介 | About

PhET 中文学习平台是一个开源教育项目，将 [PhET 互动模拟](https://phet.colorado.edu/) 与中国大陆及香港的课程标准相结合，为中小学生提供跨学科的双语学习体验。

The PhET Chinese Learning Platform is an open-source educational project that aligns [PhET Interactive Simulations](https://phet.colorado.edu/) with Mainland China and Hong Kong curriculum standards, providing cross-curricular bilingual learning experiences for K-12 students.

### 核心特色 | Key Features

- **课程对齐**: 将 PhET 模拟精确映射到中国大陆 2022 版课标和香港常识科/理科课程
- **跨学科融合**: 每个学习模块融合科学探究、语文写作和英语词汇
- **双语内容**: 所有内容提供中英文双语版本
- **动手实验**: 结合模拟探索和低成本真实实验
- **开放贡献**: 欢迎教育工作者和志愿者通过 GitHub 贡献内容

- **Curriculum Aligned**: PhET simulations precisely mapped to Mainland China 2022 standards and Hong Kong General Studies / Science curricula
- **Cross-curricular**: Each learning module integrates science inquiry, Chinese writing, and English vocabulary
- **Bilingual**: All content available in Chinese and English
- **Hands-on**: Combines simulation exploration with low-cost real-world experiments
- **Open Contribution**: Educators and volunteers can contribute content via GitHub

---

## 快速开始 | Getting Started

### 使用平台 | Using the Platform

平台提供以下模拟和学习模块：

The platform provides the following simulations and learning modules:

| 模拟 Simulation | 学科 Subject | 年级 Grade | 类型 Type |
|----------------|-------------|-----------|----------|
| Color Vision 彩色视觉 | 物理 Physics | 小学 Primary | PhET 模拟 |
| Friction Lab 摩擦力实验室 | 物理 Physics | 3-4年级 | 原创模块 Original Module |
| States of Matter 物质状态 | 化学 Chemistry | 小学 Primary | PhET 模拟 |
| Balancing Act 平衡探秘 | 物理 Physics | 小学 Primary | PhET 模拟 |
| Equality Explorer 等式探索 | 数学 Math | 小学 Primary | PhET 模拟 |
| Energy Skate Park 能量滑板公园 | 物理 Physics | 小学 Primary | PhET 模拟 |
| 更多模拟... | | | |

### 本地开发 | Local Development

```bash
# 克隆仓库
git clone https://github.com/tesolchina/PhetHKsl.git
cd PhetHKsl

# 安装依赖
pnpm install

# 启动主网站开发服务器 / Start the main website dev server
pnpm --filter @workspace/phet-sims dev

# 启动 API 服务器 / Start the API server
pnpm --filter @workspace/api-server dev
```

---

## 课程映射 | Curriculum Mapping

本项目提供两份详细的课程映射文档：

### 中国大陆小学课标（2022版）
📄 [`artifacts/phet-sims/curriculum-mapping.md`](artifacts/phet-sims/curriculum-mapping.md)

覆盖 1-6 年级数学和科学课标，按年级和学段组织，包含推荐新增模拟的优先级排序。

### 香港+大陆全学段映射
📄 [`contribute/hk-curriculum-mapping.md`](contribute/hk-curriculum-mapping.md)

覆盖香港常识科（P1-P6）、综合科学（S1-S3）、高中理科（S4-S6）以及大陆初中和高中的科学与数学课程。包含两地课程的交叉对比分析。

---

## 学习模块 | Learning Modules

学习模块是本项目的核心内容形式。每个模块围绕一个 PhET 模拟，按照以下学习流程设计：

```
📖 故事引入 → 🔮 预测 → 🔬 模拟探索 → 🏆 知识挑战 → ✍️ 语文英语 → 🧪 动手实验 → 💭 反思总结
Story    → Predict → Explore    → Challenge → Language → Hands-on → Reflect
```

**当前模块 Current Modules:**
- [摩擦力实验室 Friction Lab](artifacts/phet-sims/content/modules/friction-lab/module.json) — 3-4年级，探索摩擦力如何产生热量

**如何创建新模块:** 请参阅 [contribute/CONTENT_GUIDE.md](contribute/CONTENT_GUIDE.md)。

---

## 项目结构 | Project Structure

```
PhetHKsl/
├── README.md                    # 本文件 / This file
├── contribute/                  # 社区贡献资源中心 / Community hub
│   ├── README.md                # 文件索引和导航
│   ├── CONTRIBUTING.md          # 贡献指南 / Contribution guide
│   ├── CONTENT_GUIDE.md         # 内容创作指南 / Content creation guide
│   ├── PIPELINE.md              # PR审核流程 / PR review pipeline
│   ├── CHANGELOG.md             # 更新日志 / Update log
│   ├── CONTRIBUTORS.md          # 贡献者名单 / Contributor list
│   ├── ROADMAP.md               # 项目路线图 / Project roadmap
│   └── hk-curriculum-mapping.md # 港陆课程映射 / Curriculum mapping
├── .github/
│   ├── PULL_REQUEST_TEMPLATE.md # PR 模板
│   └── ISSUE_TEMPLATE/          # Issue 模板
│       ├── curriculum-mapping.md
│       ├── module-proposal.md
│       └── content-correction.md
└── artifacts/
    └── phet-sims/
        ├── curriculum-mapping.md     # 大陆小学课标映射
        ├── phet-full-catalog.md      # PhET 完整目录
        ├── cross-curricular-plan.md  # 跨学科融合方案
        ├── content/
        │   ├── schema.ts            # 模块 JSON 类型定义
        │   └── modules/
        │       └── friction-lab/    # 摩擦力实验室模块
        │           └── module.json
        └── src/
            └── data/
                └── simulations.ts   # 模拟数据
```

---

## 如何贡献 | How to Contribute

我们欢迎所有教育工作者、课程专家和志愿者的贡献！

We welcome contributions from all educators, curriculum specialists, and volunteers!

### 贡献类型 | Types of Contributions

| 贡献 Contribution | 说明 Description | 入门难度 |
|-------------------|-----------------|---------|
| 📋 课程映射 | 将 PhET 模拟与课程标准对应 | ⭐ 低 |
| 🐛 内容纠错 | 修正学科内容、翻译或格式错误 | ⭐ 低 |
| 📦 学习模块 | 创建新的跨学科学习模块 | ⭐⭐ 中 |
| 🌐 翻译改进 | 改善中英双语内容质量 | ⭐ 低 |
| 🔗 跨学科方案 | 提出科学×语文×英语融合教学建议 | ⭐⭐ 中 |

### 快速开始贡献 | Quick Start for Contributors

1. 阅读 [contribute/CONTRIBUTING.md](contribute/CONTRIBUTING.md) 了解完整流程
2. 阅读 [contribute/CONTENT_GUIDE.md](contribute/CONTENT_GUIDE.md) 了解内容格式
3. 阅读 [contribute/PIPELINE.md](contribute/PIPELINE.md) 了解审核标准
4. Fork 本仓库，创建分支，进行修改，提交 PR
5. 查看 [contribute/ROADMAP.md](contribute/ROADMAP.md) 了解当前重点任务

本项目采用**工具中立**原则：您可以使用任何工具创作内容（手动编写、AI 辅助等），我们关注的是内容质量。

This project follows a **tool-neutral** approach: you may use any tool to create content (manual writing, AI-assisted, etc.). We focus on content quality.

---

## 路线图 | Roadmap

查看 [contribute/ROADMAP.md](contribute/ROADMAP.md) 了解项目近期计划和参与机会。查看 [contribute/CHANGELOG.md](contribute/CHANGELOG.md) 了解最近更新。

See [contribute/ROADMAP.md](contribute/ROADMAP.md) for near-term plans and participation opportunities. See [contribute/CHANGELOG.md](contribute/CHANGELOG.md) for recent updates.

**当前重点 Current Focus:**
1. 🟡 完善香港常识科课程映射（初稿完成，待社区审核）
2. 🔴 扩展大陆初中课程映射（独立详细文档）
3. 🔴 接收首批社区贡献学习模块

---

## 相关资源 | Related Resources

- [PhET Interactive Simulations](https://phet.colorado.edu/) — 原始 PhET 模拟平台
- [PhET GitHub](https://github.com/phetsims) — PhET 开源代码
- 中国教育部 2022 版义务教育课程标准
- 香港教育局课程指引

---

## 许可 | License

本项目中的原创教育内容以开源方式提供。PhET 模拟的使用遵循 [PhET 的许可条款](https://phet.colorado.edu/en/licensing)。
