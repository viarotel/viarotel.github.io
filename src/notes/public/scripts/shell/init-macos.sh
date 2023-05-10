#!/bin/bash

set -e

# 修改终端的 HostName
function set_hostname() {
    sudo scutil --set HostName viarotel-macbook
}

# 开启允许任何来源
function enable_any_source() {
    sudo spctl --master-disable
}

# 安装 Rosetta
function install_rosetta() {
    softwareupdate --install-rosetta
}

# 安装 clashX
function install_clashx() {
    # 从 GitHub 下载最新的 clashX 安装包
    curl -L -o clashX.dmg https://github.com/yichengchen/clashX/releases/latest/download/ClashX.dmg

    # 安装 clashX
    hdiutil mount clashX.dmg
    sudo cp -R "/Volumes/ClashX/ClashX.app" /Applications
    hdiutil unmount "/Volumes/ClashX"
}

# 配置 clashX
function configure_clashx() {
    read -p $'请输入 ClashX 订阅地址: \n' clashX_sub_url
    defaults write com.west2online.ClashX config '{
      "mixedPolicy": "Rule",
      "subUrl": "'$clashX_sub_url'",
      "openAtLogin": true,
      "systemProxyEnable": true
    }'
}

# 配置终端代理
function configure_terminal_proxy() {
    echo 'export all_proxy=127.0.0.1:7890' >> ~/.zshrc
    echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.ustc.edu.cn/homebrew-bottles' >> ~/.zshrc
    source ~/.zshrc
}

# 配置 curl 代理
function configure_curl_proxy() {
    echo 'proxy=127.0.0.1:7890' >> ~/.curlrc
}

# 配置 Homebrew
function configure_homebrew() {
    # 安装 Homebrew
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
}

# 恢复 Brewfile 备份的软件包
function restore_brewfile_packages() {
    read -p $'是否要恢复 Brewfile 备份的软件包？(y/n): \n' restore_brewfile
    if [[ "$restore_brewfile" == "y" || "$restore_brewfile" == "Y" ]]; then
        read -p $'请输入 Brewfile 的路径或 URL: \n' brewfile_path
        brew bundle --file="$brewfile_path"
    fi
}

function test_func() {
  read -p $'请输入内容：\n'  eat
  echo -n $eat
}

# 执行配置步骤
function run_configuration() {
    # set_hostname
    # enable_any_source
    # install_rosetta
    # install_clashx
    # configure_clashx
    # configure_terminal_proxy
    # configure_curl_proxy
    # configure_homebrew
    # restore_brewfile_packages
    test_func
}

# 执行配置步骤
run_configuration

echo "配置完成！"

exit 0