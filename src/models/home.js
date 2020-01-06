import services from '../services/index';
import { message } from 'antd';

export default {
    namespace : 'home',
    state : {
        menu : [],
        statusTmp : Date.parse( new Date() ),
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
       *fetMenu(action,{ put, call, select }){
            let res = yield call(services.menu, action.payload);
            if( res.data.status_code == 200 ){
                 yield put({
                    type : 'setState',
                    payload : {
                         key : 'menu',
                         value : res.data.data
                    }
                 })
            }else{
                message,error( res.data.message )
            }
       }
   },
   subscriptions : {}
}