<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item" :key="item.index">
      <a :href="item.link">
        <img :src="item.image" alt=""/>
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>
<script>
export default {
   name:'',
   props:{
     recommends:{
       type:Array,
       default(){
         return []
       }
     }
   }
}
</script>
<style scoped>
  .recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    /* 内边距设置元素上10下15左右0 */
    padding: 10px 0 15px;
    /* 下边框设置横条 */
    border-bottom: 10px solid #eee;
  }
  .recommend-item img{
    width: 70px;
    height: 70px;
    /* 下外边距图片距离文字10px */
    margin-bottom: 10px;
  }
  .recommend-item{
    flex: 1;
  }
</style>