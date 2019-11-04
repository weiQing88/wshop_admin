import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer, InputNumber, Modal, Upload, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon, message } from 'antd';
import uitl from '@/util';

const { TextArea } = Input;

const fomrItemStyle = {  width : 256 };


const EditAttrs = function( props ){
      let { visible, form, isEdited } = props,
          { getFieldDecorator } = form;

        let [ rows, setRows ] = useState([ 
               {
                  id: 1,
                  value : 12,
               }
          ]); 

        const handleOk = () => {}
        const handleCancel = () => {}

        const increaseRow = () => {
                rows.push({ id : uitl.randomKey( 2 ), value : '' })
                setRows( rows )
        }

       

       return (<Modal
                    title={ isEdited ? '编辑属性' : '添加属性' }
                    visible={ visible }
                    width={ 500 }
                    onOk={ handleOk }
                    onCancel={ handleCancel }
                    cancelText={'取消'}
                    okText={'确定'}
                >
                <Form style={{ width : '90%', margin : '0 auto', maxHeight : 560, overflowY : 'auto' }} layout="vertical" >
                      <Form.Item label="分类名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '分类名称' }],
                            })( <Input style={{ width : 300 }}  placeholder="请输入分类名称" />)}
                        </Form.Item>  

                        <Form.Item style={{ marginBottom : 0 }} label="分类值">
                            {getFieldDecorator('value-0', {
                                rules: [{ required: true, message: '分类名称' }],
                            })( <Input style={ fomrItemStyle } placeholder="请输入分类名称" />)}
                           <span onClick={ increaseRow } className="edit-attrs-plugs-button"> <Icon  type="plus" /> </span>
                        </Form.Item >  
                        {
                            rows.map( ( row, index ) =>(
                                <Form.Item style={{ marginBottom : 0 }} key={ index + row.id } label="">
                                {getFieldDecorator(`value-${ index + 1 }`, {
                                    rules: [{ required: true, message: '分类名称' }],
                                })( <Input style={ fomrItemStyle } placeholder="请输入分类名称" />)}
                                   <span className="edit-attrs-plugs-button"> <Icon type="delete" /> </span>
                                </Form.Item>  
                            ))
                        }
                 </Form>  
            </Modal>)
}


export default Form.create()( EditAttrs );
