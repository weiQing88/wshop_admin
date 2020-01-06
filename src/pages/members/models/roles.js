import memberServices from '../services'
import { message } from 'antd';
import util from '@/util';
import router from 'umi/router';



export default {
    namespace : 'roles',
    state : {
        visible : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        dataSource : [],
        initDataSource : {}, 
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
         toggle( state, { payload }){
                state[ payload.key ] = payload.visible;
                state.isEdited = payload.isEdited;
             return state
         }


    },
    effects : {
        *fetRoles(action, { put, call, select }){
              let res = yield call( memberServices.role, action.payload );
              if( res.data.status_code == 200 ){
                    let { page, limit } = action.payload || {};
                    let payload = [
                          { key : 'dataSource', value : res.data.data },
                          { key : 'total', value : res.data.total },
                    ];
                    page && payload.push({ key : 'page', value : page });
                    limit && payload.push({ key : 'limit', value : limit });
                    yield put({ type : 'setState', payload });
              }else{
                  message.error( res.data.message )
              }
        },
        *create(action, { put, call, select }){
            let res = yield call( memberServices.createRole, action.payload );
            let isEdited = yield select( state => state.roles.isEdited );
            if( res.data.status_code == 200 ){
                message.success(  isEdited ? '编辑成功' :'创建成功' )
                yield put({
                     type : 'setState',
                     payload : [
                        {  key : 'visible', value : false  },
                        {  key : 'visible2', value : false  },
                        {  key : 'initDataSource', value : {}  },
                        {  key : 'isEdited', value : false  },
                     ]
                })
                let query = util.getQuery(); 
                yield put({ type : 'fetRoles', payload : query });
            }else{
                message.error( res.data.message )
            }
        }
    },
    subscriptions : {}

}