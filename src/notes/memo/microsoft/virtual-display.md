# Windows 添加虚拟显示器

> 在 powershell (管理员权限) 终端中执行以下命令
>
> 脚本不是最新? [刷新远程脚本](https://purge.jsdelivr.net/gh/viarotel/scripts@main/powershell/main.ps1)

```shell
$env:script = "windows-virtual-monitor"; irm "https://cdn.jsdelivr.net/gh/viarotel/scripts@main/powershell/main.ps1" | iex
```