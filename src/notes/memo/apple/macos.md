# macOS 配置及常用命令

## macOS 配置

### macOS 脚本加载器

```zsh
/bin/zsh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/viarotel-org/environments@main/apple/shell/main.sh)"
```

### macOS 环境配置

> 个人自用的 macOS 环境配置脚本

```zsh
/bin/zsh -c "$(curl -fsSL https://cdn.jsdelivr.net/gh/viarotel-org/environments@main/apple/shell/macos/main.sh)"
```

## macOS 常用命令

```zsh
# 修复打开软件提示已损坏 appPath 为软件路径
sudo xattr -r -d com.apple.quarantine [appPath]
# 开启允许任何来源
sudo spctl --master-disable
# 启用管理员权限
sudo su
# 退出管理员权限
exit
# 安装 Rosetta
softwareupdate --install-rosetta
```
