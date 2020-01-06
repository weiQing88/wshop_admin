import services from '../services'
import { message } from 'antd';
import util  from '@/util';

export default {
    namespace : 'wx',
    state : {
         data : {}
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
          }
    },
    effects : {
        *fetData( action, { put, call, select }){
               let res = yield call( services.fetData );
               if( res.data.status_code == 200 ){
                    yield put({  type : 'setState', payload : { key : 'data', value : res.data.data }  })
               }else{
                    message.error( res.data.message )
               }
        },
        *edit(action,{ put, call, select }){
           let res = yield call( services.edit, action.payload );
            if( res.data.status_code == 200 ){
                 message.success( '编辑成功' )
            }else{
                  message.error( res.data.message )
            }
        }
    },
    subscriptions : {}

}