---
title: Git 上传可执行程序权限问题
---

# Git 上传可执行程序权限问题

## 单个

```bash
git update-index --chmod=+x "electron/resources/extra/adb.exe"
```

## 批量

```bash
find "electron/resources/extra" -type f -exec git update-index --chmod=+x {} +
```

## 查看权限

```bash
git ls-files --stage
```
