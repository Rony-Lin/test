import Vue from "vue"
import VueRouter from "vue-router"

// 路由三部曲：
// Vue.use()使用路由
// const router = new VueRouter({});新建路由对象
// import default router import出去router
// 在入口文件main.js(以main.js为例)export router进去并使用
// 路由懒加载，配置路由文件
const Home = () => import("../views/home/Home")
const Category = () => import("../views/category/cateGory")
const Cart = () => import("../views/cart/Cart")
const Profile = () => import("../views/profile/Profile")
const Detail = () => import("../views/detail/Detail")

Vue.use(VueRouter);

const routes = [
  {
  path:"",
  redirect:"/home"
  },
  {
    path:"/home",
    component:Home
  },
  {
    path:"/category",
    component:Category
  },
  {
    path:"/cart",
    component:Cart
  },
  {
    path:"/profile",
    component:Profile
  },
  {
    path:"/detail/:iid",
    component:Detail
  }
]

const router = new VueRouter({
  routes,
  // 路由设置mode属性，hash有＃号，history无#号
  mode:'history'
});

export default router;