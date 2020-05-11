<template>
  <div class="goods-item" @click="itemClick" >
      <!-- 根据传goodsItem依次遍历所需元素，进行展示 -->
      <img :src="showImage" alt="" @load="imgLoad">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span  class="collect">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>
<script>
export default {
   name:'',
   props:{
    //  通过定义接收每一个goods里面的object对象
     goodsItem:{
       type:Object,
       default(){
         return {}
       }
     }
   },
   computed:{
    //  使用计算属性判断传入图片，再根据需要进行选择
     showImage() {
       return this.goodsItem.image || this.goodsItem.show.img
     }
   },
   methods:{
    //  为避免better-scroll中scrolHeight没有动态获取问题,利用vue中自带@load监听图片加载事件,再采用事件总线$bus进行发射,使用前需要初始化赋值
     imgLoad(){
       this.$bus.$emit('itemImgLoad')
     },
    itemClick(){
      //  console.log("跳转详情页");
       this.$router.push("/detail/"+this.goodsItem.iid)
     }
   }
}
</script>
<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
    /* border:3px solid var(--color-tint); */
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("../../../assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
