---
title: 微信小程序接口配置 https 后请求异常
---

# 微信小程序接口配置 https 后请求异常

> 具体表现为微信开发者工具关闭或开启域名校验都可以访问 真机调试情况下无论如何无法正常请求

## 问题原因

常见于没有达到以下要求:

- HTTPS 证书必须有效
  - 证书必须被系统信任，即根证书被已系统内置
  - 部署 SSL 证书的网站域名必须与证书颁发的域名一致
  - 证书必须在有效期内
  - 证书的信任链必需完整（需要服务器配置）
- iOS 不支持自签名证书
  - iOS 下证书必须满足苹果 App Transport Security (ATS) 的要求
  - TLS 必须支持 1.2 及以上版本。部分旧 Android 机型还未支持 TLS 1.2，请确保 HTTPS 服务器的 TLS 版本支持 1.2 及以下版本
  - 部分 CA 可能不被操作系统信任，请开发者在选择证书时注意小程序和各系统的相关通告。Chrome 56/57 内核对 WoSign、StartCom 证书限制周知

## 解决办法

- 证书有效性 可以使用 openssl s_client -connect example.com:443 命令验证，也可以使用其他[在线工具](https://myssl.com/ssl.html)
- 一般常见于证书的信任链不完整由后端解决
- 需要配置符合 PFS 规范的加密套件，推荐配置：

```
ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4:!DH:!DHE
```

- 需要在服务端 TLS 协议中启用 TLS1.2，推荐配置：

```
TLSv1 TLSv1.1 TLSv1.2
```

- 需要保证当前域名与所使用的证书匹配
- 需要保证证书在有效期内
- 需要使用 SHA-2 签名算法的证书
- 需要保证证书签发机构是可信的 CA 机构
- HSTS（HTTP 严格传输安全）的 max-age 需要大于 15768000 秒
