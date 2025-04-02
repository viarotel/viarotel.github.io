---
title: 多系统下 Windows 时间异常
---

# 多系统下 Windows 时间异常

> 电脑安装多系统后，特别是 Linux 切换回 Windows 可能会出现 系统的时间异常，解决方法如下：

Windows 下以管理员身份打开 PowerShell，输入以下命令：

```shell
Reg add HKLM\SYSTEM\CurrentControlSet\Control\TimeZoneInformation /v RealTimeIsUniversal /t REG_DWORD /d 1
```

或者 Linux 下在终端中，输入以下命令：

```shell
timedatectl set-local-rtc 1 --adjust-system-clock
```

推荐第一种方法，修改 Windows 的时间管理。因为在 Linux 系统中修改后，输入 timedatectl 命令后，会出现警告，提示你使用 RTC 时钟会导致一些程序错误
