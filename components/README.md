## Header
`header`的搜索框那个地方，在`input`这里的输入数据发生变化的时候，把它监听下来，然后去请求接口去找对应的数据即可。

通过element的input组件里面自带的监听功能来监听input的变化

```html
<el-input v-model="search" @focus="focus" @blur="blur" @input="input" placeholder="搜索商家或地点"></el-input>
```