# 其他语言规则

只读取与变更语言对应的章节。

## Rust

- 检查 `unwrap/expect` 是否位于可恢复的请求、库或 worker 路径；内部不变量可例外。
- 检查借用值逃逸、`Rc<RefCell<_>>`/`Arc<Mutex<_>>` 引用环、无必要 clone，以及内部可变性是否
  只是为了绕过所有权而没有真实共享状态。
- 检查同步锁跨 `await`、阻塞 I/O/CPU 工作运行在异步执行器上、重试无界，以及取消发生在
  部分写入、事务或资源清理中时是否破坏状态。
- `unsafe` 必须有明确不变量；检查裸指针、生命周期、别名、初始化和 FFI 边界。
- 检查错误类型被丢失、panic 穿越 FFI、无界 channel/task 和未观察的 JoinHandle。
- 只在本次变更定义宏时检查宏：参数是否被重复求值、导出宏是否使用 `$crate::`、token
  插值优先级、过程宏是否对畸形输入 panic，以及生成标识符的 hygiene/冲突。
- 检查长度算术、整数转换、字节切片和 UTF-8 边界；加密、随机、认证代码不得自造协议。

## C 与 C++

- 检查越界、整数溢出、符号转换、未初始化读取、use-after-free、double free 和泄漏。
- 指针算术、长度参数、字符串终止符和 `memcpy/memmove` 大小必须一致。
- C++ 优先 RAII；检查异常路径、移动后对象、悬空引用、迭代器失效和虚析构。
- 并发代码检查数据竞态、锁顺序、原子内存序；没有并发可达证据时不要报告。
- 外部长度、格式字符串和命令/路径必须验证；避免危险的无界字符串函数。

## PHP

- 检查弱类型比较、`empty`/`isset` 差异、数组键缺失和 null 传播。
- `foreach` 按引用遍历后若继续复用迭代变量，必须 `unset`，否则后续赋值可能修改末元素。
- 检查数组 `+`、`array_merge`、spread 和数字 key 重排是否符合覆盖/顺序语义。
- SQL、HTML、Shell、文件路径必须参数化、编码或验证，不能字符串拼接外部输入。
- 检查会话、Cookie、CSRF、对象反序列化、上传文件和动态 include 风险。
- 数据库事务、异常、资源和响应状态必须在失败路径保持一致；不要把请求级自动回收误报为泄漏。
- worker/请求路径中的 cURL、stream 和外部请求必须有超时；会话锁不能跨慢 I/O 长时间持有。
- 结合项目 PHP 版本与框架自动转义、路由 middleware、mass-assignment 和资源所有权判断，
  不重复 PHPStan/Psalm/PHPCS 已准确报告且没有额外行为后果的问题。

## ArkTS

- 避免动态类型和不受支持的运行时特性；保持 ArkTS 静态类型约束。
- `@State` 数组/对象原地 push 或修改属性可能不刷新 UI；检查是否需要替换引用。
- 区分 `@Prop` 单向与 `@Link` 双向；嵌套对象状态检查 `@Observed` + `@ObjectLink`。
- `build` 中不得发起网络、计时器、日志或状态写入；`ForEach/LazyForEach` 使用唯一稳定 key。
- 检查 `aboutToAppear` 创建的计时器/监听是否在 `aboutToDisappear` 释放，以及生命周期同步阻塞。
- 大列表是否需要 `LazyForEach` 必须结合真实数据规模；不要机械套用固定数量阈值。
- 检查权限申请、设备能力、隐私数据和跨设备/进程通信边界。

## Astro

- 明确服务端与客户端执行边界，避免秘密或服务端对象进入客户端 bundle。
- 检查 hydration 指令是否用于直接导入的框架组件，`client:only` 是否声明框架并有必要 fallback；
  不把性能偏好当缺陷，只有过度 hydration 造成材料性客户端成本时才报告。
- hydrated/server island props 必须是 Astro 支持的可序列化类型；禁止函数、类实例、循环对象、
  秘密和不必要的巨大请求对象跨边界。
- `set:html`、`define:vars` 和动态属性/URL 检查清洗、序列化、秘密泄露和每实例重复负载。
- `server:defer` 检查 adapter 支持、fallback、可序列化 props，以及请求数据是否进入共享缓存。
- SSR 路径检查 Cookie、Header、缓存和用户隔离。
- 交互 islands 在 hydration 前后都要保持键盘、焦点和语义可用；只报告可证明的交互障碍。

## Haskell

- 检查非穷尽模式与 `head/tail/!!/foldl1/fromJust/read/error` 等偏函数在真实输入路径上的失败；
  类型或同函数校验已证明不变量时不报告。
- 检查对流式/无限值执行 `length`、完整排序或 strict conversion，以及 `foldl` thunk 链和保留
  lazy 输入头部造成的空间泄漏；不要凭感觉添加 strictness。
- 资源使用 `bracket/withFile/finally` 等异常安全组合；宽捕获 `SomeException` 不得吞掉异步取消。
- `takeMVar` 后的操作必须在异步异常下恢复状态；避免在 `atomically` 内执行长计算、无界重试或
  `unsafeIOToSTM` 非幂等副作用。
- 检查 `Eq/Ord/Hashable` 等实例一致性、窄化数值转换、FFI 所有权与 lazy I/O 生命周期。

## Julia

- 检查运行值决定返回类型、抽象字段、`Vector{Any}` 和循环变量类型漂移等真实类型不稳定。
- 检查多重分派歧义、type piracy，以及 `==` 与 `hash` 等 Base 扩展契约不一致。
- `@inbounds/@simd` 只在索引可证明安全时使用；检查 1-based/offset array，优先按实际轴而非
  硬编码 `1:length(x)`。
- 区分 `nothing`、`missing`、`NaN`；不要用可能被关闭的 `@assert` 验证外部输入。
- 检查多线程共享数组/集合、任务捕获共享绑定、`@async` 被误当 CPU 并行和任务异常丢失。
- 只在热路径和规模可证时报告全局变量、切片复制、大数组重复分配和逐项增长。

## Nim

- 检查引用、指针、slice/openArray 是否超过底层存储生命周期，以及 cast/addr/manual allocation
  的对齐、边界、所有权和释放配对。
- 引用环在 ARC 等无环回收模式下可能泄漏，但 ORC 有 cycle collector；先确认项目内存管理模式。
- 检查索引范围、整数/enum 转换、variant discriminant 和 release 中可能关闭的 assert。
- 资源使用 `defer`/`try-finally`；Future 在完成影响正确性时必须 await/return/观察错误。
- 模板参数不得因展开被重复求值；宏检查 hygiene、source information 和生成代码副作用。
- FFI 检查 calling convention、布局、null、C string 长度/编码和回调数据生命周期。

## Nix

- 检查 derivation 输入是否固定、hash 是否可信、秘密是否进入 store。
- 检查 attribute 重复覆盖、`self/super/pkgs/config` 作用域、inherit 缺失和 `rec` 求值环。
- 检查 source version/revision/hash 是否同步，derivation 工具/运行依赖是否声明，以及 phase override
  是否无意丢掉默认安装行为。
- 禁止 sandbox 构建依赖用户目录、`/usr/bin` 或隐式主机环境。
- NixOS/Home Manager 检查 option 声明、类型/default、重命名迁移、systemd 服务与秘密处理。
- Flake/overlay 检查 final/prev 参数、缺失 input、advertised system 的输出完整性；不强制项目采用 flakes。
