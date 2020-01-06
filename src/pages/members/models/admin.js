import memberServices from '../services'
import { message } from 'antd';
import util from '@/util';
import router from 'umi/router';

export default {
    namespace : 'admin',
    state : {
        visible : false,
        visible2 : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        dataSource : [],
        initDataSource : {}, 
        roles : []
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
        *fetAdmin(action, { put, call, select}){
            let queryObject = util.deepCopy( action.payload );
            Object.keys( queryObject ).forEach( key => {  if( !util.isValid( queryObject[key] ) ) delete queryObject[key] });
            let res = yield call( memberServices.admin, queryObject );
            if( res.data.status_code == 200 ){
                let payload =  [
                    {  key : 'dataSource', value : res.data.data },
                    {  key : 'total', value : res.data.total }
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
                        router.push({  pathname : '/members/admin', query });  
                }else{
                        let limit = yield select( state => state.orderList.limit );
                        payload.push({key : 'page', value : 1 });
                        payload.push({key : 'limit', value : limit });
                        router.push({ pathname : '/members/admin' });  // 重置地址栏 
                }    

                yield put({ type : 'setState', payload });
            }else{
                 message.error( res.data.message )
            }
        },
        *editAdmin(action, { put, call ,select }){
            let initDataSource = yield select( state => state.admin.initDataSource ),
               res;
            if( initDataSource.id ){
                res = yield call( memberServices.editAdmin, action.payload, initDataSource.id );
            }else{
                res = yield call( memberServices.createAdmin, action.payload );
            }
            if( res.data.status_code == 200 ){
                  message.success( res.data.message  )
                   yield put({
                        type : 'setState',
                        payload : [
                            { key : 'visible', value : false },   
                            { key : 'isEdited', value : false },
                            { key : 'initDataSource', value : {} },
                        ]
                   });
                   let query = util.getQuery(); 
                 yield put({ type : 'fetAdmin', payload : query });
            }else{
                 message.error( res.data.message )
            }
        },
        *deleteAdmin(action, { put, call ,select }){
            let res = yield call( memberServices.deleteAdmin, action.payload );
            if( res.data.status_code == 200 ){
                message.success( res.data.message )
                let query = util.getQuery(); 
                yield put({ type : 'fetAdmin', payload : query });
            }else{
                message.error( res.data.message )
            }
        },

        *fetRoles(action, { put, call ,select }){
                 let res = yield call( memberServices.role );
                 if( res.data.status_code == 200 ){
                     yield  put({  type : 'setState',  payload :  { key : 'roles', value : res.data.data } })
                 }else{
                     message.error( res.data.message )
                 }
        }

        
    },
    subscriptions : {}

}