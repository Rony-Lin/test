<template>
    <div id="category">
        <nav-bar class="nav">
            <div slot="center">
                分类
            </div>
        </nav-bar>
        <div class="content">
            <cate-gory-menu class="menu" :menu="menu" @menuClick="getSubCategory"/>
            <cate-gory-view class="view" :view="view"/>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/common/navbar/NavBar'
import CateGoryMenu from './childCategory/CateGoryMenu'
import CateGoryView from './childCategory/CateGoryView'

import {getCategory,getSubCategory} from '../../network/category'

export default {
    name:"cateGory",
    components:{
        NavBar,
        CateGoryMenu,
        CateGoryView
    },
    data(){
        return {
            menu:[],
            view:[]
        }
    },
    created(){
        this.getCategory()
    },
    methods: {
        getCategory(){
            getCategory().then( res => {
                // console.log(res)
            this.menu=res.data.category.list
            this.getSubCategory(res.data.category.list[0].maitKey)
        } )
        },
        getSubCategory(maitKey){
            getSubCategory(maitKey).then( res => {
                // console.log(res)
                this.view=res.data.list
            } )
        },
        back(){
            this.$router.go(-1)
        }

    },
}
</script>

<style scoped>
.nav{
    height:44px;
    background-color: pink;
}
.content{
    display: flex;
}
.menu{
    width: 25%;
}
.view{
    width: 75%;
}
img{
    margin: 10px;
}
</style>