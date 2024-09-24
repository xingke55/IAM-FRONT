/* eslint-disable require-atomic-updates */
import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import { refreshToken, auth, clear } from '@/api/user.js'
let isRefreshing = false
const requests = []
// create an axios instance
axios.defaults.headers.post['Content-Type'] = 'application/json'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  (config) => {
    // 如果已经设置过token,把token设给请求头
    if (localStorage.getItem('token') && JSON.parse(localStorage.getItem('token')).token) {
      const tokenInfo = JSON.parse(localStorage.getItem('token'))
      config.headers.Authorization = `Bearer ${tokenInfo.token}`
      config.headers.Token = `${tokenInfo.token}`
    }
    return config
  },
  (error) => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 返回码不为0表示有错误需提示
    if (res.code !== 0) {
      // 返回码为2 并且有提示信息时返回提示信息
      if (res.code === 2 && res.message !== null && res.message !== '') {
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(new Error(res.message || 'Error'))
      }
      return res
    } else {
      // 正确码直接返回res
      return res
    }
  },
  (error) => {
    const { status, config } = error.response
    console.log('err  ' + status, config)
    // 未授权-token过期刷新token
    if (isRefreshing && !config.url.includes('/refresh')) {
      // 多个请求时先保存，刷新token后再依次请求
      return new Promise((resolve) => {
        config.baseURL = ''
        requests.push({
          config,
          resolve
        })
      })
    }
    // refresh_token过期，清理缓存，重新登录
    if (status === 401 && config.url.includes('/refresh')) {
      clear()
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      router.replace('/login')
      return Promise.reject(error)
    }
    // 未授权且不是刷新token接口
    if (status === 401 && !config.url.includes('/refresh')) {
      isRefreshing = true
      const r_t = localStorage.getItem('refresh_token')
      refreshToken(r_t)
        .then((res) => {
          isRefreshing = false
          if (res.code === 0) {
            // 更新token及身份信息
            auth(res.data)
            // 将刷新token期间等待的请求用新的token重新依次请求
            requests.forEach(({ config, resolve }) => {
              resolve(service(config))
            })
            // 防止出现/api/api情况
            config.baseURL = ''
            config.headers.Authorization = `Bearer ${res.data.token}`
            config.headers.Token = `${res.data.token}`
            return service(config)
          } else {
            // 刷新失败清除token跳转登录页重新登录
            clear()
            Message({
              message: error.message,
              type: 'error',
              duration: 5 * 1000
            })
            router.replace('/login')
            return Promise.reject(error)
          }
        })
        .catch((e) => {
          clear()
          Message({
            message: e.message,
            type: 'error',
            duration: 5 * 1000
          })
          router.replace('/login')
          return Promise.reject(e)
        })
    }

    if (status !== 401) {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
