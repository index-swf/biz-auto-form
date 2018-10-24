# biz-auto-form 表单自动生成组件

## 介绍
- 本组件源于快速配置制作广告样式物料表单，但不乏一般适用性。
- 本组件基于React开发，其中包括表单中常用的一些输入控件controls 和字段组fieldsets 可供使用。
- 表单数据以`json对象`组织，可自动回填数据。
- 可根据 `json对象数组` 自动渲染生成表单，表单中包含校验，并支持一些特殊的动态输入形式。
- 系统无关性，在多个系统中引用本组件，使用一份`json对象数组`配置，可以渲染得到同样的表单。可做到一处配置，处处所见。
- 当`输入控件Controls` 和 `字段组Fieldsets` 不满足需求时，可以插件形式扩展。


## 安装
```
npm install biz-auto-form
```

## 使用示例
```
import AutoForm from 'biz-auto-form';
import formDesc from './108.json';

ReactDom.render(
    <AutoForm
        data={dataObj}
        onSubmit={(values) => {
          console.log(values);
        }}
        descriptor={formDesc}
    />,
    this.el
);
```
引入样式：
```
import 'biz-auto-form/assets/index.css';
```

引入组件中的输入控件
```
import { Controls } from 'biz-auto-form';
const Input = Controls.Input;
```

引入组件中的字段组
```
import { Fieldsets } from 'biz-auto-form';
const ListFieldset = Fieldsets.ListFieldset;
```

也可以全局引用构建后的文件，[Try it on CodePen](https://codepen.io/CharmSun/pen/ZJVNMa)
```
<link rel="stylesheet" type="text/css" href="//unpkg.com/biz-auto-form@1.2.6/dist/biz-auto-form.min.css">
<script src="//unpkg.com/react/umd/react.production.min.js"></script>
<script src="//unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
<script src="//unpkg.com/biz-auto-form@1.2.6/dist/biz-auto-form.min.js"></script>
```

## 设计方案
![image](http://gitlab.biztech.sogou-inc.com/biz-fe/biz-auto-form/raw/master/auto-form.png)

AutoForm组件通过data属性`（json对象）`可以回填表单数据json对象，
通过descriptor属性`（json对象的数组，每一项对应一个字段）`自动渲染生成整个表单，
descriptor 的json数组中每一项json对象基本与字段FormField和输入控件的props属性对应上，每一项渲染对应的FormField 和Fieldsets组件。

所有单个表单字段全部抽象为FormField组件，包括字段名，附加说明，值，默认值，值的校验等，
FormField组件的子组件为Controls中的输入控件，输入的值通过onChange事件传递值至FormField组件。

Form表单中还会有字段组Fieldsets，这类组件是多个字段的组合，字段组中包含的多个字段可以按输入需求变化，最后字段组的值会按字段组的name收集。
Fieldsets组件以FormField为基础，也可以嵌套Fieldsets组件。

Controls中的组件和Fieldsets中的组件，是可以扩展的，以满足更多的表单输入需求。
扩展开发的Controls 组件和Fieldsets 组件，添加至 Controls 和 Fieldsets 中即可用于自动生成。

## 目录结构
```
assets        //各组件样式
├── styles
└── index.less
examples     //示例及文档
src          //源码
├── common      
    ├── 
├── controls   //各输入控件
    ├── 
├── fieldsets  //各形式字段组
    ├── 
├── AutoForm.jsx
├── FieldConverter.jsx
├── Form.jsx
├── FormField.jsx
└── index.jsx
test          //单元测试
```

## Test Case
```
npm test
```

## 生成文档和示例
```
npm run doc
```
