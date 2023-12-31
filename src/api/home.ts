// 引入封装的请求方式
import http from '../service/http.js'

// 家庭档案
export function getmylistAPI(params){
  return http.get('/patient/mylist',params)
}

// 添加患者
export function postaddAPI(params){
  return http.post('/patient/add',params)
}

// 删除 患者
export function delpatientAPI(params){
  return http.delete(`/patient/del/${params}`)
}

// 修改患者
export function deitupdateAPI(params){
  return http.put(`/patient/update`,params)
}

// 药品列表
export function getmedicinelistAPI(params){
  return http.get('/patient/medicine?current=1&pageSize=10&keyword=',params)
}

// 购物车数据
export function postselectedAPI(params){
  return http.post('/patient/medicine/selected/pre',params)
}

// 删除购物车数据
export function postdelcartAPI(params){
  return http.post('/patient/medicine/selected/pre',params)
}


// 药品详情
export function getmedicinedAPI(params){
  return http.get(`/patient/medicine/${params}`)
}

// 医生问诊
export function postorderAPI(params){
  return http.post(`patient/consult/order`,params)
}

// 
export function getdetaildAPI(params){
  return http.get(`patient/consult/order/detail`,params)
}


