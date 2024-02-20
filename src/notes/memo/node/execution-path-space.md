# 在 Node.js 中使用 child_process.exec 或 child_process.spawn 执行包含空格的程序路径

使用 `""` 包裹可执行文件路径

```js
const { exec } = require('child_process')
exec(
  'C:/Program Files/myApp.exe'
  // ...
)
spawn(
  'C:/Program Files/myApp.exe'
  // ...
)
```
