<template>
  <div class="cart-list">
    <scroll class="scroll-height" ref="scroll">
      <div :key="index" class="shop-item" v-for="(item, index) in cartList">
        <div class="item-selector">
          <check-button :item-info="item" :is-checked="item.checked"/>
        </div>
        <div class="item-img">
          <img :src="item.image" alt="商品图片" />
        </div>
        <div class="item-info">
          <div class="item-title">{{ item.title }}</div>
          <div class="item-desc">商品描述: {{ item.desc }}</div>
          <div class="info-bottom">
            <div class="item-price left">¥{{ item.price }}</div>
            <div class="item-count right">x{{ item.count }}</div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

// import cartListItem from "./cartListItem"
import Scroll from "../../../components/common/scroll/Scroll";
import checkButton from "../../../components/content/checkButton/checkButton";

export default {
  name: "",
  components: {
    //  cartListItem,
    Scroll,
    checkButton
  },
  computed: {
    ...mapGetters(["cartList"])
  },
  //  通过刷新获取高度，避免出现图片加载未完成无法滚动的问题
  activated() {
    //  console.log("---");
    this.$refs.scroll.refresh();
  },
  methods:{
    checkClick(){
      // console.log(this.item);
      // console.log(this.cartList);
      
      // this.cartList.checked = !this.cartList.checked;
    }
  }
};
</script>
<style scoped>
/* 设置滚动时一般要注意设置conten高度，content一般是相对父元素进行设置，所以只有父元素高度确定方可正常滚动 */
/* 这里通过cart-list设置父元素高度为可滚动区域高度 */
/* 100vh：代表视口高度100%； */
/* .cart-list{
  height:calc(100vh - 44px - 49px);
} */
/* 这里设置content可滚动区域100%，其他突出部分进行隐藏 */
/* .content{
  height:100%;
  overflow: hidden;
} */
.cart-list {
  width: 100%;
  height: calc(100vh - 133px);
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}

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

.cart-bottom-bar {
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}

.cart-bottom-price {
  margin-left: 50px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

.cart-bottom-btn button:active {
  opacity: 0.8;
}
</style>
