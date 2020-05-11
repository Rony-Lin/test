import Vue from "vue"
import Vuex from "vuex"

// 引入方法
import mutations from "./mutations"
import actions from "./actions"
import getters from "./getters"

// 安装并使用插件Vuex
Vue.use(Vuex);

const state = {
  cartList:[]
}
// 创建实例对象
const store = new Vuex.Store({
  state,
  // mutations唯一的目的修改state的状态；
  // mutations中每一个方法尽可能完成的事件比较单一
  mutations,
  // 通过actions实现方法，mutations实现对方法的监听
  actions,
  getters
})

// 挂载对象
export default store;