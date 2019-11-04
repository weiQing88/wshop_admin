import gooderServices from '../services/index'

export default {
    namespace : 'goods',
    state : {
        goodsEditFormVisible : false,
        searchFormVisible : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
    },
    reducers : {
         toggle( state, { payload } ){
              state.goodsEditFormVisible = payload;
              state.isEdited = payload ? '' : false;
              return state;
         },
         searchmodal( state, { payload } ){
            state.searchFormVisible = payload;
            return state;
         }
    },
    effects : {
        *test(){
            
        }
    },
    subscriptions : {}

}