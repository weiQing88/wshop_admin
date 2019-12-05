import { useEffect, useState } from 'react';
import { Form, Select, Input, Button, DatePicker, Menu, Dropdown, Icon  } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;


const Toolbar = function( props ){
      const { form } = props;
      const { getFieldDecorator } = form
      const formItemStyle = { width : 180 };

      useEffect(() =>{}, []);

    //   const handleMenuEvent = e => {
    //          props.onClick({ type : 'menuEvent', data : e })
    //   }

      const handleButtonsEvent =  ( type ) => {
        let values = form.getFieldsValue();
            if( values.range_time ){
                 let addTime = values.range_time[0].format('YYYY-MM-DD HH:mm:ss'),
                    endTime = values.range_time[1].format('YYYY-MM-DD HH:mm:ss'),
                    bool = Date.parse( values.add_time ) <  Date.parse( values.end_time ) ? true : false;
                    values.add_time = bool ? addTime : endTime;
                    values.end_time = bool ? endTime : addTime;;
            }else{
                values.add_time = undefined;
                values.end_time = undefined;
            }
            delete  values.range_time;
         let bool = props.onClick({ type, visible : true, data : values  }); 
             bool && form.resetFields(); // true ==> 清空选项框

      }


       return (
            <div className="toolbar-wrapper" >
                <Form className="toolbar-form" layout="inline">
                        <Form.Item >
                        {getFieldDecorator('order_sn')(
                            <Input style={ formItemStyle }  placeholder="请输入订单号" />,
                        )}
                        </Form.Item>

                        <Form.Item >
                        {getFieldDecorator('mobile')(
                            <Input style={ formItemStyle }  placeholder="收货手机号" />,
                        )}
                        </Form.Item>


                        <Form.Item >
                        {getFieldDecorator('consignee')(
                            <Input style={ formItemStyle }  placeholder="用户名、昵称" />,
                        )}
                        </Form.Item>


                        <Form.Item >
                            {getFieldDecorator('order_channel')(
                                <Select style={ formItemStyle } placeholder="订单来源" >
                                    {/* <Option value="网站">网站</Option> */}
                                    <Option value="小程序">小程序</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item >
                            {getFieldDecorator('order_type')(
                                <Select style={ formItemStyle } placeholder="订单类型" >
                                    <Option value="普通订单">普通订单</Option>
                                    <Option value="拼团订单">拼团订单</Option>
                                </Select>
                            )}
                        </Form.Item>


                         <Form.Item >
                            {getFieldDecorator('range_time')(
                                <RangePicker placeholder={['开始时间','结束时间']} showTime format="YYYY-MM-DD HH:mm:ss" />,
                            )}
                            </Form.Item>

                        <Form.Item>
                           <Button.Group >
                             <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 搜索</Button>
                             <Button onClick={ handleButtonsEvent.bind(this, 'reset') } type="primary"> 重置 </Button>
                          </Button.Group>
                        </Form.Item>


                        <Form.Item>
                          <Button onClick={ handleButtonsEvent.bind(this, 'cancel') } type="primary"> 批量取消 </Button>
                        </Form.Item>


                 </Form>
            </div>
       )
}


export default Form.create()(Toolbar);