# uni-iconfont-plugin

让uni-app支持iconfont图标以Symbol方式引入使用，支持彩色图标，兼容全平台。

![](./images/bangbangtang.png)

# uni-app已经支持iconfont图标，为什么还需要这个插件？

uni-app支持以字体的方式引入图标，但是图标只能是单色，且需要依赖字体文件。

# 优势
组件化

支持px、rpx等样式单位

渲染彩色图标

执行命令更新

# 快速开始

### 安装插件
```bash
# npm
npm install uni-iconfont-plugin -D
or
# yarn
yarn add uni-iconfont-plugin -D
or
#pnpm
pnpm install uni-iconfont-plugin -D
```

### 生成配置文件
```bash
npx iconfont-init

# 可传入配置文件输出路径
# npx iconfont-init --output iconfont.json

# 可只传入配置文件名
# npx iconfont-init --output icon
#会生成icon.json
```
在根目录下会生成一个`iconfont.json`的配置文件:
```json
{
  "symbol_url": "请参考README.md，复制 http://iconfont.cn 官网提供的JS链接",
  "save_dir": "./iconfont",
  "trim_icon_prefix": "icon",
  "default_icon_size": "32rpx"
}
```
### 配置文件说明

**symbol_url**: 请直接复制iconfont官网提供的项目图标Symbol链接。测试链接：http://at.alicdn.com/t/font_2662316_eabpkqkyqt8.js

**save_dir** 生成的icon文件保存目录。每次生成前，都会清空该目录。

**trim_icon_prefix** 去除前缀，默认为`icon`。

**default_icon_size** 默认图标大小，默认为`32rpx`，必须带单位。支持px、rpx、em, rem等css常用单位。

### 生成icon文件
```bash
npx iconfont-uni

# 可传入配置文件路径
# npx iconfont-uni --config iconfont.json
```
执行成功后可以在您设置的保存目录下找到生成的icon文件。

# 使用图标
在页面中引入组件使用：
```html
<template>
  <view>
    <iconfont name="bangbangtang" size="30rpx" fill="#000000"></iconfont>
    ...
  </view>
</template>

<script>
  import iconfont from '../../iconfont/iconfont.vue' // 文件名默认为iconfont.vue
  ...
</script>
```

# 更新图标
图标有变化时，只需更改配置文件的symbol_url，然后重新生成icon文件即可。
```bash
# 修改symbol_url配置后执行
npx iconfont-uni
```