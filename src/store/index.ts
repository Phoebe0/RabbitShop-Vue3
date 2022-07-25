import useCateStore from './modules/category'
import useHomeStore from './modules/home'
import useGoodsStore from './modules/goods'
const useStore = () => {
  return {
    category: useCateStore(),
    home: useHomeStore(),
    goods: useGoodsStore()
  }
}
export default useStore