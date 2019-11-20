import api from '@/util/api';
export default {
      login( p = {} ){
        return api.post('api/admin/login', p )
     },
     logout( p = {} ){
        return api.post('api/admin/logout', p )
     },
     register( p = {} ){
           return api.post('api/admin/register', p );
     },

     captcha( p ){
         return api.get('api/admin/captcha', { params : p })
     },
     mcaptcha( p ){
         return api.get('api/admin/mcaptcha',{ params : p })
     },
    
}