declare -A remote_scripts=(
  [1]="https://example.com/script1.sh"
  [2]="https://example.com/script2.sh"
)

# 解析命令行选项
while getopts ":s:" opt; do
  case $opt in
    s)
      script_option=$OPTARG
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# 根据选项设置远程脚本
if [[ -n $script_option && -n "${remote_scripts[$script_option]}" ]]; then
  remote_script="${remote_scripts[$script_option]}"
else
  remote_script="${remote_scripts[$default_script_option]}"
fi

# 下载并执行远程脚本
echo "Loading remote script: $remote_script"
curl -sSf "$remote_script" | zsh