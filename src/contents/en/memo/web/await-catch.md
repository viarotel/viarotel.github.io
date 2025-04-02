---
title: 让 await 永远不要抛出错误
---


# 让 await 永远不要抛出错误

```javascript
// 这样的话，请求失败也不会抛错
const result = await request().catch((e) => {
  return e;
});
```
