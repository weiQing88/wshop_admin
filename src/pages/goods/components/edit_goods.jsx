import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { UploadPlusButton } from '@/components/widgets';
import util from '@/util';
import { Drawer, Form,InputNumber, Button, Col, Row, Input, Select, Switch, Upload, Icon } from 'antd';
const { TextArea } = Input;
const { Option } = Select;


 let EditForm = function( props ){
    let { dispatch, form, isEdited, loading, category, initData  } =  props;
    let { getFieldDecorator } = form;
    let formItemStyle ={ width : 350 }
    let [ visible, setVisible ] = useState( false );
    let [ len, setLen ] = useState(0);

      // 上传图片方法
      let normFile = e => {
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
                  setLen( len + 1 );
                    return fileList
                }else{
                   for( let i = fileList.length - 1; i > -1; i-- ){
                       if( fileList[i].uid == file.uid ) fileList.splice( i, 1 );
                   }
                    return fileList
                }
     };
 
      // 移除图片
     let handleRemove = file => {
           let files = form.getFieldValue('goods_img');
           for( let i = files.length - 1; i > -1; i-- ){
               if( files[i].uid == file.uid ) files.splice( i, 1 );
           }

           if( files.length <= 0 ){
                files = undefined;
                setLen( 0 );
           }
             form.setFieldsValue({ goods_img : files });
             setLen( len - 1 );
     }



    let handleCancel = () => {
            dispatch({  type : 'goods/toggle', payload : false })  
       }



    let handleSubmit = () => {
         if( loading ) return;
         form.validateFields((err, fieldsValue) => {
               if(err) return;
                [ 'brand_id', 'goods_img', 'goods_sn', 'keywords', 'counter_price', 'market_price'].forEach( key => {
                     if( fieldsValue[key] == undefined ) delete  fieldsValue[key];
                });
                [ 'is_on_sale', 'is_recommend' ,'is_hot' ].forEach( key => {
                      fieldsValue[key] =  fieldsValue[key] ? '1' : '0';
                });

                isEdited && (fieldsValue.goods_id = initData.goods_id);

               // 分类名称
                category.forEach( ctg => {  
                   if( fieldsValue.category_id == ctg.category_id ) fieldsValue.category_name = ctg.category_name;
                   });

               Object.keys( fieldsValue ).forEach( key =>{  typeof fieldsValue[key] == 'number' ?  fieldsValue[key] = String( fieldsValue[key]  ) : '' })

               if( fieldsValue.goods_img ){
                   let formdata = new FormData();
                   let uploaded_img = [];
                       Object.keys( fieldsValue ).forEach( key => {
                            if( key == 'goods_img' ){
                                   fieldsValue.goods_img.forEach(( img, index ) =>{
                                     // 在编辑时，已上传图片数据与新上传图片文件会混合一起，需区分。
                                      if( typeof img.uid == 'number' && img.uid < 0 ){ 
                                            uploaded_img.push( img.url  )
                                      }else{
                                         formdata.append('goods_img', img.originFileObj );
                                      }
                                  });
                            }else{
                                  formdata.append( key, fieldsValue[key] );
                            }
                       });

                       if( uploaded_img.length ) formdata.append(`uploaded_img`, uploaded_img.join(',') );
                      dispatch({ type : 'goods/editGoods', payload : formdata })
               }else{
                     dispatch({ type : 'goods/editGoods', payload : fieldsValue })
               }


         })
    }


    useEffect(() =>{ 
         if( props.visible && visible == false ){
                console.log( ' edit_goods 打开' )
               setVisible( true );
         }
         if( props.visible == false && visible ){
                console.log( ' edit_goods 关闭' )
                form.resetFields();
                setLen(0);
                setVisible( false );
         }
     }, [ props.visible ]);



     return (
        <Drawer
          title={ isEdited ? "编辑商品" : "添加商品" }
          width={ 760 }
          onClose={ handleCancel }
          visible={ visible }
          maskClosable={ true }
        >
        <Form layout="vertical" >
            <Form.Item label="商品类型">
                  {getFieldDecorator('category_id', {
                    initialValue : initData.category_id,
                    rules: [{ required: true, message: '请选择商品类型' }],
                  })( <Select allowClear style={ formItemStyle } placeholder="类型">
                     {
                       category.map(( item,index )=>(  <Option key={ index } value={ item.category_id }> { item.category_name } </Option> ))
                     }
                </Select>)}
             </Form.Item>

             <Form.Item label="商品名称">
                  {getFieldDecorator('goods_name', {
                    initialValue : initData.goods_name,
                    rules: [{ required: true, message: '请输入商品名称' }],
                  })( <Input style={ formItemStyle } placeholder="名称" />)}
             </Form.Item>

             <Form.Item label="商品数量/库存">
                  {getFieldDecorator('goods_number', {
                    initialValue : initData.goods_number,
                    rules: [{ required: true, message: '请输入商品数量/库存' }],
                  })( <InputNumber min={0} style={ formItemStyle } placeholder="数量/库存" />)}
             </Form.Item>


             <Form.Item label="商品货号/编号">
                  {getFieldDecorator('goods_sn', {
                   initialValue : initData.goods_sn,
                    rules: [{ required: false, message: '请输入货号/编号号' }],
                  })( <Input style={ formItemStyle } placeholder="货号/编号" />)}
             </Form.Item>


             <Form.Item label="商品品牌">
                  {getFieldDecorator('brand_id', {
                    initialValue : initData.brand_id,
                    rules: [{ required: false, message: '请输选择商品品牌' }],
                  })( <Select style={ formItemStyle } placeholder="品牌">
                     <Option value="1230034">自营品牌</Option>
                </Select>)}
             </Form.Item>

             <Form.Item label="商品销售价">
                  {getFieldDecorator('shop_price', {
                     initialValue : initData.shop_price,
                    rules: [{ required: true, message: '请输入商品销售价' }],
                  })( <InputNumber min={0} style={ formItemStyle } placeholder="销售价" />)}
             </Form.Item>

             <Form.Item label="商品市场价">
                  {getFieldDecorator('market_price', {
                     initialValue : initData.market_price,
                    rules: [{ required: false, message: '请输入商品市场价' }],
                  })( <InputNumber min={0} style={ formItemStyle } placeholder="市场价" />)}
             </Form.Item>

             <Form.Item label="商品折扣价">
                  {getFieldDecorator('counter_price', {
                     initialValue : initData.counter_price,
                    rules: [{ required: false, message: '请输入商品折扣价' }],
                  })( <InputNumber min={0} style={ formItemStyle } placeholder="折扣价" />)}
             </Form.Item>


             <Form.Item label="商品关键词">
                  {getFieldDecorator('keywords', {
                    initialValue : initData.keywords,
                    rules: [{ required: false, message: '请输入商品关键词' }],
                  })( <Input style={ formItemStyle } placeholder="多词用‘ ，’隔开" />)}
             </Form.Item>


            <Row>
              <Col span={8}>
                <Form.Item label="上/下架">
                    {getFieldDecorator('is_on_sale', {
                      valuePropName: 'checked',
                      initialValue : initData.is_on_sale == 1 ? true : false,
                      rules: [{ required: true, message: '请输选择上架' }],
                    })(  <Switch checkedChildren="上" unCheckedChildren="下"  /> )}
              </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="推荐">
                      {getFieldDecorator('is_recommend', {
                        valuePropName: 'checked',
                        initialValue : initData.is_recommend == 1 ? true : false,
                        rules: [{ required: true, message: '请输选推荐' }],
                      })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="热门">
                      {getFieldDecorator('is_hot', {
                        valuePropName: 'checked',
                        initialValue : initData.is_hot == 1 ? true : false,
                        rules: [{ required: true, message: '请输选热门' }],
                      })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
                </Form.Item>
              </Col>
            </Row>
            
               <Form.Item >
                    {getFieldDecorator('goods_img', {
                           valuePropName: 'fileList',
                           getValueFromEvent: normFile,
                           initialValue : initData.goods_img,
                     })( <Upload 
                          name="goods_img" 
                          listType="picture-card"
                          className="goods-img-uploader"
                          onRemove={ handleRemove }
                          beforeUpload={ ( file, fileList ) =>{ return false }}
                          >
                           {
                              len > 5 ? null : <UploadPlusButton />
                           }
                      </Upload>
                    )}
               </Form.Item>

             <Form.Item label="商品简介">
                  {getFieldDecorator('goods_brief', {
                    initialValue : initData.goods_brief,
                    rules: [{ required: true, message: '请输入商品简介' }],
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

          <Button onClick={ handleCancel } style={{ marginRight: 8 }}> 取消  </Button>
          <Button onClick={ handleSubmit } type="primary"> 提交 </Button>
        </div>
      </Drawer>
     )
}



const EDITFORM = Form.create()(EditForm);

export default EDITFORM;