# homebrew 配置及命令

```zsh
# 安装 homebrew
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
# 卸载 homebrew
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/HomebrewUninstall.sh)"
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
# 修复提示git命令无法使用或权限不足的问题
git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
# 手动配置中科大源
# brew.git源
git -C "$(brew --repo)" remote set-url origin https://mirrors.ustc.edu.cn/brew.git
# homebrew-core.git源
git -C "$(brew --repo homebrew/core)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-core.git
# homebrew-cask.git源
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://mirrors.ustc.edu.cn/homebrew-cask.git
# 配置homebrew-bottles
## zsh用户
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
source ~/.zshrc
## bash用户
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```
