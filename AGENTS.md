# AGENTS.md

AI agent 工作须知。修复 markdownlint 时按本文档执行。

## 配置

- `.markdownlint.jsonc`：项目级 lint 配置
- `.markdownlintignore`：文件级忽略（gitignore 语法）
- 修改配置走独立 commit，commit 主题写规则号 + 原因

## 修复流程

按错误数从少到多**逐条规则**处理：

1. **隔离单规则跑** — 写一份 `default: false` 的临时配置，配合 `--enable=MDxxx` 只看本次要修的规则
2. **应用 `--fix`** — 对该规则执行 `markdownlint --fix`，验证是否清零
3. **用户复核** — `git diff` 看具体改动，向用户确认是否需要人工微调
4. **Commit** — 单规则一个提交
5. 推下一条

`--fix` 后必须再跑一次隔离 lint 验证清零，再让用户看 diff。

## Commit Message 格式

```text
style: markdownlint MDxxx/rule-alias-name
```

- 不写文件名（一个规则可能影响多个文件）
- 单行足够
- Author / Co-Authored-By 由 ai-commit Skill 负责

## 已知坑（仅启用规则）

### MD007/ul-indent

`--fix` 对 tab 缩进的行只补一个空格，留下"空格+Tab"残留，不是干净的 2 空格缩进。

处理：fix 后再跑一次 sed 清理残留：

```bash
sed -i 's/^ \t-/  -/' <file>
```

验证 `grep -P '^[ \t]+\t' <file>` 应为空。

## 验证

提交后跑：

```bash
markdownlint --config .markdownlint.jsonc '**/*.md'
```

输出为空 = 整个 vault 零错误。

## 单规则隔离

写一份临时配置：

```jsonc
{
  "default": false
}
```

配合 `--enable=MDxxx` 隔离单规则：

```bash
markdownlint --config <临时配置> --enable=MDxxx '**/*.md'
```

注意：

- bash 调用 wrapper 时 `--enable MDxxx`（空格分隔）会丢参数，必须用 `--enable=MDxxx`（等号形式）
- markdownlint-cli v0.49 的 config `ignore` 字段失效，文件级忽略必须走 `.markdownlintignore`
