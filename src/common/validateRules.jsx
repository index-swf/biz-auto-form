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
    maxBytes: (num) => {
        return { maxBytes: num, message: `该项字节长度不能超过${num}字节`, validator: checkMaxBytes};
    },
    minBytes: (num) => {
        return { minBytes: num, message: `该项字节长度至少${num}字节`, validator: checkMinBytes};
    },
    maxBytesWithFilter: (num) => {
        return { maxBytes: num, message: `该项字节长度不能超过${num}字节`, validator: checkMaxBytesWithFilter};
    },
    minBytesWithFilter: (num) => {
        return { minBytes: num, message: `该项字节长度至少${num}字节`, validator: checkMinBytesWithFilter};
    }
};

export default validateRules;

