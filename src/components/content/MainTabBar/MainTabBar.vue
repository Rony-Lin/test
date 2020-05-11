<template>
  <tab-bar>
      <!-- 第二层组件封装TabBarItem,内嵌三个具名插槽，动态管理两张图片和文字及其样式，实现复用 -->
      <!-- 用户可以通过colorActive输入颜色改成自己想要的颜色 -->
       <tab-bar-item path="/home">
         <img slot="item-icon" src="../../../assets/img/tabbar/home.svg" alt="">
         <img slot="item-icon_active" src="../../../assets/img/tabbar/home_active.svg" alt="">
         <div slot="item-text">首页</div>
       </tab-bar-item>
       <tab-bar-item path="/category">
         <img slot="item-icon" src="../../../assets/img/tabbar/category.svg" alt="">
         <img slot="item-icon_active" src="../../../assets/img/tabbar/category_active.svg" alt="">
         <div slot="item-text">分类</div>
       </tab-bar-item> 
       <tab-bar-item path="/cart">
         <img slot="item-icon" src="../../../assets/img/tabbar/shopcart.svg" alt="">
         <img slot="item-icon_active" src="../../../assets/img/tabbar/shopcart_active.svg" alt="">
         <div slot="item-text">购物车</div>
       </tab-bar-item> 
       <tab-bar-item path="/profile">
         <img slot="item-icon" src="../../../assets/img/tabbar/profile.svg" alt="">
         <img slot="item-icon_active" src="../../../assets/img/tabbar/profile_active.svg" alt="">
         <div slot="item-text">个人</div>
       </tab-bar-item>   
    </tab-bar> 
</template>
<script>
import TabBar from "../../common/Tabbar/TabBar"
import TabBarItem from "../../common/Tabbar/TabBarItem"

export default {
   name:'',
   components:{
    TabBar,
    TabBarItem
   }
}
</script>
<style scoped>

</style>
