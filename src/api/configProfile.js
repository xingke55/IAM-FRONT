import request from '@/utils/request'
export const profileGet = () => {
  return request({ url: 'config/profile/get', method: 'get' })
}
export const profileUpdate = (data) => {
  return request({ url: 'config/profile/update', method: 'put', data })
}
