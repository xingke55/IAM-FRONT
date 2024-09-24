import request from '@/utils/request'
import * as CryptoJS from 'crypto-js'
import CONSTS from '@/utils/const'
import Cookies from 'js-cookie'

export function login(data) {
  return request({
    url: '/login/signin?_allow_anonymous=true',
    method: 'post',
    data
  })
}

export function getImageCaptcha(params) {
  return request({
    url: '/captcha?_allow_anonymous=true',
    method: 'get',
    params
  })
}
export function setRedirectUri(uri) {
  const redirect_uri = CryptoJS.enc.Base64url.parse(uri).toString(CryptoJS.enc.Utf8)
  console.log(`uri:${redirect_uri}`)
  localStorage.setItem(CONSTS.REDIRECT_URI, redirect_uri)
}
// 使用复用信息
export function congress(authParam) {
  return request({
    url: '/login/congress?_allow_anonymous=true',
    method: 'post',
    data: { ...authParam }
  })
}

// 验证
export function auth(authJwt) {
  const user = {
    name: `${authJwt.displayName}(${authJwt.username})`,
    displayName: authJwt.displayName,
    username: authJwt.username,
    userId: authJwt.id,
    avatar: './assets/svg/avatar.svg',
    email: authJwt.email,
    passwordSetType: authJwt.passwordSetType
  }
  const hostsnames = window.location.hostname.split('.')
  let subHostName = window.location.hostname
  if (hostsnames.length >= 2) {
    subHostName = `${hostsnames[hostsnames.length - 2]}.${hostsnames[hostsnames.length - 1]}`
  }
  Cookies.set(CONSTS.CONGRESS, authJwt.token, { path: '/' })
  Cookies.set(CONSTS.ONLINE_TICKET, authJwt.ticket, { domain: subHostName, path: '/' })

  if (authJwt.remeberMe) {
    localStorage.setItem(CONSTS.REMEMBER, authJwt.remeberMe)
  }
  localStorage.setItem(CONSTS.REMEMBER, true)
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', JSON.stringify(authJwt))
  localStorage.setItem('refresh_token', authJwt.refresh_token)
}
export function jwtAuth(authParam) {
  return request({
    method: 'get',
    url: '/login/jwt/trust?_allow_anonymous=true',
    params: authParam
  })
}

// 重定向地址
export function navigate(authJwt) {
  if (localStorage.getItem(CONSTS.REDIRECT_URI) != null) {
    this.redirect_uri = `${localStorage.getItem(CONSTS.REDIRECT_URI)}`
    localStorage.removeItem(CONSTS.REDIRECT_URI)
  }
  if (this.redirect_uri !== '') {
    location.href = this.redirect_uri
  }
}
// 获取图片验证码

// 获取用户列表
export function appList() {
  return request({
    method: 'get',
    url: '/appList',
    headers: {
      Authorization: `Bearer ${Cookies.get(CONSTS.CONGRESS)}`,
      token: Cookies.get(CONSTS.CONGRESS)
    }
  })
}
// 忘记密码时产生验证码
export function produceOtp(params) {
  return request({
    method: 'get',
    url: '/forgotpassword/produceOtp?_allow_anonymous=true',
    params
  })
}
// 邮箱验证
export function produceEmailOtp(params) {
  return request({
    method: 'get',
    url: '/forgotpassword/produceEmailOtp?_allow_anonymous=true',
    params
  })
}
// 修改密码
export function setPassword(params) {
  return request({
    method: 'get',
    url: '/forgotpassword/setpassword?_allow_anonymous=true',
    params
  })
}

// 验证登录账号
export function authorize(provider) {
  return request({
    method: 'get',
    url: `/logon/oauth20/authorize/${provider}?_allow_anonymous=true`
  })
}
export function scanqrcode(provider) {
  return request({
    method: 'get',
    url: `/logon/oauth20/scanqrcode/${provider}?_allow_anonymous=true`
  })
}
// 获取个人信息
export function getProfile() {
  return request({
    method: 'get',
    url: '/config/profile/get',
    headers: {
      Authorization: `Bearer ${Cookies.get(CONSTS.CONGRESS)}`,
      token: Cookies.get(CONSTS.CONGRESS)
    }
  })
}
// 更新个人信息
export function updateProfile(body) {
  return request({
    method: 'put',
    url: '/config/profile/update',
    headers: {
      Authorization: `Bearer ${Cookies.get(CONSTS.CONGRESS)}`,
      token: Cookies.get(CONSTS.CONGRESS)
    },
    data: body
  })
}
export function logout() {
  return request({
    method: 'get',
    url: '/force/logout'
  })
}
// 清除token
export function clear() {
  Cookies.set('token', '')
  Cookies.remove(CONSTS.CONGRESS)
  localStorage.setItem(CONSTS.REMEMBER, '')
  localStorage.setItem('token', '')
  localStorage.setItem('access_token', '')
  localStorage.setItem('user', '')
  localStorage.setItem('username', '')
  localStorage.setItem('password', '')
}

export const refreshToken = (refresh_token) => {
  return request({
    url: 'auth/token/refresh?refresh_token=' + refresh_token,
    method: 'post',
    data: {
      refresh_token
    }
  })
}
// 获取登录信息
export function get(remember_me) {
  return request({
    url: remember_me
      ? `/login/get?_allow_anonymous=true&remember_me=${remember_me}`
      : '/login/get?_allow_anonymous=true',
    method: 'get'
  })
}
export const usersFetch = (params) => {
  return request({ params, url: 'users/fetch', method: 'get' })
}

export const usersGet = (id) => {
  return request({ url: 'users/get/' + id, method: 'get' })
}

export const usersUpdate = (data) => {
  return request({ url: 'users/update', method: 'put', data })
}
export const usersDelete = (ids) => {
  return request({ url: 'users/delete?ids=' + ids, method: 'delete' })
}
