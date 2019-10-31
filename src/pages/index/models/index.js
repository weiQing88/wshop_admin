import * as homePageServices from '../services/'

export default {
     namespace : 'homepage',
     state : {
          list : [],
          total : null,
          page : null,
     },
    reducers : { // Action 处理器，处理同步动作，用来算出最新的 State; 【 唯一可以修改 state 的地方 】
        test( state, { payload }){
             return state
        }

    },
    effects : { // Action 处理器，处理异步动作
         *fetch({ payload }, { call, put }){ // 异步请求远程数据；【 由 service完成 】
             // const re = yield call( homePageServices.fetData  )
             // yield pull({ type : 'test',payload : {} })
         }

    },
    subscriptions : {  // 页面初始化的时候，执行。

        // setup( { dispatch, history } ){
        //    return history.listen(({ pathname, query }) =>{
        //         if( pathname == 'index' ){
        //              // 请求数据
        //               dispatch({ type : 'fetch', payload : query })
        //         }
        //    })
        // }

    }

}