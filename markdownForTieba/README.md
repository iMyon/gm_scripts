##markdownForTieba  
转换贴吧楼层markdown格式为排版良好的html  
[安装](https://github.com/iMyon/gm_scripts/raw/master/markdownForTieba/markdownForTieba.user.js)

###关于markdwon
[Markdown 语法说明 (简体中文版)](http://wowubuntu.com/markdown/)

###脚本使用

把需要转换成markdown格式的文本用`<md></md>`标签包围起来
如：
<code>

\<md>  
\###title  
\```javascript

var a = 9;  
alert(a);

\```  
\</md>

</code>

全局使用可以用`!#md`声明,这样从此处到楼层结尾的文本都会被解析：
```  

!#md  
###test

```

###脚本预览  

![](http://imgsrc.baidu.com/forum/pic/item/d079ae86c9177f3ec3fbc4ed72cf3bc79d3d56b7.png)  
![](http://imgsrc.baidu.com/forum/pic/item/d5b63cfae6cd7b89550501630d2442a7d8330e11.png)
![](http://imgsrc.baidu.com/forum/pic/item/57ff9b58d109b3de111cdf88cebf6c81820a4cdb.png)