import axios from "axios"

// 封装request函数用于网络请求：通过定义对象，由于该对象是Promise类型，因此可以直接返回进行正否判断
export function request(config){
  const instance = axios.create({
    baseURL:"http://152.136.185.210:8000/",
    timeout:5000
  })
  // 无论请求拦截还是响应拦截，只能一种方式，并且拦截完记得返回，否则undefined
  // 设置请求拦截
  // 1.拦截config中某些不符合的请求数据
  // 2.为了让服务器加载数据有一个小圆圈的出现
  // 3.配合验证登录token等
  instance.interceptors.request.use(config =>{
    // console.log(config);
    return config
  },err =>{
    // console.log(err); 
  })

  // 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  },err => {
    // console.log(err);
    return err
  })

  return instance(config)
}