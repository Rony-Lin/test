<template>
   <div class="goods">
     <!-- 通过获取整个商品列表，再逐个遍历获取所需信息，v-bind绑定属性传值子组件 -->
     <goods-list-item v-for="item in goods" :goods-item="item" :key="item.index"  />
   </div>
</template>
<script>
import GoodsListItem from "./GoodsListItem"

export default {
   name:'',
   props:{
    //  定义并接收Home组件的goods列表
    goods:{
      type:Array,
      default() {
        return []
      }
    }
   },
    components:{
     GoodsListItem
   }
}
</script>
<style scoped>
  .goods{
    display: flex;
    /* 设置整个元素横向 */
    flex-wrap: wrap;
    justify-content: space-around;

    padding:2px;
  }
</style>
