import { useEffect, useState } from 'react';
import { Form, Select, Input, Button, DatePicker, Menu, Dropdown, Icon  } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const ToolbarUsr = function({ dispatch, form }){
      const { getFieldDecorator } = form
      const formItemStyle = { width : 180 };

      useEffect(() =>{}, []);

      const handleMenuEvent = e => {
           //  props.onClick({ type : 'menuEvent', data : e })
      }

      const handleButtonsEvent =  ( type ) => {
        //    let bool = props.onClick({ type, visible : true  }); // true ==> 清空选项框
        //    if( bool ){}

      }


       return (
            <div className="toolbar-wrapper" >
                <Form className="toolbar-form" layout="inline">

                     <Form.Item >
                        {getFieldDecorator('mobile')(
                            <Input style={ formItemStyle }  placeholder="手机号" />
                        )}
                        </Form.Item>

                           
                        <Form.Item >
                            {getFieldDecorator('gender')(
                                <Select style={ formItemStyle } placeholder="性别" >
                                    <Option value="female">女</Option>
                                    <Option value="male">男</Option>
                                </Select>
                            )}
                          </Form.Item>


                        <Form.Item >
                        {getFieldDecorator('name')(
                            <Input style={ formItemStyle }  placeholder="请输入昵称" />
                        )}
                        </Form.Item>


                        <Form.Item >
                            {getFieldDecorator('gender')(
                                <Select style={ formItemStyle } placeholder="状态" >
                                    <Option value="0">全部</Option>
                                    <Option value="1">正常</Option>
                                    <Option value="2">停用</Option>
                                </Select>
                            )}
                          </Form.Item>

                        <Form.Item>
                         <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 搜索</Button>
                        </Form.Item>

                        <Form.Item>
                         <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 添加 </Button>
                        </Form.Item>

                        <Form.Item>
                         <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 批量删除 </Button>
                        </Form.Item>


                 </Form>
            </div>
       )
}


export default Form.create()( ToolbarUsr );