---
创建时间: 2025-12-06T17:16:27+08:00
修改时间: 2025-12-06T17:17:29+08:00
---
## 可选链运算符上赋值

就是想实现 `a?.b = c`，但 JS / TS 目前都不支持。好好的搬来个功能，只读不可写真是残废

- [Why can't the left-hand side of an assignment expression use optional chaining?](https://esdiscuss.org/topic/why-cant-the-left-hand-side-of-an-assignment-expression-use-optional-chaining)
- [The left-hand side of assignment expression may not be an optional property access | bobbyhadz](https://bobbyhadz.com/blog/typescript-left-hand-side-of-assignment-not-optional)

解决方法当然不是 `a!.b = c`，而是定义个函数，`a?.setB(c)`