import  loginServices from '@/layouts/login/services'
import util from '@/util';
import { message, Modal} from 'antd';


export default {
    namespace : 'login',
    state : {
         islogged : false,
         captchaSvg : '',
         registerData : {},
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
                window.location.reload(); 
         },

        *logout( action, { put, call }){
            let res =  yield call( loginServices.logout, action.payload ); 
               if( res.data.status_code == 200 ){
                    util.deleteCookies([ 'wshopLoginToken', 'userInfo' ]);
                    window.location.reload()
               }else{
                    message.error(  res.data.message )
               }
        },

        *register( action, { put, call }){
               let res = yield call( loginServices.register, action.payload );
                 if( res.data.status_code == 200 ){
                         yield put({
                              type : 'setState',
                              payload : {
                                   key : 'registerData',
                                   value : res.data
                              }
                         })
                 }else{
                    message.error( res.data.message )
                 }
               
            
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
       },
 
       *mCaptcha( action, { put, call, select } ){  // 短信验证码
           let res =  yield call( loginServices.mcaptcha, action.payload );
              if( res.data.status_code == 200 ){
                   let { data } = res;
                   if( data.test ){
                        Modal.success({
                           content: `短信服务已停用，验证码为：${ data.data.RemainPoint }`,
                       });
                   }else{
                       message.success('短信验证码已发送')  
                   }
              }else{
                 message.error( res.data.message )
              }
       }


    },
    subscriptions : {}

}