import React, { useState, useEffect } from 'react';
import { Modal, Form,  Input, message, TreeSelect  } from 'antd';
import util from '@/util';
import menu from '@/components/menu';



const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };


const EditRole = ( props ) => {
    let { form, data, isEdited, dispatch, loading } = props,
         { getFieldDecorator } = form;
    let [ visible, setVisible ] = useState( false );

    let handleOk = () => {
        if( loading ) return;
        form.validateFields((err, fieldsValue) => {
            if(err) return;
            if( isEdited ) fieldsValue.id = data.id;
             fieldsValue.authorities = fieldsValue.authorities.join(',');
             dispatch({ type : 'roles/create', payload : fieldsValue })
        })   
    }

    let handleCancel = () => {
           dispatch({ type : 'roles/setState', 
            payload : [
                {  key : 'visible', value : false  },
                {  key : 'isEdited', value : false  },
                {  key : 'initDataSource', value : {}  }
           ] });
    }

 
    useEffect(() =>{ 
        if( props.visible && visible == false ){
               console.log( ' EditRole 打开' )
               setVisible( true );
        }
        if( props.visible == false && visible ){
               console.log( ' EditRole 关闭' )
               form.resetFields();
               setVisible( false );
        }
    }, [ props.visible ]);

     let authorities =  util.isValid( data.authorities ) ?  data.authorities.split(',') : null;


   return (
        <Modal
            title={ isEdited ? '编辑角色' : '添加角色' }
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Form {...formItemLayout} style={{ height : 150 }}  >
            <Form.Item label="角色名">
                {getFieldDecorator('name', {
                    initialValue : data.name,
                    rules: [{ required: true, message: '请输入角色名' }],
                })( <Input placeholder="角色名" />)}
            </Form.Item>

            <Form.Item label="权限">
                {getFieldDecorator('authorities', {
                    initialValue : authorities,
                    rules: [{ required: true, message: '请选择权限' }],
                })(  <TreeSelect
                     treeCheckable={ true}
                     dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                     treeData={ menu }
                     placeholder="权限"
                  />)}
            </Form.Item>

        </Form>
     </Modal>
   )
}


export default Form.create()( EditRole );