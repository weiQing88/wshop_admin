import Redirect from 'umi/redirect';
import Link from 'umi/link';
import { connect } from 'dva';
import { Component,  useEffect, useState } from 'react';
import { Form, Button, Input, Icon, Checkbox, message  } from 'antd';
import { Captcha, RStar } from '@/components/widgets';
import util from '@/util';



const Login = props => {
       let {  dispatch, form, captchaSvg,loading } = props;
       let { getFieldDecorator } = form;

       // 更换验证码
      let changeCaptcha = () => {
            // 获取验证码
            dispatch({ type : 'login/captcha' })
      }

        // 登陆
       let handleSubmit = () => {
           form.validateFields((err, fieldsValue) => {
             if(err) return;
                //  true ==> 1 记住我
                fieldsValue.remember =  fieldsValue.remember ? '1' : '0';
                fieldsValue.password =  util.secret( fieldsValue.password );
                dispatch({
                    type : 'login/login',
                    payload : fieldsValue
                })

            })
       }


       useEffect(() => {
            // 获取验证码
            dispatch({ type : 'login/captcha' });
             console.log('login 仅仅执行一次');
       }, []);

       if( util.getCookie('wshopLoginToken') && util.getCookie('userInfo') ){ // 如果已经登录，跳转首页
                    return ( <Redirect to="/" /> )
                 }else{
                    return (
                        <div className="app-login-wrapper">
                        <Form className="app-login-form">
                            <Form.Item > <h4> WSHOP 管理系统 </h4> </Form.Item>
                                <Form.Item >
                                <RStar />
                                {getFieldDecorator('mobile', {
                                    rules: [ 
                                         { required: true, message: '请输入手机号' },
                                        //  { validator : validat_Name }
                                     ],
                                })(  <Input size="large" prefix={<Icon type="mobile" />} placeholder="手机号" />  )}
                                </Form.Item>
            
                                <Form.Item  >
                                <RStar />
                                {getFieldDecorator('password', {
                                    rules: [ { required: true, message: '请输入密码' } ],
                                })(  <Input.Password  size="large" prefix={<Icon type="key" />}  placeholder="密码" />  )}
                                </Form.Item>
        
                                <Form.Item  >
                                <RStar />
                                {getFieldDecorator('captcha', {
                                    rules: [ { required: true, message: '请输入验证码' } ],
                                })(  <Input style={{ width : 150 }}  size="large" prefix={<Icon type="lock" />}   placeholder="验证码" />  )}
                                  <Captcha svg={ captchaSvg } onClick={ changeCaptcha } />
                                </Form.Item>
        
                                <Form.Item style={{ marginBottom : 0 }} className="clearFloat">
                                   {getFieldDecorator('remember',{
                                        valuePropName: 'checked',
                                   })( <Checkbox >记住我</Checkbox>  )}
                                    <Button loading={ loading } style={{ width : 90,  float : 'right' }} onClick={ handleSubmit } type="primary"> 登录 </Button>
                                </Form.Item>
        
                                <Form.Item className="clearFloat">  
                                    <p className="clearFloat" >
                                        <span style={{ float : 'right' }}>没账号？<Link  to="/register">注册</Link>  </span>
                                        {/* <span style={{ float : 'right' }}> 使用<Link to="/"> 手机登录</Link> </span> */}
                                    </p>
                                 </Form.Item>
                            </Form>
                        </div>
                    )
          
                   } 

  
}


function mapStateToProps(state) {
    const { islogin, captchaSvg } = state.login;
    return {
          islogin,
          captchaSvg,
          loading: state.loading.models.login,
     };
  
  }
  
  export default connect(mapStateToProps)( Form.create()( Login ) );



