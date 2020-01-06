import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import { ToolbarTabs, TableSrollStatus } from '@/components/widgets';
import Toolbar from './components/toolbar';
import EditOrder from './components/edit_order';
import OrderInfo from './components/order_info';
import Booking from './components/booking';
import util from '@/util';
import { Table, message, Modal, Popconfirm  } from 'antd';


const OrderList = ({ 
         dataSource,
         orderInfo,
         dispatch,
         limit,  
         orderDetailVisible, 
         editOrderVisible, 
         bookingVisible,
         loading,  
         total, 
         history,
         tabsItem,
         selectedRowKeys,
         orderDetail,
         page }) => {


      // Table Scroll Y 
      let y = TableSrollStatus( 217 );
      
      let filterStateCode = ( index, arr ) => {
            let indx = Number( index );
            if( typeof indx != 'number' ) return arr[0];
            return arr[indx]
      }


    let handleToolbarEvent = ( arg ) => {
          if( loading ) return;
           let { type, visible, data } = arg;
            if( type == 'search' ){
              let items = util.deepCopyArray( tabsItem ),
                  query = util.getQuery();
                  items.forEach( itm => { itm.selected = itm.type == 'all' ? true : false  });
                  Object.keys( data ).forEach( key =>{ query[key] = data[key] });
                  query.page = 1;
                  query.limit = limit;
                  query.type = undefined;
                  dispatch({ type : 'orderList/setState',  payload : { key : 'tabsItem', value : items } });
                  dispatch({type : 'orderList/fetOrder', payload : query  });

            }else if( type == 'reset' ){
              let items = util.deepCopyArray( tabsItem );
                 items.forEach( itm => { itm.selected = itm.type == 'all' ? true : false  });
                 dispatch({ type : 'orderList/setState',  payload : { key : 'tabsItem', value : items } });
                 dispatch({type : 'orderList/fetOrder', payload : { page : 1, limit } });
              return true; // 返回true,清空搜索栏
            }else if(  type == 'cancel' ){
                    if( selectedRowKeys.length ){
                          /**
                           *  取消订单，应先与购买方协商，才能做取消操作。
                           */

                    }else{
                      message.warning('请选择订单')
                    }
            }
         console.log('arg---', arg)

    }

    

  let handleTabsEvent = ({ name, type }) => {
      if( loading ) return;
         console.log( 'arg', type )
         let items = util.deepCopyArray( tabsItem ),
             query = util.getQuery();
             items.forEach( itm => { itm.selected = itm.type == type ? true : false  });
          dispatch({ type : 'orderList/setState',  payload : { key : 'tabsItem', value : items } });
          query.type = type == 'all' ? undefined : type;
          query.page = 1;
          query.limit = limit;
          dispatch({type : 'orderList/fetOrder', payload : query  });
   }



     // 分页处理函数
     let onTableChange = (page, pageSize) => {
       if( loading ) return;
      let query = util.getQuery();
         query.page = page;
         query.limit = pageSize;
         dispatch({ type : 'orderList/fetOrder', payload : query })
      };


    // 分页页码处理函数
     let onTableShowSizeChange = (current, size) => {
          if( loading ) return;
            let query = util.getQuery();
                 query.page = current;
                 query.limit = size;
             dispatch({ type : 'orderList/fetOrder', payload : query })
       };


      
    let handleTableCellEvent = ({ type, data }) => {
          if( loading ) return;
          if( type == 'edit' ){
              dispatch({ 
                type : 'orderList/setState',
                payload : [ {  key : 'editOrderVisible', value : true }, { key : 'orderInfo', value : data } ]
               });
          }else if( type == 'view' ){
               dispatch({
                   type : 'orderList/detail',
                   payload : {  order_id : data.order_id, id : data.id }
               })
          }else if( type == 'booking' ){
                if( data.pay_status == '2' ){
                    dispatch({  type : 'orderList/bookingModal', payload : { order_id : data.order_id, id : data.id } })
                }else{
                    message.error('订单未支付，不可预约取件')
                }
              
          }else if( type == "cancel" ){
             let { logistic_code, shipper_code, order_id, id } =  data;
                 dispatch({
                     type : 'orderList/cancel',
                     payload : { 
                        id : data.id, 
                        ShipperCode : shipper_code,
                        OrderCode : order_id,
                        LogisticCode : logistic_code
                       }
                 })
          }else if( type == 'delete' ){}

    }


       // 选择table 项
   let handleSelectChange = selectedRowKeys => {
      dispatch({
          type : 'orderList/setState',
          payload : { key : 'selectedRowKeys', value : selectedRowKeys }
      })
};



    useEffect(() =>{
         // 清空参数
       if( history.location.search ) history.push('/order\/');
        dispatch({ type : 'orderList/fetOrder', payload : undefined });
        console.log(' orderList 仅仅需要执行一次')

     }, []);



     return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
            <Toolbar onClick={ handleToolbarEvent  } />
            <ToolbarTabs 
                 items={ tabsItem  }
                 onClick={ handleTabsEvent }
             />  

            <Table  
                 bordered 
                 expandedRowRender={record => <p>{record.address}</p>}
                 rowSelection={{
                    columnWidth : 50,
                    selectedRowKeys,
                    onChange: handleSelectChange
                   }}
                 style={{  backgroundColor : '#fff' }}
                 scroll={{ y }}
                 pagination={{
                  pageSizeOptions: ['10','20', '30', '50'],
                  current: Number(page), 
                  pageSize: Number(limit),
                  showQuickJumper: true,
                  showSizeChanger: true,
                  total : Number(total) | 0,
                  showTotal: function(total,pageSize){
                      return `共${Number(total)}条`
                  },
                      onChange: onTableChange,
                      onShowSizeChange: onTableShowSizeChange
                  }} 
                 columns={
                     [
                      {
                        title: '订单号',
                        dataIndex: 'order_sn',
                        key: 'order_sn',
                        align : 'center',
                      },
                      {
                        title: '下单时间',
                        dataIndex: 'add_time',
                        key: 'add_time',
                        align : 'center',
                      },

                      {
                        title: '订单状态',
                        dataIndex: 'order_status',
                        key: 'order_status',
                        align : 'center',
                        render : ( text, record ) => (
                             <span style={{ color : 'red' }}> { filterStateCode(text, [ '未确认','确认','已取消','无效','退货'])} </span>
                        )
                      },

                      {
                        title: '用户',
                        dataIndex: 'consignee',
                        key: 'consignee',
                        align : 'center',
                      },

                      {
                        title: '收货人手机号',
                        dataIndex: 'mobile',
                        key: 'mobile',
                        align : 'center',
                      },

                      {
                        title: '收货地址',
                        dataIndex: 'address',
                        key: 'address',
                        align : 'center',
                        render : ( text ) => (
                            <span style={{ display: 'block', textAlign : 'center', maxWidth : '100px', margin : '0 auto' }} className="ell">{ text }</span>
                        )
                      },

                      {
                        title: '支付状态',
                        dataIndex: 'pay_status',
                        key: 'pay_status',
                        align : 'center',
                        render : ( text, record ) => (
                            <span style={{ color : 'red'}}>  { filterStateCode(text, [ '未付款', '付款中', '已付款'])}  </span>
                       )
                      
                      },


                      {
                        title: '发货状态',
                        dataIndex: 'shipping_status',
                        key: 'shipping_status',
                        align : 'center',
                        render : ( text, record ) => (
                            <span style={{ color :  record.shipping_status == '1' ? '#2f54eb' : 'red' }}> 
                             { filterStateCode(text, [ '未发货','已发货','已收货','退货'])}
                             </span>
                       )
                      },

                      {
                        title: '订单总额',
                        dataIndex: 'order_price',
                        key: 'order_price',
                        align : 'center',
                      },
                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        width : 230,
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'view', data: record }) } type="button"> 查看 </button>
                                <Popconfirm title="已与购买方协商取消订单？" onConfirm={ handleTableCellEvent.bind(this, { type : 'delete', data: record }) } okText="是" cancelText="否" >
                                  <button type="button"> 取消 </button>
                               </Popconfirm>
                               {
                                 record.shipping_status == '0' ? 
                                  ( <button onClick={ handleTableCellEvent.bind(this, { type : 'booking', data: record }) }  type="button"> 预约 </button>) 
                                  : null
                               }
                                 {
                                 record.shipping_status == '1' ? 
                                  ( <button onClick={ handleTableCellEvent.bind(this, { type : 'cancel', data: record }) }  type="button"> 解约 </button>) 
                                  : null
                               }
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'edit', data: record }) }  type="button"> 编辑 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />

             <Booking
                    visible={ bookingVisible }
                    dispatch={ dispatch }
                    loading={ loading }
                    data={ orderInfo }
               />

             <EditOrder
                 data={ orderInfo }
                 visible={ editOrderVisible }
                 dispatch={ dispatch }
                 loading={ loading }
              />

            <OrderInfo
                data={ orderDetail }
                visible={ orderDetailVisible }
                dispatch={ dispatch }
                loading={ loading }
             />

        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  editOrderVisible,selectedRowKeys, 
        orderDetailVisible, limit, total, page, 
        dataSource,orderDetail, 
        orderInfo,tabsItem, bookingVisible  } = state.orderList;
    return {
          editOrderVisible,
          orderDetailVisible,
          bookingVisible,
          selectedRowKeys,
          dataSource,
          orderInfo,
          tabsItem,
          orderDetail,
          page,
          limit,
          total,
          loading: state.loading.models.orderList,
    };
  
  }
  
  export default connect(mapStateToProps)(OrderList);