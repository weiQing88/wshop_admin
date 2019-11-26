import services from '../services/index'
import { message } from 'antd';

export default {
    namespace : 'attrs',
    state : {
        visible : false,
        isEdited : false,
        page : 1,
        limit : 10,
        total : 0,
        dataSource : [],
        formDataSource : {}, 
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

         toggle( state, { payload } ){
              state.visible = payload.visible;
              state.isEdited = payload.isEdited;
              state.formDataSource = payload.data || {};
              return state;
         },
    },
    effects : {
        *fetAttrs(action, { put, call, select}){
             let res = yield call( services.attrs, action.payload );
             if( res.data.status_code == 200 ){
                 let { data } = res.data;
                 let  payload = [{ key : 'dataSource', value : data },{ key : 'total', value : res.data.total}];
                 let { payload : aPayload = {} } = action;
                if( aPayload.page ) payload.push({ key : 'page', value :  aPayload.page });
                if( aPayload.limit ) payload.push({ key : 'limit', value :  aPayload.limit });
                 yield put({ type : 'setState', payload });
            }else{
                message.error( res.data.message )
            }
        },

        *editAttr( action, { put, call, select } ){
            let isEdited = yield select( state => state.attrs.isEdited ), res;
              if( isEdited ){
                res = yield call( services.editAttr, action.payload );
              }else{
                res = yield call( services.createAttr, action.payload );
              }
              if( res.data.status_code == 200 ){
                    message.success( isEdited ? '编辑成功' : '创建成功');
                    yield put({
                        type : 'setState',
                        payload : [
                             {
                                 key : 'visible',
                                 value : false ,
                             },
                             {
                              key : 'isEdited',
                              value : false,
                          },
                          {
                            key : 'formDataSource',
                            value : {},
                           }
                        ]
                   })
                    yield put({  type : 'fetAttrs' })
              }else{
                   message.error( res.data.message )
              }
        },
        *delete( action, { put, call, select }  ){
            let res = yield call( services.deleteAttr,action.payload );
              console.log( 'res', res );
              if( res.data.status_code == 200 ){
                   message.success( '删除成功' )
                  yield put({  type : 'fetAttrs' });
              }else{
                  message.error( res.data.message )
              }
          
        }



    },
    subscriptions : {}

}