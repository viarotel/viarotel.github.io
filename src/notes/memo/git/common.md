# git 常用命令

## 初始化并提交到远程存储库

```shell
# 在当前目录中创建一个新的 Git 存储库
git init
# 将所有更改添加到暂存区
git add .
# 将暂存区中的更改提交到本地存储库
git commit -m commitText
# 设置远程存储库
git remote add origin https://github.com/username/repository.git
# 提交到远程存储库
git push -u origin main
```

## 分支操作

```shell
# 新建分支
git branch branchName
# 切换分支
git checkout branchName
# 合并指定分支到当前分支
git merge branchName
# 删除本地分支
git branch -d branchName
# 删除远程分支
git push origin --delete branchName
# 重命名本地分支 此时还没有推送到远程
git branch -m oldName newName
# 重命名远程分支 已经推送远程-假设本地分支和远程对应分支名称相同
# 重命名远程分支对应的本地分支
git branch -m oldName newName
# 删除远程分支
git push --delete origin oldName
# 上传新命名的本地分支
git push origin newName
# 把修改后的本地分支与远程分支关联
git branch --set-upstream-to origin/newName
# 修复合并分支时中途取消无法拉取代码
git merge --abort
```