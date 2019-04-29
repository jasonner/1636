import * as API from './'
import qs from 'qs'

export default {
  // 操作日志
  log: params => {
    return API.GET('/api/log/list', params)
  },
  // 微信绑定
  login: params => {
    return API.POST('/api/app/login',qs.stringify(params))
  },

 }
