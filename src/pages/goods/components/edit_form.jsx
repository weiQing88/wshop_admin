import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

 let EditForm = function( props ){
    let [ visible, setVisible ] =  useState(  props.visible || false );

    let { getFieldDecorator } = props.form;


    let onClose = () => {}


    useEffect(() =>{  }, [ props.visible ]);


     return (
        <Drawer
        title="Create a new account"
        width={ 720 }
        onClose={ onClose }
        visible={ props.visible }
      >
        <Form layout="vertical" >
            <Form.Item label="商品类型">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请选择商品类型' }],
                  })( <Select placeholder="商品类型">
                     <Option value="1"> 类型1 </Option>
                     <Option value="2"> 类型2 </Option>
                </Select>)}
             </Form.Item>

             <Form.Item label="商品名称">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '商品名称' }],
                  })( <Input placeholder="Please enter user name" />)}
             </Form.Item>

             <Form.Item label="商品编号">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '商品编号' }],
                  })( <Input placeholder="Please enter user name" />)}
             </Form.Item>


             <Form.Item label="商品品牌">
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })( <Select placeholder="商品品牌">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                </Select>)}
             </Form.Item>

             <Form.Item label="上架">
                  {getFieldDecorator('is_on_sale', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>


             <Form.Item label="推荐">
                  {getFieldDecorator('is_recommend', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>

             <Form.Item label="热门">
                  {getFieldDecorator('is_hot', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>

    
             <Form.Item label="商品简介">
                  {getFieldDecorator('goods_brief', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })( <TextArea rows={4} />)}
             </Form.Item>

        </Form>
        <div
          style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
          }}
        >
          <Button onClick={ onClose } style={{ marginRight: 8 }}> 取消  </Button>
          <Button onClick={ onClose } type="primary"> 提交 </Button>
        </div>
      </Drawer>
     )
}



export default Form.create()(EditForm);