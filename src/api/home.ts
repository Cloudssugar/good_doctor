// 引入封装的请求方式
import http from '../service/http.js'

// 家庭档案
export function getmylistAPI(params){
  return http.get('https://youyi-api.itheima.net/patient/mylist',params)
}