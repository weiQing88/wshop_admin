import { useEffect, useState } from 'react';
import { Form, Select, Input, Button, DatePicker, Menu, Dropdown, Icon  } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;

const ToolbarDv = function( props ){
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
           let bool = props.onClick({ type, visible : true, data : values });
               bool && form.resetFields(); // true ==> 清空选项框

      }


       return (
            <div className="toolbar-wrapper" >
                <Form className="toolbar-form" layout="inline">

                        <Form.Item >
                        {getFieldDecorator('logistic_code')(
                            <Input style={ formItemStyle }  placeholder="物流单号" />,
                        )}
                        </Form.Item>


                        <Form.Item >
                        {getFieldDecorator('order_id')(
                            <Input style={ formItemStyle }  placeholder="订单号" />,
                        )}
                        </Form.Item>

                        {/* 
                        <Form.Item >
                        {getFieldDecorator('order_name')(
                            <Input style={ formItemStyle }  placeholder="快递单号" />,
                        )}
                        </Form.Item> */}


                        <Form.Item >
                        {getFieldDecorator('mobile')(
                            <Input style={ formItemStyle }  placeholder="电话号" />,
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


                 </Form>
            </div>
       )
}


export default Form.create()( ToolbarDv );