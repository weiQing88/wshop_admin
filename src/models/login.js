import  loginServices from '@/layouts/login/services'
import util from '@/util';
import { message } from 'antd';


export default {
    namespace : 'login',
    state : {
         islogged : false,
         captchaSvg : '',
         registerData : {}, 
         loginData : {},
    },
    reducers : {
         setState( state, { payload } ){
              if( Array.isArray( payload ) ){
                payload.forEach( item => {
                      state[ item.key ] = item.value;
                })
              }else{
                state[ payload.key ] = payload.value;
              }            
              return state;
         },

    },
    effects : {
        *login( action, { put, call } ){
            let res =  yield call( loginServices.login, action.payload );  
              if( res.data.status_code != 200 ){
                   message.error( res.data.message );
                   return false;
              }
                let { token, userinfo } = res.data;
                util.setCookies([
                     {
                         key : 'wshopLoginToken',
                         val : token,
                     },
                     {
                        key : 'userInfo',
                        val :  JSON.stringify( userinfo ),
                     }
                ]);
                 yield put({ 
                     type : 'setState', 
                      payload : { 
                          key : 'loginData',
                          value :  res.data
                      } 
                    })
         },

        *logout( action, { put, call }){
            let res =  yield call( loginServices.logout, action.payload ); 
               console.log( 'result---', res )
               if( res.data.status_code == 200 ){
                    util.deleteCookies([ 'wshopLoginToken', 'userInfo' ])
                    window.location.reload()
               }else{
                    message.error(  res.data.message )
               }
        },

        *register( action, { put, call }){
               let res = yield call( loginServices.register, action.payload );
                yield put({
                           type : 'setState',
                            payload : {
                                key : 'registerData',
                                value : res.data
                            }
                      })
            
        },


       *captcha( action, { put, call, select } ){
             let res = yield call( loginServices.captcha, { type : 'login' });
                 yield put({
                      type : 'setState',
                        payload : {
                            key : 'captchaSvg',
                            value :  res.data.data
                        }
                    })
              console.log( 'res',  )
       },
 
       *mCaptcha( action, { put, call, select } ){  // 短信验证码
            yield call( loginServices.mcaptcha, action.payload )
       }


    },
    subscriptions : {}

}