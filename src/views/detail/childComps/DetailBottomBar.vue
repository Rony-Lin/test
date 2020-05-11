<template>
  <div class="bottom-bar">
    <div class="bottom-bar-left">
      <div class="left-item">
        <i class="icon-shop" />
        <span>店铺</span>
      </div>
      <div class="left-item">
        <i class="icon-service" />
        <span>客服</span>
      </div>
      <div class="left-item">
        <i class="icon-collect" />
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-bar-right">
      <div class="bar-right-add-cart" @click="addCart">加入购物车</div>
      <div class="bar-right-bug">立即购买</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  methods:{
    addCart(){
      // console.log("添加进购物车");
      this.$emit('addToCart')
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
}
.bottom-bar-left {
  flex: 1;
  display: flex;
  background-color: #fff;
}
.left-item {
  height: 49px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.bottom-bar-right {
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.icon-shop {
  background: url("../../../assets/img/detail/detail_bottom.png") 0 0 / 96%;
  width: 14px;
  height: 16px;
  background-position: 0 -59px;
}
.icon-service {
  background: url("../../../assets/img/detail/detail_bottom.png") 0 0 / 96%;
  width: 14px;
  height: 16px;
  background-position: 0 -31px;
}
.icon-collect {
  background: url("../../../assets/img/detail/detail_bottom.png") 0 0 / 96%;
  width: 14px;
  height: 16px;
  background-position: 0 0px;
}
.bar-right-add-cart {
  height: 49px;
  flex: 1;
  background-color: orange;
  line-height: 49px;
  text-align: center;
}
.bar-right-bug {
  flex: 1;
  background-color: pink;
  height: 49px;
  line-height: 49px;
  text-align: center;
}
</style>
