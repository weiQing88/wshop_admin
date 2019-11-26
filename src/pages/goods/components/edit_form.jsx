import React, { Component } from 'react';
import AttrSelector from '@/components/attrselector';
import { Modal, Form, Input, } from 'antd';
import util from '@/util';



  class EditForm extends Component {
    constructor( props ){
        super( props );
        this.state = { visible :false }
    }

     handleOk = () => {
        let { form, data = {}, dispatch, isEdited } = this.props;
        form.validateFields((err, fieldsValue) => {
            if(err) return;
               if( util.isValid( fieldsValue.category_attrs ) ){
                     fieldsValue.category_attrs = fieldsValue.category_attrs.map( itm => itm.attr_id )
               }else{
                   delete fieldsValue.category_attrs
               }
                isEdited && ( fieldsValue.category_id = data.category_id );
                dispatch({
                        type : 'category/editCategory',
                        payload : fieldsValue
                })
            })
    }

     handleCancel = () => {
        let {  dispatch } = this.props;
        dispatch({
            type : 'category/toggle',
            payload : {
                visible : false,
                isEdited : false,
            }
        })
    }


     setFile = changedValue => {
           this.props.form.setFieldsValue({ category_attrs : changedValue });
     }


    componentWillReceiveProps( newProps ){
        if( newProps.visible && this.props.visible == false ){
            console.log( ' newProps.visible && this.props.visible == false' );
            let { dispatch, isEdited, data = {} } = newProps;
             this.setState({ visible : true });
                dispatch({
                    type : 'attrselector/fetAttrs',
                    payload : { page : 1, limit : 10 }
                });

              isEdited && dispatch({
                            type : 'attrselector/setState',
                            payload : { key : 'selectedKeys', value : data.category_attrs }
                        });
            
        }else{
            if(  newProps.visible == false &&  this.state.visible ){
                    console.log('关闭并重置');
                        this.props.dispatch({
                                type  : 'attrselector/setState',
                                payload : [
                                    {
                                        key : 'dataSource',
                                        value : [],
                                    },
                                    {
                                    key : 'selectedKeys',
                                    value : [],
                                }
                                ]
                        });
                    this.props.form.resetFields();
                    this.setState({ visible : false });
                   
            }
        }
    }


 
        render(){
            let { form, data = {}, isEdited } = this.props,
                 { getFieldDecorator } = form;
              getFieldDecorator('category_attrs', {  initialValue : data.attrs });

            return(
                <Modal
                    title={ isEdited ? '编辑分类' : '添加分类' }
                    visible={ this.state.visible }
                    width={  750 }
                    onOk={ this.handleOk }
                    onCancel={ this.handleCancel }
                    cancelText={'取消'}
                    okText={'确定'}
                >
                    <Form style={{ width : '85%', margin : '0 auto' }} layout="vertical" >
                        <Form.Item label="分类名称">
                                {getFieldDecorator('category_name', {
                                    initialValue : data.category_name,
                                    rules: [{ required: true, message: '分类名称' }],
                                })( <Input style={{ width : 270 }} placeholder="请输入分类名称" />)}
                            </Form.Item>

                            <Form.Item label="关联属性">
                              <AttrSelector onChange={ this.setFile } />
                            </Form.Item>
                            
                        </Form>
            
                </Modal>
            )  
        }
  }


export default Form.create()( EditForm );


