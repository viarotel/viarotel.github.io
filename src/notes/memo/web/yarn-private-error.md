# 修复设置 npm 私服后 yarn 无法安装包的问题

> 具体表现为 yarn install 提示 error Couldn't find package "tinycolor2" on the "npm" registry.

```shell
npm config set always-auth true
```
