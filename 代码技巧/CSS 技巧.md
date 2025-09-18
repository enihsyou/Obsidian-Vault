## 避免滚动条改变页面尺寸

- [html - Prevent scrollbar from adding-up to the width of page on Chrome - Stack Overflow](https://stackoverflow.com/questions/18548465/prevent-scrollbar-from-adding-up-to-the-width-of-page-on-chrome/70360664#70360664)

```css
.element-class {
   scrollbar-gutter: stable both-edges;
}
```