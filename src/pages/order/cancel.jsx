import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge, Table, Divider, Modal, Descriptions   } from 'antd';

import Toolbar from './components/toolbar_canc';
import AppLayout from '@/components/app_layout';


const data = [
    {
        id : 12343,
        deliver_sn: 412341234,
        order_sn: 23212312,
        user: 'zzzzsd',
        status: 1,
        express: 'sssss',
        express_sn: 3432423423,
        add_time: '2019-01-01:14:51:10',
        update_time: '2019-01-01:14:51:10',
    }
];




const Cancel =  ({ dispatch, limit,  visible , loading,  total, page }) => {

    let onTableChange = () => {}
    let onTableShowSizeChange = () => {}

    let handleTableCellEvent = ( arg ) => {
          switch( arg.type ){
               case 'view' : dispatch({ type : 'deliver/setState', payload : { key : 'visible', value : true } }) ;
               break;
          }
    }

    let handleOk = () => {
        dispatch({ type : 'deliver/setState', payload : { key : 'visible', value : false } }) ;
    }
    let handleCancel = () => {
        dispatch({ type : 'deliver/setState', payload : { key : 'visible', value : false } }) ;
    }

    
    return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
             <Toolbar />
             <Table  
                 bordered 
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
                        title: '退货单号',
                        dataIndex: 'deliver_sn',
                        key: 'deliver_sn',
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
                        dataIndex: 'user',
                        key: 'user',
                        align : 'center',
                      },

                      {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align : 'center',
                      },

                      {
                        title: '物流公司',
                        dataIndex: 'express',
                        key: 'express',
                        align : 'center',
                      },

                      {
                        title: '物流单号',
                        dataIndex: 'express_sn',
                        key: 'express_sn',
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
                        dataIndex: 'update_time',
                        key: 'update_time',
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
                 dataSource={ data }
                 rowKey="id"
             />



            <Modal
                title='查看发货单' 
                visible={ visible }
                width={ 900 }
                onOk={ handleOk }
                onCancel={ handleCancel }
                cancelText={'取消'}
                okText={'确定'}
            >
             <Descriptions bordered title="">
                 <Descriptions.Item label="退货单号"> 85730039696254 </Descriptions.Item>
                 <Descriptions.Item label="订单号"> 15729464955102 </Descriptions.Item>
                 <Descriptions.Item label="用户"> 某某用户 </Descriptions.Item>
                 <Descriptions.Item label="状态"> 待退货 </Descriptions.Item>
                 <Descriptions.Item label="物流公司"> 德邦快递 </Descriptions.Item>
                 <Descriptions.Item label="物流单号"> 234234234 </Descriptions.Item>
                 <Descriptions.Item label="退货商品" span={3} >  
                    <Table bordered pagination={ false } size="small" className="order-info-table"  columns={[ 
                        {
                            title: '货品名称',
                            dataIndex: 'goods_name',
                            key: 'goods_name',
                            align : 'center',
                        },
                        {
                            title: '发货数量',
                            dataIndex: 'total',
                            key: 'total',
                            align : 'center',
                        }
                     ]}  dataSource={[ { goods_name : '某某香料', total : 234 } ]} />
                  </Descriptions.Item>

              </Descriptions>
            </Modal>


        </AppLayout>
    )
}





function mapStateToProps(state) {
    const { visible, limit, total, page } = state.deliver;
    return {
         visible,
          page,
          limit,
          total,
          loading: state.loading.models.deliver,
    };
  
  }
  
  export default connect(mapStateToProps)( Cancel );