import categoryServices from '../services/index'

export default {
    namespace : 'attrs',
    state : {
        visible : false,
        isEdited : false,
        page : 0,
        limit : 10,
        total : 0,
        dataStatus : 1,
        initDataSatatus : 0, 
    },
    reducers : {
         toggle( state, { payload } ){
              state.visible = payload.visible;
              state.isEdited = payload.isEdited;
              return state;
         },
    },
    effects : {
        *test(){
            
        }
    },
    subscriptions : {}

}