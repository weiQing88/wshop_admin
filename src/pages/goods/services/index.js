import api from '@/util/api';

export default {
       fetGoods( p = {} ){
            return api.get('api/admin/goods',{ params : p })
       },

      searchGoods( p ){
            return api.post('api/admin/goods/',p)
      },

       createGoods( p = {} ){
          return api.post('api/admin/goods/create', p )
       },

      editGoods( p = {} ){
         return api.patch('api/admin/goods/edit', p )
      },

       fetCategory(  p = {}  ){
            return api.get('api/admin/goods/category', { params : p })
      },
      createCategory( p = {} ){
          return api.post('api/admin/goods/category/create', p )
      },
      editCategory( p = {} ){
        return api.patch('api/admin/goods/category/edit', p )
      },
      deleteCategory( p = {} ){
        return api.delete('api/admin/goods/category/delete', { params : p })
      },
      attrs( p = {} ){
         return api.get('api/admin/goods/attrs', { params : p })
      },
      createAttr( p = {} ){
        return api.post('api/admin/goods/attrs/create', p )
      },
      editAttr( p = {} ){
          return api.patch('api/admin/goods/attrs/edit', p )
      },
      deleteAttr(  p = {}  ){
          return api.delete('api/admin/goods/attrs/delete', { params : p })
      },
      filterAttr(  p = {}  ){
            return api.get('api/admin/goods/attrs/filter', { params : p })
       }
}