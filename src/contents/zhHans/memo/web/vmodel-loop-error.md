---
title: 避免 vue 双向绑定进入死循环
---

# 避免 vue 双向绑定进入死循环

> 更新绑定值时校验值是否相等 如果相等则不进行更新

```js
import { isEqual } from 'lodash-es'
// ...
watch: {
  value: {
    handler(newValue, oldValue) {
      if (isEqual(newValue, oldValue)) {
        return
      }
      this.$emit('input', newValue)
    }
  }
}
// ...
```
