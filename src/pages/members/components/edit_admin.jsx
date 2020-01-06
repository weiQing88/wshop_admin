import React, { useState, useEffect } from 'react';
import { Modal, Form,  Input, Select, message } from 'antd';
import util from '@/util';
const { TextArea } = Input;
const { Option } = Select;

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
    let { form, dispatch, isEdited, data, loading, roles  } = props,
         { getFieldDecorator } = form;

    let [ visible, setVisible ] = useState( false );


    let handleOk = () => {
        if( loading ) return;
        form.validateFields((err, fieldsValue) => {
            if(err) return;
            dispatch({ type : 'admin/editAdmin', payload :fieldsValue })
        })   
    }


    let handleCancel = () => {
           dispatch({ 
               type : 'admin/setState', 
               payload : [
                  { key : 'visible', value : false },   
                  { key : 'isEdited', value : false },
                  { key : 'initDataSource', value : {} },
               ]
        });
    }

    useEffect(() =>{ 
        if( props.visible && visible == false ){
               console.log( ' EditAdmin 打开' )
               setVisible( true );
        }
        if( props.visible == false && visible ){
               console.log( ' EditAdmin 关闭' )
               form.resetFields();
               setVisible( false );
        }
    }, [ props.visible ]);


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
{/* 
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
            </Form.Item> */}

            <Form.Item label="手机号">
                {getFieldDecorator('mobile', {
                    initialValue : data.mobile,
                    rules: [
                        { required: true, message: '请输入手机号' },
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
                })( <Input placeholder="手机号" />)}
            </Form.Item>

            <Form.Item label="密码">
                {getFieldDecorator('password', {
                    rules: [{  required: true, message: '请输入密码' },
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
                                      console.error( error );
                                     callback()
                                 }
                              
                            }
                         }
                    ],
                })( <Input placeholder="请输入6到16位密码" />)}
            </Form.Item>


            <Form.Item label="用户名">
                {getFieldDecorator('username', {
                    initialValue : data.username,
                    rules: [{  required: true, message: '请输入用户名' } ],
                })( <Input placeholder="用户名" />)}
            </Form.Item>



            <Form.Item label="邮箱">
                {getFieldDecorator('email', {
                     initialValue : data.email,
                    rules: [  { required : true, type : 'email', message: '请输入合法邮箱' } ],
                })( <Input placeholder="邮箱" />)}
            </Form.Item>

            <Form.Item label="角色">
                {getFieldDecorator('admin_role',{
                 initialValue : data.admin_role,
                  rules: [{ required: true, message: '请选择角色' }],
                })( <Select>
                       {
                          roles.map( item => ( <Option key={ item.id } value={ item.name }>{ item.name  }</Option>  ))
                       }
                    </Select>
                 )}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditAdmin );