import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge, Table, Divider, Modal, Descriptions   } from 'antd';

import Toolbar from './components/toolbar_dv';
import AppLayout from '@/components/app_layout';


const data = [
    {
        id : 12343,
        deliver_sn : 13123123,
        order_sn : 12432342,
        user : 'xxxx',
        express : 'dddd',
        express_sn : 35434523,
        address : 'xxxxxwwerweer',
        mobile : 13641439075,
        add_time : '2019-01-01:14:51:10'
    }
];

const Deliver =  ({ dispatch, limit,  visible , loading,  total, page }) => {

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
                        title: '发货单号',
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
                        title: '快递公司',
                        dataIndex: 'express',
                        key: 'express',
                        align : 'center',
                      },

                      {
                        title: '快递单号',
                        dataIndex: 'express_sn',
                        key: 'express_sn',
                        align : 'center',
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
                 <Descriptions.Item label="发货单号"> 85730039696254 </Descriptions.Item>
                 <Descriptions.Item label="订单号"> 15729464955102 </Descriptions.Item>
                 <Descriptions.Item label="用户"> 某某用户 </Descriptions.Item>
                 <Descriptions.Item label="收货人"> 收货人 </Descriptions.Item>
                 <Descriptions.Item label="快递公司"> 德邦快递 </Descriptions.Item>
                 <Descriptions.Item label="快递单号"> 234234234 </Descriptions.Item>
                 <Descriptions.Item label="收货电话"> 17753548879 </Descriptions.Item>
                 <Descriptions.Item label="创建时间"> 2019-11-06 09:32:49 </Descriptions.Item>
                 <Descriptions.Item label="收货地址"> 山东省 烟台市 莱山区 - 埠岚小区 </Descriptions.Item>
                 <Descriptions.Item label="发货备注" span={3} > ddddd </Descriptions.Item>
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
  
  export default connect(mapStateToProps)(Deliver);