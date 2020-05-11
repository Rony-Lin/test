import {ADD_COUNTER,ADD_TO_CART} from "./mutation-type"

// 封装mutations事件监听
// mutations唯一的目的修改state的状态；
// mutations中每一个方法尽可能完成的事件比较单一
export default {
  [ADD_COUNTER](state,payLoad) {
    payLoad.count++;
  },
  [ADD_TO_CART](state,payLoad){
    // 在模型里面监听是否发生选中
    payLoad.checked = true;
    
    state.cartList.push(payLoad);
  }
}