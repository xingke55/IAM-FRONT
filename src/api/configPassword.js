
import request from '@/utils/request'
export const passwordpolicy = () => {
  return request({ url: 'config/passwordpolicy', method: 'put' })
}
export const changePassword = (data) => {
  return request({ url: 'config/changePassword', method: 'put', data })
}

