# ui-select 插件
html原生的select标签在不同浏览器下表现不一致！
为提升用户体验和select标签的一致性，您可以选择ui-select插件
[demo](http://wangxing218.github.io/ui-select/test/demo.html)


#基于jquery,使用非常方便！
```javascript
//实例化一个select
$('select').ui_select();

//获取select的实例
var slc = $('#id').data('ui-switch');

//值改变时发生
slc.change = function(value , item){
}

//点击每个选项时发生
slc.click = function(value , value){
}
```

#兼容性
IE8+, Chrome, Firefox, Edge, 360, Sougou 等主流浏览器;


# 插件后续发展
1. 增加 multiple 多选功能；
2. 提供统一接口可动态增减option元素；

