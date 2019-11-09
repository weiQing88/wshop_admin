import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import {  InputNumber, Modal, Upload, Form, Button, Col, Row, Input, Select, Switch, DatePicker, Icon, message } from 'antd';

const { TextArea } = Input;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}







const EditForm =  function( props ){
     let { form, data, visible, dispatch, isEdited } = props,
         { getFieldDecorator } = form;


   // 上传处理
   let normFile = ({ file, fileList }) => {
        // 如果是由删除触发的回调，直接返回 fileList
        if( file.hasOwnProperty('status') && file.status == 'removed' ) return fileList;

    let travel = (  file, fileList ) => {
        let newFilelist = [];
        fileList.forEach(( f, index ) => {
            if( file.uid != f.uid ) newFilelist.push( f );
        })
        return newFilelist
    }

    let uid = -1;

    //  if( file.hasOwnProperty('originFileObj') || uid < 0 ) return fileList;

    if( file.hasOwnProperty('uid') ){  uid =  Number( file.uid ) || -1 }


  // 上传图片数量限制在 5 张图片
  if( fileList.length > 5  )  return  travel( file, fileList );


    if( uid < 0 ){ // 如果是后台返回的数据，uid是负数，不必再进行处理；

    let flag = true;
    let imgTypes = [ 'image/jpeg', 'image/bmp', 'image/gif', 'image/png' ];


    if( imgTypes.indexOf( file.type ) == -1 ){
        flag = false;
        message.error('仅支持 jpg、jpeg、bmp、gif、png 图片文件格式!');
    }


    const isLt500M = file.size / 1024 / 1024 < 500;

    if (!isLt500M) {
            flag = false;
            message.error('限图片文件小于500MB!');
        }

      if( flag ){

             // 防止： Upload  有时会处理过 File 对象，真实的 file 对象是 originFileObj
            if( file.hasOwnProperty('originFileObj')  ){
                getBase64(file.originFileObj, imageUrl => this.setState({ fileList })); 
            }else{
                getBase64(file, imageUrl => this.setState({ fileList })); 
            }

            return fileList;

        }else{

            return  travel( file, fileList );
        }

    }else{
          return []
    }

    }
    


     let handleOk = () => {
          dispatch({
                type : 'category/toggle',
                payload : {
                    visible : false,
                    isEdited : false,
                }
          })

     }

     let handleCancel = () => {
            dispatch({
                type : 'category/toggle',
                payload : {
                    visible : false,
                    isEdited : false,
                }
            })
     }

      useEffect(() =>{}, [ visible, data ]);

    return(

        <Modal
            title={ isEdited ? '编辑分类' : '添加分类' }
            visible={ visible }
            width={ 500 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
         >
             
            <Form style={{ width : '90%', margin : '0 auto' }} layout="vertical" >

                <Form.Item label="分类名称">
                        {getFieldDecorator('category_name', {
                            initialValue : data.category_name,
                            rules: [{ required: true, message: '分类名称' }],
                        })( <Input  placeholder="请输入分类名称" />)}
                    </Form.Item>

                    {/* <Form.Item label="分类图片">
                        {getFieldDecorator('img_url', { 
                            initialValue : [],
                            valuePropName: 'fileList',
                            getValueFromEvent: normFile,
                            rules: [ {  required: true,  message: '上传图片' }, ] })(  
                                <Upload 
                                    multiple // 多个上传处理, 可能会存在bug
                                    beforeUpload={ () =>{ return false } }
                                    //  onRemove={ this.handleRemoveFile } ***** 暂时用不到该方法 *****
                                    className="upload-list-inline" 
                                    listType="picture" >
                                    <Button><Icon type="upload" /> 上传 </Button>
                                </Upload>,
                            )
                        }
                    </Form.Item>


                    <Form.Item label="分类简介">
                        {getFieldDecorator('front_desc', {
                            rules: [{ required: true, message: 'Please enter user name' }],
                        })( <TextArea rows={4} />)}
                    </Form.Item>


                    <Form.Item label="分类排序">
                        {getFieldDecorator('sort_order', {
                            rules: [ { required: true, message: '商品编号' } ],
                        })( <InputNumber style={{  width : '100%'  }} min={1} max={10} /> )}
                    </Form.Item>


                    <Form.Item label="显示分类">
                        {getFieldDecorator('is_show', {
                            valuePropName: 'checked',
                            rules: [{ required: true, message: 'Please enter user name' }],
                        })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
                    </Form.Item> */}

                </Form>

        </Modal>
    )
}



export default Form.create()( EditForm );


