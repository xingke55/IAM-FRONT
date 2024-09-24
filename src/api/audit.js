
import request from '@/utils/request'
export const loginHistoryFetch = (params) => {
  return request({ url: 'historys/loginHistory/fetch', method: 'get', params })
}
export const loginAppHistoryFetch = (params) => {
  return request({ url: 'historys/loginAppsHistory/fetch', method: 'get', params })
}

