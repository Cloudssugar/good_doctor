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

// 删除 患者
export function delpatientAPI(params){
  return http.delete(`https://youyi-api.itheima.net/patient/del/${params}`)
}

// 修改患者
export function deitupdateAPI(params){
  return http.put(`https://youyi-api.itheima.net/patient/update`,params)
}

// 药品列表
export function getmedicinelistAPI(params){
  return http.get('https://youyi-api.itheima.net/patient/medicine?current=1&pageSize=10&keyword=',params)
}

// 
export function postselectedAPI(params){
  return http.post('https://youyi-api.itheima.net/patient/medicine/selected/pre',params)
}

// 删除购物车数据
// export function postdelcartAPI(params){
//   return http.post('https://youyi-api.itheima.net/patient/medicine/selected/pre',params)
// }


