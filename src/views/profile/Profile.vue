<template>
  <div class="profile">
    <nav-bar class="profile-nav-bar">
      <div slot="center">欢迎光临</div>
    </nav-bar>
    <scroll class="content">
      <user-info class="user-info" />
      <div class="order-list">
        <div class="list-item">
          <img class="item-img" src="../../assets/img/profile/message.svg" alt />
          <span class="item-text">我的消息</span>
        </div>
        <div class="list-item">
          <img class="item-img" src="../../assets/img/profile/score.svg" alt />
          <span class="item-text">积分商城</span>
        </div>
        <div class="list-item">
          <img class="item-img" src="../../assets/img/profile/vip.svg" alt />
          <span class="item-text">会员卡</span>
        </div>
      </div>
      <div class="order-list">
        <div class="list-item">
          <img class="item-img" src="../../assets/img/profile/cart.svg" alt />
          <span class="item-text">我的购物车</span>
        </div>
        <div class="list-item">
          <img class="item-img" src="../../assets/img/profile/download.svg" alt />
          <span class="item-text">下载购物APP</span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import UserInfo from "./children/UserInfo";
import Scroll from "../../components/common/scroll/Scroll";

export default {
  name: "Profile",
  components: {
    UserInfo,
    NavBar,
    Scroll
  }
};
</script>

<style scoped>
.profile-nav-bar {
  background-color: pink;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 50px;
  width: 100%;
}

.order-list {
  display: flex;
  flex-direction: column;
  border-bottom: 10px solid #f2f2f2;
}

.list-item {
  border-bottom: 1px solid #f2f2f2;
  padding: 12px;
  display: flex;
  align-items: center;
}

.item-img {
  margin-left: 0px;
  height: 18px;
  width: 18px;
}

.item-text {
  margin-left: 10px;
}
</style>
