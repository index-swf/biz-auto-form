webpackJsonp([9],{527:function(e,l){e.exports=[{name:"head",fieldset:"GroupFieldset",panelTitle:"宽版大图轮播样式——头部物料",fields:[{name:"title",control:"RedWordInput",label:"标题",rules:{required:!0,minBytesWithFilter:10,maxBytesWithFilter:50}},{name:"titleLink",control:"Input",defaultValue:"http://",label:"标题链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"description",control:"TextArea",label:"描述",rules:{required:!0,minBytes:100,maxBytes:170}},{name:"descriptionLink",control:"Input",defaultValue:"http://",label:"描述链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"carouselImageList",fieldset:"ListFieldset",numLabel:"轮播图个数",length:[2,3,4],fields:[{name:"image",control:"ImageUpload",label:"轮播图",rules:{imageRequired:!0},tips:"图片尺寸：638x300，不超过300k，jpg、png格式。",uploadRules:{size:300,types:["jpg","png"],key:"112-head-carouselImageList-image"}},{name:"link",control:"Input",label:"轮播图链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}}]},{name:"showUrl",control:"Input",label:"显示URL",rules:{required:!0,maxBytes:30}}],submit:!0},{name:"buttonList",fieldset:"ListFieldset",panelTitle:"宽版大图轮播样式——底部按钮",length:[3,4,5,6],numLabel:"底部按钮数",fields:[{name:"text",control:"Input",label:"按钮文字",rules:{required:!0,maxBytes:[20,16,12,12]}},{name:"link",control:"Input",label:"按钮链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:256}}],submit:!0}]}});