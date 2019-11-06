import { useEffect, useState } from 'react';
import moment from 'moment';
import { Form, Button, DatePicker } from 'antd';
const { RangePicker } = DatePicker;


const Toolbar = function( props ){
      const { form } = props;
      const { getFieldDecorator } = form

      useEffect(() =>{}, []);

      const handleButtonsEvent =  ( type ) => {
          // let bool = props.onClick({ type, visible : true  }); // true ==> 清空选项框
          // if( bool ){}

      }

       return (
            <div className="toolbar-wrapper" >
                <Form className="toolbar-form" layout="inline">
                         <Form.Item >
                            {getFieldDecorator('range-time-picker')(
                                <RangePicker placeholder={['开始时间','结束时间']} showTime format="YYYY-MM-DD HH:mm:ss" />,
                            )}
                            </Form.Item>

                        <Form.Item>
                         <Button onClick={ handleButtonsEvent.bind(this, 'search') } type="primary"> 搜索</Button>
                        </Form.Item>

                        <Form.Item>
                         <Button onClick={ handleButtonsEvent.bind(this, 'delete') } type="primary"> 删除 </Button>
                        </Form.Item>


                 </Form>
            </div>
       )
}


export default Form.create()( Toolbar );