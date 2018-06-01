import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
let qs = require('qs');
import { getToken } from '@/tools/auth'
export const baseApi = '';
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000 // request timeout

})
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
service.interceptors.request.use(config => {
  // console.log(config.data,qs.stringify(config.data))
  config.data = qs.stringify(config.data)|| {}
  if (store.getters.token) {
    config.headers['Authorization'] = getToken()
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})
service.interceptors.response.use(
  response=>{
    /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
      const res = response;
      if (!res.data.success) {
        Message({
          message: res.data.msg,
          type: 'error',
          duration: 5 * 1000
        });
        return Promise.reject(res);
      }else{
        return response.data;
      }
  },
  error => {
    let res=error.response;

    if (res.status === 401 || res.status === 403) {
      Message({
        showClose: true,
        message: '登录搜权已过期，请重新登录!',
        type: 'warning'
      })
      store.dispatch('FedLogOut').then(() => {
        location.reload();// 为了重新实例化vue-router对象 避免bug
      });
    }else if(res.status === 404){
      Message({
        message:'服务器繁忙，请稍候重试！',
        type: 'error',
        duration: 5 * 1000
      });
    }else if(res.status === 500){
      Message({
        message:'服务器错误，请联系管理员！',
        type: 'error',
        duration: 5 * 1000
      });
    }else{
      Message({
        message: res.data.msg,
        type: 'error',
        duration: 5 * 1000
      });
    }
    axios.CancelToken.source().cancel();
    return Promise.reject(error)
  })

export default service
export const ajax={
  getDatas:ax=>{
    store.commit('commonLoading', true)
    return service({url:ax.url,method:'get',params:ax.params})
  },
  getData:ax=>{
    return service({url:ax.url,method:'get',params:ax.params})
  },
  postData:ax=>{
    return service({url:ax.url,method:'post',data:ax.params})
  }
}
