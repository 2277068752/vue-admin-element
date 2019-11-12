/**
 * @Author : ChangJun
 * @Date : 2019/10/21
 * @Version : 1.0
 * @Content :
 */
module.exports = {
  Interfaces: {
  },
  Proxy: {
    dev: ['statistics'],
    domain: {
      statistics: {
        development: 'http://risktest.aegis-info.com/',
        pre: 'http://risktest.aegis-info.com/',
        production: 'http://risktest.aegis-info.com/'
      }
    }
  },
  ProjectName: 'Admin',
  Code: {
    SUCCESS: '000000',
    NO_LIMIT: 401,
    AUTH_FAIL: 2002,
    AUTH_OUT_TIME: 2004
  } // 接口请求错误码
};
