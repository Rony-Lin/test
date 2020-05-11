<template>
   <div id="home">
      <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
      <tab-controll :title="['流行','新款','精选']" 
         @itemclick = "itemclick" ref="tabControll1" class="tab-controll"
         v-show="isTabFixed"
         ></tab-controll>
      <!-- 滚动组件 -->
      <scroll class="content" ref="scroll" 
         :probe-type="3" 
         @scroll="contentScroll"
         :pull-up-load = "true"
         @pullingUp = "loadMore">
         <!-- 轮播图组件 -->
         <home-swiper :banners = "banners" @swipeImgLoad = "swipeImgLoad"></home-swiper>
         <!-- 推荐组件 -->
         <recommend-view :recommends = "recommends"/>
         <feature-view />
         <tab-controll :title="['流行','新款','精选']" 
         @itemclick = "itemclick" ref="tabControll2" 
         ></tab-controll>
         <!-- 通过绑定goods进行传值商品pop列表 -->
         <goods-list :goods="showGoods"></goods-list>
      </scroll>
      <!-- 回顶组件 -->
      <back-top @click.native="topClick" v-show="isShowBackTop"/>
   </div>
</template>
<script>
// view中home的独立组件
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from "./childComps/RecommendView"
import FeatureView from "./childComps/FeatureView"
// components的公用组件
import NavBar from "../../components/common/navbar/NavBar"
import TabControll from "../../components/content/tabcontroll/TabControll"
import GoodsList from "../../components/content/goodslist/GoogsList"
import Scroll from "../../components/common/scroll/Scroll"
import BackTop from "../../components/content/backtop/backTop"


import {
   getHomeMultidata,
   getHomeGoods} 
   from "../../network/home"
import {debounce} from "../../common/utils"
import {itemListenerMixin} from "../../common/mixin"

export default {
   name:'',
   data(){
      return{
         banners:[],
         recommends:[],
         goods:{
            'pop': {page: 0, list: []},
            'new': {page: 0, list: []},
            'sell': {page: 0, list: []}
         },
         currentType:"pop",
         isShowBackTop:false,
         tabOffsetTop:0,
         isTabFixed:false,
         saveY:0,
         itemImgListener:null
      }
   },
   mixins:[itemListenerMixin],
   components:{
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControll,
      GoodsList,
      Scroll,
      BackTop

   },
   created(){
   // 在methods进行写明，在周期函数进行调用
   //   请求多个数据
     this.getHomeMultidata();
   // 请求商品数据
   //   getHomeGoods("pop",1).then(res => {
   //      console.log(res);
        
   //   })
     this.getHomeGoods('pop')
     this.getHomeGoods('new')
     this.getHomeGoods('sell')
   },
   mounted(){
      // 第一种方法
      // 定义变量通过调用防抖动方法进行动态刷新，减少服务器的压力
      // const refresh = debounce(this.$refs.scroll.refresh)
      // 将监听函数放在mounted里面，是因为在created中可能还没有挂载就进行监听，导致出现未定义的现象
      //   根据事件总线发射过来的事件进行监听,当所有图片加载完后进行再进行刷新(refresh()),解决滚动区域的问题
      // this.itemImgListener = () =>{
      //    refresh ()
      // }
      // this.$bus.$on('itemImgLoad',this.itemImgListener)
      //   console.log("-----");
   // 第二种：混入解决滚动区域问题,离开时销毁
   // console.log("home-mounted");
   },
   computed:{
      showGoods(){
         // 通过计算属性进行获取当前索引而后切换
         return this.goods[this.currentType].list
      }
   },
   // 测试切换底部是否会被销毁,在router-view中进行keep-alive包裹
   destroyed(){
      // console.log('home destroyed');
   },
   // 当切换底部时,定义变量并获取获取当前用户的高度saveY
   activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh()
   },
   // 当用户返回时,仍停留在当前位置
   deactivated(){
      // 根据之前停留的saveY值返回停留的地方
      // this.saveY = this.$refs.scroll.scroll.y
      this.saveY = this.$refs.scroll.getScrollY()
      // console.log(this.saveY);
      
      // 取消全局事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
   },
   methods:{
      /**
       * 事件监听函数
       */
      // 切换tab-controll,通过子组件$emit监听按键点击index，再切换类型
      itemclick(index){
         switch (index) {
            case 0:
               this.currentType = "pop"
               break;
            case 1:
               this.currentType = "new"
               break;
            case 2:
               this.currentType = "sell"
               break;
            default:
               break;
         }
         // 拿到当前控件点击的对象
         this.$refs.tabControll1.currentIndex = index;
         this.$refs.tabControll2.currentIndex = index;
      },
      // 监听回到顶部按钮函数
      topClick(){
         // console.log("回到顶部");
         // 第一种:通过ref获取当前组件并进行scrollTo()方法
         // this.$refs.scroll.scroll.scrollTo(0,0,500)
         // 通过组件的methods方法定义后直接调用
         this.$refs.scroll.scrollTo(0,0)
      },
      // 子组件传值父组件监听
      contentScroll(position){
         // console.log(position);
         // 根据当前滚动条的坐标决定是否可以显示返回顶部,因坐标负值,所以需转正
         this.isShowBackTop = -(position.y) > 1000
         // 判断是否吸顶
         this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
   // 监听上拉加载事件
      loadMore(){
      // console.log("上拉加载更多");
      // 监听图片何时加载完成
      this.getHomeGoods(this.currentType)
      // 因为better-scroll中对高度的计算远超过图片的加载的速度,并且只计算一次,导致有些时候无法下拉,所以手动当图片加载完再进行刷新 refresh()
      // this.$refs.scroll.scroll.refresh()
       },
      //  tab-controll吸顶效果监听图片加载是否完成,通过子组件发射事件而后保存得到的offsetTop
      swipeImgLoad(){
         // console.log(this.$refs.tabControll.$el.offsetTop);
         this.tabOffsetTop = this.$refs.tabControll2.$el.offsetTop;
         // 注意：此处输出taboffsetTop需加this,否则未定义报错
         // console.log(this.tabOffsetTop);
         
      },
      /**
       * 网络请求封装
       */
      getHomeMultidata(){
          getHomeMultidata().then(res => {
         // console.log(res);
         // 获取轮播图数据
         this.banners = res.data.banner.list;
         // 获取推荐数据
         this.recommends = res.data.recommend.list; 
         })
      },
      getHomeGoods(type){
         // 动态获取页数,根据当前数据类型获取页数再加一
         const page = this.goods[type].page + 1;
         getHomeGoods(type,page).then(res => {
            // console.log(res);
            
            // 将另一个数组添加到一个数组中
            this.goods[type].list.push(...res.data.list);
            this.goods[type].page +=1
            
            // 将上拉更新的商品添加到进去每一个类型中
            this.$refs.scroll.finishPullUp()
         }) 
      }
   },
}
</script>
<style scoped>
/* 设置定位一般脱离标准流,尽量少用 */
   #home{
      /* 导航上内边距44px */
      /* padding-top: 44px; */
      /* 设置视口高度100% */
      height: 100vh;
      position: relative;
   }
   .home-nav{
       background: var(--color-tint);
       /* 原生滚动时导航会随着滚动，采用better-scroll时不会随着滚动，也不用设置 */
       /* position: fixed;
       left: 0;
       right: 0;
       top: 0; */
       z-index: 9;

       color: #fff;
   }
   /* 第一种吸顶方法 */
   /* .tab-controll{ */
      /* 默认是sticky属性，当达到top值时，则变为fix属性 */
      /* position: sticky;
      top: 44px;
      z-index: 9;
   } */
   /* 第一种滚动 */
   /* 利用绝对定位获取当前可滚动高度 */
   .content{
      overflow: hidden;
      
      position: absolute;
      /* 上空出44px,下空出49px,左右各0 */
      top: 44px;
      bottom: 49px;
      left: 0;
      right: 0;
   }
   /* 第二种滚动:关闭下内边距 */
   /* .content{
      overflow: hidden;
      height: calc(100% - 93px);
   } */
   /* 设置tab-controll吸顶的样式 */
   .tab-controll {
      position: relative;
      z-index: 9;
   }
</style>
