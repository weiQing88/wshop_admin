import api from '@/util/api';


export default {
       fetCategory(){
            return api.get('api/goods/category')
      },
      createCategory( p = {} ){
          return api.post('api/admin/goods/category/create', p )
      },
      fetGoods(){
            return api.get('api/goods')
      },
      searchGoods( p ){
            return api.post('api/goods/',p)
      },
}