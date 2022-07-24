// 商品
export type GoodItem = {
  desc: string
  discount?: any
  orderNum: number
  id: string
  name: string
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

// 人气推荐商品
interface HotGoodItem {
  id: string;
  picture: string;
  title: string;
  alt: string;
}

// 热门品牌
export type Brand = {
  id: string
  name: string
  nameEn: string
  logo: string
  picture: string
  type?: any
  desc: string
  place: string
}

// 首页商品推荐
export type HomeProduct = {
  id: string
  name: string
  picture: string
  saleInfo: string
  children: {
    id: string
    name: string
  }[]
  goods: {
    id: string
    name: string
    desc: string
    price: string
    picture: string
    discount?: any
    orderNum: number
  }[]
}

// 最新专题
export type Special = {
  creator: string
  isDelete: number
  createTime: string
  updateTime: string
  id: string
  classificationId: string
  title: string
  summary: string
  lowestPrice: number
  cover: string
  detailsUrl: string
  collectNum: number
  viewNum: number
  replyNum: number
}

// 一级分类
export type TopCategory = {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
}

// 二级分类
export type SaleProperty = {
  id: string
  name: string
  properties: {
    id: string
    name: string
  }[]
}


export type SubCategory = {
  id: string
  name: string
  picture?: any
  parentId: string
  parentName: string
  brands: {
    id: string
    name: string
    nameEn: string
    logo: string
    picture: string
    type?: any
    desc: string
    place: string
  }[]
  saleProperties: SaleProperty[]
  goods: GoodsItem[]
}