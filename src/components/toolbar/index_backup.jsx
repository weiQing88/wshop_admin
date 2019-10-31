import { useEffect, useState } from 'react';
import { Form, Select, Input, Button, } from 'antd';
const { Option } = Select;


const Toolbar = function( props ){
      let [ visible, setVisible ] = useState( false ); 
      const { getFieldDecorator } = props.form
      const formItemStyle = { width : 200 };

      useEffect(() =>{}, []);

      const toggle = e => {
          setVisible( !visible )
      } 

       return (
            <div className={["toolbar-wrapper", visible ? "open" : "close"].join(' ')}>
                <button onClick={ toggle } className={["toolbar-handle", , visible ? "open" : "close"].join(' ')}> 开 </button>
                <Form className="toolbar-form" layout="inline">
                        <Form.Item >
                        {getFieldDecorator('name')(
                            <Input style={ formItemStyle }  placeholder="请输入商品名称" />,
                        )}
                        </Form.Item>
                        <Form.Item >
                            {getFieldDecorator('status')(
                                <Select style={ formItemStyle } placeholder="上下架状态" >
                                    <Option value="0">全部</Option>
                                    <Option value="1">上架</Option>
                                    <Option value="2">下架</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item >
                        {getFieldDecorator('status')(
                                <Select style={ formItemStyle } placeholder="批量调整" >
                                    <Option value="0">修改价格</Option>
                                    <Option value="1">调整库存</Option>
                                    <Option value="2">批量上架</Option>
                                    <Option value="3">批量下架</Option>
                                    <Option value="4">删除</Option>
                                    <Option value="5">打标签</Option>
                                    <Option value="6">去标签</Option>
                                </Select>
                            )}
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary"> 搜索</Button>
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary"> 添加商品</Button>
                        </Form.Item>

                        <Form.Item>
                        <Button type="primary"> 高级搜索</Button>
                        </Form.Item>

                 </Form>
            </div>
       )
}


export default Form.create()(Toolbar);