import memberServices from '../services'

export default {
    namespace : 'admin',
    state : {
        visible : false,
        visible2 : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        dataStatus : 1,
        initDataSatatus : 0, 
    },
    reducers : {
         setState( state, { payload } ){
              state[ payload.key ] = payload.value;
              return state;
         },
         toggle( state, { payload }){
                state[ payload.key ] = payload.visible;
                state.isEdited = payload.isEdited;
             return state
         }


    },
    effects : {
        *test(){
            
        }
    },
    subscriptions : {}

}