import Vue from "vue"
import axios from 'axios'

axios.defaults.baseURL='http://localhost:8081/'
Vue.prototype.$ajax=axios

//request 拦截器 
axios.interceptors.request.use(function(config){
  //config.headers 请求头
  //config.method 请求方式
  //config.data  请求参数
    if(config.method!='get'){
      var sendData = new FormData();
      var data=config.data;
      Object.keys(data).forEach(key => {
          sendData.append(key, data[key]);
      });
      config.data=sendData;
    }
    return config;
},function(error){
     return Promise.reject(error);
})

//response 拦截器
axios.interceptors.response.use(function(resp){
  return resp;
},function(error){
  return Promise.reject(error.response);
})
