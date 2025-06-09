为了从 SVG 导出 PNG 我下载了两个软件

为两个可执行文件创建了 shim
shim_exec "inkscape.exe"
shim_exec "magick.exe"

然后觉得inkscape不好用，卸载了它，此时shim指向无效的地址

再执行 `magick icon.svg -background none -resize 1024x1024 icon.png` 进行转换时
 magick 会尝试在一些目录（包含PATH）中寻找 inkscape.exe，然后触发错误

```shellsession
PowerShell 7.5.1  
PS G:\> magick icon.svg -background none -resize 1024x1024 icon.png  
  
ERROR - Shim application path does not exist.  
  
Shim is no longer valid and must be regenerated.  
PS G:\GitHub\shared-config\packages\astro-developer-pack> mm  
mm: The term 'mm' is not recognized as a name of a cmdlet, function, script file, or executable program.  
Check the spelling of the name, or if a path was included, verify that the path is correct and try again.  
  
[general]  
The most similar commands are:  
> gm, mi, mp, mv, rm  
  
PS G:\> magick icon.svg -background none -resize 1024x1024 icon.png  
  
ERROR - Shim application path does not exist.  
  
Shim is no longer valid and must be regenerated.  
PS G:\>  
An error has occurred that was not properly handled. Additional information is shown below. The PowerShell process will exit.  
Unhandled exception. System.ArgumentOutOfRangeException: Console key values must be between 0 and 255 inclusive. (Parameter 'key')  
at System.ConsoleKeyInfo..ctor(Char keyChar, ConsoleKey key, Boolean shift, Boolean alt, Boolean control)  
at System.ConsolePal.ReadKey(Boolean intercept)  
at Microsoft.PowerShell.Internal.VirtualTerminal.<>c.<ReadKey>b__40_0()  
at Microsoft.PowerShell.Internal.VirtualTerminal._TryIgnoreIOE[T](Func`1 f)  
at Microsoft.PowerShell.Internal.VirtualTerminal.ReadKey()  
at Microsoft.PowerShell.PSConsoleReadLine.ReadOneOrMoreKeys()  
at Microsoft.PowerShell.PSConsoleReadLine.ReadKeyThreadProc()  
at System.Threading.ExecutionContext.RunInternal(ExecutionContext executionContext, ContextCallback callback, Object state)  
--- End of stack trace from previous location ---  
at System.Threading.ExecutionContext.RunInternal(ExecutionContext executionContext, ContextCallback callback, Object state)
```


原因是 **ImageMagick utilizes inkscape if its in your execution path otherwise RSVG**.

https://www.imagemagick.org/discourse-server/viewtopic.php?t=23916


实际上此时把 inkscape.exe 换成任意可执行文件都会被执行，比如calc.exe，很容易攻击