import api from '@/util/api';

export default  {
      test( p = {} ){
          return api.get('api/admin/order', { params : p })
      }
}