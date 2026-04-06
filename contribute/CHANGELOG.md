# Changelog / 更新日志

> 记录每次社区贡献和重要更新 | Records every community contribution and major update

格式说明 / Format:
- 按时间倒序排列（最新在最上面）
- 每条记录包含：日期、类型、内容概要、贡献者、审核者

---

## 2026-04-06 | Platform: Content Model System v1.0.0

- **类型**: 平台基础设施 / Platform Infrastructure
- **内容**:
  - 建立标准化 JSON 内容模型（`content/schema.ts`）
  - 7 种步骤类型：故事、预测、探索、挑战、语文英语、动手、反思
  - 内容 API 上线：`GET /api/content`, `GET /api/content/:id`
  - 内容目录页面上线：`/content`
  - 完整的贡献者文档和 DocAI 对接指南
- **贡献者**: Core Team
- **相关文件**: `artifacts/phet-sims/content/`

## 2026-04-06 | Module: friction-lab v1.0.0

- **类型**: 学习模块 / Learning Module
- **内容**: 摩擦力实验室 — 首个完整的跨学科学习模块
  - 年级: 3-4年级
  - 学科: 科学 + 语文 + 英语
  - 7步完整流程（故事→预测→探索→挑战→读写→动手→反思）
  - 课标对齐: 物质科学 > 力的作用 > 摩擦力
  - 动手实验成本: ~1元/学生
- **贡献者**: Core Team
- **相关文件**: `artifacts/phet-sims/content/modules/friction-lab/module.json`

## 2026-04-06 | Platform: Simulation Database & HKBU Branding

- **类型**: 平台基础设施 / Platform Infrastructure
- **内容**:
  - 108 个 PhET 模拟写入数据库，含双语元数据
  - 5 个学科分类：物理、化学、生物、数学、地球科学
  - API 端点：`GET /api/simulations`（支持分类和年级筛选）
  - HKBU 品牌标识：英雄区、关于我们、页脚版权
- **贡献者**: Core Team

## 2026-04-06 | Docs: Community Framework & Curriculum Mapping

- **类型**: 文档 / Documentation
- **内容**:
  - 贡献指南 (`contribute/CONTRIBUTING.md`)
  - 内容创作指南 (`contribute/CONTENT_GUIDE.md`)
  - 港陆课程映射 (`contribute/hk-curriculum-mapping.md`) — HK P1-P6 + 大陆 1-9年级
  - PR 模板和 Issue 模板
  - 项目路线图 (`contribute/ROADMAP.md`)
- **贡献者**: Core Team

---

## 如何记录新贡献 | How to Record New Contributions

维护者在合并 PR 后，在本文件顶部添加一条新记录：

```markdown
## YYYY-MM-DD | [Type]: [title] v[version]

- **类型**: [学习模块 / 课程映射 / 翻译改进 / 内容修正 / 文档 / 平台基础设施]
- **内容**: [简要描述做了什么]
- **贡献者**: @github-username (Name)
- **审核者**: @reviewer-username
- **相关文件**: [改动的关键文件路径]
```

类型说明 / Contribution Types:
| 类型 Type | 英文 English | 适用于 For |
|-----------|-------------|-----------|
| 学习模块 | Learning Module | 新的 module.json |
| 课程映射 | Curriculum Mapping | 新的课标对照 |
| 翻译改进 | Translation | 改善中英文质量 |
| 内容修正 | Content Fix | 修正错误 |
| 文档 | Documentation | 改进文档 |
| 平台基础设施 | Platform Infrastructure | 代码/架构改动 |
