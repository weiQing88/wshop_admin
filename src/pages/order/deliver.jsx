import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge, message, Table, Divider, Modal, Descriptions   } from 'antd';
import shipper from '@/components/shipper';
import Toolbar from './components/toolbar_dv';
import AppLayout from '@/components/app_layout';
import util  from '@/util';
import { TableSrollStatus } from '@/components/widgets';

const Deliver =  ({ history, dispatch, limit,  visible , loading,  total, page, dataSource, orderDetail }) => {


      // Table Scroll Y 
      let y = TableSrollStatus( 190 );
   
     // 分页处理函数
     let onTableChange = (page, pageSize) => {
      if( loading ) return;
     let query = util.getQuery();
        query.page = page;
        query.limit = pageSize;
        dispatch({ type : 'deliver/shipped', payload : query })
     };


   // 分页页码处理函数
    let onTableShowSizeChange = (current, size) => {
         if( loading ) return;
           let query = util.getQuery();
                query.page = current;
                query.limit = size;
            dispatch({ type : 'deliver/shipped', payload : query })
      };


    let handleToolbarEvent = ({ type, data }) => {
             let query = util.getQuery();
            if( type == 'search' ){
                     Object.keys( data ).forEach( key =>{ query[key] = data[key] });
                     query.page = 1;
                     query.limit = limit;
                     dispatch({ type : 'deliver/shipped', payload : query });
            }else if( type == 'reset' ){
               Object.keys( query ).forEach( key => {  query[key] = undefined });
                 query.shipping_status = 1;
                  query.page = 1;
                  query.limit = limit;
               dispatch({ type : 'deliver/shipped', payload : query });
              return true; // 返回true,清空搜索栏
            }
    }


    let handleTableCellEvent = ({ type, data }) => {
          dispatch({ type : 'deliver/shippedItem', payload : { id : data.id, order_id : data.order_id } }) ;
    }

    let handleCancel = () => {
            dispatch({ type : 'deliver/setState', payload : [
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
    if( history.location.search ) history.push('/order/deliver\/');
     dispatch({ type : 'deliver/shipped', payload : { shipping_status : 1 } });
     console.log(' deliver 仅仅需要执行一次')

  }, []);


    
    return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
             <Toolbar onClick={ handleToolbarEvent  } />
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
                        title: '物流单号',
                        dataIndex: 'logistic_code',
                        key: 'logistic_code',
                        align : 'center',
                      },

                      {
                        title: '订单号',
                        dataIndex: 'order_sn',
                        key: 'order_sn',
                        align : 'center',
                      },

                      {
                        title: '用户',
                        dataIndex: 'consignee',
                        key: 'consignee',
                        align : 'center',
                      },

                      {
                        title: '快递公司',
                        dataIndex: 'shipper_code',
                        key: 'shipper_code',
                        align : 'center',
                        render : (text, record ) => _shipper( text )
                      },
                      {
                        title: '收货地址',
                        dataIndex: 'address',
                        key: 'address',
                        align : 'center',
                      },

                      {
                        title: '收货电话',
                        dataIndex: 'mobile',
                        key: 'mobile',
                        align : 'center',
                      },

                      {
                        title: '创建时间',
                        dataIndex: 'add_time',
                        key: 'add_time',
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
                 rowKey={'id'}
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
    const { visible, limit, total, page, dataSource, orderDetail } = state.deliver;
    return {
         visible,
          page,
          limit,
          total,
          dataSource, 
          orderDetail,
          loading: state.loading.models.deliver,
    };
  
  }
  
  export default connect(mapStateToProps)(Deliver);