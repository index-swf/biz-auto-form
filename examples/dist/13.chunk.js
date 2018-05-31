webpackJsonp([13],{523:function(e,t){e.exports=[{name:"head",fieldset:"GroupFieldset",panelTitle:"宽版综艺节目样式——头部物料",fields:[{name:"title",control:"RedWordInput",label:"主标题",rules:{required:!0,minBytesWithFilter:10,maxBytesWithFilter:60}},{name:"titleLink",control:"Input",defaultValue:"http://",label:"主标题链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"subTitle",control:"Input",label:"副标题",rules:{required:!0,minBytes:10,maxBytes:30}},{name:"descriptionList",fieldset:"ListFieldset",numLabel:"描述个数",length:[3,4,5,6],fields:[{name:"text",control:"Input",label:"描述",rules:{required:!0,minBytes:10,maxBytes:20}}]},{name:"leftImage",control:"ImageUpload",label:"左侧图片",rules:{imageRequired:!0},tips:"图片尺寸：328x165，不超过30k，jpg、png格式。",uploadRules:{size:30,types:["jpg","png"],key:"108-head-leftImage"}},{name:"leftImageLink",control:"Input",defaultValue:"http://",label:"图片链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"logo",control:"ImageUpload",label:"LOGO图片",rules:{imageRequired:!0},tips:"图片尺寸：50x30，不超过5k，jpg、png格式。",uploadRules:{size:5,types:["jpg","png"],key:"108-head-logo"}},{name:"logoLink",control:"Input",defaultValue:"http://",label:"LOGO链接",rules:{required:!0,url:!0,maxBytes:512}},{name:"showUrl",control:"Input",label:"显示URL",rules:{required:!0,maxBytes:30}},{name:"buttonText",control:"Input",label:"Button文字",required:!1,tips:'不填则广告中按钮文字默认显示"立即播放"',rules:{minBytes:4,maxBytes:10}},{name:"buttonLink",control:"Input",defaultValue:"http://",label:"Button链接",rules:{required:!0,url:!0,maxBytes:512}}],submit:!0},{name:"middle",fieldset:"GroupFieldset",panelTitle:"宽版综艺节目样式——Tab区域物料",fields:[{name:"tabText",control:"Input",label:"Tab链接文字",required:!1,tips:'不填则广告中链接文字默认显示"查看更多视频>>"',rules:{minBytes:10,maxBytes:20}},{name:"tabLink",control:"Input",label:"Tab链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}},{name:"tabList",fieldset:"TabFieldset",length:[2,3,4],fields:[{name:"name",control:"Input",label:"Tab名称",rules:{required:!0,maxBytes:[20,16,12]}},{name:"imageList",fieldset:"ListFieldset",length:4,fields:[{name:"image",control:"ImageUpload",label:"图片",rules:{imageRequired:!0},tips:"图片尺寸：152x115，不超过20k，jpg、png格式。",uploadRules:{size:20,types:["jpg","png"],key:"108-middle-tabList-imageList-image"}},{name:"title",control:"Input",label:"图片标题",rules:{required:!0,minBytes:10,maxBytes:15}},{name:"description",control:"Input",label:"图片描述",rules:{required:!0,minBytes:20,maxBytes:40}},{name:"link",control:"Input",label:"图片链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}}]}]}],submit:!0},{name:"buttonList",fieldset:"ListFieldset",panelTitle:"宽版综艺节目样式——底部按钮",length:[3,4,5,6],numLabel:"底部按钮数",fields:[{name:"text",control:"Input",label:"按钮文字",rules:{required:!0,maxBytes:[20,16,12,12]}},{name:"link",control:"Input",label:"按钮链接",defaultValue:"http://",rules:{required:!0,url:!0,maxBytes:512}}],submit:!0}]}});