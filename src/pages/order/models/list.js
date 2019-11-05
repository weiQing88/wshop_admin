import orderServices from '../services'

export default {
    namespace : 'orderlist',
    state : {
        editOrderVisible : false,
        orderInfoVisible : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        dataStatus : 1,
        initDataSatatus : 0, 
    },
    reducers : {
         toggle( state, { payload } ){
              state[ payload.key ] = payload.visible;
              return state;
         },

    },
    effects : {
        *test(){
            
        }
    },
    subscriptions : {}

}