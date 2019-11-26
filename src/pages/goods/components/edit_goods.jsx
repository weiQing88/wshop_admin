import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { UploadImage, UploadPlusButton } from '@/components/widgets';
import { Drawer, Form,InputNumber, Button, Col, Row, Input, Select, Switch, Upload, Icon } from 'antd';
const { TextArea } = Input;
const { Option } = Select;


 let EditForm = function( props ){
    let { dispatch, form, isEdited, loading, category  } =  props;
    let { getFieldDecorator } = form;
    let formItemStyle ={ width : 350 }

    let [ visible, setVisible ] = useState( false );
    let [ imageUrl, setImageUrl ] = useState('');

    // 图片转换
    let getBase64 = (img, callback) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => callback(reader.result));
          reader.readAsDataURL(img);
        }
    
      // 上传图片方法
      let normFile = e => {
        //  console.log('Upload event:', e );
      let { file, fileList } = e;
      
    
       if (Array.isArray(e)) {
            return e;
        }else{
         if( e.fileList.length > 1 ){
             e.fileList =[ e.fileList[0] ];
         }   
         let flag = true;
         let isLt500M = file.size / 1024 / 1024 < 500;
         let whileList =  [ 'image/jpeg', 'image/bmp', 'image/gif', 'image/png' ];
           if( whileList.indexOf( e.file.type ) == -1 ){
                  message.error('仅支持 jpg、jpeg、bmp、gif、png 图片文件格式!');
                   flag = false;
             }
              if (!isLt500M) {
                  flag = false;
                  message.error('限图片文件小于500MB!');
              }
            if( flag ){
                if( file.status != 'removed' ) getBase64( file.originFileObj || file, imgUrl => {  setImageUrl( imgUrl )  });
                return e && e.fileList;
            }else{
                  return []
            }
        }
     };
 
      // 移除图片
     let handleRemove = file => {
           form.setFieldsValue({ avatar : undefined });
           setImageUrl('');
     }

    let onClose = () => {
            dispatch({  type : 'goods/toggle', payload : false })  
       }

    useEffect(() =>{ 
         if( props.visible && visible == false ){
                console.log( ' edit_goods 打开' )
               setVisible( true );
         }
         if( props.visible == false && visible ){
                console.log( ' edit_goods 关闭' )
               setVisible( false );
         }
     }, [ props.visible ]);

     return (
        <Drawer
          title={ isEdited ? "编辑商品" : "添加商品" }
          width={ 720 }
          onClose={ onClose }
          visible={ visible }
          maskClosable={ false }
        >
        <Form layout="vertical" >
            <Form.Item label="商品类型">
                  {getFieldDecorator('type', {
                    rules: [{ required: true, message: '请选择商品类型' }],
                  })( <Select allowClear style={ formItemStyle } placeholder="商品类型">
                     {
                       category.map(( item,index )=>(  <Option key={ index } value={ item.category_id }> { item.category_name } </Option> ))
                     }
                </Select>)}
             </Form.Item>

             <Form.Item label="商品名称">
                  {getFieldDecorator('goods_name', {
                    rules: [{ required: true, message: '商品名称' }],
                  })( <Input style={ formItemStyle } placeholder="请输入商品名称" />)}
             </Form.Item>

             <Form.Item label="商品数量/库存">
                  {getFieldDecorator('goods_number', {
                    rules: [{ required: true, message: '商品名称' }],
                  })( <InputNumber min={0} style={ formItemStyle } placeholder="请输入商品数量/库存" />)}
             </Form.Item>


             <Form.Item label="商品编号">
                  {getFieldDecorator('goods_sn', {
                    rules: [{ required: false, message: '商品编号' }],
                  })( <Input style={ formItemStyle } placeholder="请输入商品编号" />)}
             </Form.Item>


             <Form.Item label="商品品牌">
                  {getFieldDecorator('brand_name', {
                    rules: [{ required: false, message: '请输选择商品品牌' }],
                  })( <Select style={ formItemStyle } placeholder="商品品牌">
                     <Option value="1230034">自营品牌</Option>
                </Select>)}
             </Form.Item>


            <Row>
              <Col span={8}>
                <Form.Item label="上架">
                    {getFieldDecorator('is_on_sale', {
                      valuePropName: 'checked',
                      rules: [{ required: true, message: '请输选择上架' }],
                    })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
              </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="推荐">
                      {getFieldDecorator('is_recommend', {
                        valuePropName: 'checked',
                        rules: [{ required: true, message: '请输选推荐' }],
                      })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="热门">
                      {getFieldDecorator('is_hot', {
                        valuePropName: 'checked',
                        rules: [{ required: true, message: '请输选热门' }],
                      })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
                </Form.Item>
              </Col>
            </Row>
            
               <Form.Item >
                    {getFieldDecorator('goods_img', {
                         valuePropName: 'fileList',
                           getValueFromEvent: normFile,
                     })( <Upload 
                          name="goods_img" 
                          listType="picture-card"
                          className="goods-img-uploader"
                          onRemove={ handleRemove }
                          beforeUpload={ ( file, fileList ) =>{ return false }}
                          >
                          {
                            imageUrl ? null :   <UploadPlusButton />
                          }
                      </Upload>,
                    )}
               </Form.Item>

             <Form.Item label="商品简介">
                  {getFieldDecorator('goods_brief', {
                    rules: [{ required: true, message: 'Please enter user name' }],
                  })( <TextArea rows={4} />)}
             </Form.Item>

        </Form>
        <div
          style={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e9e9e9',
                padding: '10px 16px',
                background: '#fff',
                textAlign: 'right',
          }}
        >
          <Button onClick={ onClose } style={{ marginRight: 8 }}> 取消  </Button>
          <Button onClick={ onClose } type="primary"> 提交 </Button>
        </div>
      </Drawer>
     )
}



const EDITFORM = Form.create()(EditForm);

export default EDITFORM;