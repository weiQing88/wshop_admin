import orderServices from '../services'
import { message } from 'antd';
import util  from '@/util';
import router from 'umi/router';


export default {
    namespace : 'cancel',
    state : {
        visible : false,
        page : 0,
        limit : 10,
        total : 0,
        dataSource : [],
        orderDetail : {}, 
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
        *cancelledOrder(action, {put, select,call}){
            let queryObject = util.deepCopy( action.payload );
            Object.keys( queryObject ).forEach( key => {  if( !util.isValid( queryObject[key] ) ) delete queryObject[key] });
                let res = yield call( orderServices.shipped, queryObject );
                if( res.data.status_code == 200 ){
                    let { count, rows } = res.data.data;
                    let payload =  [
                        { key : 'dataSource', value : rows },
                        { key : 'total', value : count },
                    ];
                    if( action.payload ){ // 如果payload不为 undefined
                        let { page, limit } = action.payload;
                        let query = util.getQuery(); 
                            page && payload.push({ key : 'page', value : page });
                            limit &&  payload.push({ key : 'limit', value : limit });
                            // 重置地址栏
                            Object.keys( action.payload || {} ).forEach( key => {
                                if( action.payload[key] ){
                                    query[key] = action.payload[key]; 
                                }else{
                                    delete query[key]
                                }
                        });
                        router.push({  pathname : '/order/cancel/', query });  
                    }else{
                        let limit = yield select( state => state.deliver.limit );
                            payload.push({key : 'page', value : 1 });
                            payload.push({key : 'limit', value : limit });
                            router.push({ pathname : '/order/cancel/' });  // 重置地址栏 
                    }
                yield put({ type : 'setState', payload })
                }else{
                    message.error( res.data.message )
             }
        },

        *shippedItem(action,{ put, select, call }){
            let res = yield call( orderServices.shippedItem, {}, action.payload.id );
            if( res.data.status_code == 200 ){
                   yield put({
                        type : 'setState',
                        payload : [
                            { key : 'orderDetail', value :  res.data.data },
                            { key : 'visible', value :  true }
                        ]
                   })
            }else{
                message.error( res.data.message )
            }
        }


        

    },
    subscriptions : {}

}

