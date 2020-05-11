<template>
   <div class="tab-controll">
     <div class="tab-controll-item" v-for="(item,index) in title" :key="index" 
     :class="{active:index === currentIndex}"
      @click="itemClick(index)"> 
       <span>{{item}}</span>
     </div>
   </div>
</template>
<script>
export default {
   name:'',
   data(){
     return {
       currentIndex:0
     }
   },
   methods:{
    //  根据当前点击的索引，自动切换被点击的文字，定义函数
     itemClick(index){
       this.currentIndex = index;
      //  通过$emit传值并监听tab-controll点击事件，而后进行切换
       this.$emit("itemclick",index)
     }
   },
   props:{
     title:{
       type:Array,
       default(){
         return []
       }
     }
   }
}
</script>
<style scoped>
  .tab-controll{
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }
  .tab-controll-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-controll-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>
