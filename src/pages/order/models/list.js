import orderServices from '../services'
import { message } from 'antd';
import util from '@/util';
import router from 'umi/router';

export default {
    namespace : 'orderList',
    state : {
        editOrderVisible : false,
        orderInfoVisible : false,
        isEdited : false,
        page : 1,
        limit : 10,
        total : 0,
        dataSource : [],
        orderInfo : {}, 
        orderDetail : {},
        selectedRowKeys : [],
        tabsItem : [
          { name : '全部订单',  count : 0, selected : true, type : 'all' },
          { name : '待支付',  count : 0, selected : false, type : 'payment' },
          { name : '待发货',  count : 0, selected : false, type : 'delivery' },
          { name : '已取消',  count : 0, selected : false, type : 'cancel' },
          { name : '已完成',  count : 0, selected : false, type : 'complete' },
        ],
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
        *fetOrder( action, { put, select, call }){
          let queryObject = util.deepCopy( action.payload );
              Object.keys( queryObject ).forEach( key => {  if( !util.isValid( queryObject[key] ) ) delete queryObject[key] });
             let res = yield call( orderServices.fetOrder, queryObject );
             if( res.data.status_code == 200 ){
                  let { data, total } = res.data; 
                  let tabsItem = yield select( state => state.orderList.tabsItem );
                      tabsItem.forEach( item => { item.count = res.data[ item.type ] });
                  let payload =  [
                                {  key : 'dataSource', value : res.data.data },
                                {  key : 'total', value : res.data.total },
                                { key : 'tabsItem',  value : tabsItem },
                                { selectedRowKeys : [] }
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
                         router.push({  pathname : '/order/', query });  
                    }else{
                         let limit = yield select( state => state.orderList.limit );
                         payload.push({key : 'page', value : 1 });
                         payload.push({key : 'limit', value : limit });
                         router.push({ pathname : '/order/' });  // 重置地址栏 
                  }

               yield put({ type : 'setState', payload });
             }else{
                  message.error( res.data.message )
             }
        },
       *editOrder(action, { put, call, select }){
           let res = yield call( orderServices.edit, action.payload );
           if( res.data.status_code == 200 ){
               message.success( '编辑成功' );
               yield put({ 
                    type : 'setState',
                     payload : [
                          {  key : 'editOrderVisible', value : false  },
                          {  key : 'orderInfo', value : {}  }
                       ]
                    });
           let query = util.getQuery(); 
               yield put({ type : 'fetOrder', payload : query });
           }else{
                message.error( res.data.message )
           }
       }
    },
    subscriptions : {}

}