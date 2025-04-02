---
title: vue 中子组件调用父组件方法最佳实践
---

# vue 中子组件调用父组件方法最佳实践

```javascript
// parent-component
// 将需要被 <Child/> 调用的方法通过 v-bind 传递给 <Child/>
<template>
  <Child :refresh="query"></Child>
</template>
export default {
  methods: {
    query() {
      // ...
    },
  },
};

// child-component
// 在 <Child/> 中通过 props.refresh 调用 <Parent/> 中的方法
<template>
  <div @click="refresh"></div>
</template>
export default {
  props: {
    refresh: {
      type: Function,
      default: () => () => {}
    }
  },
};
```
