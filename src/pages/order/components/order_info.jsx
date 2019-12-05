import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer,Tabs, Table, Divider, Descriptions, Input    } from 'antd';
const { TabPane } = Tabs;
const { TextArea } = Input;

export default function({ dispatch, form, data, visible, loading  }){
       let onClose = () => {
             dispatch({ type : 'orderList/setState', payload : {  key : 'orderInfoVisible', value : false  } });
       }
       let callback  = () => { }


       console.log( 'data', data )


     return (
         <Drawer
                title="订单详情"
                width={ 800 }
                onClose={ onClose }
                visible={ visible }
           >
            <Tabs animated={ false } defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="基本信息" key="1">
                         <Divider orientation="left"> 订单信息 </Divider>
                         <Descriptions title="">
                            <Descriptions.Item label="订单号"> 15729324804082 </Descriptions.Item>
                            <Descriptions.Item label="订单总金额"> ￥123.00元 </Descriptions.Item>
                            <Descriptions.Item label="支付状态"> 已付款  </Descriptions.Item>
                            <Descriptions.Item label="发货状态"> 已发货 </Descriptions.Item>
                            <Descriptions.Item label="订单状态"> 正常 </Descriptions.Item>
                            <Descriptions.Item label="下单来源"> H5页面 </Descriptions.Item>
                            <Descriptions.Item label="下单时间"> 2019-11-05 13:41:20 </Descriptions.Item>
                            <Descriptions.Item label="收货状态"> 未确认收货 </Descriptions.Item>
                        </Descriptions>

                         <Divider orientation="left"> 收货人信息 </Divider>
                            <Descriptions title="">
                                <Descriptions.Item label="收货时间"> 未收货 </Descriptions.Item>
                                <Descriptions.Item label="收货人姓名"> 测试收货 </Descriptions.Item>
                                <Descriptions.Item label="收货人电话"> 13000000000 </Descriptions.Item>
                                <Descriptions.Item label="收货地址">河北省 秦皇岛市 山海关区 - 测试地址  </Descriptions.Item>
                            </Descriptions>



                         <Divider orientation="left"> 买家备注 </Divider>
                             <Descriptions title="">
                                <Descriptions.Item label="买家备注"> ..... </Descriptions.Item>
                            </Descriptions>



                    </TabPane>

                    <TabPane tab="商品信息" key="2">
                       <Table 
                          className="order-info-table"
                           pagination={ false }
                           size="small"
                           columns={[
                                {
                                    title: '商品名称',
                                    dataIndex: 'name',
                                    key: 'name',
                                    align : 'center',
                                },
                                {
                                    title: '商品单价',
                                    dataIndex: 'price',
                                    key: 'price',
                                    align : 'center',
                                }, {
                                    title: '购买数量',
                                    dataIndex: 'total',
                                    key: 'total',
                                    align : 'center',
                                },
                                {
                                    title: '商品总价',
                                    dataIndex: 'sum',
                                    key: 'sum',
                                    align : 'center',
                                },
                                {
                                    title: '商品编码',
                                    dataIndex: 'sn',
                                    key: 'sn',
                                    align : 'center',
                                },
                                {
                                    title: '商品总重量',
                                    dataIndex: 'weight',
                                    key: 'weight',
                                    align : 'center',
                                }, {
                                    title: '发货数量',
                                    dataIndex: 'quantity',
                                    key: 'quantity',
                                    align : 'center',
                                }
                          ]} 
                          dataSource={[
                              {
                                name : '开胃小吃',
                                price : 26,
                                total : 1,
                                sum : 12,
                                sn : 341234,
                                weight : '10kg',
                                quantity : 32,
                              }
                          ]} 
                        />
                    </TabPane>



                    <TabPane tab="支付单/退款单" key="3">
                        <Divider orientation="left"> 支付单 </Divider>
                              <Table 
                                  className="order-info-table"
                                   pagination={ false }
                                    size="small"
                                    columns={[
                                            {
                                                title: '支付单号',
                                                dataIndex: 'name',
                                                key: 'name',
                                                align : 'center',
                                            },
                                            {
                                                title: '支付方式',
                                                dataIndex: 'price',
                                                key: 'price',
                                                align : 'center',
                                            }, {
                                                title: '支付金额',
                                                dataIndex: 'total',
                                                key: 'total',
                                                align : 'center',
                                            },
                                            {
                                                title: '支付状态',
                                                dataIndex: 'sum',
                                                key: 'sum',
                                                align : 'center',
                                            },
                                            {
                                                title: '支付时间',
                                                dataIndex: 'sn',
                                                key: 'sn',
                                                align : 'center',
                                            },
                                    ]} 
                                    dataSource={[
                                        {
                                            name : '开胃小吃',
                                            price : 26,
                                            total : 1,
                                            sum : 12,
                                            sn : 341234,
                                            weight : '10kg',
                                            quantity : 32,
                                        }
                                    ]} 
                                    />
                           <Divider orientation="left"> 退款单 </Divider>
                              <Table 
                                   className="order-info-table"
                                    pagination={ false }
                                        size="small"
                                        columns={[
                                                {
                                                    title: '退款单号',
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                    align : 'center',
                                                },
                                                {
                                                    title: '退款方式',
                                                    dataIndex: 'price',
                                                    key: 'price',
                                                    align : 'center',
                                                }, {
                                                    title: '退款金额',
                                                    dataIndex: 'total',
                                                    key: 'total',
                                                    align : 'center',
                                                },
                                                {
                                                    title: '退款状态',
                                                    dataIndex: 'sum',
                                                    key: 'sum',
                                                    align : 'center',
                                                },
                                                {
                                                    title: '申请时间',
                                                    dataIndex: 'sn',
                                                    key: 'sn',
                                                    align : 'center',
                                                },
                                        ]} 
                                        dataSource={[
                                            {
                                                name : '开胃小吃',
                                                price : 26,
                                                total : 1,
                                                sum : 12,
                                                sn : 341234,
                                                weight : '10kg',
                                                quantity : 32,
                                            }
                                        ]} 
                                        />
                    </TabPane>



                    <TabPane tab="发货单/退货单" key="4">
                        <Divider orientation="left"> 发货单 </Divider>
                         <Table 
                            className="order-info-table"
                            pagination={ false }
                            size="small"
                            columns={[
                                    {
                                        title: '发货单号',
                                        dataIndex: 'name',
                                        key: 'name',
                                        align : 'center',
                                    },
                                    {
                                        title: '快递公司',
                                        dataIndex: 'price',
                                        key: 'price',
                                        align : 'center',
                                    }, {
                                        title: '快递单号',
                                        dataIndex: 'total',
                                        key: 'total',
                                        align : 'center',
                                    },
                                    {
                                        title: '收货人名',
                                        dataIndex: 'sum',
                                        key: 'sum',
                                        align : 'center',
                                    },
                                    {
                                        title: '收货电话',
                                        dataIndex: 'sn',
                                        key: 'sn',
                                        align : 'center',
                                    },
                                    {
                                        title: '收货地址',
                                        dataIndex: 'weight',
                                        key: 'weight',
                                        align : 'center',
                                        render : text => (
                                            <div style={{
                                                 maxWidth : '190px', 
                                                 margin : '0 auto', 
                                                 textAlign : 'center' }} className="ell"> { text } </div>
                                        )
                                    }
                            ]} 
                            dataSource={[
                                {
                                    name : '开胃小吃',
                                    price : 26,
                                    total : 1,
                                    sum : 12,
                                    sn : 341234,
                                    weight : '10kg',
                                    quantity : 32,
                                }
                            ]} 
                            />
                            <Divider orientation="left"> 退货单 </Divider>
                                <Table 
                                    className="order-info-table"
                                    pagination={ false }
                                    size="small"
                                    columns={[
                                        {
                                            title: '退货单号',
                                            dataIndex: 'name',
                                            key: 'name',
                                            align : 'center',
                                        },
                                        {
                                            title: '快递公司',
                                            dataIndex: 'price',
                                            key: 'price',
                                            align : 'center',
                                        }, {
                                            title: '快递单号',
                                            dataIndex: 'total',
                                            key: 'total',
                                            align : 'center',
                                        },
                                        {
                                            title: '退货状态',
                                            dataIndex: 'sum',
                                            key: 'sum',
                                            align : 'center',
                                        },
                                        {
                                            title: '退货时间',
                                            dataIndex: 'sn',
                                            key: 'sn',
                                            align : 'center',
                                        }
                                    
                                ]} 
                                dataSource={[
                                    {
                                        name : '开胃小吃',
                                        price : 26,
                                        total : 1,
                                        sum : 12,
                                        sn : 341234,
                                        weight : '10kg',
                                        quantity : 32,
                                    }
                                ]} 
                                />
                     </TabPane>


                    <TabPane tab="订单记录" key="5">
                           <Table 
                               className="order-info-table"
                                pagination={ false }
                                size="small"
                                columns={[
                                        {
                                            title: '订单号',
                                            dataIndex: 'name',
                                            key: 'name',
                                            align : 'center',
                                        },
                                        {
                                            title: '操作类型',
                                            dataIndex: 'price',
                                            key: 'price',
                                            align : 'center',
                                        }, {
                                            title: '描述',
                                            dataIndex: 'total',
                                            key: 'total',
                                            align : 'center',
                                            render : text => (
                                                <div style={{
                                                     maxWidth : '250px', 
                                                     margin : '0 auto', 
                                                     textAlign : 'center' }} className="ell"> { text } </div>
                                            )
                                        },
                                        {
                                            title: '时间',
                                            dataIndex: 'sum',
                                            key: 'sum',
                                            align : 'center',
                                        },
                                        
                                ]} 
                                dataSource={[
                                    {
                                        name : '开胃小吃',
                                        price : 26,
                                        total : 1,
                                        sum : 12,
                                        sn : 341234,
                                        weight : '10kg',
                                        quantity : 32,
                                    }
                                ]} 
                                />
                    </TabPane>
                    <TabPane tab="订单备注" key="6">
                       <Divider orientation="left"> 备注内容 </Divider>
                       <TextArea rows={5} />
                    </TabPane>
            </Tabs>
         </Drawer>
     )
}