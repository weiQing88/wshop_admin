import api from '@/util/api';
// 全局服务
export default {
      menu( p = {} ){
           return api.get('api/admin/menu', { params : p })
      }
}