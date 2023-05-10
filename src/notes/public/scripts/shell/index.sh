#!/bin/zsh

echo "Scripts by viarotel v0.0.1"

# 定义脚本对象
declare -A scripts=(
  ["Init_MacOS"]="https://cdn.jsdelivr.net/gh/viarotel/viarotel.github.io@docs/scripts/shell/init-macos.sh|bash"
)

# 显示用户选择界面
echo "请选择要加载的远程脚本选项："
echo

mapScripts=()
index=1
for key in "${(k)scripts[@]}"; do
  echo "$index. $key"
  mapScripts[$index]=$key
  ((index++))
done

echo
echo "q. 退出"

# 读取用户选择
echo -n "请输入选项： "
read script_option

# 检查退出选项
if [[ $script_option == "q" ]]; then
  echo "退出脚本成功"
  exit 0
fi

# 根据选项设置远程脚本、脚本名称和解释器
if [[ -n $script_option && -n "${mapScripts[$script_option]}" ]]; then
  script_name="${mapScripts[$script_option]}"
  script_URL="${scripts[$script_name]}"

  remote_script="${script_URL%|*}"
  if [[ "$remote_script" == "$script_URL" ]]; then
    interpreter="bash"
  else
    interpreter="${script_URL##*|}"
  fi
else
  echo "错误的选项, 已自动退出"
  exit 0
fi

echo $script_name
echo $remote_script
echo $interpreter

# 下载并执行远程脚本
echo "Loading remote script: $script_name"
sudo -v
sudo curl -fsS --progress-bar "$remote_script" | $interpreter -s