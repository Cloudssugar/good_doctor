// 引入封装的请求方式
import http from '../service/http.js'

// 家庭档案
export function getmylistAPI(params){
  return http.get('https://youyi-api.itheima.net/patient/mylist',params)
}

// 添加患者
export function postaddAPI(params){
  return http.post('https://youyi-api.itheima.net/patient/add',params)
}

// 删除 
export function delpatientAPI(params){
  return http.delete(`https://youyi-api.itheima.net/patient/del/${params}`)
}
