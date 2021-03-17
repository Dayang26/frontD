import Vue from "vue"
import axios from 'axios'
import store from '../store'
import router from '../router'

axios.defaults.baseURL='http://localhost:8081/'
Vue.prototype.$ajax=axios

//request 拦截器
axios.interceptors.request.use(function(config){
  //config.headers 请求头
  //config.method 请求方式
  //config.data  请求参数
    var token=window.sessionStorage.getItem('token');
    if(token){
      config.headers.Authorization=token;
    }
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
  if(error.response){
    //console.log(error.response);
    switch(error.response.status){
      case 401:
         store.commit('logout');
         router.replace('/');
         return;
    }
  }
  return Promise.reject(error.response);
})
