import Redirect from 'umi/redirect';
import Link from 'umi/link';
import { connect } from 'dva';
import { useEffect, useState } from 'react';
import { Form, Button, Input, Icon, Checkbox, message  } from 'antd';
import { Captcha, Countdown } from '@/components/widgets';
import util from '@/util';


const Register =  ({  dispatch, form }) => {
      let { getFieldDecorator } = form;

      let [ counterState, setCounterState ] = useState('stop');
      let [ disabled, setDisabled] = useState( false );

       // 获取短信验证码
      let fetCaptcha = () => {
          let mobile = form.getFieldValue('mobile');
           if( !mobile ){
               message.warning('请输入手机号！')
           }else{
              setDisabled( true );
              setCounterState( 'start' );
              dispatch({ type : 'login/mCaptcha', payload : mobile })
           }
          
      }

        // 登陆
       let handleSubmit = () => {
           form.validateFields((err, fieldsValue) => {
             if(err) return;
                fieldsValue.password =  util.secret( fieldsValue.password );
                    dispatch({
                        type : 'login/register',
                        payload : fieldsValue
                    })
            })
       }

        // 倒计时结束回调函数
       let cdCallback = () => {
             setDisabled( false );
             setCounterState( 'stop' );
        }
        
    // 验证手机
    let validat_mobile = ( rule, value, callback ) => {
            if( !util.checkPhone( value ) ) callback('请输入合法手机号');
             callback();
     }

    // 验证邮箱
    let validat_email = ( rule, value, callback  ) => {
        if( !util.checkEmail( value ) ) callback('请输入合法邮箱');
        callback();
    }




       useEffect(() => {}, []);

  
       if( util.getCookie('wshopLoginToken') ){ // 如果已经登录，跳转首页 
            return ( <Redirect to="/" /> )
       }else{

                return (
                    <div className="app-login-wrapper">
                      <Form className="app-login-form"  style={{ marginTop : '-235px' }}>
                        <Form.Item > <h4> WSHOP 管理系统-注册 </h4> </Form.Item>
                         <Form.Item >
                              {getFieldDecorator('mobile', {
                                rules: [ 
                                     { required: true, message: '请输入手机号' },
                                     { validator : validat_mobile }
                                 ],
                            })(  <Input size="large" prefix={<Icon type="mobile" />} placeholder="手机号" />  )}
                            </Form.Item>

                            <Form.Item >
                              {getFieldDecorator('user_name', {
                                rules: [ 
                                     { required: true, message: '请输入用户名' },
                                    // { validator : validat_mobile }
                                 ],
                            })(  <Input size="large" prefix={<Icon type="user" />} placeholder="用户名" />  )}
                            </Form.Item>

                            <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [ { required: true, message: '请输入密码' } ],
                            })(  <Input.Password  size="large" prefix={<Icon type="key" />}  placeholder="密码" />  )}
                            </Form.Item>

                            <Form.Item>
                            {getFieldDecorator('email', {
                                rules: [
                                     // { required: true, message: '请输入合法邮箱' } 
                                      { validator : validat_email }
                                    ],
                            })(  <Input  size="large" prefix={<Icon type="inbox" />}  placeholder="邮箱" />  )}
                            </Form.Item>

        
                            <Form.Item  className="clearFloat">
                            {getFieldDecorator('captcha', {
                                rules: [ { required: true, message: '请输入验证码' } ],
                            })(  <Input style={{ width : 150 }} size="large" prefix={<Icon type="lock" />}  placeholder="手机验证码" />  )}

                              <div style={{float : 'right' }}>
                                <Countdown afterStop={ cdCallback } state={ counterState } />
                                <Button disabled={ disabled } onClick={ fetCaptcha } size="large"> 获取验证码 </Button>
                              </div>
                            </Form.Item>

                            <Form.Item className="clearFloat">  
                                <p style={{ float : 'left'  }} >已有账号？<Link to="/login">账号登录</Link></p>
                                <Button onClick={ handleSubmit }  style={{ width : 110, float : 'right'  }}  type="primary" size="large"> 注册 </Button>
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
  
  export default connect(mapStateToProps)( Form.create()( Register ) );



