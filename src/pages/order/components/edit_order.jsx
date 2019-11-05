import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer, Cascader, InputNumber, Modal, Upload, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon, message } from 'antd';

const { TextArea } = Input;

const address = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];


const EditOrder = ( props ) => {
    let { form, data, visible, dispatch } = props,
         { getFieldDecorator } = form;

    let handleOk = () => {
           dispatch({ type : 'orderlist/toggle', payload : {  key : 'editOrderVisible', visible : false  } });
    }
    let handleCancel = () => {
           dispatch({ type : 'orderlist/toggle', payload : {  key : 'editOrderVisible', visible : false  } });
    }


    useEffect(() =>{}, []);

   return (
        <Modal
            title='编辑订单' 
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Form style={{ width : '90%', margin : '0 auto' }} layout="vertical" >

            <Form.Item label="订单号">
                {getFieldDecorator('order_sn ', {
                    rules: [{ required: true, message: '请输入订单号' }],
                })( <Input  placeholder="请输入订单号" />)}
            </Form.Item>

            <Form.Item label="收货人姓名">
                {getFieldDecorator('consignee ', {
                    rules: [{ required: true, message: '请输入收货人姓名' }],
                })( <Input  placeholder="请输入收货人姓名" />)}
            </Form.Item>

            <Form.Item label="收货人电话">
                {getFieldDecorator('mobile ', {
                    rules: [{ required: true, message: '收货人电话' }],
                })( <Input  placeholder="请输入收货人电话" />)}
            </Form.Item>

            <Form.Item label="收货地址">
                {getFieldDecorator('address ', {
                    rules: [{ required: true, message: '收货地址' }],
                })( <Input  placeholder="请输入收货地址" />)}
            </Form.Item>

            <Form.Item label="订单总金额">
                {getFieldDecorator('order_price', {
                    rules: [{ required: true, message: '订单总金额' }],
                })( <Input  placeholder="请输入订单总金额" />)}
            </Form.Item>

            <Form.Item label="收货区域">
                {getFieldDecorator('region', {
                    rules: [{ required: true, message: '收货区域' }],
                })(   <Cascader options={address} />)}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditOrder );