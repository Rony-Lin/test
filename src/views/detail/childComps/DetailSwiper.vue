<template>
   <div class="detail-swipe">
     <swiper class="midimg">
       <swiper-item v-for="item in topImages" :key="item.index">
         <!-- 动态绑定方能传值 -->
         <img :src="item" alt="">
       </swiper-item>
     </swiper>
   </div>
</template>
<script>
// 实现轮播功能,为何用{},因为Swiper,SwiperItem两个组件封装完导入index文件,通过函数导出
import {Swiper,SwiperItem} from "../../../components/common/swiper/index"

export default {
   name:'',
   props:{
     topImages:{
       type:Array,
       default(){
         return []
       }
     }
   },
   components:{
     Swiper,
     SwiperItem
   }
}
</script>
<style scoped>
  .midimg{
    height: 300px;
    overflow: hidden;
  }
</style>
