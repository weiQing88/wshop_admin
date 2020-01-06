import React, { Component } from 'react';
import AttrSelector from '@/components/attrselector';
import { UploadPlusButton } from '@/components/widgets';
import { Modal, Form, Input, Upload, message } from 'antd';
import util from '@/util';



  class EditForm extends Component {
    constructor( props ){
        super( props );
        this.state = { 
            visible :false,
            len : 0
         }
    }

     handleOk = () => {
        let { form, data = {}, dispatch, isEdited, ok } = this.props;
        form.validateFields((err, fieldsValue) => {
            if(err) return;
               if( util.isValid( fieldsValue.category_attrs ) ){
                     fieldsValue.category_attrs = fieldsValue.category_attrs.map( itm => itm.attr_id )
               }else{
                   delete fieldsValue.category_attrs
               }
                isEdited && ( fieldsValue.category_id = data.category_id );

               
                if( fieldsValue.img_url ){
                    let formdata = new FormData();
                    let uploaded_img = []; // 已上传过的图片
                        Object.keys( fieldsValue ).forEach( key => {
                             if( key == 'img_url' ){
                                    fieldsValue.img_url.forEach(( img, index ) =>{
                                      // 在编辑时，已上传图片数据与新上传图片文件会混合一起，需区分。
                                       if( typeof img.uid == 'number' && img.uid < 0 ){ 
                                             uploaded_img.push( img.url  )
                                       }else{
                                          formdata.append('img_url', img.originFileObj );
                                       }
                                   });
                             }else{
                                   formdata.append( key, fieldsValue[key] );
                             }
                        });
                        if( uploaded_img.length ) formdata.append(`uploaded_img`, uploaded_img.join(',') );
                        dispatch({  type : 'category/editCategory', payload : formdata })
                }else{
                     delete fieldsValue.img_url;
                     dispatch({  type : 'category/editCategory', payload : fieldsValue })
                }


            })
    }

     handleCancel = () => {
        let {  dispatch, cancel } = this.props;
         dispatch({ type : 'category/close' })
    }


     setFile = changedValue => {
           this.props.form.setFieldsValue({ category_attrs : changedValue });
     }


      // 上传图片方法
       normFile = e => {
        let { file, fileList } = e;
        let flag = true;
        let isLt500M = file.size / 1024 / 1024 < 500;
        let whileList =  [ 'image/jpeg', 'image/bmp', 'image/gif', 'image/png' ];
          if( whileList.indexOf( file.type ) == -1 ){
                  message.error('仅支持 jpg、jpeg、bmp、gif、png 图片文件格式!');
                  flag = false;
            }
              if (!isLt500M) {
                  flag = false;
                  message.error('限图片文件小于500MB!');
              }

            if( fileList.length > 6 ) flag = false; 

            if( flag ){
                this.setState( state => {
                      state.len = state.len  + 1;
                      return state
                });
                return fileList
            }else{
               for( let i = fileList.length - 1; i > -1; i-- ){
                   if( fileList[i].uid == file.uid ) fileList.splice( i, 1 );
               }
                return fileList
            }
 };



       // 移除图片
     handleRemove = file => {
        let files = this.props.form.getFieldValue('img_url');
        for( let i = files.length - 1; i > -1; i-- ){
            if( files[i].uid == file.uid ) files.splice( i, 1 );
        }

        if( files.length <= 0 ){
             files = undefined;
             this.setState({ len : 0 })
        }
        this.props.form.setFieldsValue({ img_url : files });
          this.setState( state => {
                 state.len = state.len - 1;
                 return state
          })
  }

    componentWillReceiveProps( newProps ){
        if( newProps.visible && this.props.visible == false ){
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
                    this.setState({ visible : false,len : 0 });
                   
            }
        }
    }


 
        render(){
            let { form, data = {}, isEdited } = this.props,
                 { getFieldDecorator } = form;

              getFieldDecorator('category_attrs', {  initialValue : data.category_attrs });


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

                             <Form.Item label="分类图" >
                                    {getFieldDecorator('img_url', {
                                        valuePropName: 'fileList',
                                        getValueFromEvent: this.normFile,
                                        initialValue : data.img_url,
                                    })( <Upload 
                                        name="img_url" 
                                        listType="picture-card"
                                        className="goods-img-uploader"
                                        onRemove={ this.handleRemove }
                                        beforeUpload={ ( file, fileList ) =>{ return false }}
                                        >
                                        {
                                            this.state.len > 5 ? null : <UploadPlusButton />
                                        }
                                    </Upload>
                                    )}
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


