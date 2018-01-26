###1、按需异步加载模块

把

```
import Foo from './Foo.vue'
```

改为如下写法:

```
const Foo = () => import('./Foo.vue')
```


###2、引入analyzer分析报告

在 **package.json** 中添加
```
"analyz": "set npm_config_report=true&&node build/build.js"
```

然后执行
