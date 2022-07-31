import useCateStore from './modules/category'
import useHomeStore from './modules/home'
import useGoodsStore from './modules/goods'
import useUserStore from './modules/user'
const useStore = () => {
  return {
    category: useCateStore(),
    home: useHomeStore(),
    goods: useGoodsStore(),
    user: useUserStore()
  }
}
export default useStore