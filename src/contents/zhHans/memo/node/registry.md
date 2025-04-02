---
title: 设置镜像源
---

# 设置镜像源

## npm/yarn/pnpm 设置为淘宝镜像源

```shell
npm config set registry https://registry.npmmirror.com/
yarn config set registry https://registry.npmmirror.com/
pnpm config set registry https://registry.npmmirror.com/
```

## npm/yarn/pnpm 查看当前镜像源

```shell
npm config get registry
yarn config get registry
pnpm config get registry
```

## 通过配置文件设置针对于项目的局部镜像源

### npm/pnpm

> 在项目根目录添加 .npmrc 文件并写入

```ini
# root/.npmrc
registry=https://registry.npmmirror.com/
```

### yarn

> 在项目根目录添加 .yarnrc 文件并写入

```yml
# root/.yarnrc
registry "https://registry.npmmirror.com/"
```
