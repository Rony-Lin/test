import {debounce} from "../common/utils"
// 使用混入可以解决两个对象之间的代码复用，如computed/methods等
export const itemListenerMixin={
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh);
    this.itemImgListener = () =>{
      refresh ();
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener);
    // console.log("我是混入内容");
    // console.log(this.itemImgListener);
    
  }
}