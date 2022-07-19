// 每一项
export type CategoryItem = {
  id: string
  name: string
  picture: string
  children: CategoryItem[]
  goods?: {}[]
}
// 响应的结果
export interface ApiRes {
  code: string
  msg: string
  result: CategoryItem[]
}
