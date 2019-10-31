import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import Toolbar from '@/components/toolbar';
import ToolbarTabs from '@/components/toolbar/tabs';

import GoodsEditForm from './components/edit_form';
import { Tabs, Card, Icon, Badge, Table, Divider  } from 'antd';


const data = [
  {
    id :1,
    goods_name : '爽脆姜酸',
    goods_number : 20,
    shop_price : 36,
    market_price : 37,
    goods_thumb : '',
    category_name : '酸野',
    is_hot : 1,
    is_recommend : 0,
    is_on_sale : 1,
  } 
];
 




export default function(){

    let [ page, setPage ] = useState(1);
    let [ limit, setLimit ] = useState(10);
    let [ count, setCount ] = useState(30);
    let [ goodsEditFormVisible, setGoodsEditFormVisible ] = useState(true);


    let [ key, setKey ] = useState( 1 );

    let onTableChange = pageNumber => {}

    let onTableShowSizeChange = (current,pageSize) => {}


    let  handleGoodsEditFormEvent = () => {
          
    }



     useEffect(() =>{}, []);
      
      return (
         <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
               <Toolbar />
               <ToolbarTabs />
               <Table  
                 bordered 
                 style={{ backgroundColor : '#fff' }}
                // scroll={{ y : '600px' }}
                 pagination={{
                  pageSizeOptions: ['10','20', '30', '50'],
                  current: Number(page), 
                  pageSize: Number(limit),
                  showQuickJumper: true,
                  showSizeChanger: true,
                  total : Number(count) | 0,
                  showTotal: function(total,pageSize){
                      return `共${Number(count)}条`
                  },
                      onChange: onTableChange,
                      onShowSizeChange: onTableShowSizeChange
                  }} 
                 columns={
                     [
                      {
                        title: '名称',
                        dataIndex: 'goods_name',
                        key: 'goods_name',
                        align : 'center',

                      },

                      {
                        title: '库存',
                        dataIndex: 'goods_number',
                        key: 'goods_number',
                         align : 'center',
                      },

                      {
                        title: '销售价格',
                        dataIndex: 'shop_price',
                        key: 'shop_price',
                         align : 'center',
                      },

                      {
                        title: '市场价',
                        dataIndex: 'market_price',
                        key: 'market_price',
                         align : 'center',
                      },

                      {
                        title: '缩略图',
                        dataIndex: 'goods_thumb',
                        key: 'goods_thumb',
                         align : 'center',
                      },

                      {
                        title: '分类',
                        dataIndex: 'category_name',
                        key: 'category_name',
                         align : 'center',
                      },

                      {
                        title: '热门',
                        dataIndex: 'is_hot',
                        key: 'is_hot',
                         align : 'center',
                      },


                      {
                        title: '推荐',
                        dataIndex: 'is_recommend',
                        key: 'is_recommend',
                         align : 'center',
                      },


                      {
                        title: '上下架',
                        dataIndex: 'is_on_sale',
                        key: 'is_on_sale',
                        align : 'center',
                      },

                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        width : 230,
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button type="button"> 编辑 </button>
                              <button type="button"> 删除 </button>
                              <button type="button"> 查看评价 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />


           <GoodsEditForm 
               onChange={ handleGoodsEditFormEvent } 
               visible={ goodsEditFormVisible }
               />

         </AppLayout>    
      )
}