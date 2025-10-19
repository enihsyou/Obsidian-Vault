---
创建时间: 2025-09-19T05:04:24+08:00
---
## 避免滚动条改变页面尺寸

- [html - Prevent scrollbar from adding-up to the width of page on Chrome - Stack Overflow](https://stackoverflow.com/questions/18548465/prevent-scrollbar-from-adding-up-to-the-width-of-page-on-chrome/70360664#70360664)

```css
.element-class {
   scrollbar-gutter: stable both-edges;
}
```

## 避免 Hover 边框产生元素位移

- [Add a CSS border on hover without moving the element - Stack Overflow](https://stackoverflow.com/questions/9612758/add-a-css-border-on-hover-without-moving-the-element)

添加透明边框

```css
.item {
   background: #eee;
   border: 1px solid transparent;
}

.item:hover {
   background: #e1e1e1;
   border: 1px solid #d0d0d0;
}
```
