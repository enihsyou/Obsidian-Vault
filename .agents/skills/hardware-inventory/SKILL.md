---
name: hardware-inventory
description: 采集设备硬件参数并写入本 Vault 的硬件规格清单。涵盖 Windows/Linux/macOS 采集命令、采集时的已知坑、官方规格链接校验规则、目标文件格式与写入流程。
---

# 硬件规格清单采集

#AIGC

## 适用范围

从本机或远程主机采集硬件参数，按统一格式写入 `硬件设备/我的硬件规格清单.md`。新增设备段、补全部件、改规格链接都用本 Skill。

只写采集到的信息。采集不到的项在型号格里括号注明原因，规格链接写 `—`，不猜测、不编造。

## 目标文件与格式

目标文件：`硬件设备/我的硬件规格清单.md`。已存在时保留原有事实、链接与结构，只增改目标段；不存在时按下面的骨架新建。

```markdown
---
创建时间: YYYY-MM-DDTHH:mm:ss+08:00
修改时间: YYYY-MM-DDTHH:mm:ss+08:00
---

# 我的硬件规格清单

#AIGC

> 采集日期：YYYY-MM-DD
> 数据来源：本机 SMBIOS / PnP / DMI（Windows）、`ssh <host>` 的 dmidecode / lscpu / lsblk / lspci、`ssh <host>` 的 system_profiler。
> 「购入时间」无订单记录的留空待填。

### <CPU 型号（台式机）或 笔记本型号>

<整机说明段落：机型定位、操作系统、存储布局、网络、购入时间与来源；SSH 入口写这里>

| 部件 | 型号 | 规格链接 | 购入时间 | 购入价格 | 备注 |
| --- | --- | --- | --- | --- | --- |
| CPU | <型号与关键规格> | [<厂商> 官方规格](<url>) |  |  |  |
```

格式要点：

- 三级标题规则：台式机以 CPU 型号为标题（如 `### AMD Ryzen 7 9700X`），笔记本以笔记本型号为标题（如 `### 联想 Y480`）。SSH 入口（`ssh pve`）、主机名等设备标识写进正文段落，不放进标题。
- 每台设备一张表，六列固定为 `部件 | 型号 | 规格链接 | 购入时间 | 购入价格 | 备注`，表头分隔行固定 `| --- | --- | --- | --- | --- | --- |`。
- 正文只写硬件信息：机型、处理器、内存、存储、购入时间与价格、规格链接。不要写操作系统、虚拟化、存储布局、网络地址、虚拟磁盘 / 内存盘，也不要写「机箱/电源型号不可读取」「配置未采集」这类非硬件的缺口说明；表格只列部件。
- 不写 SSH 等设备接入方式（`ssh <host>` 主机别名、用户名、登录方式），那不是硬件信息。
- 同型号的重复部件排在一起，上下相邻，不要让同型号的行被别的型号隔开。
- 型号列只写能唯一标识该产品的型号，不写核心数、频率、接口版本、主控、颗粒等规格参数；这类信息放备注或直接省略。写法：品牌（英文官方写法）+ 产品名 +（料号 / 型号码），例如 `Corsair Hydro Series H115i（CW-9060027-WW）`、`Samsung SM961 256GB（MZVPW256HEGL-00000）`、`Crucial MX300 525GB（CT525MX300SSD1）`。
- 品牌名统一用英文官方写法并固定大小写：`Samsung`（不是 SAMSUNG）、`GLOWAY`（不是光威）、`KINGBANK`（不是金百达）、`Lenovo`（不是联想）、`DELL`（不是戴尔）、`Crucial`（不是英睿达）、`Corsair`、`ASUS`、`GIGABYTE`、`ASMedia`、`MediaTek`、`Realtek`、`Qualcomm Atheros`、`Apple`、`Intel`、`AMD`。
- 系列名同样用官方英文写法：`Corsair Vengeance RGB PRO` / `Corsair Vengeance LED`（不写「复仇者」）；`Samsung Odyssey OLED G8`（不写「奥德赛」）。
- 料号优先取设备上报的型号 / 料号字符串（`Win32_DiskDrive.Model`、`lsblk` 的 MODEL、`dmidecode -t 17` 的 PartNumber、SMBIOS PartNumber），比商品名更准；型号以设备铭牌 / SMBIOS / EDID 为准，不要按外观或系列名推断（例如 MZVPW256HEGL 是 SM961 系列，不是 PM9A1）。
- 重复部件拆成多行：先写一行汇总（如 `内存 | 64 GB（4×16 GB）DDR4 ...`），再按实际插槽或料号逐条列出（如 `内存条 1`、`内存条 2`）。
- 「购入时间」与「购入价格」来自京东 / 淘宝订单导出，只统计交易成功或已完成的订单；没有订单记录的留空待填。
- 「购入价格」填订单实付金额；保修换货等 ¥0 订单写 0；订单子商品行没有金额就留空，不要把订单总价平摊到每个部件上。
- 「备注」只写与购入相关的信息（渠道、保修换货、同型号的另一笔订单）；没有订单就留空，不要写「订单记录中无对应条目」这类占位说明。
- 采集不到的项目：规格链接写 `—`，型号格用括号注明原因，例如「机箱/电源型号不可读取，需人工填写」「SMBIOS 未提供品牌/型号，需人工确认」。
- 笔记本整机写成表格里的一行：`部件` 填「整机」，`型号` 填处理器 + 内存 + 存储 +（整机型号号，如 Z11C000BPCH/A）。内存和存储属于型号的一部分，不单独成行；Apple 的统一硬件不必显示具体 SSD 料号（写「512GB SSD」即可）。标题里已有的机型名不再重复写。其余随型号固定的规格不逐项罗列；只有单独购买过的部件（外接配件、加装内存等）才另起一行，随整机购买或板载固化的部件不写；笔记本段不需要正文段落。
- 规格链接里多个链接用 ` · ` 分隔。

## 采集命令

### Windows

在 Bash 里调用时用单引号包外层，避免引号嵌套冲突：

```bash
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_ComputerSystem | Select Manufacturer,Model,SystemFamily,TotalPhysicalMemory'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_Processor | Select Name,NumberOfCores,NumberOfLogicalProcessors,MaxClockSpeed'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_BIOS | Select SMBIOSBIOSVersion,ReleaseDate'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_BaseBoard | Select Manufacturer,Product'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_PhysicalMemory | Select Manufacturer,PartNumber,Capacity,Speed,ConfiguredClockSpeed,ConfiguredVoltage,BankLabel'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_VideoController | Select Name,DriverVersion,DriverDate,VideoModeDescription'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_DiskDrive | Select Model,Size,SerialNumber'
powershell.exe -NoProfile -Command 'Get-CimInstance Win32_OperatingSystem | Select Caption,Version,BuildNumber,InstallDate'
powershell.exe -NoProfile -Command 'Get-NetAdapter | Where-Object Status -eq "Up" | Select Name,InterfaceDescription,LinkSpeed'
```

磁盘与盘符映射：

```bash
powershell.exe -NoProfile -Command 'Get-Disk | Select Number,FriendlyName,Size,BusType; Get-Partition | Select DiskNumber,PartitionNumber,DriveLetter,Size; Get-Volume | Select DriveLetter,FileSystemLabel,FileSystem,Size'
```

显示器（EDID，需解码）：

```bash
powershell.exe -NoProfile -Command 'Get-CimInstance -Namespace root\wmi -ClassName WmiMonitorID | ForEach-Object { $mfg = -join ($_.ManufacturerName | ForEach-Object { [char]($_ -band 0x7F) }); $name = -join ($_.UserFriendlyName | ForEach-Object { [char]($_ -band 0x7F) }); $sn = -join ($_.SerialNumberID | ForEach-Object { [char]($_ -band 0x7F) }); [PSCustomObject]@{ Instance = $_.InstanceName; Manufacturer = $mfg; Model = $name; Serial = $sn } }'
```

USB 附件（散热器、机箱、扩展卡等靠这个识别型号）：

```bash
powershell.exe -NoProfile -Command 'Get-PnpDevice | Where-Object InstanceId -like "*VID_*"'
powershell.exe -NoProfile -Command 'Get-PnpDeviceProperty -InstanceId "<上一步的 InstanceId>" -ErrorAction SilentlyContinue | Where-Object KeyName -match "DeviceDesc|BusReportedDeviceDesc"'
```

### Linux

`ssh <host>` 后执行：

```bash
lscpu
free -h
dmidecode -t 1 -t 2 -t 3 -t 17   # 主板/机箱/内存条明细
lsblk -d -o NAME,SIZE,MODEL,ROTA,TRAN
lsblk -o NAME,SIZE,TYPE,MOUNTPOINT,MODEL
lspci -nn | grep -Ei 'vga|3d|display|ethernet|network|audio|usb'
ip -br a
cat /etc/os-release
```

判断是否裸机：

```bash
lscpu | grep -i hypervisor
```

### macOS

`ssh -l <user> <host>` 后执行：

```bash
system_profiler SPHardwareDataType SPStorageDataType SPDisplaysDataType SPPowerDataType
sysctl -n hw.model hw.machine hw.memsize
diskutil list
```

## 已知坑

### 通用

- 裸机判断用 `lscpu | grep -i hypervisor`：输出为空 = 物理裸机；跑在虚拟机里要在型号格里说明。
- 采集不到的项如实写「需人工填写 / 需人工确认」，不要用同系列、同外观的型号补齐。

### Windows

- `Win32_PhysicalMemory` 的 `Manufacturer` 经常是 `Unknown`；`DeviceLocator` 会重复报 `DIMM 1`，改用 `BankLabel` 区分通道。品牌读不到就写「需人工确认」。
- `Win32_VideoController.AdapterRAM` 对 >4 GB 显存的 32 位溢出（RTX 4070 报 4293918720 ≈ 4 GB），显存容量要用别处核对，不要直接抄这个值。
- 显示器型号从 `root\wmi` 的 `WmiMonitorID` 取。字符数组要 `($_ -band 0x7F)` 再转 char：厂商名首字节的第 7 位（0x80）是标志位，掩码后才是真实字符（例：原值 0xD3 掩码得 0x53 即 'S'；不掩码会读出控制字符）。注册表 EDID 路径需要管理员权限，默认读不到就别折腾。
- 冷却是 USB 附件的话，`Get-PnpDeviceProperty` 的 `DeviceDesc` / `BusReportedDeviceDesc` 会直接给出型号（例：本机读出 `Corsair HydroSeries H115i`），这是识别水冷型号最可靠的办法。
- 网卡 `Status = Not Present` 表示板载但当前未识别或被禁用，写「当前系统未识别」而不是删掉这行。

### Linux

- `dmidecode` 需要 root：`sudo -n dmidecode -t 17`；没有免密 sudo 时用 `dmidecode` 的退化输出，或直接标注该项缺失。
- 内存要按 `dmidecode -t 17` 的 `Locator`（ChannelA-DIMM0 等）和厂商 ID 拆行，汇总行写实际配置速率与标称速率的差异。

### macOS

- `SPDisplaysDataType` 只列当前活动屏，可能是虚拟屏；内建屏参数以 Apple 官方规格页为准并注明来源。
- `hw.memsize` 是字节，除以 1024³ 得 GB。

## 官方规格链接

- 优先厂商官方页面：AMD 产品页、NVIDIA 产品页、技嘉主板页、Crucial / Samsung SSD 页、Apple 支持页技术规格（`support.apple.com/zh-cn/111893` 这类）、Proxmox VE、Debian 版本页。
- 验证链接：

```bash
curl -sSL -o /dev/null -w '%{http_code}\n' '<url>'
```

- 很多厂商站点对 curl 返回 403（技嘉、Intel、Corsair、ASMedia），这不代表页面不存在，别据此判定失效；返回 404 才需要换路径。
- Corsair 官网的产品 URL 容易猜错（`/p/cpu-coolers/<sku>/<slug>` 形式对停售产品常常 404），搜到实际页面再填；找不到官方深链时退回厂商产品分类页或官方翻新页。
- 已验证可用的 Corsair 深链：复仇者 RGB PRO 32GB(2×16GB) DDR4-3200 C16 → `https://www.corsair.com/cn/zh/p/memory/cmw32gx4m2e3200c16/vengeance-rgb-pro-ddr4-32gb-2-x-16gb-ddr4-dram-3200mhz-c16-memory-kit-black-cmw32gx4m2e3200c16`；复仇者 LED 红光 32GB(2×16GB) DDR4-3000 C16 → `https://www.corsair.com/us/en/p/memory/cmu32gx4m2d3000c16r/vengeancea-led-32gb-2-x-16gb-ddr4-dram-3000mhz-c16-memory-kit-red-led-cmu32gx4m2d3000c16r`。
- Samsung 显示器（如 Odyssey OLED G8 G85SB）在中国区没有对应路径，`https://www.samsung.com/tw/monitors/gaming/odyssey-oled-g8-g85sb-...` 有官方产品页可用。
- 三星半导体站会下架停售型号的产品页（SM961、980 PRO 都没有产品页了）：找不到就写 `—` 并在备注说明「官网已下架该系列」，或改用官方技术博客页，不要填第三方电商或第三方数据库链接。
- 厂商已下架的老型号（如光威 VAL500）官网现行目录里查不到，退回厂商产品中心页并在备注注明「官网现行目录已无此型号」。
- 不要填第三方电商链接。找不到官方页面时规格链接列填 `—`，不要编 URL。

## 工作流程

1. **采集** — 按平台跑上面的命令，远程设备先 `ssh` 再跑。
2. **归一化** — 统一单位（GB/TB、MHz、GHz）、把驱动/固件版本与采集日期写进型号格，采集不到的项按格式注明原因。
3. **核对订单** — 导入京东 / 淘宝订单导出，只取交易成功或已完成的订单；已取消、已退店、已退货、SD/TF 卡与线材等配件一律不写进文件（正文与备注都不提这些订单）。按商品名匹配部件，填「购入时间」与「购入价格」（实付金额；保修换货写 0）；订单子商品行继承父订单的时间，没有金额就留空。
4. **查官方规格链接并验证** — 搜官方页面，用 `curl` 验 HTTP 状态，403 不算失效，404 换路径。
5. **写入** — 在 `硬件设备/我的硬件规格清单.md` 对应 `###` 段写表；新增设备段时在该段标题下加 `#AIGC`（修改已有设备段不重复加，保留原有标签）。
6. **维护修改时间** — 在 Vault 根目录运行：

```bash
python .agents/skills/md-writing/scripts/update_modified_time.py "硬件设备/我的硬件规格清单.md"
```

写作与 frontmatter 约定另见 [md-writing](../md-writing/SKILL.md)，中文行文参考 `/humanizer-zh` Skill。
