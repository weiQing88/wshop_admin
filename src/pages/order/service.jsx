import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge, Table, Divider, Modal, Descriptions   } from 'antd';

import Toolbar from './components/toolbar_serv';
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
        type : 1,
        reason : '台啊手动阀手动阀阿斯蒂芬奥斯曼，噶圣诞卡德国哈斯夺冠，是个卡萨丁好噶时间。',
        add_time: '2019-01-01:14:51:10',
    }
];




const Service =  ({ dispatch, limit,  visible , loading,  total, page }) => {

    let onTableChange = () => {}
    let onTableShowSizeChange = () => {}

    let handleTableCellEvent = ( arg ) => {
          switch( arg.type ){
               case 'view' : dispatch({ type : 'service/setState', payload : { key : 'visible', value : true } }) ;
               break;
          }
    }

    let handleOk = () => {
        dispatch({ type : 'service/setState', payload : { key : 'visible', value : false } }) ;
    }
    let handleCancel = () => {
        dispatch({ type : 'service/setState', payload : { key : 'visible', value : false } }) ;
    }

    
    return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
             <Toolbar />
             <Table  
                 bordered 
                 style={{  backgroundColor : '#fff' }}
                 expandedRowRender={ record => <p>{record.reason }</p> }
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
                        title: '售后单号',
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
                        title: '售后类型',
                        dataIndex: 'type',
                        key: 'type',
                        align : 'center',
                      },

                      {
                        title: '原因',
                        dataIndex: 'reason',
                        key: 'reason',
                        align : 'center',
                        render : text => (
                            <p style={{ maxWidth : 350, margin : '0 auto' }} className="ell" > { text } </p>
                        )
                      },

                      {
                        title: '申请时间',
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
                 <Descriptions.Item label="售后单号"> 85730039696254 </Descriptions.Item>
                 <Descriptions.Item label="用户"> 某某用户 </Descriptions.Item>
                 <Descriptions.Item label="退款金额"> 234 </Descriptions.Item>
                 <Descriptions.Item label="售后类型"> 退款 </Descriptions.Item>
                 <Descriptions.Item label="状态" span={2 }> 审核拒绝 </Descriptions.Item>
                 <Descriptions.Item label="原因" span={3} > 未知名沙雕原因 </Descriptions.Item>
                 <Descriptions.Item label="图片" span={3} > 暂时图片 </Descriptions.Item>
                 <Descriptions.Item label="备注" span={3} > 未知名沙雕备注 </Descriptions.Item>
                 <Descriptions.Item label="退货商品" span={3} >  
                    <Table bordered pagination={ false } size="small" className="order-info-table"  columns={[ 
                        {
                            title: '退货商品',
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
    const { visible, limit, total, page } = state.service;
    return {
         visible,
          page,
          limit,
          total,
          loading: state.loading.models.service,
    };
  
  }
  
  export default connect(mapStateToProps)( Service );