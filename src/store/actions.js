import {ADD_COUNTER,ADD_TO_CART} from "./mutation-type"


// 封装actions方法，用于mutation进行调用
export default {
  addCart(context,payLoad){
    // payLoad添加商品，需要判断是否为同一iid，如果相同则加一,不同则在数组中添加一项
      // action内可以返回一个Promise对象
      return new Promise((resolve,reject) =>{
      // 使用find函数查询新点击的商品iid是否相等
      let oldProduct = context.state.cartList.find(item => item.iid === payLoad.iid)
        if (oldProduct) {
          // 当添加商品iid与数组内某一项商品iid相等时，数量加一
          // oldProduct.count +=1;
          // 通过commit发送出去，并传参oldProduct
          context.commit( ADD_COUNTER,oldProduct);
          resolve("商品数量加一");
          
        }else {
          // 当添加商品iid为新一项时，添加进数组
          payLoad.count =1
          // context.state.cartList.push(payLoad);
          context.commit( ADD_TO_CART ,payLoad);
          resolve("添加新商品成功");
          
        }
      })
    }
}