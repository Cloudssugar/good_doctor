// 引入封装的请求方式
import http from '../service/http.ts'

// 获取验证码
export function getcodeAPI(params){
  return http.get('https://youyi-api.itheima.net/code',params)
}

// 验证码登录
export function postcodeloginAPI(params){
  return http.post('https://youyi-api.itheima.net/login',params)
}

// 注册
export function postregisterAPI(params){
  return http.post('https://youyi-api.itheima.net/register',params)
}

// 密码登录
export function postpasswordrAPI(params){
  return http.post('https://youyi-api.itheima.net/login/password',params)
}


