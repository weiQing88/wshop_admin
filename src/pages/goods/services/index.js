import api from '@/util/api';


export default {
       fetCategory(){
            return api.get('api/goods/category')
      }
}