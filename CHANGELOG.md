# 更新日志

## todo list
- 刚才看了一下，仅js minify 后也有 666kb，真6，这个体积有点大啊
    - 把 moment 也改成 引入外部的
    - 引入 bundle analyze 工具，查找较大的依赖包
    - 看看能否改成 依赖 antd，这样能避免重复依赖 rc-component
- 优化文档和demo
    - 针对组件增加 demo，增加页面上可以运行的 demo
    - 文档中代码增加语法高亮
    - 1.4.0 的改动没有更新文档
    - 把 文档和代码放到一起，参考 antd 的套路
- 增加 NumberedTextArea 组件
- 把 imageRequired，videoRequired 统一成 Required

## 1.4.1
`2019-01-29`
- 修复 tab 组件来回切换时修改的文本丢失

## 1.4.0
`2018-12-03`
- ImageUpload 增加 responseParser，name 配置项
- 校验规则增加字符长度校验
- AutoForm 增加 children props 可以替换默认 提交按钮

## 1.3.2
`2018-10-24`
- update package.json url

## 1.3.1
`2018-10-24`
- migrate to biz-git

## 1.3.0
`2018-10-18`
- 增加context配置方式

## 1.2.3 ~ 1.2.6
`2018-07-10`
- fix 输入框过滤分隔字符的校验bug。
- fix ListFieldset props 中 length 改变的 bug
- 文档修改

## 1.2.2
`2018-02-05`
- 添加插入标红词等输入框过滤分隔字符的校验。
- 修改构建js的导出。

## 1.2.1
`2018-01-25`
- fix fieldsets 数据回填bug。
- 修改校验规则。

## 1.2.0 stable
`2018-01-25`
- 修改模块export方式。
- 完善 docs 和 demos。
- 修改npm script。

## 1.1.3
`2018-01-18`
- 修改 ListFieldset，TableFieldset组件,可变字节倒计。
- 修改按钮样式。
- fix labelWidth props传入。

## 1.1.2
`2018-01-17`
- 修复RadioFieldset组件。
- 修改DateTimeInput 输入控件。

## 1.1.1
`2018-01-17`
- 升级fieldsets组件。
- GroupFieldset组件与CollapseFieldset组件合并。
- 增加fieldset 分块提交。

## 1.1.0
`2018-01-16`
- 增加字段转化组件，优化自动生成方案。
- 使 controls 和 fieldsets 可扩展。
- 增加Select control 和 多种fieldset组件。


## 1.0.0
`2017-12-04`
- 自动生成表单组件包含9种基础输入控件。
- 包含3种复合结构字段组件。
- 通过读取json来渲染输出表单。
- 包含文档和单元测试用例。
- 最后，本项目主要用于广告样式物料表单的制作，同时满足一些基础通用表单的制作，我们会不停维护。


