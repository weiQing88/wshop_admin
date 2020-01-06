import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge, Table, Divider, Modal, Descriptions   } from 'antd';
import util  from '@/util';
import { TableSrollStatus } from '@/components/widgets';
import Toolbar from './components/toolbar_canc';
import AppLayout from '@/components/app_layout';
import shipper from '@/components/shipper';



const Cancel =  ({ dataSource, orderDetail, history, dispatch, limit,  visible , loading,  total, page }) => {
      // Table Scroll Y 
      let y = TableSrollStatus( 190 );

     // 分页处理函数
     let onTableChange = (page, pageSize) => {
      if( loading ) return;
     let query = util.getQuery();
        query.page = page;
        query.limit = pageSize;
        dispatch({ type : 'cancel/cancelledOrder', payload : query })
     };


   // 分页页码处理函数
    let onTableShowSizeChange = (current, size) => {
         if( loading ) return;
           let query = util.getQuery();
                query.page = current;
                query.limit = size;
            dispatch({ type : 'cancel/cancelledOrder', payload : query })
      };



    let handleTableCellEvent = ({ type, data }) => {
          dispatch({ 
               type : 'cancel/shippedItem', 
               payload : { 
                  id : data.id,
                  order_id : data.order_id 
                }
              })
      }


    let handleCancel = () => {
          dispatch({ type : 'cancel/setState', payload : [
            { key : 'visible', value : false },
            { key : 'orderDetail', value : {} },
          ] 
        }) 
    }



    let _shipper = ( shipper_code ) =>{
        let s = '';
        shipper.forEach( sh => {if( sh.key == shipper_code ) s = sh.value });
        return s
    }


    let _address = data => {
      let { province = '', city = '', district = '', address = '' } = data;
      return province + ' ' + city + ' ' +  district + ' ' + address
    }
        
    
    useEffect(() =>{
      // 清空参数
    if( history.location.search ) history.push('/order/cancel\/');
     dispatch({ type : 'cancel/cancelledOrder', payload : { shipping_status : 4 } });
     console.log(' cancel 仅仅需要执行一次')
  }, []);

    
    return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
             <Toolbar />
             <Table  
                 bordered 
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
                        title: '退货单号',
                        dataIndex: 'cancelled_code',
                        key: 'cancelled_code',
                        align : 'center',
                      },

                      {
                        title: '订单号',
                        dataIndex: 'order_id',
                        key: 'order_id',
                        align : 'center',
                      },

                      {
                        title: '用户',
                        dataIndex: 'consignee',
                        key: 'consignee',
                        align : 'center',
                      },

                      {
                        title: '状态',
                        dataIndex: 'order_status',
                        key: 'order_status',
                        align : 'center',
                      },

                      {
                        title: '物流公司',
                        dataIndex: 'shipper_code',
                        key: 'shipper_code',
                        align : 'center',
                      },

                      {
                        title: '物流单号',
                        dataIndex: 'logistic_code',
                        key: 'logistic_code',
                        align : 'center',
                      },

                      {
                        title: '创建时间',
                        dataIndex: 'add_time',
                        key: 'add_time',
                        align : 'center',
                      },

                      {
                        title: '更新时间',
                        dataIndex: 'updatedAt',
                        key: 'updatedAt',
                        align : 'center',
                      },

                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'view', data: record }) } type="button"> 明细 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />



          <Modal
                title='查看发货单' 
                visible={ visible }
                width={ 900 }
                onCancel={ handleCancel }
                footer={null}
            >
             <Descriptions bordered title="">
                 <Descriptions.Item label="发货单号"> { orderDetail.logistic_code } </Descriptions.Item>
                 <Descriptions.Item label="订单号"> { orderDetail.order_id  } </Descriptions.Item>
                 <Descriptions.Item label="用户"> { orderDetail.consignee } </Descriptions.Item>
                 <Descriptions.Item label="收货人"> { orderDetail.consignee } </Descriptions.Item>
                 <Descriptions.Item label="快递公司"> { _shipper( orderDetail.shipper_code )  } </Descriptions.Item>
                 <Descriptions.Item label="快递单号"> { orderDetail.logistic_code } </Descriptions.Item>
                 <Descriptions.Item label="收货电话"> { orderDetail.mobile } </Descriptions.Item>
                 <Descriptions.Item label="创建时间"> { orderDetail.add_time } </Descriptions.Item>
                 <Descriptions.Item label="收货地址"> {  _address(orderDetail)  } </Descriptions.Item>
                <Descriptions.Item label="发货备注" span={3} >{ orderDetail.postscript }</Descriptions.Item>
                 <Descriptions.Item label="明细" span={3} >  
                    <Table bordered pagination={ false } size="small" className="order-info-table"  columns={[ 
                        {
                            title: '货品名称',
                            dataIndex: 'goods_name',
                            key: 'goods_name',
                            align : 'center',
                        },
                        {
                            title: '发货数量',
                            dataIndex: 'goods_number',
                            key: 'goods_number',
                            align : 'center',
                        }
                     ]} rowKey={'goods_id'}  dataSource={ orderDetail.wshop_products  } />
                  </Descriptions.Item>
              </Descriptions>
            </Modal>



        </AppLayout>
    )
}





function mapStateToProps(state) {
    const { visible, limit, total, page, dataSource, orderDetail } = state.cancel;
    return {
         visible,
          page,
          limit,
          total,
          dataSource,
          orderDetail,
          loading: state.loading.models.cancel,
    };
  
  }
  
  export default connect(mapStateToProps)( Cancel );