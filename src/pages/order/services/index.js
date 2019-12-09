import api from '@/util/api';

export default  {
      fetOrder( p = {} ){
          return api.get('api/admin/order', { params : p })
      },
      edit( p = {} ){
        return api.post('api/admin/order/edit', p )
      },
      detail(  p = {} ){
           return api.get(`api/admin/order/detail`, { params : p })
      },
      booking( p = {} ){
          return api.post(`api/admin/order/booking`, p )
      },
      orderInfo( p = {} ){
          return api.get(`api/admin/order/orderInfo`, { params : p })
      },


}