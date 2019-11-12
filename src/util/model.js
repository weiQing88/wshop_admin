export default {
    reducers : {
        setState( state, { payload } ){
            state[ payload.key ] = payload.value;
            return state;
       },
     
    }
}