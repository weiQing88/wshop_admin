import { useEffect, useState } from 'react';
import { Form, Select, Input, Button, Menu, Dropdown, Icon  } from 'antd';
const { Option } = Select;


const Toolbar = function( props ){
      const { form } = props;
      const { getFieldDecorator } = form
      const formItemStyle = { width : 200 };

      useEffect(() =>{}, []);

      const handleMenuEvent = e => {
             props.onClick({ type : 'menuEvent', data : e })
      }

      const handleButtonsEvent =  ( type ) => {
           let bool = props.onClick({ type, visible : true, data : form.getFieldsValue()  }); 
               bool && form.resetFields(); // true ==> 清空选项框
      }

      const menu = (
        <Menu onClick={ handleMenuEvent }>
          <Menu.Item key="1">修改价格</Menu.Item>
          <Menu.Item key="2">调整库存</Menu.Item>
          <Menu.Item key="3">批量上架</Menu.Item>
          <Menu.Item key="4">批量下架</Menu.Item>
          <Menu.Item key="5">删除</Menu.Item>
          {/* <Menu.Item key="6">打标签</Menu.Item>
          <Menu.Item key="7">去标签</Menu.Item> */}
        </Menu>
      );


       return (
            <div className="toolbar-wrapper" >
                <Form className="toolbar-form" layout="inline">
                        <Form.Item >
                        {getFieldDecorator('goods_name')(
                            <Input style={ formItemStyle }  placeholder="请输入商品名称" />,
                        )}
                        </Form.Item>
{/*                         
                        <Form.Item >
                            {getFieldDecorator('is_on_sale')(
                                <Select style={ formItemStyle } placeholder="上下架状态" >
                                    <Option value="0">全部</Option>
                                    <Option value="1">上架</Option>
                                    <Option value="2">下架</Option>
                                </Select>
                            )}
                        </Form.Item> */}

                        <Form.Item>
                           <Button.Group >
                             <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 搜索</Button>
                             <Button onClick={ handleButtonsEvent.bind(this, 'reset') } type="primary"> 重置 </Button>
                          </Button.Group>
                        </Form.Item>

                        <Form.Item>
                        <Button onClick={ handleButtonsEvent.bind(this, 'searchModal') } type="primary"> 高级搜索</Button>
                        </Form.Item>

                        <Form.Item >
                            <Dropdown overlay={menu}>
                             <Button onClick={ handleButtonsEvent.bind(this, 'bullk') } type="primary">批量操作 </Button>
                            </Dropdown>
                        </Form.Item>

                        <Form.Item>
                        <Button onClick={ handleButtonsEvent.bind(this, 'add') } type="primary"> 添加商品</Button>
                        </Form.Item>


                 </Form>
            </div>
       )
}


export default Form.create()(Toolbar);