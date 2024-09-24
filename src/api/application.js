
import request from '@/utils/request'
export const getAppList = () => {
  return request({ url: 'appList', method: 'get' })
}

