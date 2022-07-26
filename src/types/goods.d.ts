// 商品模块的类型声明
export type GoodsInfo = {
  id: string
  name: string
  spuCode: string
  desc: string
  price: string
  oldPrice: string
  discount: number
  inventory: number
  salesCount: number
  commentCount: number
  collectCount: number
  mainVideos: any[]
  videoScale: number
  mainPictures: string[]
  isPreSale: boolean
  isCollect?: any
  recommends?: any
  userAddresses?: any
  evaluationInfo?: any
  categories: {
    id: string
    name: string
  }[]
  specs: Spec[] // 商品的规格集合，数组中有几个对象，表示有几个规格
  skus: SkuType[]
}

export type Spec = {
  name: string // 每一行规格名称
  values: Value[] // 每一行规格有多少选项
}

export type Value = {
  desc: string // 每一个规格描述
  name: string // 每一个规格名字
  picture: string | null  // 每一个规格图片。有图片优先渲染图片，其次考虑文本
  selected: boolean // （自己新增的字段） 商品是否选中
}
// Sku类型注解
export type SkuType = {
  id: string
  inventory: number
  oldPrice: string
  price: string
  skuCode: string
  specs: {
    name: string
    valueName: string
  }[]
}