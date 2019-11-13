import api from '@/util/api';
export default {
      loginService( param = {} ){
        return api.post('api/login', param )
     },
     logoutService( param = {} ){
        return api.post('api/logout', param )
     },
     captcha( p ){
         return api.get('api/captcha',{ params : p })
     }
}