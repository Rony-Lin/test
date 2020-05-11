<template>
  <div id="shop-item">
    <!-- <div class="item-selecter">
      <checkButton @checkBtnClick="checkChange" :value="itemInfo.checked"></checkButton>
    </div> -->
    <div class="item-img">
      <img :src="itemInfo.image" alt="">
    </div>
    <div class="item-info">
      <div class="item-title">{{itemInfo.title}}</div>
      <div class="item-desc">{{itemInfo.desc}}</div>
      <div class="info-bottom">
        <div class="item-price-left">{{itemInfo.price}}</div>
        <div class="item-count-right">{{itemInfo.count}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   name:'',
   props:{
     itemInfo:{
       type:Object,
       default(){
         return {}
       }
     }
   }
}
</script>
<style scoped>
/* #shop-item{
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector{
  width: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.item-title, .item-desc{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
  border: 1px solid #ccc;
}
.item-img img{
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}
.item-info .item-title{
  font-size: 16px;
  margin-top: 5px;
  font-weight: 600;
}
.item-info .item-desc{
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.info-bottom{
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.info-bottom .item-price{
  color: orangered;
}
 .item-price-left{
  margin-top: 5px;
  font-size: 16px;
} */
.shop-item {
  font-size: 0;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #cccccc;
}

.shop-item:last-child {
  border-bottom: 0;
}

.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
}

.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}

.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  width: 88%;
  padding: 5px 10px;
  color: #333333;
}

.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666666;
}

.info-bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  margin-top: 10px;
}

.info-bottom .item-price {
  color: #ff4500;
}
</style>
