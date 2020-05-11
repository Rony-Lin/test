<template>
  <!-- 设置事件监听点击，看看能否获取 -->
  <div class="tab-bar-item"  @click="clickitem">
    <!-- 每个插槽通过嵌套一层div进行条件判断，防止插槽替换时条件不起作用 -->
    <div v-if="!isActive">
      <slot name="item-icon" >
    </slot></div>
    <div v-else>
      <slot name="item-icon_active"></slot>
    </div>
    <!-- 通过计算属性动态绑定样式，当点击某个页面改变当前底部文字颜色 -->
    <div :style = "activeStyle">
      <slot name="item-text"></slot>
    </div>
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>
<script>
export default {
   name:'',
  //  父给子通信：props定义一个字符串类型
   props:{
     path:String,
    //  传入color变量，用于定义计算属性使用的变量及参照
     colorActive:{
        type:String,
        default:"deeppink"
     }
  },
   data(){
     return {
      //  isActive:true
     }
   },
   computed:{
    //  通过比较当前路由与路由是否一致，一致则改变颜色，即为活跃状态
     isActive (){
       return  this.$route.path.indexOf(this.path) !== -1;
     },
    //  通过三目运算符,用户可以通过参数改变底部文字颜色，否则则用默认
    activeStyle(){
      return this.isActive ? {color:this.colorActive} : {}
    }
   },
  //  定义动态跳转路由事件，通过父子通信进行路径跳转
   methods:{
     clickitem(){
       this.$router.push(this.path);
     }
   }
}
</script>
<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    /* line-height: 49px; */
  }
  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .active{
    color: hotpink;
  }
</style>
