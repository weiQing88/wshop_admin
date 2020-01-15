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
            bulkEditVisible : false,
            isEdited : false,
            bulkEditType : '',
            page : 0,
            limit : 10,
            total : 0,
            tabsItem : [
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

          
       },
       
        effects : {
            *fetGoodsData( action, { put, call, select }  ){
                let queryObject = util.deepCopy( action.payload );
                   Object.keys( queryObject ).forEach( key => {  if( !util.isValid( queryObject[key] ) ) delete queryObject[key] });
                 let res = yield call( services.fetGoods,  queryObject);
                  if( res.data.status_code == 200 ){
                    let query = util.getQuery(); 
                    let tabsItem = yield select( state => state.goods.tabsItem );
                        tabsItem.forEach( item => { item.count = res.data[ item.type ] });
                    let payload =  [
                                {  key : 'dataSource', value : res.data.data },
                                {  key : 'total', value : res.data.total },
                                { key : 'tabsItem',  value : tabsItem }
                            ];
                      if( action.payload ){
                          let { page, limit} = action.payload;
                               page && payload.push({ key : 'page', value : page });
                               limit &&  payload.push({ key : 'limit', value : limit });
                                // 重置地址栏
                                Object.keys( action.payload || {} ).forEach( key => {
                                    if(  action.payload[key] ){
                                    query[key] = action.payload[key]; 
                                    }else{
                                    delete query[key]
                                    }
                            });
                            router.push({  pathname : '/goods/', query });
                      }else{  // 重置时，  payload => undefined
                        let limit = yield select( state => state.goods.limit );
                            payload.push({key : 'page', value : 1 });
                            payload.push({key : 'limit', value : limit });
                            router.push({ pathname : '/goods/' }); // 重置地址栏

                      }

                      yield put({ type : 'setState', payload });
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

                 try{

                    if( res.data.status_code == 200 ){
                        message.success( isEdited ? '编辑成功' : '创建成功' );
                       yield put({
                            type : 'setState',
                            payload : [
                                  {  key : 'goodsEditFormVisible', value : false  },
                                  {  key : 'isEdited', value : false },
                                  {  key : 'goodsFormInitialData', value : {} }
                            ]
                       });
                       let query = util.getQuery();
                           util.isValid( query ) ? '' : query = undefined;
                       yield put({ type : 'fetGoodsData', payload : query  })
                   }else{
                        message.error( res.data.message )
                   }

                 }catch( er ){
                    console.log('___er', er );
                 }

               
            },


            *editStatus( action, { put, call,select } ){
                 let res = yield call( services.editGoodsStatus, action.payload );
                 if( res.data.status_code == 200 ){
                       message.success('编辑成功' );
                       let query = util.getQuery();
                           util.isValid( query ) ? '' : query = undefined;
                       yield put({ type : 'fetGoodsData', payload : query  })
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

                        let query = util.getQuery();
                            util.isValid( query ) ? '' : query = undefined;
                           yield put({ type : 'fetGoodsData', payload : query  })
                    }else{
                        message.error( res.data.message )
                    }   
            },

            *deleteGoods( action, { put, call, select }){
                let res = yield call( services.deleteGoods, action.payload );
                if( res.data.status_code == 200 ){
                    message.success( res.data.message );
                    let query = util.getQuery();
                    util.isValid( query ) ? '' : query = undefined;
                    yield put({ type : 'fetGoodsData', payload : query  })
               }else{
                   message.error( res.data.message )
               }   

            },

             *bulkedit( action, { put, call, select }){
                    let res = yield call( services.bulkEditGoods, action.payload );
                    if( res.data.status_code == 200 ){
                        message.success( res.data.message );
                         yield put({
                                type : 'setState',
                                payload : [
                                {
                                    key : 'bulkEditVisible',
                                    value : false
                                },{
                                    key : 'bulkEditType',
                                    value : '',
                                },
                                {
                                    key : 'selectedRowKeys', 
                                    value : [],
                                }
                             ]
                        });
                        let query = util.getQuery();
                            util.isValid( query ) ? '' : query = undefined;
                            yield put({ type : 'fetGoodsData', payload : query  })
                        }else{
                            message.error( res.data.message )
                        }   
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
    