import React, { useState, useEffect } from 'react';
import {  InputNumber, Modal, Form,  Input, Radio , message } from 'antd';

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

const EditUser = ( props ) => {
    let { form, data, visible, dispatch } = props,
         { getFieldDecorator } = form;

    let handleOk = () => {
           dispatch({ type : 'users/setState', payload : {  key : 'visible2', value : false  } });
    }
    let handleCancel = () => {
           dispatch({ type : 'users/setState', payload : {  key : 'visible2', value : false  } });
    }


    useEffect(() =>{}, []);

   return (
        <Modal
            title='修改用户状态' 
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Form {...formItemLayout}  >
            <Form.Item label="状态">
                {getFieldDecorator('status', {
                    rules: [{ required: true, message: '用户状态' }],
                })( <Radio.Group >
                    <Radio value={ 1 } > 正常 </Radio>
                    <Radio value={ 0 } > 禁用 </Radio>
                  </Radio.Group> )}   
            </Form.Item>

            <Form.Item label="说明">
                {getFieldDecorator('descr')( <TextArea rows={4} placeholder="说明" /> )}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditUser );