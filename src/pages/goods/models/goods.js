import services from '../services/index'
import util from '@/util';
import { message } from 'antd';
import router from 'umi/router';

    export default   {
        namespace : 'goods',
        state : {
            goodsEditFormVisible : false,
            searchFormVisible : false,
            promotionFormVisible : false,
            isEdited : false,
            page : 0,
            limit : 10,
            total : 0,
            tabsItems : [
                { name : '全部商品',  count : 0, selected : true, type : 'all' },
                { name : '上架商品',  count : 0, selected : false, type : 'on_sale'  },
                { name : '下架商品',  count : 0, selected : false, type : 'not_sale'  },
                { name : '库存报警',  count : 0, selected : false, type : 'stock'  },
            ],
            dataSource : [],
            categoryDataSource : [],
            goodsFormInitialData : {},
            promotionInitialData : {},
            selectedRowKeys : []
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
            searchmodal( state, { payload } ){
               state.searchFormVisible = payload;
               return state;
            },

          
       },
       
        effects : {
            *fetGoodsData( action, { put, call, select }  ){
                let tabsItems = yield select( state => state.goods.tabsItems );
                let res = yield call( services.fetGoods, action.payload );
                  if( res.data.status_code == 200 ){
                      let payload =  [
                                {  key : 'dataSource', value : res.data.data },
                                {  key : 'total', value : res.data.total },
                            ];
                   
                      tabsItems.forEach( item => {
                             switch( item.type ){
                                  case 'all' : item.count = res.data.all ;
                                  break;
                                  case 'on_sale' : item.count =  res.data.on_sale;
                                  break;
                                  case 'not_sale' :  item.count =  res.data.not_sale;
                                  break;
                                  case 'stock' :  item.count = res.data.stock;
                                  break;
                             }
                      });
                     
                     if( action.payload && action.payload.page ) payload.push({ key : 'page', value : action.payload.page });
                     if( action.payload && action.payload.limit ) payload.push({ key : 'limit', value : action.payload.limit });
                      yield put({ type : 'setState', payload });

                    // 设置url参数
                    let query = util.getQuery();
                    Object.keys( action.payload || {} ).forEach( key => {
                          if(  action.payload[key] ){
                             query[key] = action.payload[key]; 
                          }else{
                             delete query[key]
                          }
                    });
                     router.push({  pathname : '/goods/', query, });
                      console.log( 'query',query );
                  }else{
                       message.error( res.data.message );
                  }
            },


            *editGoods( action, { put, select, call }){
                 let isEdited = yield select( state => state.goods.isEdited );
                 let res = null;
                 if( isEdited ){
                      res = yield call( services.editGoods, action.payload );
                 }else{
                      res = yield call( services.createGoods, action.payload );
                 }

                 if( res.data.status_code == 200 ){
                      message.success( isEdited ? '编辑成功' : '创建成功' );
                     yield put({
                          type : 'setState',
                          payload : [
                                {  key : 'goodsEditFormVisible', value : false  },
                                {  key : 'isEdited', value : false },
                                {  key : 'goodsFormInitialData', value : {} }
                          ]
                     })
                    yield put({ type : 'fetGoodsData'})
                 }else{
                      message.error( res.data.message )
                 }
            },


            *editStatus( action, { put, call,select } ){
                 let res = yield call( services.editGoodsStatus, action.payload );
                 if( res.data.status_code == 200 ){
                       message.success('编辑成功' );
                    yield put({ type : 'fetGoodsData'})
                 }else{
                    message.error( res.data.message )
                 }   
            },

            *setPromotion(  action, { put, call,select }  ){
                 let res = yield call( services.setGoodsPromotion, action.payload );
                     if( res.data.status_code == 200 ){
                        message.success('编辑成功' );
                        yield put({
                              type : 'setState',
                              payload : [
                                { key : 'promotionFormVisible', value : false },
                                { key : 'promotionInitialData', value : {} },
                            ]
                        })
                        yield put({ type : 'fetGoodsData'})
                    }else{
                        message.error( res.data.message )
                    }   
            },

            *deleteGoods( action, { put, call, select }){
                let res = yield call( services.deleteGoods, action.payload );
                if( res.data.status_code == 200 ){
                    message.success( res.data.message );
                    yield put({ type : 'fetGoodsData'})
               }else{
                   message.error( res.data.message )
               }   

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
            // init({ dispatch, history }) {  页面初始化数据的自动请求
            //     return history.listen(({ pathname, query }) => {
            //       // 进入 '/goods/' 路由，发起一个名叫 'fetGoodsData' 的 effect
            //       if (pathname === '/goods/') {
            //         dispatch({ type: 'fetGoodsData' });
            //       }
            //     });
            //   },
            // setup({ dispatch, history }, onError ){
            //      if( history.location.pathname == '/goods/' ){
            //        // dispatch({ type : 'fetGoodsData', payload : undefined })  会出现死循环
            //        }
            // }
        }
    
    }
    