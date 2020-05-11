<template>
  <div class="check-bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
      :is-checked="isSelectAll" 
      @click.native="checkedClick"/>
      <!-- .native将该元素转成html标签 -->
      <span>全选</span>
    </div>
    <div class="price">合计:{{totalPrice}}</div>
    <div class="calculate" @click="calClick">去计算:({{checkLength}})</div>
  </div>
</template>
<script>
import checkButton from "../../../components/content/checkButton/checkButton"
import {mapGetters} from "vuex"

export default {
   name:'',
   components:{
     checkButton
   },
   computed:{
     ...mapGetters(["cartLength","cartList"]),
     totalPrice(){
      //  对数组进行过滤，返回选中商品
       return this.$store.state.cartList.filter(item =>{
         return item.checked
        //  对选中商品进行计算
       }).reduce((preVal,item)=>{
         return preVal + item.price * item.count
       },0).toFixed(2)
     },
     checkLength(){
      //  返回被选中商品的长度
       return this.$store.state.cartList.filter(item => item.checked).length;
     },
     isSelectAll(){
      //  判断是否全选 
      // 默认为false，只要查询到一个不被选中，则全选不亮，除非全部选中才亮
      // 第一种filter,需要查询数组全部元素，性能不强
      if (this.cartLength === 0) return false;
      //  return !this.cartList.filter(item => !item.checked).length;
      //find方法相较于filter，只要查询到一个不选中，即可
      //  return !this.cartList.find(item => !item.checked);
      //第三种:普通遍历
      for (let item of this.cartList) {
         if (!item.checked) {
           return false;
         }
      }
      return true;
     }
   },
  methods:{
    // 全选按钮的判断
    checkedClick(){
      // console.log("----");
      if (this.isSelectAll) { //全部选中
        this.cartList.forEach (item => item.checked =false);
      } else { //全部不选中或一个不选
        this.cartList.forEach (item => item.checked =true);
      }
    },
    calClick(){
      // 监听是否有商品添加进来，调用封装插件$toast的show(String,duration);
      if (this.cartList.length === 0)
      this.$toast.show('请先添加商品')
    }
  }
}
</script>
<style scoped>
/* 全局采用flex布局，全部设置宽度，中间设置flex=1，剩余一个被挤到最右边 */
.check-bottom-bar{
  height: 40px;
  /* background-color: red; */
  background-color: #eee;
  line-height: 40px;

  position: relative;
  display: flex;

  font-size: 15px;
}
.check-content{
  display: flex;
  /* 当文字与按钮无法垂直居中时，设置align-items */
  align-items: center;

  margin-left: 10px;
  width: 60px;
}
.check-button{
  width: 20px;
  height: 20px;

  line-height: 20px;

  margin-right: 5px;
}
.price{ 
  flex: 1;
  margin-left: 120px;
}
.calculate{
  width: 100px;
  background-color:orange;
  text-align: center;
  border-radius: 10%;
}
</style>
