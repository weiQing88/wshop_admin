import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon } from 'antd';
const { TextArea } = Input;
const { Option } = Select;



 let EditForm = function({ dispatch, form, isEdited,  goodsEditFormVisible, loading  }){

    let { getFieldDecorator } = form;

    let onClose = () => {
            dispatch({  type : 'goods/toggle', payload : false })  
       }

       console.log( 'redner-------' )

    useEffect(() =>{  }, [ ]);

     return (
        <Drawer
        title={ isEdited ? "编辑商品" : "添加商品" }
        width={ 720 }
        onClose={ onClose }
        visible={ goodsEditFormVisible }
      >
        <Form layout="vertical" >
            <Form.Item label="商品类型">
                  {getFieldDecorator('type', {
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
                  {getFieldDecorator('number', {
                    rules: [{ required: true, message: '商品编号' }],
                  })( <Input placeholder="Please enter user name" />)}
             </Form.Item>


             <Form.Item label="商品品牌">
                  {getFieldDecorator('brand', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })( <Select placeholder="商品品牌">
                    <Option value="xiao">Xiaoxiao Fu</Option>
                    <Option value="mao">Maomao Zhou</Option>
                </Select>)}
             </Form.Item>

             <Form.Item label="上架">
                  {getFieldDecorator('is_on_sale', {
                     valuePropName: 'checked',
                     rules: [{ required: true, message: 'Please enter user name' }],
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>


             <Form.Item label="推荐">
                  {getFieldDecorator('is_recommend', {
                     valuePropName: 'checked',
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
             </Form.Item>

             <Form.Item label="热门">
                  {getFieldDecorator('is_hot', {
                    valuePropName: 'checked',
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



function mapStateToProps(state) {
  const { goodsEditFormVisible,isEdited } = state.goods;
  return {
         isEdited,
        goodsEditFormVisible,
        loading: state.loading.models.goods,
  };

}


const EDITFORM = Form.create()(EditForm);


export default connect(mapStateToProps)(EDITFORM);