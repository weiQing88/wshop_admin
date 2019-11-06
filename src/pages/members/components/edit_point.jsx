import React, { useState, useEffect } from 'react';
import {  InputNumber, Modal, Form,  Input, Row, Col, message } from 'antd';

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

const EditPoints = ( props ) => {
    let { form, data, visible, dispatch } = props,
         { getFieldDecorator } = form;

    let handleOk = () => {
           dispatch({ type : 'users/setState', payload : {  key : 'visible', value : false  } });
    }
    let handleCancel = () => {
           dispatch({ type : 'users/setState', payload : {  key : 'visible', value : false  } });
    }


    useEffect(() =>{}, []);

   return (
        <Modal
            title='修改用户积分' 
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Form {...formItemLayout}  >
            <Form.Item label="当前积分："> <p> 423 </p></Form.Item>
            <Form.Item label="积分变动">
                {getFieldDecorator('points', {
                    rules: [{ required: true, message: '请输入积分' }],
                })( <InputNumber min={0}  style={{ width : 300 }} placeholder="请输入积分" />)}
            </Form.Item>

            <Form.Item label="说明">
                {getFieldDecorator('descr')( <TextArea rows={4} placeholder="说明" /> )}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditPoints );