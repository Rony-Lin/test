<template>
  <div id="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>
<script>
export default {
   name:'',
  //  props:{
  //    message:{
  //      type:String,
  //      default:''
  //    },
  //    show:{
  //      type:Boolean,
  //      default:false
  //    }
  //  }
  data(){
    return {
      message:'',
      isShow:false
    }
  },
  methods:{
    show(message,duration=2000){
      this.message = message;
      this.isShow = true;
      //设置定时器使其自动消失
      setTimeout(()=>{
        this.isShow = false;
        this.message = '';
      },duration)
    }
  }
}
</script>
<style scoped>
#toast{
  /* 让其显示  上左正方向移动50%，稍微偏*/
  position: fixed;
  top: 50%;
  left: 50%;
  /* 真正居中 */
  transform: translate(-50%,-50%);
  
  color: #eee;
  padding: 8px 10px;

  z-index: 999;

  background: rgba(0,0,0,.75);
}
</style>
