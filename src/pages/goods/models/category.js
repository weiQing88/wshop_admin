import services from '../services/index'

export default {
    namespace : 'category',
    state : {
        visible : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        dataSource : [],
        formDataSource : {}, 
    },
    reducers : {
        setState( state, { payload } ){
            state[ payload.key ] = payload.value;
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
            let resp = yield call( services.fetCategory, action.payload );
                 yield put({ 
                            type : 'setDataSource',
                            payload : {
                            dataSource : resp.data,
                            total : resp.data.length,
                            }
                    });
        }
    },
    subscriptions : {
        setup({ dispatch, history }) {
                history.listen( location  => {
                       if( location.pathname == '/goods/category' ){
                              console.log( '执行' )
                               dispatch({  type: 'fetCategory'})
                       }

                })
        }

    }

}