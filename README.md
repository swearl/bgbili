# bgbili

把B站视频做成网页背景视频, [Demo](https://swearl.github.io/bgbili/)

## 用法

### 加载 bgbili.css, jquery, bgbili.js
```html
<link rel="stylesheet" href="./src/css/bgbili.css">
<script src="https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js" integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
<script src="./src/js/bgbili.js"></script>
```
### 加入一个div
```html
<div id="bgbili"></div>
```

### 生成背景视频
```js
$(function() {
	$("#bgbili").bgbili({aid: 950945});
})
```