import useCateStore from './modules/category'
const useStore = () => {
  return {
    category: useCateStore()
  }
}
export default useStore