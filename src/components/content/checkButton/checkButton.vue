<template>
   <div class="check-button" :class="{check:isChecked}" @click="checkClick" >
     <img src="../../../assets/img/cart/tick.svg" alt="">
   </div>
</template>
<script>
export default {
   name:'',
   props:{
     isChecked:{
       type:Boolean,
       default:false
     },
     itemInfo:{
       type:Object,
       default(){
         return {}
       }
     }
   },
   methods:{
    //  选中方法
     checkClick(){
      // console.log(this.itemInfo);
      this.itemInfo.checked = !this.itemInfo.checked
     }
   }
}
</script>
<style scoped>
.check-button{
  border-radius: 50%;
  border: 1px solid #aaa;
}
/* 绑定类，默认情况下不选，选中变红 */
.check{
  border-color: red;
  background-color: red;
}
</style>
