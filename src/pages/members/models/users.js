import memberServices from '../services'

export default {
    namespace : 'users',
    state : {
        visible : false,
        visible2 : false,
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

    },
    effects : {
        *test(){
            
        }
    },
    subscriptions : {}

}