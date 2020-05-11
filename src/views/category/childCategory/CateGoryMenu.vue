<template>
    <div class="categroymenu">
        <scroll  class="content">
            <ul>
                <li v-for="(item,index) in menu" 
                :key="index" 
                :class="{active:index===currentIndex}"
                @click="menuClick(item.maitKey,index)"
                >{{item.title}}</li>
            </ul>
        </scroll>
    </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll';
export default {
    name:'CateGroyMenu',
    data(){
        return{
            currentIndex:0
        }
    },
    props:{
        menu:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Scroll
    },
    methods:{
        menuClick(maitKey,index){
            this.$emit('menuClick',maitKey)
            this.currentIndex=index
        }
    }
}
</script>

<style scoped>
li{
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color:#f6f6f6;
}
.content{
    height: calc( 100vh - 49px - 44px );
    overflow: hidden;   
}
.active{
    background-color: pink;
    color: white;
}
</style>>

