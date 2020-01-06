import api from '@/util/api';


export default {
      admin( p = {} ){
             return api.get('api/admin/members/admin', { params : p })
      },
      createAdmin( p = {} ){
            return api.post(`api/admin/members/admin/create`, p )   
      },
      editAdmin( p = {}, id ){
         return api.post(`api/admin/members/admin/${id}/edit`, p )   
      },
      deleteAdmin( id ){
            return api.delete(`api/admin/members/admin/${id}/delete`)
      },
      role( p = {} ){
             return api.get(`api/admin/members/role`, { params : p })
      },
      createRole( p = {} ){
            return api.post(`api/admin/members/role/create`,  p ) 
      }
}