import Redirect from 'umi/redirect';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { Form, Button, Input, Icon, Checkbox  } from 'antd';
import util from '@/util';

const Login =  ({  dispatch, form }) => {
      let { getFieldDecorator } = form;


        // 记住我
       let onChange = () => {}

        // 登陆
       let handleSubmit = () => {
           form.validateFields((err, fieldsValue) => {
             if(err) return;
                dispatch({
                    type : 'login/login',
                    payload : fieldsValue
                })
            })
       }

       useEffect(() => {}, [ ]);

     //   console.log('sdfsdf')

  
       if( util.getCookie('wshopLoginToken') ){ // 如果已经登录，跳转首页 
            return ( <Redirect to="/" /> )
       }else{

                return (
                    <div className="app-login-wrapper">
                    <Form className="app-login-form">
                        <Form.Item > <h4> WSHOP 管理系统 </h4> </Form.Item>
                            <Form.Item >
                            {getFieldDecorator('name', {
                                rules: [ 
                                     { required: true, message: '请输入名称' },
                                    //  { validator : validat_Name }
                                 ],
                            })(  <Input size="large" prefix={<Icon type="user" />} placeholder="用户名" />  )}
                            </Form.Item>
        
                            <Form.Item  >
                            {getFieldDecorator('password', {
                                rules: [ { required: true, message: '请输入密码' } ],
                            })(  <Input.Password  size="large" prefix={<Icon type="key" />}  placeholder="密码" />  )}
                            </Form.Item>
        
                            <Form.Item className="clearFloat">
                                <Checkbox onChange={onChange}>记住我</Checkbox>
                                <Button onClick={ handleSubmit } style={{ float : 'right' }} type="primary"> 登录 </Button>
                            </Form.Item>
                        </Form>
                    </div>
                )

       }
}


function mapStateToProps(state) {
    const { islogin } = state.login;
    return {
          islogin,
          loading: state.loading.models.login,
     };
  
  }
  
  export default connect(mapStateToProps)( Form.create()( Login ) );



