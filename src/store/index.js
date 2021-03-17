import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  //全局变量
  state: {
    user: undefined,
    isLogined: false,
    name: '',
    params: undefined
  },

  // 修改全局变量必须通过mutations中的方法
  // mutations只能采用同步方法
  mutations: {
    setParams(state,params){
      state.params=params
    },
    getUser(state) {
      return state.user
    },
    setUser(state, user) {
      state.user = user
    },
    getIsLogined(state) {
      return state.isLogined
    },
    setIsLogined(state, isLogined) {
      state.isLogined = isLogined
    },
    logout(state){
      state.user=undefined;
      state.isLogined=false;
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('name');
    }

  },
  // 异步方法用actions
  // actions不能直接修改全局变量，需要调用commit方法来触发mutation中的方法
  actions: {
    login(context, user) {
      context.commit('setUser', user)
      context.commit('setIsLogined',true)
    },
    logout(context) {
      context.commit('setUser', undefined)
      context.commit('setIsLogined',false)
    }
  }
})
export default store
