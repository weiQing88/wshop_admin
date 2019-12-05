import api from '@/util/api';

export default  {
      fetOrder( p = {} ){
          return api.get('api/admin/order', { params : p })
      },
      edit( p = {} ){
        return api.post('api/admin/order/edit', p )
      }
}