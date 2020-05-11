<template>
  <swiper>
         <swiper-item v-for="item in banners" :key="item.index">
            <a :href="item.link">
               <img :src="item.image" alt="" @load="showImg">
            </a>
         </swiper-item>
      </swiper>
</template>
<script>
import {Swiper,SwiperItem} from "../../../components/common/swiper/index"

export default {
   name:'',
   props:{
     banners:{
       type:Array,
       default(){
       return []
       }
   },
     data(){
        return{
           isImgLoad:false
        }
     }
   },
   components:{
      Swiper,
      SwiperItem
   },
   methods:{
      // 监听图片加载是否完成,其次利用if判断是否加载一张了,若有一张加载直接传值过去,无需四张同时加载,不用防抖动
      showImg(){
        if (!this.isImgLoad) {
            this.$emit("swipeImgLoad");
            this.isImgLoad = true
        }
      }
   }
}
</script>
<style scoped>

</style>
