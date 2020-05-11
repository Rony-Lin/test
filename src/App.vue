<template>
  <div id="app">
    <!-- 外层组件封装TabBar组件，组件名驼峰，标签名采用-链接，管理TarBar及其样式，内嵌插槽 -->
    <keep-alive exclude="detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "./components/content/MainTabBar/MainTabBar"

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
   @import "assets/css/base.css"
</style>
