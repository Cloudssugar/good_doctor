// 导入 axios
import axios from 'axios'

// 创建 axios 实例
const service=axios.create({
  // 公共接口前缀 正常应该从环境变量中获得
  baseURL:'',
  timeout:3000,
  // 表示跨域请求时是否需要使用凭证
  withCredentials:false   //default
})

// 添加请求拦截器
service.interceptors.request.use(function(config){
  const token = localStorage.getItem('token')
  // 如果有token就带上将token添加到config.headers.Authorization中
  if (token) {            
    config.headers.Authorization = `Bearer ${token}`

  }
  return config
},function(error){
  return Promise.reject(error)
})

// 添加响应拦截器
service.interceptors.response.use(function(response){
  // 
  return response
},function(error){
  return Promise.reject(error)
})

export default service