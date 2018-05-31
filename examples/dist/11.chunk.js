webpackJsonp([11],{525:function(e,t){e.exports=[{name:"head",fieldset:"GroupFieldset",panelTitle:"宽版大图倒计时样式——头部物料",fields:[{name:"title",control:"RedWordInput",label:"标题",rules:{required:!0,minBytesWithFilter:10,maxBytesWithFilter:50}},{name:"titleLink",control:"Input",defaultValue:"http://",label:"标题链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"description",control:"TextArea",label:"描述",rules:{required:!0,minBytes:100,maxBytes:170}},{name:"descriptionLink",control:"Input",defaultValue:"http://",label:"描述链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"bigImage",control:"ImageUpload",label:"大图",rules:{imageRequired:!0},tips:"图片尺寸：638x300，不超过300k，jpg、png格式。",uploadRules:{size:300,types:["jpg","png"],key:"110-head-bigImage"}},{name:"bigImageLink",control:"Input",defaultValue:"http://",label:"大图链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"showUrl",control:"Input",label:"显示URL",rules:{required:!0,maxBytes:30}}],submit:!0},{name:"buttonList",fieldset:"ListFieldset",panelTitle:"宽版大图倒计时样式——底部按钮",length:[3,4,5,6],numLabel:"底部按钮数",fields:[{name:"text",control:"Input",label:"按钮文字",rules:{required:!0,maxBytes:[20,16,12,12]}},{name:"link",control:"Input",label:"按钮链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:256}}],submit:!0},{name:"countDown",fieldset:"RadioFieldset",panelTitle:"宽版大图倒计时样式——倒计时",radioValueKey:"type",radioLabel:"倒计时类型",optionFields:[{option:{value:"0",text:"无"},fields:[]},{option:{value:"1",text:"按秒"},fields:[{name:"date",control:"DateTimeInput",label:"设定时间",showTime:!0,rules:{required:!0}}]},{option:{value:"2",text:"按天"},fields:[{name:"date",control:"DateTimeInput",label:"设定日期",showTime:!1,rules:{required:!0}}]}]}]}});