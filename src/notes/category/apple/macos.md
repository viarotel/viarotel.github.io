# macOS 常用命令

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
