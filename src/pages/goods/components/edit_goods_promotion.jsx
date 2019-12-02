import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { UploadPlusButton } from '@/components/widgets';
import util from '@/util';
import { Modal, Form,InputNumber, Input, Select, Switch, DatePicker, Upload, Icon } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const GoodsPromotion = props => {
    let { dispatch, form, loading, initData  } =  props;
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
        let files = form.getFieldValue('promotion_img');
        for( let i = files.length - 1; i > -1; i-- ){
            if( files[i].uid == file.uid ) files.splice( i, 1 );
        }

        if( files.length <= 0 ){
             files = undefined;
             setLen( 0 );
        }
          form.setFieldsValue({ promotion_img : files });
          setLen( len - 1 );
  }



   // 提交
   let handleOk = () => {
        if( loading ) return;
        form.validateFields((err, fieldsValue) => {
            if(err) return;
            fieldsValue.promote_start_date = fieldsValue.promote_date[0].format('YYYY-MM-DD HH:mm:ss');
            fieldsValue.promote_end_date = fieldsValue.promote_date[1].format('YYYY-MM-DD HH:mm:ss');
            delete fieldsValue.promote_date;
            fieldsValue.is_promote = fieldsValue.is_promote ? '1' : '0';
            fieldsValue.goods_id = initData.goods_id;
            if( fieldsValue.promotion_img ){
                let uploadedImgs = [];
                for( let i = fieldsValue.promotion_img.length - 1; i > -1; i-- ){
                     if( fieldsValue.promotion_img[i].status == 'uploaded' ) uploadedImgs.push(fieldsValue.promotion_img.splice(i, 1)[0].url );
                }
                uploadedImgs.length ? fieldsValue.uploaded_img = uploadedImgs.join(',') : '';
                fieldsValue.promotion_img.length <= 0 ?  delete fieldsValue.promotion_img : '';
            }else{
                delete fieldsValue.promotion_img;
            }

            let formdata = new FormData();
             
            Object.keys( fieldsValue ).forEach( key => {
                   if( key == 'promotion_img'){
                      fieldsValue.promotion_img.forEach( img => {
                           formdata.append('promotion_img', img.originFileObj );
                      })
                   }else{
                    formdata.append( key, fieldsValue[key]);
                   }
                
            })

            dispatch({
                   type : 'goods/setPromotion',
                   payload : formdata
            })
        })
   }

   let handleCancel = () => {
            dispatch({ 
                type : 'goods/setState', 
                payload : [
                        {  key : 'promotionFormVisible', value : false  },
                        {  key : 'goodsFormInitialData', value : {} }
                ]  
            });
   }


    // 转换时间格式
   let promotion_date = undefined;
     if( initData.promote_start_date &&  initData.promote_end_date ){
        promotion_date = [ moment(  initData.promote_start_date ), moment(  initData.promote_end_date ) ];
     }


   
 useEffect(() =>{ 

    if( props.visible && visible == false ){
           console.log( ' GoodsPromotion 打开' )
          setVisible( true );
    }
    if( props.visible == false && visible ){
           console.log( ' GoodsPromotion 关闭' )
           form.resetFields();
           setLen(0);
           setVisible( false );
    }
}, [ props.visible ]);




    return (<Modal
        title='商品促销'
        visible={ visible }
        width={ 680 }
        onOk={ handleOk }
        onCancel={ handleCancel }
        cancelText={'取消'}
        okText={'确定'}
    >
        <Form layout="vertical" style={{ maxHeight : 550, overflowY : 'auto' }} >

            <Form.Item label="促销价">
                {getFieldDecorator('promote_price', {
                    initialValue : initData.promote_price,
                    rules: [{ required: true, message: '请输入商品销售价' }],
                })( <InputNumber min={0} style={ formItemStyle } placeholder="销售价" />)}
            </Form.Item>
            
            <Form.Item label="促销时间">
                {getFieldDecorator('promote_date', {
                    initialValue : promotion_date,
                    rules: [{ required: true, message: '请输入商品编号' }],
                })( 
                    <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" placeholder={['开始时间', '结束时间']}/>
                )}
            </Form.Item>
      
            <Form.Item label="促销">
                    {getFieldDecorator('is_promote', {
                      initialValue : initData.is_promote == '1' ? true : false,
                      valuePropName: 'checked',
                      rules: [{ required: true, message: '请输选择状态' }],
                    })(  <Switch checkedChildren="开" unCheckedChildren="关"  /> )}
              </Form.Item>

              <Form.Item >
                    {getFieldDecorator('promotion_img', {
                           valuePropName: 'fileList',
                           getValueFromEvent: normFile,
                           initialValue : initData.promotion_img,
                     })( <Upload 
                          name="goods_img" 
                          listType="picture-card"
                          className="goods-img-uploader"
                          onRemove={ handleRemove }
                          beforeUpload={ ( file, fileList ) =>{ return false }}
                          >
                           {
                              len == 4 ? null : <UploadPlusButton text="促销海报" />
                           }
                      </Upload>
                    )}
               </Form.Item>
    
          <Form.Item label="促销描述">
              {getFieldDecorator('promotion_desc', {
                initialValue : initData.promotion_desc,
                rules: [{ required: true, message: '请输入商品简介' }],
              })( <TextArea rows={4} />)}
          </Form.Item>

        </Form>
    </Modal>
    )
}

export default Form.create()( GoodsPromotion );


