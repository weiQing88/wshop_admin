import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Drawer, InputNumber, Modal, Upload, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon, message } from 'antd';
import util from '@/util';

const fomrItemStyle = {  width : 256 };


const EditAttrs = function( props ){
      let { form, isEdited, dispatch, data } = props,
          { getFieldDecorator } = form;
         let [ rows, setRows ] = useState([]); 
         let [ visible, setVisible] = useState(false); 
        const handleOk = () => {
            form.validateFields((err, fieldsValue) => {
                if(err) return;
                    let param = {
                        attr_value : [],
                        attr_name : fieldsValue.attr_name
                    };
                     Object.keys( fieldsValue ).forEach( key =>{
                           if( key != 'attr_name' ) param.attr_value.push( fieldsValue[key] );
                     });
                    if( isEdited ) param.attr_id = data.attr_id;
                    dispatch({
                        type : 'attrs/editAttr',
                        payload :param
                    })
            
            })
        }


        const handleCancel = () => {
                dispatch({
                    type : 'attrs/toggle',
                    payload : {
                    visible : false,
                    isEdited : false
                    }
            })
        }

        const increaseRow = () => {
             if( rows.length > 15 ) return;
             let _rows = rows.concat();
                _rows.push('');
                setRows( _rows )
        }

        const deletRow = ( row ) => {
             let _rows = rows.concat();
               for( let i = _rows.length - 1; i > -1; i-- ){
                      if( _rows[i] == row ){
                         _rows.splice( i, 1 );
                      }
               }
               setRows( _rows );
      
        }

    
    useEffect(() =>{
        if( props.visible ){
            setVisible( true )
        }else{
             if( !props.visible && visible ){
                   console.log('关闭并重置');
                    setVisible( false );
                    setRows([]);
                    form.resetFields();
             }
        }

        if( util.isValid( data ) && data.attr_value.length > 1 ){
            setRows( data.attr_value.slice(1) )
        }
    }, [data, props.visible]);


       return (<Modal
                    title={ isEdited ? '编辑属性' : '添加属性' }
                    visible={ visible }
                    width={ 500 }
                    onOk={ handleOk }
                    onCancel={ handleCancel }
                    cancelText={'取消'}
                    okText={'确定'}
                >
                <Form style={{ width : '85%', margin : '0 auto', maxHeight : 560, overflowY : 'auto' }} layout="vertical" >
                      <Form.Item label="分类属性">
                            {getFieldDecorator('attr_name', {
                                 initialValue : data.attr_name,
                                rules: [{ required: true, message: '分类属性' }],
                            })( <Input style={{ width : 300 }}  placeholder="请输入分类属性" />)}
                        </Form.Item>  

                        <Form.Item style={{ marginBottom : 0 }} label="属性值">
                            {getFieldDecorator('value-0', {
                                initialValue :  util.isValid( data.attr_value ) ? data.attr_value[0] : undefined,
                                rules: [{ required: true, message: '请输入属性值' }],
                            })( <Input style={ fomrItemStyle } placeholder="请输入属性值" />)}
                           <span onClick={ increaseRow } className="edit-attrs-plugs-button"> <Icon  type="plus" /> </span>
                        </Form.Item >  
                        {
                            rows.map( ( row, index ) =>(
                                <Form.Item style={{ marginBottom : 0 }} key={ index  } label="">
                                {getFieldDecorator(`value-${ index + 1 }`, {
                                     initialValue : row,
                                    rules: [{ required: true, message: '请输入属性值' }],
                                })( <Input style={ fomrItemStyle } placeholder="请输入属性值" />)}
                                   <span onClick={ deletRow.bind(this, row ) } className="edit-attrs-plugs-button"> <Icon type="delete" /> </span>
                                </Form.Item>  
                            ))
                        }
                 </Form>  
            </Modal>)
}


export default Form.create()( EditAttrs );
