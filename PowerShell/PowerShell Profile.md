---
创建时间: 2025-04-19T03:09:15+08:00
修改时间: 2025-04-19T03:09:15+08:00
---
see also [[Oh-my-posh 加载速度]]

Profiler
[Easily profile your PowerShell code with the Profiler module - Daniel Schroeder’s Programming Blog](https://blog.danskingdom.com/Easily-profile-your-PowerShell-code-with-the-Profiler-module/)

PSProfiler Interactive only
[Optimizing your $Profile - PowerShell Team](https://devblogs.microsoft.com/powershell/optimizing-your-profile/)

pwsh.exe 关闭杀软
[加快 PowerShell 設定載入速度的方法 - WellWells](https://wellstsai.com/post/slow-powershell-profile-loading/)

lazy load
[Quick tip if your $profile is slow to load : r/PowerShell](https://www.reddit.com/r/PowerShell/comments/1anffqq/quick_tip_if_your_profile_is_slow_to_load/)

fsackur/ProfileAsync
[How I got my profile to load in 100ms with deferred loading : r/PowerShell](https://www.reddit.com/r/PowerShell/comments/180cp1y/how_i_got_my_profile_to_load_in_100ms_with/)
[fsackur/ProfileAsync: Load your powershell profile asynchronously, so you can get to the prompt faster.](https://github.com/fsackur/ProfileAsync)
[dotfiles/.chezmoitemplates/profile.ps1 at master · fsackur/dotfiles](https://github.com/fsackur/dotfiles/blob/master/.chezmoitemplates/profile.ps1)

Benchmark force AMD 9700X 3.0GHz

```log
disable Windows Defender by exclusion
282.3 ms -> 270.4 ms (9.6ms)

disable Windows Defender
270.4 ms -> 258.4 ms (12.0ms)

close RTSS
258.4 ms -> 242.8 ms

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 282.3 ms ± 8.4 ms [User: 226.7 ms, System: 169.0 ms]  
Range (min … max): 271.6 ms … 300.5 ms 30 runs

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 270.4 ms ± 9.2 ms [User: 232.9 ms, System: 152.3 ms]  
Range (min … max): 260.5 ms … 295.6 ms 30 runs

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 258.4 ms ± 5.2 ms [User: 240.8 ms, System: 135.3 ms]  
Range (min … max): 252.1 ms … 271.1 ms 30 runs

Benchmark 1: pwsh -noprofile -c 'exit'  
Time (mean ± σ): 242.8 ms ± 3.6 ms [User: 211.1 ms, System: 151.6 ms]  
Range (min … max): 236.4 ms … 248.2 ms 11 runs
```

```log
disable WindHawk by exclusion
305.3 ms -> 298.8 ms

disable MacType by exclusion
298.8 ms - 280.3 ms

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 305.3 ms ± 10.2 ms [User: 247.6 ms, System: 171.4 ms]  
Range (min … max): 289.0 ms … 338.3 ms 30 runs

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 298.8 ms ± 10.2 ms [User: 245.7 ms, System: 169.6 ms]  
Range (min … max): 283.3 ms … 325.7 ms 30 runs

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 280.3 ms ± 5.9 ms [User: 251.8 ms, System: 142.7 ms]  
Range (min … max): 272.6 ms … 296.3 ms 30 runs
```

```log
estimate cost of import module

$ hyperfine 'pwsh -noprofile -c exit' 'pwsh -noprofile -c "Import-Module ProfileAsync"'
Benchmark 1: pwsh -noprofile -c exit
  Time (mean ± σ):     165.5 ms ±   9.5 ms    [User: 119.6 ms, System: 97.8 ms]
  Range (min … max):   149.3 ms … 184.6 ms    15 runs

Benchmark 2: pwsh -noprofile -c "Import-Module ProfileAsync"
  Time (mean ± σ):     235.6 ms ±   7.1 ms    [User: 189.1 ms, System: 101.5 ms]
  Range (min … max):   227.0 ms … 247.0 ms    11 runs

Summary
  pwsh -noprofile -c exit ran
    1.42 ± 0.09 times faster than pwsh -noprofile -c "Import-Module ProfileAsync"
```

如何判断 Interactive ?
调用了 $function:prompt 肯定是，但这样要处理其他 Shell Integration 在加载 PROFILE 后重写 prompt，把我们重写的 prompt 顶掉的问题

```powershell
$script:_pwshInteractive = $false
function global:prompt {
    if ($script:_pwshInteractive) {
        # 避免被捕获为 old prompt 造成循环
        return
    }
    $script:_pwshInteractive = $true

    #Write-Output "Prompt before: $((Get-Command prompt).ScriptBlock)"
    # 初始化交互终端用到的模块
    . $env:DOTFILES\shell\pwsh\PSHelper_Interactive.ps1

    #Write-Output "Prompt after: $((Get-Command prompt).ScriptBlock)"
    #$Global:__VSCodeOriginalPrompt = $function:prompt

    # 调用由 oh-my-posh 重写的函数
    prompt
}
```

还有一种办法，判断要加载 PSReadLine [PowerShell/src/Microsoft.PowerShell.ConsoleHost/host/msh/ConsoleHost.cs at master · PowerShell/PowerShell](https://github.com/PowerShell/PowerShell/blob/master/src/Microsoft.PowerShell.ConsoleHost/host/msh/ConsoleHost.cs#L263)，只要自己不主动加载 PSReadLine，PowerShell 会在 Interactive 阶段替我们主动提前加载它

```powershell
if ($null -ne (Get-Module -Name PSReadLine)) {
    # 初始化交互终端用到的模块
    . $env:DOTFILES\shell\pwsh\PSHelper_Interactive.ps1
}
```

> 还有一个办法 [PowerShellProfile/Microsoft.PowerShell_profile.ps1 at a362624850132e39ce024a889c0a611e58fbe7e4 · MatejKafka/PowerShellProfile](https://github.com/MatejKafka/PowerShellProfile/blob/a362624850132e39ce024a889c0a611e58fbe7e4/Microsoft.PowerShell_profile.ps1#L5)，性能差不多，但能避免自己 Import 的问题

有大把时间花在加载 PSReadLine 上

```log
$ hyperfine 'pwsh -noprofile -c "exit"' 'pwsh -noprofile -c "Import-Module PSReadLine"' --warmup 5  
Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 310.3 ms ± 17.2 ms [User: 259.4 ms, System: 168.1 ms]  
Range (min … max): 286.1 ms … 348.1 ms 10 runs  
  
Benchmark 2: pwsh -noprofile -c "Import-Module PSReadLine"  
Time (mean ± σ): 509.9 ms ± 6.3 ms [User: 393.7 ms, System: 250.9 ms]  
Range (min … max): 501.8 ms … 517.4 ms 10 runs  
  
Summary  
pwsh -noprofile -c "exit" ran  
1.64 ± 0.09 times faster than pwsh -noprofile -c "Import-Module PSReadLine"
```

oh-my-posh

```log
disable Enable-PoshLineError
861.1 ms -> 725.4 ms (ms)

disable Set-PSReadLineOption -ContinuationPrompt
725.4 ms -> 626.9 ms (ms)

disable Get-PSReadLineOption
626.9 ms -> 538.4 ms (ms)

preset POSH_THEME
538.4 ms -> 506.1 ms

disable Set-PSReadLineOption -ExtraPromptLineCount
506.1 ms -> 505.2 ms

hardcode oh-my-posh.exe
...

Benchmark 1: pwsh -c "exit"  
Time (mean ± σ): 861.1 ms ± 57.7 ms [User: 627.3 ms, System: 357.2 ms]  
Range (min … max): 801.5 ms … 1045.0 ms 30 runs
Benchmark 1: pwsh -c "exit"  
Time (mean ± σ): 725.4 ms ± 19.0 ms [User: 559.5 ms, System: 286.4 ms]  
Range (min … max): 705.5 ms … 789.1 ms 30 runs
Benchmark 1: pwsh -c "exit"  
Time (mean ± σ): 626.9 ms ± 19.1 ms [User: 502.3 ms, System: 239.1 ms]  
Range (min … max): 602.4 ms … 663.9 ms 30 runs
Benchmark 1: pwsh -c "exit"  
Time (mean ± σ): 538.4 ms ± 31.9 ms [User: 455.6 ms, System: 204.4 ms]  
Range (min … max): 500.2 ms … 643.6 ms 30 runs
Benchmark 1: pwsh -c "exit"  
Time (mean ± σ): 506.1 ms ± 11.1 ms [User: 410.9 ms, System: 216.1 ms]  
Range (min … max): 490.1 ms … 537.0 ms 30 runs
Benchmark 1: pwsh -c "exit"  
Time (mean ± σ): 505.2 ms ± 8.7 ms [User: 434.4 ms, System: 205.3 ms]  
Range (min … max): 489.5 ms … 526.1 ms 30 runs
```

Issue
[[MulticoreJIT] Writes to StartupProfileData-Interactive are syscall intensive · 议题 #95591 · dotnet/runtime](https://github.com/dotnet/runtime/issues/95591)，路径不能改， 134ms [PowerShell/src/System.Management.Automation/CoreCLR/CorePsPlatform.cs at master · PowerShell/PowerShell](https://github.com/PowerShell/PowerShell/blob/master/src/System.Management.Automation/CoreCLR/CorePsPlatform.cs#L170)

```log
274.7 ms -> 268.5 ms (6.2ms)

foreach ($pName in @(
    "StartupProfileData-Interactive",
    "StartupProfileData-NonInteractive"
)) {
    New-Item -ItemType SymbolicLink -Path "$Env:LOCALAPPDATA\Microsoft\PowerShell\$pName" -Target "R:\Cache\PowerShell\$pName" -Force
}

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 274.7 ms ± 13.3 ms [User: 240.7 ms, System: 154.4 ms]  
Range (min … max): 260.7 ms … 318.0 ms 30 runs

Benchmark 1: pwsh -noprofile -c "exit"  
Time (mean ± σ): 268.5 ms ± 9.2 ms [User: 227.9 ms, System: 153.8 ms]  
Range (min … max): 257.5 ms … 305.3 ms 30 runs
```

最终效果 AMD 9700X 5.5GHz
分别代表了非交互式基准，交互式基准，非交互式，交互式

```shellsession
PS C:\Users\enihsyou> hyperfine 'pwsh -NoProfile -c "exit"' 'pwsh -NoProfile' 'pwsh -c "exit"' 'pwsh' --warmup 5  
Benchmark 1: pwsh -NoProfile -c exit  
Time (mean ± σ): 128.6 ms ± 1.3 ms [User: 114.8 ms, System: 75.2 ms]  
Range (min … max): 126.7 ms … 132.9 ms 22 runs  
  
Benchmark 2: pwsh -NoProfile  
Time (mean ± σ): 262.2 ms ± 3.0 ms [User: 209.9 ms, System: 113.5 ms]  
Range (min … max): 257.3 ms … 265.6 ms 11 runs  
  
Benchmark 3: pwsh -c exit  
Time (mean ± σ): 158.4 ms ± 2.3 ms [User: 134.0 ms, System: 86.1 ms]  
Range (min … max): 156.0 ms … 163.8 ms 18 runs  
  
Benchmark 4: pwsh  
Time (mean ± σ): 442.8 ms ± 4.1 ms [User: 321.9 ms, System: 179.7 ms]  
Range (min … max): 438.0 ms … 448.7 ms 10 runs  
  
Summary  
pwsh -NoProfile -c exit ran  
1.23 ± 0.02 times faster than pwsh -c exit  
2.04 ± 0.03 times faster than pwsh -NoProfile  
3.44 ± 0.05 times faster than pwsh
```

pwsh.exe will try to access ApplicationInsightsDiagnostics.json, it's a feature of Application Insights. Disable with $Env:POWERSHELL_TELEMETRY_OPTOUT
[ApplicationInsights-dotnet/BASE/src/Microsoft.ApplicationInsights/Extensibility/TelemetryConfiguration.cs at main · microsoft/ApplicationInsights-dotnet](https://github.com/microsoft/ApplicationInsights-dotnet/blob/main/BASE/src/Microsoft.ApplicationInsights/Extensibility/TelemetryConfiguration.cs#L70)
[PowerShell/src/System.Management.Automation/utils/Telemetry.cs at master · PowerShell/PowerShell](https://github.com/PowerShell/PowerShell/blob/master/src/System.Management.Automation/utils/Telemetry.cs#L180)

```log
C:\Users\enihsyou\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine\ConsoleHost_history.txt
ReadFile 419KB 7ms

Traverse $Env:Path 10ms

Load Module 480.7 ms -> 464.0 ms
# 去掉由 WindowsPowerShell 在系统环境变量种加入的模块路径，pwsh7 用不上这些，节约 16ms
$Env:PSModulePath=@(
    $Env:PSModulePath -split ';' |
    Where-Object { $_ -notmatch 'WindowsPowerShell' }
) -Join ';'

Benchmark 1: pwsh  
Time (mean ± σ): 480.7 ms ± 5.2 ms [User: 401.2 ms, System: 140.3 ms]  
Range (min … max): 475.9 ms … 492.1 ms 10 runs
Benchmark 1: pwsh  
Time (mean ± σ): 464.0 ms ± 2.9 ms [User: 356.3 ms, System: 148.1 ms]  
Range (min … max): 458.4 ms … 468.2 ms 10 runs
```

注释 ProfileAsync 里日志的部分，-20ms

### version-fox shim 会叠加一层耗时

```log
$ hyperfine 'C:\Users\enihsyou\.version-fox\shims\node.exe --version' 'C:\Users\enihsyou\.version-fox\cache\nodejs\current\node.exe --version'
Benchmark 1: C:\Users\enihsyou\.version-fox\shims\node.exe --version
  Time (mean ± σ):      27.2 ms ±   2.2 ms    [User: 12.1 ms, System: 14.7 ms]
  Range (min … max):    25.0 ms …  38.9 ms    66 runs

Benchmark 2: C:\Users\enihsyou\.version-fox\cache\nodejs\current\node.exe --version
  Time (mean ± σ):      15.5 ms ±   1.0 ms    [User: 8.5 ms, System: 9.0 ms]
  Range (min … max):    14.0 ms …  19.2 ms    121 runs

Summary
  C:\Users\enihsyou\.version-fox\cache\nodejs\current\node.exe --version ran
    1.76 ± 0.18 times faster than C:\Users\enihsyou\.version-fox\shims\node.exe --version
```

之前 [[收集可执行文件到 PATH]] 是因为需要一个地方收集 bin 路径，所以把 shim 目录添加到 PATH 中了，但这里面的可执行文件实际是个转发器，会有一个启动 shim 程序的耗时损失。很可惜，这部分耗时难以省去。

为什么用 shim？因为有些 exe 可执行文件，需要在特定的目录运行。比如 go，会从当前 exe 所在位置寻找 `../pkg/tool` 是否存在来决定默认的 `GOROOT` 位置。
