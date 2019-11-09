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
            let result = yield call( services.fetCategory, action.payload );
            yield put({ 
                  type : 'setDataSource',
                  payload : {
                    dataSource : result.data,
                    total : result.data.length,
                  }
             });
              console.log( 'result', result.data )
        }
    },
    subscriptions : {
        setup({ dispatch, history }) {
                history.listen( location  => {
                     // location.pathname == ''
                        dispatch({  type: 'fetCategory'  })
                        console.log('是否每次都执行')
                })
        }

    }

}