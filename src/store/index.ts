import useCateStore from './modules/category'
import useHomeStore from './home'
const useStore = () => {
  return {
    category: useCateStore(),
    home: useHomeStore()
  }
}
export default useStore