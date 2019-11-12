import api from '@/util/api';


export default {
       fetCategory(){
            return api.get('api/goods/category')
      },
      fetGoods(){
            return api.get('api/goods')
      },
      searchGoods( p ){
            return api.post('api/goods/',p)
      },
}