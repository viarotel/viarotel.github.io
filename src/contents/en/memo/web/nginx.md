---
title: Nginx 常用命令
---

# nginx 常用命令

## 安装 nginx

```shell
sudo apt update
sudo apt install nginx
```

## 编辑 Nginx 配置文件

```shell
# 打开 Nginx 配置文件 Ctrl + X 进入命令模式
sudo nano /etc/nginx/nginx.conf
```

## 启动服务

```shell
sudo systemctl start nginx
```

## 重新加载配置

```shell
sudo systemctl reload nginx
```

## 停止服务

```shell
sudo systemctl stop nginx
```

## 查看服务状态

```shell
sudo systemctl status nginx
```

## 重启服务

```shell
sudo service nginx restart
```

## 设置开机自启

```shell
sudo systemctl enable nginx
```

## 开启守护进程

```shell
# 将 Nginx 启动为守护进程
sudo nginx -g "daemon on;"
# 启动 Nginx 时将其作为守护进程
sudo nginx -g "daemon on;" -c /etc/nginx/nginx.conf
```

## 配置 HTTPS

```nginx
server {
  listen 443 ssl;
  server_name yourdomain.com www.yourdomain.com;
  ssl_certificate /path/to/your/certificate.pem;
  ssl_certificate_key /path/to/your/privatekey.pem;

  # 关闭不安全的 SSL 协议
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;

  # 启用更安全的密码套件
  ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA256;
  ssl_session_timeout 1d;
  ssl_session_cache shared:SSL:50m;
  ssl_session_tickets off;
  add_header Strict-Transport-Security "max-age=15768000; includeSubDomains; preload;";
  ...
}
```
