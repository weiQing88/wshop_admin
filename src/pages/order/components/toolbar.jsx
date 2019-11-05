import { useEffect, useState } from 'react';
import { Form, Select, Input, Button, DatePicker, Menu, Dropdown, Icon  } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;


const Toolbar = function( props ){
      const { form } = props;
      const { getFieldDecorator } = form
      const formItemStyle = { width : 180 };

      useEffect(() =>{}, []);

      const handleMenuEvent = e => {
             props.onClick({ type : 'menuEvent', data : e })
      }

      const handleButtonsEvent =  ( type ) => {
           let bool = props.onClick({ type, visible : true  }); // true ==> 清空选项框
           if( bool ){}

      }


       return (
            <div className="toolbar-wrapper" >
                <Form className="toolbar-form" layout="inline">

                        <Form.Item >
                        {getFieldDecorator('order_number')(
                            <Input style={ formItemStyle }  placeholder="请输入订单号" />,
                        )}
                        </Form.Item>

                        <Form.Item >
                        {getFieldDecorator('order_tel')(
                            <Input style={ formItemStyle }  placeholder="收货手机号" />,
                        )}
                        </Form.Item>


                        <Form.Item >
                        {getFieldDecorator('order_name')(
                            <Input style={ formItemStyle }  placeholder="用户名、昵称、手机" />,
                        )}
                        </Form.Item>


                        <Form.Item >
                            {getFieldDecorator('order_channel')(
                                <Select style={ formItemStyle } placeholder="订单来源" >
                                    <Option value="0">全部</Option>
                                    <Option value="1">小程序</Option>
                                </Select>
                            )}
                        </Form.Item>


                        
                        <Form.Item >
                            {getFieldDecorator('order_type')(
                                <Select style={ formItemStyle } placeholder="订单类型" >
                                    <Option value="0">普通订单</Option>
                                    <Option value="1">拼团订单</Option>
                                </Select>
                            )}
                        </Form.Item>


                         <Form.Item >
                            {getFieldDecorator('range-time-picker')(
                                <RangePicker placeholder={['开始时间','结束时间']} showTime format="YYYY-MM-DD HH:mm:ss" />,
                            )}
                            </Form.Item>


                        <Form.Item>
                         <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 搜索</Button>
                        </Form.Item>


                        <Form.Item>
                          <Button onClick={ handleButtonsEvent.bind(this, 'add') } type="primary"> 批量取消 </Button>
                        </Form.Item>


                 </Form>
            </div>
       )
}


export default Form.create()(Toolbar);