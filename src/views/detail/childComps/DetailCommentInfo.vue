<template>
  <div class="comment-info" v-if="Object.keys(commentInfo).length !==0">
    <div class="info-header">
      <div class="header-title">用户评价</div>
      <div class="header-more">
        更多
        <i class="arrow-right"></i>
      </div>
    </div>
    <div class="info-user">
      <img :src="commentInfo.user.avatar" alt />
      <span class="uname">{{commentInfo.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p class="detail-content">{{commentInfo.content}}</p>
      <div class="info-other">
        <span class="data">{{commentInfo.created | showDate}}</span>
        <span>{{commentInfo.style}}</span>
      </div>
      <div class="info-imgs" v-if="commentInfo.images !==0">
        <img :src="item" alt v-for="(item,index) in commentInfo.images" :key="index" />
      </div>
    </div>
  </div>
</template>
<script>
import {FormDate} from "../../../common/utils"

export default {
  name: "",
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    //  因服务器传过来时间一般是时间戳，所以对其进行格式化并进行过滤，按照时间正常格式显示
    showDate(value) {
      //  因为传过来的时间戳一般是秒，转成Date对象*1000成毫秒
      const date = new Date(value * 1000);
      // 格式化时间戳
      return FormDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>
<style scoped>
/* #spack {
  width: 100%;
} */

.comment-info {
  /* margin-top: 500px; */
  padding: 7px 15px 10px 15px;
  border-bottom: 5px solid #f2f5f8;
}

.info-header {
  display: flex;
  justify-content: space-between;
  color: pink;
  height: 50px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.header-title {
  font-size: 18px;
}

.header-more {
  font-size: 14px;
}

.info-user {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}

.uname {
  margin-left: 15px;
  font-size: 12px;
  color: pink;
}

.info-detail {
  color: var(--color-text-x);
  margin-bottom: 10px;
}

.detail-content {
  font-size: 14px;
  letter-spacing: 1px;
  color: pink;
}

.info-other {
  display: flex;
  margin: 13px 0;
  font-size: 14px;
  color: pink;
}

.data {
  margin-right: 10px;
}

.info-imgs img{
  width: 25%;
}
</style>
