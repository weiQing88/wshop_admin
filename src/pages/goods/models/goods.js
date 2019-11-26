import services from '../services/index'
import util from '@/util';
import { message } from 'antd';


    export default   {
        namespace : 'goods',
        state : {
            goodsEditFormVisible : false,
            searchFormVisible : false,
            isEdited : false,
            page : 0,
            limit : 10,
            total : 0,
            dataObject : {},
            categoryDataSource : [],
            goodsFormInitialData : {},
        },
        reducers : {
                setState( state, { payload } ){
                    if( Array.isArray( payload ) ){
                    payload.forEach( item => {
                            state[ item.key ] = item.value;
                    })
                    }else{
                    state[ payload.key ] = payload.value;
                    }            
                    return state;
            },
                
            toggle( state, { payload } ){
                 state.goodsEditFormVisible = payload;
                 state.isEdited = payload ? '' : false;
                 return state;
            },

            setDataSource( state, { payload }  ){
                state.dataObject = {
                      data : payload,
                      dataState : {
                            total : payload.length,
                            on_sale :payload.length,
                            off_sale : payload.length,
                            warning : payload.length,
                      }
                };
                state.total = payload.length;

                return state
            },
            searchmodal( state, { payload } ){
               state.searchFormVisible = payload;
               return state;
            },

          
       },
       
        effects : {

            *fetGoodsData( action, { put, call  }  ){
                let res = yield call( services.fetGoods, action.payload );

                //  console.log( 'res', res )

                  if( res.data.status_code == 200 ){



                  }else{
                       message.error( res.data.message );
                  }


                    // yield put({
                    //      type : 'setDataSource', 
                    //      payload : resp.data
                    // })
               // console.log( 'resp.data', resp.data )
            },


            *editGoods( action, { put, select, call }){



            },

            *searchGoodsData( action, { put, call } ){
               let resp = yield call( services.searchGoods, action.payload )
                  console.log( 'resp', resp )
            },

            *showADVSModal( action, effects ){

                //   let categoryDataSource = yield select( state => state.category.dataSource );

                    //  if( !util.isValid( categoryDataSource ) ){   { put, call, select }
                     // 如何调用其他model的方法 ???? 【 除开 window.g_app._store 】
                    //   }

                      console.log( 'effects', effects )
            
    

            } 

            
        },
        subscriptions : {
            init( { dispatch, history }, onError ){ 
                   if( history.location.pathname == '/goods/' ){
                   // dispatch({ type : 'fetGoodsData', payload : undefined })  会出现死循环
                   }
                
            }
        }
    
    }
    