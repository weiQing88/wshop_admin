import orderServices from '../services'

export default {
    namespace : 'service',
    state : {
        visible : false,
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