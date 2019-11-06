import services from '../services'

export default {
    namespace : 'wx',
    state : {
         data : {}
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