import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import shipper from '@/components/shipper';
const { Option } = Select;

const Booking = props => {
    let { form, data, dispatch, loading } = props,
        { getFieldDecorator } = form;

        let [ visible, setVisible ] = useState( false );

        let handleOk = () => {
            if( loading ) return;
            form.validateFields((err, fieldsValue) => {
               if(err) return;
                     fieldsValue.ExpType = 1; // 快递类型：1-标准快件
                     fieldsValue.OrderCode = data.order_id,  // 订单编号
                      fieldsValue.Receiver = {
                        Name : data.consignee,
                        Tel : data.mobile,
                        ProvinceName : data.province,
                        CityName : data.city,
                        Address : data.address,
                      },
                      fieldsValue.Commodity =  data.wshop_products.map( item =>({ GoodsName : item.goods_name }))
                      
                   console.log( 'fieldsValue---++++',  fieldsValue )

                   dispatch({ type : 'orderList/booking',  payload : fieldsValue });

              })
         }


         let handleCancel = () => {
                dispatch({ 
                  type : 'orderList/setState',
                   payload : [
                      {  key : 'bookingVisible', value : false  },
                      {  key : 'orderInfo', value : {}  }
                   ]
                  });
         }
     

        useEffect(() =>{ 
            if( props.visible && visible == false ){
                   console.log( ' booking 打开' )
                   setVisible( true );
            }
            if( props.visible == false && visible ){
                   console.log( ' booking 关闭' )
                   form.resetFields();
                   setVisible( false );
            }
        }, [ props.visible ]);



       return (
        <Modal
            title='预约取件' 
            visible={ visible }
            width={ 600 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
            confirmLoading={ loading }
        >
         <Form style={{ width : '80%', margin : '0 auto' }} layout="vertical" >
             <Form.Item label="邮费支付方式">
                {getFieldDecorator('PayType', {
                    rules: [{ required: true, message: '请选择支付方式' }],
                  })(<Select placeholder="邮费支付方式" >
                        <Option value="1">现付</Option>
                        <Option value="2">到付</Option>
                        <Option value="3">月结</Option>
                        <Option value="4">第三方支付</Option>
                    </Select>)}
              </Form.Item>

              <Form.Item label="快递公司">
                {getFieldDecorator('ShipperCode', {
                    rules: [{ required: true, message: '请选择快递公司' }],
                  })( <Select placeholder="快递公司" >
                           {
                               shipper.map(item => (
                               <Option key={ item.key } value={item.key}>{ item.value }</Option>
                               ))
                           }
                      </Select>)}
              </Form.Item>



              </Form>
        </Modal>)
}

export default Form.create()( Booking );