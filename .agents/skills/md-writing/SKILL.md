---
name: md-writing
description: 在本 Obsidian Vault 中撰写或修改 Markdown 笔记，维护 YAML frontmatter 的修改时间并遵守仓库写作约定。
---

# Markdown 写作

#AIGC

## 适用范围

适用于本仓库的 Markdown 笔记，不限于 `Diary/`。日记的行文和格式另见 [diary-writing](../diary-writing/SKILL.md)；修复 Markdown lint 问题时遵循 [markdownlint-fix](../markdownlint-fix/SKILL.md)。

撰写或修改中文内容时参考 `/humanizer-zh` Skill。AI 起草的笔记或章节，在对应内容处添加 `#AIGC`；局部修改时，不把标签放到未由 AI 撰写的相邻内容上。

## 修改时间

正文写完或修改后，更新 YAML frontmatter 中的 `修改时间`，使用实际本地时间及 ISO 8601 格式，保留原 `创建时间` 和其他属性。新笔记按已有笔记的约定设置 `创建时间` 和 `修改时间`；Skill 等有专用 frontmatter schema 的配置文件保留其 schema，不强加笔记时间字段。

运行本 Skill 的 `scripts/update_modified_time.py` 设置 `修改时间`，不要用 shell 字符串替换或占位符替换时间字段。从 Vault 根目录运行时：

```powershell
python .agents/skills/md-writing/scripts/update_modified_time.py "目录/笔记.md"
```

脚本只在 YAML frontmatter 中新增或替换 `修改时间`，保留其他属性、正文、换行风格和 UTF-8 BOM。缺少该属性时，优先插入唯一的 `创建时间` 后面，否则插入 frontmatter 结束分隔符前。

脚本要求目标为 UTF-8 Markdown 文件，且以完整的 YAML frontmatter 开头；重复的 `修改时间` 属性会导致报错。遇到缺少或未闭合的 frontmatter 等问题时，先说明原因并处理文件结构，不反复尝试替换。
