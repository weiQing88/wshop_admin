import  loginServices from '@/layouts/login/services'
import util from '@/util';


export default {
    namespace : 'login',
    state : {
         islogged : false,
         captchaSvg : ''
    },
    reducers : {
         setState( state, { payload } ){
              state[ payload.key ] = payload.value;
              return state;
         },
    
    },
    effects : {
        *login( action, { put, call } ){

            let result =  yield call( loginServices.login, action.payload );  
             
          //  let { username, token, avater, authority } = result.data;


               console.log( 'result.data', result.data );


               return;

                //  util.setCookie('wshopLoginToken', token );

                //  util.setCookie('userInfo', JSON.stringify( { username, avater, authority } ));
                //  yield put({ 
                //      type : 'setState', 
                //       payload : { 
                //           key : 'islogged',
                //           value : true
                //       } 
                //     })
         },

        *logout( action, { put, call }){
            let result =  yield call( loginServices.logout, action.payload ); 
              // console.log( 'result---', result )
               if( result.data.status_code == 200 ){
                        util.deleteCookies([ 'wshopLoginToken', 'userInfo' ])
                        yield put({ 
                            type : 'setState', 
                             payload : { 
                                key : 'islogged',
                                value : false
                            } 
                        })
                  window.location.reload()
               }
        },

        *register( action, { put, call }){
              let res = yield call( loginServices.register, action.payload );
                 console.log( res )
    
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