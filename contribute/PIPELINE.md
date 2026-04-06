# PR Pipeline / 贡献审核流程

> 从提交到上线的完整路径 | The complete path from submission to live deployment

---

## 流程概览 | Pipeline Overview

```
Contributor                    Maintainer                    Platform
    │                              │                            │
    │  1. Fork & Create Branch     │                            │
    │──────────────────────────>   │                            │
    │                              │                            │
    │  2. Write module.json        │                            │
    │     + images + register      │                            │
    │                              │                            │
    │  3. Submit Pull Request      │                            │
    │──────────────────────────>   │                            │
    │                              │                            │
    │  4. Auto-checks run          │                            │
    │  <──────────────────────     │                            │
    │  (format, schema, images)    │                            │
    │                              │                            │
    │                    5. Content Review                      │
    │                    (accuracy, grade,                      │
    │                     bilingual quality)                    │
    │                              │                            │
    │  6. Review feedback          │                            │
    │  <──────────────────────     │                            │
    │                              │                            │
    │  7. Revise if needed         │                            │
    │──────────────────────────>   │                            │
    │                              │                            │
    │                    8. Approve & Merge                     │
    │                              │────────────────────────>   │
    │                              │                            │
    │                              │  9. Auto-deploy            │
    │                              │  (catalog + API updated)   │
    │                              │                            │
    │                    10. Update CHANGELOG                   │
    │                    11. Update CONTRIBUTORS                │
    │                              │                            │
    │  12. Acknowledgment          │                            │
    │  <──────────────────────     │                            │
    └──────────────────────────────┴────────────────────────────┘
```

---

## Step 1-3: 提交阶段 | Submission Phase

### 贡献者需要做的 | What the contributor does

1. **Fork 仓库** — 在 GitHub 上点击 Fork
2. **创建分支** — 用约定的命名格式：

| 前缀 Prefix | 用途 Purpose | 示例 Example |
|-------------|-------------|-------------|
| `module/` | 新学习模块 | `module/water-cycle` |
| `curriculum/` | 课程映射 | `curriculum/hk-p5-p6` |
| `fix/` | 内容修正 | `fix/friction-lab-typo` |
| `translation/` | 翻译改进 | `translation/friction-lab-en` |
| `docs/` | 文档改进 | `docs/contributing-guide` |

3. **准备文件** — 参照 `contribute/CONTENT_GUIDE.md` 和 `artifacts/phet-sims/content/README.md`

对于学习模块，需要提交：

```
artifacts/phet-sims/content/modules/<module-id>/
  └── module.json              # 必须：模块内容（符合 schema.ts 格式）

artifacts/phet-sims/public/images/
  └── <module-id>-*.png        # 可选：插图文件

artifacts/phet-sims/content/index.ts   # 必须：注册新模块
```

4. **提交 PR** — 填写 PR 模板（`.github/PULL_REQUEST_TEMPLATE.md`）

---

## Step 4: 自动检查 | Automated Checks

PR 提交后将自动运行以下检查（部分待实现）：

| 检查项 Check | 状态 Status | 说明 Description |
|-------------|-----------|-----------------|
| JSON 语法验证 | 待实现 | `module.json` 是否为合法 JSON |
| Schema 校验 | 待实现 | 字段是否符合 `schema.ts` 定义 |
| 双语完整性 | 待实现 | 所有 BilingualText 字段是否同时有 zh 和 en |
| 图片引用检查 | 待实现 | JSON 中引用的图片是否存在于 `public/images/` |
| 答案有效性 | 待实现 | `correctIndex` 是否在选项范围内 |
| 模块 ID 唯一性 | 待实现 | 新模块 ID 不与已有模块冲突 |

**近期将通过 GitHub Actions 实现自动化检查。** 当前由审核者手动检查。

---

## Step 5-7: 内容审核 | Content Review

### 审核标准 | Review Criteria

审核分为 **5 个维度**，每个维度必须通过：

#### 1. 学科准确性 / Subject Accuracy
- [ ] 科学概念准确，无事实错误
- [ ] 适合目标年级的认知水平
- [ ] 与课程标准正确对应（2022版义务教育课程标准）
- [ ] 实验安全性（无危险操作，特别是低年级）

#### 2. 双语质量 / Bilingual Quality
- [ ] 中英文含义一致
- [ ] 中文用简体字，表达自然流畅
- [ ] 英文简洁明了，适合目标年级
- [ ] 专业术语使用标准译名

#### 3. 格式规范 / Format Compliance
- [ ] JSON 格式有效，缩进一致（2空格）
- [ ] 所有必填字段完整
- [ ] 模块 ID 与文件夹名一致
- [ ] 图片路径格式正确（`images/xxx.png`）

#### 4. 教学设计 / Pedagogical Design
- [ ] 跨学科衔接自然（科学→语文→英语→动手）
- [ ] 故事情境贴近学生生活
- [ ] 预测题基于日常经验
- [ ] 动手实验成本 ≤ 5元/学生
- [ ] 材料在普通学校可获得

#### 5. 跨学科整合 / Cross-curricular Integration
- [ ] 至少整合 2 个学科
- [ ] 语文写作模板与科学内容对应
- [ ] 英语词汇与课题相关
- [ ] 歌曲旋律学生熟悉

### 审核结果 | Review Outcomes

| 结果 Outcome | 说明 Description |
|-------------|-----------------|
| **Approved** | 通过审核，可以合并 |
| **Changes Requested** | 需要修改，审核者会具体说明问题 |
| **Needs Discussion** | 需要讨论，可能涉及设计方向问题 |
| **Rejected** | 不符合项目方向（会说明原因） |

### 审核周期 | Review Timeline

- **首次回复**: PR 提交后 3 个工作日内
- **修改后复审**: 修改提交后 2 个工作日内
- **目标总时长**: 从提交到合并不超过 7 个工作日

---

## Step 8-9: 合并与部署 | Merge & Deploy

### 合并后自动发生的事情 | What happens after merge

1. **Content Catalog 更新** — 新模块自动出现在 `/content` 页面
2. **Content API 更新** — 新模块可通过 `GET /api/content/<module-id>` 访问
3. **模块元数据可见** — 标题、描述、年级、学科、课标对齐信息全部展示

### 关于交互式学习路由 | About Interactive Learning Routes

新模块合并后会立即出现在 **内容目录** 和 **API** 中。但要让学生可以**交互式体验**（像 `/friction-lab` 那样），还需要：

1. 维护者为模块创建专属的学习路由和渲染组件
2. 这一步由核心团队完成，贡献者不需要做

当前阶段，新模块的价值在于：
- 内容被完整保存和展示
- 可通过 API 被其他工具（如 DocAI）调用
- 为未来的通用模块渲染器提供内容

---

## Step 10-11: 记录与致谢 | Recording & Acknowledgment

### 更新 CHANGELOG

每次合并贡献后，维护者会更新 `contribute/CHANGELOG.md`：

```markdown
## [日期] Module: water-cycle v1.0.0
- **贡献者**: @username (Name)
- **内容**: 水循环跨学科学习模块（3-4年级）
- **包含**: 7步完整流程（故事→预测→探索→挑战→读写→动手→反思）
- **课标**: 地球与宇宙科学 > 水循环
- **审核者**: @reviewer
```

### 更新 CONTRIBUTORS

贡献者信息添加到 `contribute/CONTRIBUTORS.md`：

```markdown
| @username | Name | 学习模块: 水循环 | 2026-04 |
```

### 致谢方式 | Acknowledgment Methods

1. **CONTRIBUTORS.md** — 永久记录在贡献者名单中
2. **module.json authors** — 模块内的 `metadata.authors` 字段署名
3. **Content Catalog** — 模块卡片上展示作者信息（计划中）
4. **GitHub** — PR 和 commit 历史永久保留

---

## 外部工具对接 | External Tool Integration

### DocAI 对接

DocAI (aitutor.ink) 可以通过以下方式与本项目协作：

**读取信息：**
```
contribute/CHANGELOG.md          → 了解最新更新
contribute/ROADMAP.md            → 了解待做工作
contribute/CONTENT_GUIDE.md      → 了解内容格式
contribute/hk-curriculum-mapping.md → 了解课标对齐
artifacts/phet-sims/content/README.md → 了解完整 schema + AI 提示模板
GET /api/content                 → 已有模块列表
GET /api/content/<id>            → 模块详情 JSON
```

**贡献内容：**
1. DocAI AI Agent 根据 schema 生成 `module.json`
2. 学生在 DocAI 中审核和修改
3. 通过 GitHub PR 提交到本仓库
4. 遵循同样的审核流程

### 其他工具对接

任何工具都可以通过读取 `contribute/` 文件夹下的文档来了解：
- 如何创建符合格式的内容 (`CONTENT_GUIDE.md`)
- 当前项目进展 (`CHANGELOG.md`, `ROADMAP.md`)
- 贡献流程 (`CONTRIBUTING.md`, `PIPELINE.md`)
- 课标对齐要求 (`hk-curriculum-mapping.md`)

---

## 质量管控总结 | Quality Control Summary

```
贡献者自查                维护者审核               自动化检查（计划中）
Self-check               Maintainer Review        Automated Checks
    │                         │                        │
    ├─ 格式正确？              ├─ 学科准确？              ├─ JSON 合法？
    ├─ 双语完整？              ├─ 年级适当？              ├─ Schema 通过？
    ├─ 图片存在？              ├─ 教学合理？              ├─ 双语完整？
    ├─ 答案正确？              ├─ 跨学科衔接？            ├─ 图片存在？
    └─ 成本合规？              └─ 双语质量？              └─ 答案有效？
       (≤5元)                                              
```

每一层都是质量的保障。即使自动化检查尚未实现，贡献者自查 + 维护者审核已经形成了完整的质量管控闭环。
