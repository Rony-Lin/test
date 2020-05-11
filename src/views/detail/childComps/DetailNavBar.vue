<template>
  <div>
    <nav-bar>
      <div slot="left" class="backImg" @click ="backClick">
        <img src="../../../assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="center">
      <div v-for="(item,index) in titles" :key="index" class="title-center" @click="titleClick(index)" :class="{active:currentIndex === index}">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "../../../components/common/navbar/NavBar"

export default {
   name:'',
   data() {
     return {
       titles:['商品','参数','评论','推荐'],
       currentIndex:0
     }
   },
   components:{
     NavBar
   },
   methods:{
    //  监听事件点击,根据当前点击获取对象进行变色,随后根据附上活跃类
     titleClick(index){
       this.currentIndex = index;
      //  发射titleclick用于监听商品详情页的顶部点击跳转
       this.$emit('titleClick',index)
     },
    //  监听图片进行点击后退回首页
     backClick(){
       this.$router.back()
     }
   }
}
</script>
<style scoped>
  .center{
    display: flex;
  }
  .title-center{
    flex:1;
  }
  .active {
    color: var(--color-high-text);
  }
  .backImg{
    margin-top: 7px;
  }
</style>
