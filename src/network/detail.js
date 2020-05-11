import {request} from "./request"

// 封装商品详情接口
export function getDetail(iid){
  return request({
    url:"/detail",
    params:{
      iid
    }
  })
}

// 封装推荐商品接口
export function getRecommend() {
  return request ({
    url:'/recommend'
  })
}

// 将杂乱无章的商品封装成一个对象，便于调用
export class Goods{
  constructor(itemInfo,columns,services) {
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.discount = itemInfo.discountDesc;
    this.realPrice = itemInfo.lowNowPrice;
    this.columns = columns;
    this.services = services
  }
}

// 封装店铺数据
export class Shop{
  constructor(shopInfo){
    this.name = shopInfo.name;
    this.logo = shopInfo.shopLogo;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods
  }
}

// 构造商品参数函数
export class GoodsParam{
  constructor(info,rule){
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}

