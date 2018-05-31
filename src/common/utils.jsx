/**
 * author: KCFE
 * date: 2017/10/12
 * description: 通用方法
 */


/**
 * 获取字符串字节长度
 * @param str
 * @returns {number}
 */
export const getStrBytes =  (str) => {
  let byteLen = 0;
  if (str) {
    for (let i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 255) {
        byteLen += 2;
      } else {
        byteLen++;
      }
    }
  }
  return byteLen;
};

/**
 * 去掉空格字符
 * @param str
 */
export const trim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, '');
};

/**
 * 插入标红词和插入链接中，过滤掉符号
 * @param str
 */
export const filterSymbol =  (str) => {
  return str.replace(/\{(.*?)\|\|.*?\}/g,'$1').replace(/[\{\}]/g, '');
};

/**
 * 筛选出props中的key
 * @param obj
 * @param keys
 * @returns {{}}
 */
export const pick = (obj, keys) => {
  let result = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if(key in obj){
      result[key] = obj[key];
    }
  }
  return result;
};

/**
 * 过滤除去props中的key
 * @param obj
 * @param keys
 * @returns {{}}
 */
export const omit = (obj, keys) => {
  const shallowCopy = {
    ...obj,
  };
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    delete shallowCopy[key];
  }
  return shallowCopy;
};
