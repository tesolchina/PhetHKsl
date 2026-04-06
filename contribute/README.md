# contribute/ 社区贡献资源中心

> 本文件夹包含所有与社区贡献相关的文档、流程和记录。
> 外部工具（如 DocAI）可以通过读取本文件夹获取所需信息。

---

## 文件索引 | File Index

| 文件 File | 用途 Purpose | 适合谁读 For Whom |
|----------|-------------|-----------------|
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献指南：如何参与项目 | 所有贡献者 |
| [CONTENT_GUIDE.md](CONTENT_GUIDE.md) | 内容创作指南：module.json 格式详解 | 模块创作者 |
| [PIPELINE.md](PIPELINE.md) | PR 审核流程：从提交到上线的完整路径 | 贡献者 + 维护者 |
| [CHANGELOG.md](CHANGELOG.md) | 更新日志：每次贡献和更新的记录 | 所有人 / 外部工具 |
| [CONTRIBUTORS.md](CONTRIBUTORS.md) | 贡献者名单：致谢所有社区贡献者 | 所有人 |
| [ROADMAP.md](ROADMAP.md) | 项目路线图：近期目标和进展 | 贡献者 / 外部工具 |
| [hk-curriculum-mapping.md](hk-curriculum-mapping.md) | 港陆课程映射：PhET 模拟与课标对照 | 课程映射贡献者 |

---

## 快速导航 | Quick Navigation

### 我想贡献一个学习模块
1. 读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解整体流程
2. 读 [CONTENT_GUIDE.md](CONTENT_GUIDE.md) 了解 JSON 格式
3. 读 [../artifacts/phet-sims/content/README.md](../artifacts/phet-sims/content/README.md) 了解完整 schema 和 DocAI 提示模板
4. 读 [PIPELINE.md](PIPELINE.md) 了解审核标准
5. 提交 PR，等待审核

### 我想做课程映射
1. 读 [hk-curriculum-mapping.md](hk-curriculum-mapping.md) 了解已有映射
2. 读 [ROADMAP.md](ROADMAP.md) 了解哪些映射还缺
3. 读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解提交流程

### 我是维护者
1. 读 [PIPELINE.md](PIPELINE.md) 了解审核标准和流程
2. 合并 PR 后更新 [CHANGELOG.md](CHANGELOG.md)
3. 添加贡献者到 [CONTRIBUTORS.md](CONTRIBUTORS.md)

### 我是外部工具（如 DocAI）
读取以下文件获取项目状态和格式要求：
```
contribute/CHANGELOG.md              → 最新更新
contribute/ROADMAP.md                → 待做工作
contribute/CONTENT_GUIDE.md          → 内容格式
contribute/hk-curriculum-mapping.md  → 课标对齐
artifacts/phet-sims/content/README.md → 完整 schema + AI 提示模板
artifacts/phet-sims/content/schema.ts → TypeScript 类型定义
```

API 端点：
```
GET /api/content              → 已有模块列表（JSON）
GET /api/content/<module-id>  → 模块详情（JSON）
```

---

## 与 `.github/` 的关系

GitHub 的 Issue 模板和 PR 模板保留在 `.github/` 目录下（GitHub 平台要求）：

```
.github/
  ├── PULL_REQUEST_TEMPLATE.md       → PR 提交时自动加载的模板
  └── ISSUE_TEMPLATE/
      ├── module-proposal.md         → 新模块提案
      ├── curriculum-mapping.md      → 课程映射建议
      └── content-correction.md      → 内容纠错
```

这些模板与本文件夹的文档配合使用。

---

## 与 `artifacts/phet-sims/content/` 的关系

```
contribute/                          → 社区流程、规范、记录（面向人和工具）
artifacts/phet-sims/content/         → 实际的代码和内容（面向程序）
  ├── schema.ts                      → TypeScript 类型定义（权威来源）
  ├── index.ts                       → 模块注册表
  ├── README.md                      → 技术层面的完整 schema 文档
  └── modules/
      └── <module-id>/module.json    → 实际的模块数据
```

- `contribute/CONTENT_GUIDE.md` = 面向贡献者的友好指南（入门用）
- `artifacts/phet-sims/content/README.md` = 完整技术参考（包含 DocAI AI 提示模板）
- `artifacts/phet-sims/content/schema.ts` = 最终权威的类型定义（代码即文档）
