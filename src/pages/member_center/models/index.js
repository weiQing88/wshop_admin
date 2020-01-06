import Services from '../service'
import { message } from 'antd';
import util  from '@/util';

export default {
    namespace : 'memberCenter',
    state : {},
    reducers : {
        setState( state, { payload } ){
            if( Array.isArray( payload ) ){
            payload.forEach( item => { state[ item.key ] = item.value })
            }else{
            state[ payload.key ] = payload.value;
            }            
            return state;
        }
    },
    effects : {
        *cancelledOrder(action, {put, select,call}){}
   
    },
    subscriptions : {}

}

