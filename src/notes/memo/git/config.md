# git 配置

## 查看配置信息

```shell
git config --list
```

## 配置用户名和邮箱

```shell
git config --global user.name
git config --global user.email
```

## 配置代理

```shell
# 设置代理
git config --global http.proxy '127.0.0.1:7890'
git config --global https.proxy '127.0.0.1:7890'
# 查看代理
git config --global --get http.proxy
git config --global --get https.proxy
# 取消代理
git config --global --unset http.proxy
git config --global --unset https.proxy
# 仅为 github 设置代理
git config --global http.https://github.com.proxy socks5://127.0.0.1:7890
git config --global https.https://github.com.proxy socks5://127.0.0.1:7890
# 取消 github 代理
git config --global --unset http.https://github.com.proxy
git config --global --unset https.https://github.com.proxy
```
