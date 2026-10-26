---
创建时间: 2026-10-25T21:17:07+08:00
修改时间: 2026-10-25T22:19:10+08:00
---
#AIGC

Claude Code 使用第三方模型时，除了主对话，后台任务、权限分类和常驻上下文也可能产生开销。下面分别记录配置项的设计用意，以及更换客户端或计费方式带来的差异。减少 Token 数量和降低费用是两种不同的收益。

## 配置文件

1. `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: "1"`：关闭自动更新、遥测、错误报告等非必要流量，减少与任务无关的后台网络活动。这些请求并不都涉及模型推理，因此不能直接把减少网络请求算成节省 Token。它也会关闭功能标志获取，影响依赖这些标志的功能。[环境变量文档](https://code.claude.com/docs/en/env-vars#variables)
2. `ENABLE_TOOL_SEARCH: "true"`：让 MCP 工具按需搜索、加载，避免一开始就把全部工具定义放进上下文。工具越多、参数说明越长，减少的输入 Token 通常越明显。[工具搜索说明](https://code.claude.com/docs/en/env-vars#variables)
3. `ANTHROPIC_DEFAULT_HAIKU_MODEL: "MiniMax-M3"`：将 Haiku 别名和使用它的后台轻量任务交给指定模型，目的是控制辅助调用的成本。[模型配置文档](https://code.claude.com/docs/en/model-config#environment-variables)
4. `includeGitInstructions: false`：去掉内置的提交、PR 工作流指令和会话开始时的 Git 状态快照，减少常驻输入。已有自己的 Git 工作流或技能时，也能避免重复提供这部分说明。[配置项文档](https://code.claude.com/docs/en/settings-reference#includegitinstructions)
5. `respondToBashCommands: false`：用 `!` 手动运行命令后，只把输出加入上下文，不立即让模型回复。这样可以连续执行几条命令，再集中提问，省去逐条解读产生的调用和输出；命令输出本身仍会进入后续上下文。[配置项文档](https://code.claude.com/docs/en/settings-reference#respondtobashcommands)
6. `outputStyle: "Concise"`：用简洁的输出风格约束回复篇幅，减少解释、复述和收尾带来的输出 Token。实际效果取决于名为 `Concise` 的风格指令；配置名称本身不是硬性的输出长度限制。[输出风格说明](https://code.claude.com/docs/en/output-styles)
7. `skillOverrides`：缩减模型每轮看到的技能目录，减少技能名称和描述占用的输入 Token。技能正文原本就是按需加载，这里主要精简的是发现技能时使用的常驻列表。[技能可见性说明](https://code.claude.com/docs/en/skills#override-skill-visibility-from-settings)
   - `dataviz: "off"`：从模型可见列表和命令菜单中隐藏这个技能，省去其目录信息。
   - `keybindings-help`、`fewer-permission-prompts`、`workflow-authoring`、`security-review: "name-only"`：保留名称，去掉描述，在仍能按名称调用的同时缩短列表。
   - `init: "user-invocable-only"`：不向模型展示，只保留用户手动调用入口，避免为偶尔使用的初始化功能持续携带目录信息。
8. `awaySummaryEnabled: false`：关闭离开终端一段时间后返回时的会话摘要，避免为了回顾进度额外生成摘要。省去的是这项辅助功能的开销，不影响主任务本身需要的推理。[配置项文档](https://code.claude.com/docs/en/settings-reference#awaysummaryenabled)
9. `totalTokensReminder: "off"`：关闭系统提示和工具结果之后反复注入的剩余 Token 提醒，减少这类附加文本。源码映射已确认它支持 `"off"`，但属于未公开的内部配置，不能把官方文档未收录当作不存在；环境变量 `CLAUDE_CODE_TOTAL_TOKENS_REMINDER` 的优先级更高。[配置源码映射](https://harness.dtmont.com/claude-code/settings/#totaltokensreminder)、[提醒注入路径](https://harness.dtmont.com/claude-code/system-reminders/#remaining-tokens)
10. `permissions.defaultMode: "bypassPermissions"`：跳过 AutoMode 权限分类，直接省去这部分分类器调用及其 Token 开销。代价是工具操作不再经过这层自动安全判断，需要自己承担相应的审查责任。它与替换辅助模型的区别在于：一个省掉调用，另一个改变调用所用的模型。[权限模式文档](https://code.claude.com/docs/en/permission-modes)

11. `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT: "1"`：使用较短的系统提示和精简的工具描述，直接减少每次请求携带的固定输入；完整工具集、Hooks、MCP 和 `CLAUDE.md` 的发现机制仍保留。如果当前模型已经默认使用短提示，这项不会再带来额外缩减。[环境变量文档](https://code.claude.com/docs/en/env-vars#variables)
12. `disableBundledSkills: true`：整体移除 Claude Code 自带的技能和工作流，并把内置命令从模型可见列表中隐藏，减少目录信息及自动触发这些功能的机会。适合已有自己一套技能的情况；自定义技能和插件不受影响。它是前面 `skillOverrides` 逐项精简之外的整体关闭方案，不必为了省 Token 同时叠加两套设置。[配置项文档](https://code.claude.com/docs/en/settings-reference#disablebundledskills)
13. `CLAUDE_CODE_ENABLE_TOKEN_USAGE_ATTACHMENT: "0"`：不向主线程追加用量附件，减少反复出现的用量文本。它与 `totalTokensReminder` 控制的是不同附件；原本未开启时，无需额外设置。该变量来自源码分析，尚未公开。[变量读取方式](https://harness.dtmont.com/claude-code/env-vars/#claude-code-enable-token-usage-attachment)、[用量附件注入条件](https://harness.dtmont.com/claude-code/system-reminders/#token-usage)
14. `CLAUDE_CODE_SILENT_TURN_REMINDER: "0"`：关闭模型连续工作却较久没有向用户回复时注入的进度提醒，省去提醒文本，也可能减少由此触发的中途播报。后者取决于模型行为，代价是长任务期间更少主动汇报；原本未启用这项提醒的模型不会受益。该变量同样属于未公开开关。[变量读取方式](https://harness.dtmont.com/claude-code/env-vars/#claude-code-silent-turn-reminder)、[静默提醒注入条件](https://harness.dtmont.com/claude-code/system-reminders/#silent-turn-reminder)

### 功能取舍较大的选项

1. `CLAUDE_CODE_DISABLE_ATTACHMENTS: "1"`：跳过大部分上下文附件收集，包括 IDE 当前文件、选区、诊断和部分状态信息，从源头减少自动注入。代价是模型失去这些现场信息，`@文件` 也不再自动展开为文件内容，可能需要额外读文件；它不是只关闭装饰性提醒的开关。[附件收集路径](https://harness.dtmont.com/claude-code/system-reminders/#attachment-collection-per-turn)、[环境变量文档](https://code.claude.com/docs/en/env-vars#variables)
2. `CLAUDE_CODE_SIMPLE: "1"`：使用极简提示，主要保留 Bash、文件读取和编辑工具，同时关闭技能、Hooks、子代理、自动记忆、`CLAUDE.md` 等机制的自动发现。适合独立、简单的任务；依赖项目指令和技能的日常工作不宜为了缩短提示而整体关闭这些能力。它与只缩短提示的 `CLAUDE_CODE_SIMPLE_SYSTEM_PROMPT` 作用范围不同。[环境变量文档](https://code.claude.com/docs/en/env-vars#variables)

上述未公开选项的依据是源码映射站所分析的构建，后续版本可能变化；这里只记录注入机制，不据此推算具体能省多少 Token。

## 更换 Harness 与计费方式

1. 使用模型厂商自家的 Harness。例如 Anthropic 在 2026 年 8 月 7 日的公告中说明，不再向 Pro、Max、Team 用户收取 Claude Code AutoMode 分类器的额外开销。这降低的是用户承担的费用。[官方公告](https://claude.com/resources/articles/auto-mode-default-in-claude-code)
