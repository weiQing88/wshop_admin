import services from '../services/index'
import { message } from 'antd';

export default {
    namespace : 'category',
    state : {
        visible : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        offset : 1,
        attrTotal : 0,
        attrArray  : [], // selector data
        attrLoading : false,
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

        setDataSource( state, { payload }  ){
            state.dataSource = payload.dataSource;
            state.total = payload.total;
            return state
        },
        toggle( state, { payload } ){
              state.visible = payload.visible;
              state.isEdited = payload.isEdited;
              state.formDataSource = payload.data || {};
              return state;
         },
         
    },
    effects : {
        *fetCategory( action, { put, call  } ){
            let res = yield call( services.fetCategory, action.payload );
              // console.log( 'res fetCategory-------------', res )
               if( res.data.status_code == 200 ){
                       let { data } = res.data;
                        yield put({ 
                                type : 'setState',
                                payload : [
                                     {
                                        key : 'dataSource',
                                        value :data,
                                     },
                                     {
                                         key : 'total',
                                         value : data.length,
                                     }
                                ]
                    })
               }else{
                    message.error( res.data.message )
               }
        },

        *moreAttrs( action, { put,select, call }){
                let attrTotal = yield select( state => state.category.attrTotal );
                 let {  page  } = action.payload;
                 if( page <= 0 || page > attrTotal ){
                        message.error('无更多' )
                 }else{
                      yield put({
                            type : 'attrs',
                            payload : action.payload
                      });
                 } 
               
        },

        *attrs( action, { put, select, call }){
             let res = yield call( services.attrs, action.payload );
               if( res.data.status_code == 200 ){
                    let payload = [ { key : 'attrArray', value : res.data.data }, { key : 'attrTotal', value : res.data.total }];
                   if( action.payload && action.payload.page ) payload.push({ key :'offset', value : action.payload.page  });
                     yield put({ type : 'setState', payload })
               }else{
                   message.error( res.data.message ) 
               }
        },

        *editCategory( action, { put, call, select }){
               let isEdited = yield select( state => state.category.isEdited ), res;
                 if( isEdited ){
                    res = yield call( services.editCategory, action.payload );
                 }else{
                    res = yield call( services.createCategory, action.payload );
                 }
               if( res.data.status_code == 200 ){
                      message.success( isEdited ? '编辑成功' : '创建成功');
                      yield put({
                         type : 'setState',
                            payload : [
                                {
                                    key : 'visible',
                                    value : false,
                                },
                                {
                                   key : 'isEdited',
                                   value :false 
                                },
                               {
                                   key : 'formDataSource', 
                                   value : {},
                               }
                            ]
                         });
                     yield put({ type : 'fetCategory' });
                         
               }else{
                    message.error( res.data.message )
               }
             console.log( 'res', res )
        },

        *delete( action, { put, call, select } ){
            let res = yield call( services.deleteCategory, action.payload );
                if( res.data.status_code == 200 ){
                     message.success('删除成功');
                    yield put({ type : 'fetCategory' });
                }else{
                    message.error( res.data.message )
                }
        }

    },


    subscriptions : {
        setup({ dispatch, history }) {}
    }

}