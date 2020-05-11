<template>
   <div class="categoryview">
       <scroll class="scroll">
        <div class="view">
       <div v-for="item in view" :key="item.id" class="content">
           <a :href="item.link">
               <img :src="item.image" alt="" class="image">
               <span>{{item.title}}</span>
           </a>
       </div>
       </div>
       </scroll>
   </div>
</template>

<script>
import Scroll from '../../../components/common/scroll/Scroll'
export default {
    name:'CateGoryView',
    props:{
        view:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        Scroll
    }
}
</script>

<style scoped>
.scroll{
    height: calc( 100vh - 49px - 44px );
    overflow: hidden; 
}
.view{
    display: flex;
    flex-wrap: wrap;
}
.content{
    width:30%;
    margin: 1%;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
.image{
    width:100px;
    height:100px;
    border-radius:50%;
}
</style>