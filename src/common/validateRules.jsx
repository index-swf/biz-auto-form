import { getStrBytes, filterSymbol } from './utils';


const checkMaxBytes = (rule, value, callback) => {
    if(getStrBytes(value) > rule.maxBytes){
        callback(rule.message);
    }else{
        callback();
    }
};

const checkMinBytes = (rule, value, callback) => {
    const bytes = getStrBytes(value);
    if(bytes > 0 && bytes < rule.minBytes){
        callback(rule.message);
    }else{
        callback();
    }
};

/* 字符长度计算时过滤标题描述中的拆分符号 */
const checkMaxBytesWithFilter = (rule, value, callback) => {
    const str = filterSymbol(value);
    if(getStrBytes(str) > rule.maxBytes){
        callback(rule.message);
    }else{
        callback();
    }
};

const checkMinBytesWithFilter = (rule, value, callback) => {
    const str = filterSymbol(value);
    const bytes = getStrBytes(str);
    if(bytes > 0 && bytes < rule.minBytes){
        callback(rule.message);
    }else{
        callback();
    }
};

const validateRules = {
    required: {required: true, whitespace: true, message: '请填写该必填项'},
    imageRequired: {required: true, message: '请上传图片'},
    url: {type: 'url', message: '请输入有效的url'},
    email: {type: 'email', message: '请输入有效的email地址'},
    date: {type: 'date', message: '请输入有效的日期'},
    number: {pattern: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/, message: '请输入有效数字'},
    color: {pattern: /^#[0-9a-fA-F]{6}$/, message: '请输入有效的颜色值，格式：#FFFFFF'},
    maxChars: (max) => ({type: 'string', max, message: `该项字符长度不能超过${max}字符`}),
    minChars: (min) => ({type: 'string', min, message: `该项字符长度不能少于${min}字符`}),
    maxBytes: (number) => ({maxBytes: number, message: `该项字节长度不能超过${number}字节`, validator: checkMaxBytes}),
    minBytes: (number) => ({minBytes: number, message: `该项字节长度至少${number}字节`, validator: checkMinBytes}),
    maxBytesWithFilter: (number) => ({maxBytes: number, message: `该项字节长度不能超过${number}字节`, validator: checkMaxBytesWithFilter}),
    minBytesWithFilter: (number) => ({minBytes: number, message: `该项字节长度至少${number}字节`, validator: checkMinBytesWithFilter}),
};

export default validateRules;

