/**
 * @Author : ChangJun
 * @Date : 2019/2/13
 * @Version : 1.0
 * @Content : 接口请求通用封装
 */
import Axios from 'axios';
// @ts-ignore
import qs from 'qs';
import {Notification} from 'element-ui';

const Config = require('../config/index.js');
// 多种类型接口处理(根据各自项目进行修改)
const DEF = [
  {
    fail_handling: (res: { errorCode: string, message: any }) => {
      Notification.error({title: '错误', message: res.message || '系统问题，请稍后再试！'});
      if (res.errorCode === Config.Code.AUTH_FAIL || res.errorCode === Config.Code.AUTH_OUT_TIME) {
        window.$globalHub.$router.push({path: '/login'});
      }
    }
  }
];

/**
 * 成功处理
 * @param res
 * @param load
 * @param defEx
 * @param defData
 */
function successParse (res: { data: { errorCode: string, data: object, message: any } }, load: boolean, defEx: boolean, defData: boolean) {
  return new Promise((resolve) => {
    if (load) {
      window.$globalHub.$store.dispatch('setLoading', {show: false});
    }
    try {
      const obj = res.data;
      if (obj.errorCode === Config.Code.SUCCESS) {
        if (defData) {
          resolve(obj.data);
        } else {
          resolve(obj);
        }
      } else {
        // 通用业务失败处理
        if (defEx) {
          DEF[0].fail_handling(obj);
        } else {
          resolve(obj || {});
        }
      }
    } catch (ex) {
      if (defEx) {
        DEF[0].fail_handling({errorCode: '999999', message: ''});
      } else {
        resolve({});
      }
    }
  });
}

/**
 * 失败处理
 * @param ex
 * @param load
 * @param defFail
 * @returns {Promise.<*>|Promise<R>}
 */
function errorParse (ex: { status: number, data: { code: number, data: object, msg: any } }, load: boolean, defFail: boolean) {
  let resData = null;
  return new Promise((resolve, reject) => {
    if (load) {
      window.$globalHub.$store.dispatch('setLoading', {show: false});
    }
    const obj = ex ? ex.data : {msg: ''};
    if (defFail) {
      DEF[0].fail_handling({errorCode: ex.status && ex.status.toString() || '999999', message: obj.msg});
    } else {
      resData = {
        code: ex.status,
        msg: obj.msg
      };
      reject(resData);
    }
  });
}

/**
 * Ajax请求方法
 * @param url 接口地址
 * @param method 请求方式
 * @param body 请求参数
 * @param options header参数
 * @param load 是否显示请求loading
 * @param loadMsg loading的提示
 * @param isForm content-type方式是否为 multipart/form-data
 * @param defFail 统一处理错误
 * @param defEx 统一逻辑错误处理
 * @param defData 统一数据处理
 * @param vailDator Api 校验规则
 * @returns {Promise<U>|*|Promise|Promise.<T>}
 */
function send (url: string, method: string, body: object, options: any, load: boolean, loadMsg: string, defFail: boolean, defEx: boolean, defData: boolean) {
  if (load) {
    window.$globalHub.$store.dispatch('setLoading', {show: true, msg: loadMsg});
  }
  // 生成请求的url
  // url = !url.startsWith('http') ? `${DOMAIN}${url}` : url
  const opts = {...options};
  opts.headers = {
    'Accept': 'application/json',
    // 'token': window.$globalHub.$store.state.authObj.token || '',
    'Content-Type': options && options.isForm ? 'application/x-www-form-urlencoded' : 'application/json',
    ...opts.headers
  };
  // post form-data请求将参数序列化成 form 参数
  if (options && options.isForm) {
    body = qs.stringify(body);
  }
  if ((body && method === 'get') || (body && method === 'delete')) {
    opts.params = body;
  }
  // TODO 前端解决跨域访问，需要和后端对接跨域状态码
  if (opts.validateStatus) {
    opts.validateStatus = (status: number) => {
      return status >= 200 && status <= 300;
    };
  }
  switch (method) {
    case 'get':
      return Axios.get(url, opts)
        .then((res: any) => successParse(res, load, defEx, defData))
        .catch((ex: any) => errorParse(ex && ex.response, load, defFail));
    case 'post':
      return Axios.post(url, body, opts)
        .then((res: any) => successParse(res, load, defEx, defData))
        .catch((ex: any) => errorParse(ex.response, load, defFail));
    case 'put':
      return Axios.put(url, body, opts)
        .then((res: any) => successParse(res, load, defEx, defData))
        .catch((ex: any) => errorParse(ex.response, load, defFail));
    case 'delete':
      return Axios.delete(url, opts)
        .then((res: any) => successParse(res, load, defEx, defData))
        .catch((ex: any) => errorParse(ex.response, load, defFail));
  }
}

export default {
  /**
   * Get / delete
   * @param url 请求链接
   * @param body 入参
   * @param options header 头信息
   * @param load loading
   * @param loadMsg loading信息
   * @param defFail 是否需要统一处理接口错误
   * @param defEx 是否统一处理业务逻辑错误
   * @param defData 是否只返回出参 data 内容
   * @returns {Promise<U>|*|Promise|Promise<T>}
   */
  get (url: string, body: object = {}, options: object = {}, {load = true, loadMsg = '加载中...', defFail = true, defEx = true, defData = true} = {}) {
    return send(url, 'get', body, options, load, loadMsg, defFail, defEx, defData);
  },
  delete (url: string, body: object = {}, options: object = {}, {load = true, loadMsg = '加载中...', defFail = true, defEx = true, defData = true} = {}) {
    return send(url, 'delete', body, options, load, loadMsg, defFail, defEx, defData);
  },
  /**
   * Post / Put
   * @param url 请求链接
   * @param body 入参
   * @param options header 头信息
   * @param load loading
   * @param loadMsg loading信息
   * @param defFail 是否需要统一处理接口错误
   * @param defEx 是否统一处理业务逻辑错误
   * @param defData 是否只返回出参 data 内容
   * @returns {Promise<U>|*|Promise|Promise<T>}
   */
  post (url: string, body: object = {}, options: object = {}, {load = true, loadMsg = '加载中...', defFail = true, defEx = true, defData = true} = {}) {
    return send(url, 'post', body, options, load, loadMsg, defFail, defEx, defData);
  },
  put (url: string, body: object = {}, options: object = {}, {load = true, loadMsg = '加载中...', defFail = true, defEx = true, defData = true} = {}) {
    return send(url, 'put', body, options, load, loadMsg, defFail, defEx, defData);
  },
  // 合并多次请求
  all (list: []) {
    return Axios.all(list).then(Axios.spread((...args: any) => {
      return args;
    }));
  }
};
