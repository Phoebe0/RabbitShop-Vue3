// 城市列表类型
export type AreaList = {
  code: string
  level: number
  name: string
  areaList: AreaList[]
}
// 选择的城市结果类型
export type AddressType = {
  // 省份信息
  provinceCode: string
  provinceName: string
  // 市信息
  cityCode: string
  cityName: string
  // 区县信息
  countyCode: string
  countyName: string
}
