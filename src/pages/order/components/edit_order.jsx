import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer, Cascader, InputNumber, Modal, Upload, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon, message } from 'antd';
import position from '@/components/position';
const { TextArea } = Input;


const EditOrder = ( props ) => {
    let { form, data, dispatch, loading } = props,
         { getFieldDecorator } = form;

   let [ visible, setVisible ] = useState( false );

    let handleOk = () => {
       if( loading ) return;
      form.validateFields((err, fieldsValue) => {
          if(err) return;
          fieldsValue.id = data.id;
          fieldsValue.province = fieldsValue.region[0];
          fieldsValue.city = fieldsValue.region[1]; 
          fieldsValue.district = fieldsValue.region[2];
           delete fieldsValue.region;
           console.log('fieldsValue--', fieldsValue )
           dispatch({  type : 'orderList/editOrder', payload : fieldsValue })
      })
 
    }
    let handleCancel = () => {
           dispatch({ 
             type : 'orderList/setState',
              payload : [
                   {  key : 'editOrderVisible', value : false  },
                   {  key : 'orderInfo', value : {}  }
                ]
             });
    }


    useEffect(() =>{ 
      if( props.visible && visible == false ){
             console.log( ' EditOrder 打开' )
            setVisible( true );
      }
      if( props.visible == false && visible ){
             console.log( ' EditOrder 关闭' )
             form.resetFields();
             setVisible( false );
      }
  }, [ props.visible ]);


  let region = [ data.province, data.city, data.district ];


   return (
        <Modal
            title='编辑订单' 
            visible={ visible }
            width={ 600 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
            confirmLoading={ loading }
        >
        <Form style={{ width : '80%', margin : '0 auto' }} layout="vertical" >

            <Form.Item label="订单号">
                {getFieldDecorator('order_sn', {
                    initialValue : data.order_sn,
                    rules: [{ required: true, message: '请输入订单号' }],
                })( <Input  placeholder="订单号" />)}
            </Form.Item>

            <Form.Item label="收货人姓名">
                {getFieldDecorator('consignee', {
                    initialValue : data.consignee,
                    rules: [{ required: true, message: '请输入收货人姓名' }],
                })( <Input  placeholder="收货人姓名" />)}
            </Form.Item>

            <Form.Item label="收货人电话">
                {getFieldDecorator('mobile', {
                    initialValue : data.mobile,
                    rules: [{ required: true, message: '收货人电话' }],
                })( <Input  placeholder="收货人电话" />)}
            </Form.Item>

            
            <Form.Item label="订单总金额/元">
                {getFieldDecorator('order_price', {
                    initialValue : data.order_price,
                    rules: [{ required: true, message: '订单总金额' }],
                })( <Input  placeholder="订单总金额" />)}
            </Form.Item>

            <Form.Item label="收货区域">
                {getFieldDecorator('region', {
                    initialValue : region,
                    rules: [{ required: true, message: '收货区域' }],
                })(   <Cascader options={ position } />)}
            </Form.Item>

            <Form.Item label="收货详细地址">
                {getFieldDecorator('address', {
                   initialValue : data.address,
                    rules: [{ required: true, message: '收货地址' }],
                })( <Input  placeholder="收货地址" />)}
            </Form.Item>


         

        </Form>
     </Modal>
   )
}


export default Form.create()( EditOrder );