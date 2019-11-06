import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import { Form,  Input, Button, message } from 'antd';
const { TextArea } = Input;



const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };


  const formItemStyle = { width : 400 }

const Setting = ({ dispatch, form, loading}) => {
    let { getFieldDecorator } = form;

     return (
         <AppLayout>
             <Form {...formItemLayout} style={{ paddingTop : 20 }} >

                    <Form.Item label="小程序名称">
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '请输入名称' }],
                        })( <Input style={ formItemStyle } placeholder="请输入名称" />)}
                    </Form.Item>

                    <Form.Item label="AppId">
                        {getFieldDecorator('appid', {
                            rules: [{ required: true, message: '请输入AppId' }],
                        })( <Input  style={ formItemStyle } placeholder="请输入AppId" />)}
                             <em> 请至微信小程序平台 设置》开发设置 中复制粘贴过来 </em>
                    </Form.Item>


                    <Form.Item label="AppSecret">
                        {getFieldDecorator('appsecret', {
                            rules: [{ required: true, message: '请输入AppSecret' }],
                        })( <Input  style={ formItemStyle } placeholder="请输入AppSecret" />)}
                          <em> 请至微信小程序平台 设置》开发设置 中复制粘贴过来 </em>
                    </Form.Item>

                    <Form.Item label="原始Id">
                        {getFieldDecorator('id', {
                            rules: [{ required: true, message: '请输入原始Id' }],
                        })( <Input  style={ formItemStyle } placeholder="请输入原始Id" />)}
                          <em> 请至微信小程序平台 设置》开发设置 中复制粘贴过来 </em>
                    </Form.Item>

                    
                    <Form.Item label="主体信息">
                        {getFieldDecorator('info', {
                            rules: [{ required: true, message: '请输入主体信息' }],
                        })( <Input  style={ formItemStyle } placeholder="请输入主体信息" />)}
                          <em> 请至微信小程序平台 设置》基本设置 中复制粘贴过来 </em>
                    </Form.Item>


                    <Form.Item label="简介">
                        {getFieldDecorator('desc')( <TextArea  style={ formItemStyle }  rows={4} /> )}
                    </Form.Item>


                 <div style={{ width : '32%', textAlign : 'center' }}>
                        <Button style={{ width : 100, marginRight :20 }} > 重置 </Button>
                        <Button style={{ width : 100 }}  type="primary"> 提交 </Button>
                   </div>

              </Form>
         </AppLayout>
     )

}



function mapStateToProps(state) {
   // const {  page } = state.roles;
    return {
          loading: state.loading.models.wx,
    };
  
  }


const SETTING = Form.create()( Setting );


  export default connect(mapStateToProps)( SETTING );