// 商品
export type GoodItem = {
  desc: string
  discount: null
  id: string
  name: string
  orderNum: null
  picture: string
  price: string
}

// 每一项
export type CategoryItem = {
  show: boolean
  id: string
  name: string
  picture: string
  children: CategoryItem[]
  goods?: GoodItem[]
}
// 响应的结果
export interface ApiRes<T> {
  code: string
  msg: string
  result: T
}



// 轮播图数据
export interface BannerItem {
  id: string;
  imgUrl: string;
  hrefUrl: string;
  type: string;
}