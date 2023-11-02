// 引入封装的请求方式
import http from '../service/http.ts'

// 获取验证码
export function getcodeAPI(params){
  return http.get('https://youyi-api.itheima.net/code',params)
}

// 绑定
export function postbindingAPI(params){
  return http.post('https://youyi-api.itheima.net/login/binding',params)
}


