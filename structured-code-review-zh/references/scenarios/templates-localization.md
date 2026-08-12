# 模板与本地化规则

## FreeMarker

- `${...}` 输出到 HTML 时检查上下文转义。`.ftlh/.ftlx` 或显式
  `<#ftl output_format="HTML">` 已启用自动转义时，不要重复要求 `?html`。
- `?no_esc`、`<#noautoesc>`、`?api`、`?eval` 和 `?new()` 是高风险逃生口；只有值可被
  外部控制且没有可信清洗或受限解析器时才报告。
- HTML、属性、URL、JavaScript 和 CSS 使用不同编码规则；`?html` 不能保护脚本或 URL 上下文。
- 不可信输入不得拼入模板源码、`<#include>`/`<#import>` 名称或动态模板查找，否则可能形成 SSTI、
  任意模板读取或代码执行。
- 可缺失值应使用明确的 `!"fallback"` 或 `??`；裸 `!` 不应把业务必需值静默变为空字符串。
- 检查 `!` 优先级、可选模板 `.exists`、相对 include 解析和 include 导致的全局命名空间污染。
- 写入 URL、JSON、ID 等机器格式的数字/日期应固定 locale、时区和 computer format，避免部署环境差异。

## PO 翻译文件

- `msgstr` 不得歪曲 `msgid`；数字、单位、日期、专有名词和关键条件必须保持一致。
- `%s`、`%d`、`%(name)s`、`{0}`、`{name}` 等占位符的名称、数量和类型必须一致；只有带位置标记时才允许重排。
- `msgstr[n]` 数量与 `Plural-Forms` 的 `nplurals` 一致，不得缺索引或漏掉实际需要的复数形式。
- 检查引号、转义、多行拼接、前后空白、尾随换行、重复冲突项和乱码。
- 不报告不改变含义的措辞、语气或地区用语偏好。

## POT 模板文件

- POT 中空 `msgstr` 是正确行为；非空 `msgstr` 反而可能是误提交的翻译。
- 检查 `Content-Type`/charset、`Plural-Forms` 语法、孤立 `msgid_plural` 和冲突的重复 `msgid`。
- `msgid` 与 `msgid_plural` 的占位符、空白、换行和转义必须兼容。
- 含数量占位符的条目如果没有 `msgid_plural`，确认是否遗漏复数契约。
