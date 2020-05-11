<template>
  <div id="detail">
    <!-- 子组件传入事件监听附带参数时，这里进行绑定不用带上参数，带上反倒报错，如titleClick -->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!-- <div v-for="item in $store.state.cartList" :key="item.index">
        <li>{{item}}</li>
      </div> -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imageLoad" />
      <detail-params-info :item-params="itemParams" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommend" ref="recommend" />
    </scroll>
    <detail-bottom-bar @addToCart="addCart"/>
    <!-- 回顶可以直接引用，也可以采用混入方法 -->
    <back-top @click.native="topClick" v-show="isShowBackTop" />
    <!-- <toast :message="message" :show="show"/> -->
  </div>
</template>
<script>
// DetailNavBar组件实现title功能
import DetailNavBar from "./childComps/DetailNavBar";
// DetailSwiper组件实现轮播功能
import DetailSwiper from "../../views/detail/childComps/DetailSwiper";
// DetailBaseInfo组件实现商品详细信息功能
import DetailBaseInfo from "./childComps/DetailBaseInfo";
// DetailShopInfo组件实现商品店铺功能
import DetailShopInfo from "./childComps/DetailShopInfo";
import Scroll from "../../components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goodslist/GoogsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "../../components/content/backtop/backTop";
// import Toast from "../../components/common/toast/Toast"

// 根据iid获取商品数据
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "../../network/detail";
import { itemListenerMixin } from "../../common/mixin";
import { debounce } from "../../common/utils";

import { mapActions } from "vuex"

export default {
  // 使用keep-alive时,如果不含(exclude)需将name值传出
  name: "detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommend: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message:'',
      // show:false
    };
  },
  mixins: [itemListenerMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast
  },
  created() {
    this.iid = this.$route.params.iid;
    //  根据iid打印商品展示页的数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      // 将图片赋值给topImage[]
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 获取详情页商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // console.log(this.goods);

      // 获取商品店铺数据
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      // 获取商品图片参数数据
      this.detailInfo = data.detailInfo;
      // console.log(this.detailInfo);

      // 获取商品参数数据
      this.itemParams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // console.log(this.itemParams);

      // 获取商品评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        // console.log(this.commentInfo);
      }
    });
    // 获取商品推荐数据，先封装，再使用
    getRecommend().then(res => {
      // console.log(res);
      this.recommend = res.data.list;
      // console.log(this.recommend);
    });
    // 实现头部点击跳转：为避免多次调用，对其进行防抖，并利用数组将所有offsetTop传入函数，再根据当前点击index进行跳转
    // 获取高度的问题，一般需要受到图片加载快慢的影响，因此需要准确等其完全加载完方能获取对应高度，不然一般获取到的高度无法准确
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {
    //  console.log("detail-mounted");
  },
  //  取消全局事件监听，这里是在销毁时取消全局监听
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions({
      add:'addCart'
    }),
    imageLoad() {
      this.$refs.scroll.refresh();

      // 调用函数实现头部点击跳转
      this.getThemeTopY();
    },
    titleClick(index) {
      //  console.log(index);
      // 根据组件传过来的事件监听，监听当前点击，获取对应高度进而跳转
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    topClick() {
      // console.log("回到顶部");
      // 第一种:通过ref获取当前组件并进行scrollTo()方法
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      // 通过组件的methods方法定义后直接调用，scrollTo(x,y,time(ms))
      this.$refs.scroll.scrollTo(0, 0,500);
    },
    //  根据滚动区域获取对应高度，进而进行联动显示
    contentScroll(position) {
      //  console.log(position);
      // 根据当前滚动条的坐标决定是否可以显示返回顶部,因坐标负值,所以需转正
      this.isShowBackTop = -position.y > 1000;
      // positionY跟themeTopY[]值的比较：[0, 18034, 18930, 19122,
      // 当positionY在0~=18034中间显示 0；
      // 当positionY在=18034~18930中间显示1；
      // 当positionY在=18930~19122中间显示2；
      // 当positionY超过19122时显示3

      const positionY = -position.y;
      //  console.log(positionY);
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        //  这种判断仅适合前三种情况，第四种情况将会无法显示，出现数组越界的现象
        //  if (positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) {
        //    console.log(i);
        //  }
        // if ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopY[i + 1]) || (i === length - 1 && positionY > this.themeTopYs[i])) {
        //   console.log(i);
        // }
        // 通过以下对比拿到对应高度的索引值进而进行联动显示,判断当前currentIndex是否与i相等。相等则显示
        // this.currentIndex !== i 让其不会频繁显示
        //  if (this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length -1 && positionY >= this.themeTopYs[i])) {
        //     this.currentIndex = i;
        // console.log(this.currentIndex);
        // 根据当前nav的currentIndex与当前获取的距离是否相等，相等则联动显示
        //       this.$refs.nav.currentIndex = this.currentIndex;
        //     }
        // 第三种：通过给该数组加入最大值，实现区间判断
        // 优点:能使程序运行效率更高，容易理解；缺点：Number.MAX_VALUE占用内存大，以空间获取时间
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addCart(){
      // console.log("添加进购物车");
      // 定义product变量保存
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product);
      // 将商品添加到购物车
      // this.$store.cartList.push(product);
      // 根据Vuex的mutained中的方法进行调用
      // this.$store.commit("addCart",product);
      // 通过actions进行方法书写，通过mutation进行监听
      
      // 第一种普通展示Promise，显示toast
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // });

      // 第二种采用mapActions方法显示toast
      this.add(product).then(res => {
        // console.log(res);
        // this.show = true;
        // this.message = res;
        // setInterval(()=>{
        //   this.show = false;
        //   this.message = '';
        // },1500)

        // 第三种通过自定义封装插件，进行调用，比较简洁凝练
        this.$toast.show(res)
        // console.log(this.$toast);
        
      })
    }
  }
};
</script>
<style scoped>
/* 设置底部相对定位，赋给背景色使其隐藏 */
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
/* 设置滚动需要给控件加高度，父元素设置100%视口。子元素采用calc或定位设置 */
.content {
  /* 44px:减去顶部栏44px，49px：减去底部49px，底部相对定位中的底部距离就可省略 */
  height: calc(100% - 44px - 49px);
  /* 设置隐藏，方可实现正常滚动，否则出现鼠标滚动 */
  overflow: hidden;
}
/* 导航栏设置相对定位，不脱离文档流，让其滚动可以正常显示 */
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>
