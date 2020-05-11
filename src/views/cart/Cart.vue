<template>
  <div id="cart">
    <nav-bar class="nav-bar">
        <div slot="center" >购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list />
    <cart-bottom-bar />
  </div>
</template>
<script>
import NavBar from "../../components/common/navbar/NavBar"
import cartList from "./childComps/cartList"
import cartBottomBar from "./childComps/cartBottomBar"

// 引入Vuex中定义的的方法进行计算
import {mapGetters} from "vuex"

export default {
   name:'',
   components:{
     NavBar,
     cartList,
     cartBottomBar
   },
   computed:{
    //  第一种计算加入购物车数量方法
    //  cartLength(){
    //    return this.$store.state.cartList.length;
    //  }
    // 第二种
    // cartLength(){
    //   return this.$store.getters.cartLength;
    // }
    // 第三种
    // mapGetters辅助函数仅仅是将store的getters映射到局部计算属性,可以采用数组或键值对(需要统一名字)的方式进行传
    // ...mapGetters(['cartLength'])
    ...mapGetters({
      cartLength: 'cartLength',
    })
   }
}
</script>
<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 60;
}
</style>
