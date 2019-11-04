import { useState, useEffect } from 'react';
import { Modal, Form, Button, Input, Select, Switch } from 'antd';
const { Option } = Select;

 const AdvanceSearch = function( props ){

    const { form } = props;
    const { getFieldDecorator } = form;


    const formItemLayout = {
         labelCol: { span: 6 },
         wrapperCol: {  span: 18 },
      };



    const handleOk = () =>{
        form.validateFields((err, fieldsValue) => {
              if (err) return;
              let bool = props.onClick({ type : 'ok', payload : fieldsValue });
              if( bool ) form.resetFields();
        })
    }

    const handleCancel  = () =>{
         let bool = props.onClick({ type : 'cancel' });
          if( bool ) form.resetFields();
    }


    useEffect(()=>{}, [ props.visible ]);
      
     return (
          <Modal
                title="高级搜索"
                visible={ props.visible }
                 width={ 500 }
                 onOk={ handleOk }
                 onCancel={ handleCancel }
                 cancelText={'取消'}
                 okText={'确定'}
            >
          <Form {...formItemLayout}   >
                <Form.Item label="商品类型">
                        {getFieldDecorator('type', {
                            rules: [{ required: true, message: '请选择商品类型' }],
                        })( <Select  placeholder="商品类型">
                            <Option value="1"> 类型1 </Option>
                            <Option value="2"> 类型2 </Option>
                        </Select>)}
                   </Form.Item>


                <Form.Item label="商品编号">
                  {getFieldDecorator('number', {
                    rules: [{ required: true, message: '商品编号' }],
                  })( <Input  placeholder="Please enter user name" />)}
                  </Form.Item>



                  <Form.Item label="商品品牌">
                  {getFieldDecorator('brand', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })( <Select placeholder="商品品牌">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                </Select>)}
             </Form.Item>


             <Form.Item label="推荐">
                  {getFieldDecorator('is_recommend', {
                    valuePropName: 'checked',
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>

             <Form.Item label="热门">
                  {getFieldDecorator('is_hot', {
                     valuePropName: 'checked',
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>

          </Form>
      </Modal>
        )
}



export default Form.create()( AdvanceSearch );