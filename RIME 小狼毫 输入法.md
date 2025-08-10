## 输入模式
自然是从微软双拼切换过来的已经习惯多年的小鹤双拼。
直接点开小狼毫设置，左下角选安装更多，会启动 rime-installer，输入 `double-pinyin` 触发安装
## 自定义
```yaml
# filename: default.custom.yaml
patch:
  schema_list:
    - { schema: luna_pinyin_simp }
    - { schema: double_pinyin_flypy }
  "menu/page_size": 9
```
- [定製簡化字輸出](https://github.com/rime/home/wiki/CustomizationGuide#%E4%B8%80%E4%BE%8B%E5%AE%9A%E8%A3%BD%E7%B0%A1%E5%8C%96%E5%AD%97%E8%BC%B8%E5%87%BA)
- [默認英文輸出](https://github.com/rime/home/wiki/CustomizationGuide#%E4%B8%80%E4%BE%8B%E9%BB%98%E8%AA%8D%E8%8B%B1%E6%96%87%E8%BC%B8%E5%87%BA)
- 