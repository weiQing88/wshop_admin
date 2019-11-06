import React, { useState, useEffect } from 'react';
import { Modal, Form,  Input, message } from 'antd';
import util from '@/util';


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



const EditRole = ( props ) => {
    let { form, data, visible, dispatch  } = props,
         { getFieldDecorator } = form;

    let handleOk = () => {
           dispatch({ type : 'roles/setState', payload : {  key : 'visible', value : false,  } });
    }
    let handleCancel = () => {
           dispatch({ type : 'roles/setState', payload : {  key : 'visible', value : false,  } });
    }


    useEffect(() =>{}, []);

   return (
        <Modal
            title="添加角色"
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Form {...formItemLayout} style={{ height : 150 }}  >

            <Form.Item label="角色名称">
                {getFieldDecorator('role', {
                    rules: [{ required: true, message: '请输入账号' }],
                })( <Input placeholder="请输入角色名" />)}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditRole );