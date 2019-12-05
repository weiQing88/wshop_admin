import { useState, useEffect } from 'react';
import { Form,InputNumber, Modal } from 'antd';

 const BulkEdit = function( props ){
     const { form, data, dispatch, loading } = props;
     const { getFieldDecorator } = form;

    var { selected, type } = data;

    const [ visible, setVisible ] = useState( false );


    const formItemLayout = {
         labelCol: { span: 6 },
         wrapperCol: {  span: 18 },
      };


    const handleOk = () =>{
         if( loading ) return;
        form.validateFields((err, fieldsValue) => {
              if (err) return;
              let key = Object.keys( fieldsValue )[0],
                  param = [];
                selected.forEach( id =>{
                    param.push({ id, [key]: fieldsValue[key]  });
                });
            dispatch({ type : 'goods/bulkedit', payload : { goods : param, type : 'update' } });
        })
    }

    const handleCancel  = () =>{
            dispatch({
              type : 'goods/setState',
              payload : [
                {
                    key : 'bulkEditVisible',
                    value : false
                },{
                  key : 'bulkEditType',
                  value : '',
                }
              ]
          });
    }


      
 useEffect(() =>{ 
  if( props.visible && visible == false ){
         console.log( ' BulkEdit 打开' )
        setVisible( true );
  }
  if( props.visible == false && visible ){
         console.log( ' BulkEdit 关闭' )
         form.resetFields();
         setVisible( false );
  }
}, [ props.visible ]);


     return (
          <Modal
                title={`批量编辑${ type == 'price' ? '价格' : '库存' }` }
                 visible={ visible }
                 width={ 500 }
                 onOk={ handleOk }
                 onCancel={ handleCancel }
                 cancelText={'取消'}
                 okText={'确定'}
            >
          <Form {...formItemLayout}   >
             {
                type == 'price' ? ( <Form.Item label="商品销售价">
                {getFieldDecorator('shop_price', {
                  rules: [{ required: true, message: '请输入商品销售价' }],
                })( <InputNumber min={0} style={{ width : 300 }} placeholder="销售价" />)}
              </Form.Item>) : (
                  <Form.Item label="商品数量/库存">
                      {getFieldDecorator('goods_number', {
                        rules: [{ required: true, message: '请输入商品数量/库存' }],
                      })( <InputNumber min={0}  style={{ width : 300 }} placeholder="数量/库存" />)}
                </Form.Item>)
             }
          </Form>
      </Modal>
        )
}



export default Form.create()( BulkEdit );