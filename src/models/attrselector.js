import  goodsServices from '@/pages/goods/services/index'
import util from '@/util';
import { message } from 'antd';

export default {
    namespace : 'attrselector',
    state : {
         page : 1,
         limit : 10,
         total : 0,
         dataSource : [],
         selectedKeys : [],
         reload : false,
    },
    reducers: {
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
        *fetAttrs(action, { put, call, select}){
            let res = yield call( goodsServices.attrs, action.payload );
            if( res.data.status_code == 200 ){
                let { data } = res.data;
                      
                let  payload = [{ key : 'dataSource', value : data },{ key : 'total', value : res.data.total}];
                let { payload : aPayload = {} } = action;
               if( aPayload.page ) payload.push({ key : 'page', value :  aPayload.page });
                yield put({ type : 'setState', payload });
           }else{
               message.error( res.data.message )
           }
       },
    }
}