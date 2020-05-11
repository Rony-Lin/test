import Toast from "./Toast"
const obj = {};

obj.install = function (Vue){
  // console.log("安装Toast插件");


  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);
  // console.log(Vue);
  
  //2.根据组件构造器，new 一个实例对象
  const toast  = new toastContrustor();
  //3.将组件对象挂载在某一个元素上
  toast.$mount(document.createElement('div'));
  // 4.$el就是就是div
  document.body.appendChild(toast.$el);
  // console.log(toast.$el);
  
  Vue.prototype.$toast = toast;
  // console.log(this.$toast);
  
}

export default obj;