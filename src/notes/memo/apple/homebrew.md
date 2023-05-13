# homebrew 配置及常用命令

## homebrew 安装

### 安装并恢复备份

```zsh
/bin/zsh -c "$(curl -fsSL https://gitee.com/viarotel/environments/raw/gitee/apple/shell/homebrew/main.sh)"
```

### 仅安装

```zsh
/bin/zsh -c "$(curl -fsSL https://gitee.com/viarotel/environments/raw/gitee/apple/shell/homebrew/install.sh)"
```

### 仅恢复备份

```zsh
/bin/zsh -c "$(curl -fsSL https://gitee.com/viarotel/environments/raw/gitee/apple/shell/homebrew/restore.sh)"
```

## homebrew 国内配置

```zsh
# 在 .zprofile 文件中加入
export HOMEBREW_INSTALL_FROM_API=1
export HOMEBREW_API_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles/api"
export HOMEBREW_BOTTLE_DOMAIN="https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles"
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
export HOMEBREW_PIP_INDEX_URL="https://pypi.tuna.tsinghua.edu.cn/simple"
# 设置以下常用 tap 的国内源
brew tap --custom-remote --force-auto-update homebrew/bundle https://gitee.com/Homebrew2/homebrew-bundle.git
brew tap --custom-remote --force-auto-update homebrew/cask https://gitee.com/Homebrew2/homebrew-cask.git
brew tap --custom-remote --force-auto-update homebrew/services https://gitee.com/Homebrew2/homebrew-services.git
```

## homebrew 常用命令

```zsh
# 搜索包
brew search qq
# 安装命令行类型包
brew install git
# 创建软连接(环境变量)
brew link node@18
# 安装图形界面类型包
brew install --cask qq
# 更新brew及其依赖
brew update
# 更新所有包 包括 homebrew
# --greedy:  强行覆盖更新
brew upgrade --greedy
# 更新指定包
brew upgrade --greedy git
# 删除指定包
brew uninstall git
# 删除指定包以及所有依赖
brew uninstall --zap git
# 查看软件包
brew info git
# 检查是否有错误
brew doctor
# 清理全部包
brew cleanup
# 清理指定包
brew cleanup git
# 清理所有未使用的依赖项
brew autoremove
# 查看已安装的包
brew list
# 备份已安装包
# --describe: 为列表中的命令行工具加上说明性文字
# --force: 直接覆盖之前生成的Brewfile文件。如果没有该参数，则询问你是否覆盖
# --file: 生成的文件路径
brew bundle dump --describe --force --file="~/Desktop/Brewfile"
# 恢复备份的包
brew bundle --file="~/Desktop/Brewfile"
# 查看 homebrew 源
brew tap-info homebrew/core
git -C "$(brew --repository)" remote -v
brew tap-info homebrew/bundle
brew tap-info homebrew/cask
brew tap-info homebrew/services
```
