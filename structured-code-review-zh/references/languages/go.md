# Go 规则

优先检查编译器、`go vet`、Staticcheck 和 `gofmt` 不容易表达的真实行为问题。

## 错误与 API 契约

- 检查错误被忽略、覆盖、转换为成功或无意义默认值。
- 调用方需要 `errors.Is/As` 时使用 `%w` 保留错误身份；不要包装 nil。
- 库、请求和 worker 路径不应使用 `panic`、`log.Fatal` 或 `os.Exit` 代替可返回错误。
- defer 清理不能覆盖主错误，或在 Commit/Close/Rollback 失败后返回成功。

## nil 与值语义

- 检查 typed nil 放入非 nil interface 后被误判为存在。
- nil map 写入、nil channel 意外永久阻塞、真实可达的 nil 指针解引用必须报告。
- 含 Mutex、Once、Pool、atomic 状态的值首次使用后不得复制。
- 检查值接收者修改副本、slice/map 共享底层数据以及 append 后引用失效。
- `sync.Once` 不适合失败后必须重试的初始化。

## Context 与 goroutine

- 请求级工作应继承调用方 context，不应无理由换成 `Background/TODO`。
- `WithCancel/Timeout/Deadline` 创建的 context 在当前作用域拥有取消权且会长期存活时，检查 `cancel` 是否遗漏；
  立即返回给调用方所有或由更高层统一取消的 context 不报告。
- 阻塞 I/O、等待、重试和循环只在请求取消、截止时间或关闭信号确实应中断该工作时报告。
- goroutine 只有缺少退出条件、错误/完成观察路径或明确所有权而可能泄漏时报告。
- 检查循环变量捕获时结合模块 Go 版本；Go 1.22 改变了 range 变量语义。

## channel、锁与共享状态

- 证明共享状态可并发访问后，再报告 map/slice/指针/计数器竞态。
- 避免持锁执行网络、数据库、回调、channel 操作或长时间 CPU 工作。
- 检查 RLock 下写入、同一状态混用原子和非原子访问、锁顺序反转。
- 确认 channel 关闭责任唯一，避免重复关闭、关闭后发送和永久阻塞。
- 检查 WaitGroup 的 Add/Wait 竞态、遗漏 Done、复制和无法归零。

## 生命周期与 I/O

- response body、文件、数据库 rows、ticker 和受当前所有者持有的 timer 在可达路径上未释放时报告；
  由框架或调用方拥有、或短生命周期已由运行时回收且没有实际成本的对象不报告。
- 读取必须处理短读、部分写、scanner 限制和未检查的 Close/Flush 错误。
- 不要仅以 GC 泄漏为由报告 Go 1.23+ 可回收的未引用 timer；必须说明实际成本。
