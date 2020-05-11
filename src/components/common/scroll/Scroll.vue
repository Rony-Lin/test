<template>
   <div class="wrapper" ref="wrapper">
     <div class="content">
       <slot></slot>
     </div>
   </div>
</template>
<script>
import BScroll from "better-scroll"

export default {
   name:'',
   props:{
     probeType:{
       type:Number,
       default:0
     },
     pullUpLoad:{
       type:Boolean,
       default:false
     }
   },
   data(){
     return {
       scroll:null,
     }
   },
   mounted(){
    //  创建Bscroll对象
     this.scroll = new BScroll(this.$refs.wrapper,{
       click:true,
       probeType: this.probeType,
       pullUpLoad: this.pullUpLoad
     })
      if (this.probeType === 2 || this.probeType === 3) {
            //  监听滚动位置 on()
        this.scroll.on('scroll',(position) => {
          //  console.log(position);
          // 子组件传出定义事件,供父组件进行调用
          this.$emit('scroll',position)
        })
      }
          // 监听上拉加载更多
        if (this.pullUpLoad) {
          //注意:父子通信的为pullUpLoad,而此处调用的方法为pullingUp！！！
          this.scroll.on('pullingUp',() => {
            // console.log("上拉加载更多");
            this.$emit('pullingUp')
          })
        }     
   },
   methods:{
    //  封装scrollTo方法进行滚动,如果参数设置默认值,可直接传入
     scrollTo(x,y,time=500){
      //  利用短路与判断scroll是否为null,若为第一个为false,后续不再执行
       this.scroll && this.scroll.scrollTo(x,y,time)
     },
     refresh(){
      // console.log( "----");
     //  利用短路与判断scroll是否为null,若第一个为false,后续不再执行
      this.scroll && this.scroll.refresh()
     },
    //  封装finishPullUp方法()
     finishPullUp(){
       this.scroll.finishPullUp()
     },
     getScrollY(){
       return this.scroll ? this.scroll.y : 0
     }
   }
}
</script>
<style scoped>

</style>
