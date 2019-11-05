import { connect } from 'dva';
import React, { useState, useEffect } from 'react';

import AppLayout from '@/components/app_layout';

import Toolbar from './components/toolbar';
import ToolbarTabs from './components/tabs';
import EditOrder from './components/edit_order';
import OrderInfo from './components/order_info';


import { Tabs, Card, Icon, Badge, Table, Divider  } from 'antd';

const data = [
     {
        id : 123,
        order_sn : 12343 ,
        add_time : '2019-11-05 13:41:20' ,
        order_status : 0,
        consignee : '老张',
        mobile : 13641439075,
        address : '某某城中村',
        pay_status : 1,
        shipping_status : 1,
        order_price : 123,
     }
];

const OrderList = ({ dispatch, limit,  orderInfoVisible, editOrderVisible, loading,  total, page }) => {

     let [ tHeight, setTHeight ] = useState( '100%' );

     let onResize = () => {
            setTimeout(() => {
                let toolbarHeight = 51, // Toolbar 高度
                tabgsHeight = 45; //  ToolbarTabs 高度
                if( window.appLayoutHeigght ){
                    let _tHeight = window.appLayoutHeigght - ( toolbarHeight + tabgsHeight );
                    setTHeight( _tHeight );
                }
            },50)       
     }


    let handleToolbarEvent = () => {}

    let onTableChange = () => {}

    let  onTableShowSizeChange = () => {}


    let handleTableCellEvent = ( arg ) => {
           switch( arg.type ){
               case 'edit' :  dispatch({ type : 'orderlist/toggle', payload : {  key : 'editOrderVisible', visible : true  } });
               break;
               case 'view' : dispatch({ type : 'orderlist/toggle', payload : {  key : 'orderInfoVisible', visible : true  } });
               break;
            //    case 'edit' : 1;
            //    break;
           }
    }


    useEffect(() =>{

    //     onResize();
    //     window.addEventListener('resize', onResize );
    //    return function(){
    //          window.removeEventListener('resize', onResize )
    //    }

     }, [ tHeight ]);


   

     return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
            <Toolbar onClick={ handleToolbarEvent  } />
            <ToolbarTabs onClick={ handleToolbarEvent } />  

            <Table  
                 bordered 
                 rowSelection={{
                    columnWidth : 50,
                    selectedRowKeys : [],
                    onChange: (selectedRowKeys, selectedRows) => {
                           console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    }
                   }}
                 style={{  backgroundColor : '#fff' }}
                 scroll={{ 
                     //  x : '100%',
                     // y :  tHeight,
                     // scrollToFirstRowOnChange : true,
                    }}
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
                        dataIndex: 'order_status ',
                        key: 'order_status ',
                        align : 'center',
                        render : ( text, record ) => (
                             <span style={{ color : 'red' }}>  0未确认 </span>
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
                            <span style={{ color : 'red' }}>   0未付款 </span>
                       )
                      
                      },


                      {
                        title: '发货状态',
                        dataIndex: 'shipping_status',
                        key: 'shipping_status',
                        align : 'center',
                        render : ( text, record ) => (
                            <span style={{ color : 'red' }}>  0未发货 </span>
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
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'cancel', data: record }) }  type="button"> 取消 </button>
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'edit', data: record }) }  type="button"> 编辑 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />

             <EditOrder
                 data={ {} }
                 visible={ editOrderVisible }
                 dispatch={ dispatch }
              />

            <OrderInfo
                data={ {} }
                visible={ orderInfoVisible }
                dispatch={ dispatch }
             />

        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  editOrderVisible, orderInfoVisible, limit, total, page } = state.orderlist;
    return {
          editOrderVisible,
          orderInfoVisible,
          page,
          limit,
          total,
          loading: state.loading.models.orderlist,
    };
  
  }
  
  export default connect(mapStateToProps)(OrderList);