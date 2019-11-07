import services from '../services'

export default {
    namespace : 'logs',
    state : {
        page : 1,
        limit : 10,
        total : 0,
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




