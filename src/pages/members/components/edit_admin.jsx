import React, { useState, useEffect } from 'react';
import { Modal, Form,  Input, Radio, message } from 'antd';
import util from '@/util';
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




const EditAdmin = ( props ) => {
    let { form, data, visible, dispatch, isEdited  } = props,
         { getFieldDecorator } = form;

    let handleOk = () => {
           dispatch({ type : 'admin/toggle', payload : {  key : 'visible', visible : false, isEdited : false  } });
    }
    let handleCancel = () => {
           dispatch({ type : 'admin/toggle', payload : {  key : 'visible', visible : false, isEdited : false  } });
    }


    useEffect(() =>{}, []);

   return (
        <Modal
            title={ isEdited ? '编辑管理员' : '新增管理员' } 
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Form {...formItemLayout}  >

            <Form.Item label="账号">
                {getFieldDecorator('points', {
                    rules: [
                        { required: true, message: '请输入账号' },
                        {  validator : (rule, value, callback) => {
                                try{
                                    if( util.isValid( value )){
                                           if( value.length > 20  ){
                                                    callback('字符数最大为20！');
                                                }else if(  value.length < 6  ){
                                                    callback('字符数最小为6！');
                                                }else{
                                                    callback()
                                                }
                                        }
                                    }catch( error ){
                                        console.error( error )
                                    }
                                 callback()
                             }
                         } 
                    ],
                })( <Input placeholder="字母数字或下划线6-20位" />)}
            </Form.Item>

            <Form.Item label="手机号码">
                {getFieldDecorator('points', {
                    rules: [
                        { required: true, message: '请输入账号' },
                        {
                            validator :  (rule, value, callback) => {
                                 try{
                                    if( util.isValid( value )){
                                          if( !util.checkPhone( value ) ){
                                              callback('请输入合法手机号')
                                          }else{
                                             callback()
                                          }
                                     }
                                 }catch( error ){
                                    console.error( error )
                                 }
                                 callback()
                            }
                        }
                      ],
                })( <Input placeholder="请输入账号" />)}
            </Form.Item>

            <Form.Item label="密码">
                {getFieldDecorator('points', {
                    rules: [{
                         required: true, message: '请输入账号' },
                         {
                            validator : (rule, value, callback) => {
                                 try{
                                    if( util.isValid( value )){
                                            if( value.length > 16  ){
                                                callback('字符数最大为16！');
                                            }else if(  value.length < 6  ){
                                                callback('字符数最小为6！');
                                            }else{
                                                callback()
                                            }
                                     }
                                 }catch( error ){
                                      console.error( error )
                                 }
                                 callback()
                            }
                         }
                    ],
                })( <Input placeholder="请输入6到16位密码" />)}
            </Form.Item>

            <Form.Item label="角色">
                {getFieldDecorator('admin_role',{
                  rules: [{ required: true, message: '请选择角色' }],
                })( 
                  <Radio.Group >
                      <Radio value={1}> 超级管理员 </Radio>
                      <Radio value={2}> 普通管理员 </Radio>
                    </Radio.Group>
                 )}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditAdmin );