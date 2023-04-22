# git 修改分支名称

## 本地分支重命名

> 此时还没有推送到远程

```shell
git branch -m oldName newName
```

## 远程分支重命名

> 已经推送远程-假设本地分支和远程对应分支名称相同

```shell
# 重命名远程分支对应的本地分支
git branch -m oldName newName
# 删除远程分支
git push --delete origin oldName
# 上传新命名的本地分支
git push origin newName
# 把修改后的本地分支与远程分支关联
git branch --set-upstream-to origin/newName
```