import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer,Tabs, Table, Divider, Descriptions, Input, Button    } from 'antd';
import util from '@/util';
const { TabPane } = Tabs;
const { TextArea } = Input;

export default props => {
       let { dispatch, form, data, loading  } = props;
       let [ visible, setVisible ] = useState( false );
       let [ txt, setTxt ] = useState('');

       let onClose = () => {
             dispatch({ type : 'orderList/setState', payload : {  key : 'orderDetailVisible', value : false  } });
       }
       let callback  = () => { }

       useEffect(() =>{ 
        if( props.visible && visible == false ){
               console.log( ' order_info 打开' )
              setVisible( true );
        }
        if( props.visible == false && visible ){
               console.log( ' order_info 关闭' )
              // form.resetFields();
               setVisible( false );
        }
    }, [ props.visible ]);



    let { basic = {}, note, goodsInfo, payment, delivery } = data;

    let handleStatus = ( index, arr ) => {
          if( !util.isValid( index ) ) return '';
          return arr[index];
       }

    let handleAddress = ( obj ) => {
           let {province = '',city= '',district= '',address= ''} = obj;
            return province + city + district + address
    }

   
let submitNote = () => {
      if( loading || util.isValid( basic ) == false ) return;
      let value =  document.querySelector('.orderInfo_textArea').value;
      dispatch({
        type : 'orderList/editNote', 
        payload : { id : basic.id, note : value }
      })
     // console.log( 'value', value)
}




    
       console.log( 'Drawer  data', data )

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
                            <Descriptions.Item label="订单号"> { basic.order_sn } </Descriptions.Item>
                            <Descriptions.Item label="订单总金额"> ￥{ basic.order_price }元 </Descriptions.Item>
                            <Descriptions.Item label="支付状态"> { handleStatus( basic.pay_status, ['未付款', '付款中', '已付款']) }  </Descriptions.Item>
                            <Descriptions.Item label="发/收货状态"> { handleStatus( basic.shipping_status, [ '未发货', '已发货', '已收货', '退货' ]) } </Descriptions.Item>
                            <Descriptions.Item label="订单状态"> { handleStatus( basic.order_status, [ '未确认', '确认', '已取消', '无效', '退货' ]) } </Descriptions.Item>
                            <Descriptions.Item label="下单来源"> { basic.order_channel } </Descriptions.Item>
                            <Descriptions.Item label="下单时间"> { basic.add_time }</Descriptions.Item>
                            {/* <Descriptions.Item label="收货状态"> { handleStatus( basic.shipping_status, [ '未确认', '确认', '已取消', '无效', '退货' ]) } </Descriptions.Item> */}
                        </Descriptions>

                         <Divider orientation="left"> 收货人信息 </Divider>
                            <Descriptions title="">
                                <Descriptions.Item label="收货时间"> { basic.confirm_time } </Descriptions.Item>
                                <Descriptions.Item label="收货人姓名"> { basic.consignee } </Descriptions.Item>
                                <Descriptions.Item label="收货人电话"> { basic.mobile  } </Descriptions.Item>
                                <Descriptions.Item label="收货地址">{ handleAddress  (basic )  }</Descriptions.Item>
                            </Descriptions>



                         <Divider orientation="left"> 买家备注 </Divider>
                             <Descriptions title="">
                                <Descriptions.Item label="买家备注"> { basic.postscript }</Descriptions.Item>
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
                                    dataIndex: 'goods_name',
                                    key: 'goods_name',
                                    align : 'center',
                                },
                                {
                                    title: '商品单价',
                                    dataIndex: 'shop_price',
                                    key: 'shop_price',
                                    align : 'center',
                                }, {
                                    title: '购买数量',
                                    dataIndex: 'goods_number',
                                    key: 'goods_number',
                                    align : 'center',
                                },
                                {
                                    title: '商品总价/元',
                                    dataIndex: 'sum',
                                    key: 'id',
                                    align : 'center',
                                    render : (text,record ) => ( record.shop_price * record.goods_number )
                                },
                                {
                                    title: '商品编码',
                                    dataIndex: 'goods_sn',
                                    key: 'goods_sn',
                                    align : 'center',
                                },
                                // {
                                //     title: '商品总重量',
                                //     dataIndex: 'weight',
                                //     key: 'weight',
                                //     align : 'center',
                                // }, {
                                //     title: '发货数量',
                                //     dataIndex: 'quantity',
                                //     key: 'quantity',
                                //     align : 'center',
                                // }
                          ]} 
                        //   dataSource={[
                        //       {
                        //         name : '开胃小吃',
                        //         price : 26,
                        //         total : 1,
                        //         sum : 12,
                        //         sn : 341234,
                        //         weight : '10kg',
                        //         quantity : 32,
                        //       }
                        //   ]} 
                        dataSource={ goodsInfo }


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

                 {/* 暂时不支持订单记录
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
                     */}
                    <TabPane tab="订单备注" key="6">
                       <Divider orientation="left"> 备注内容 </Divider>
                       <TextArea className="orderInfo_textArea"  defaultValue={ note } rows={5}  />
                       <Button onClick={ submitNote } style={{ marginTop : 10 }} type="primary"> 提交 </Button>
                    </TabPane>
            </Tabs>
         </Drawer>
     )
}