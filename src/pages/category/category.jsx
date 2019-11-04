import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';

import {  Button, Tabs, Card, Icon, Badge, Table, Divider  } from 'antd';


const data = [
  {
    id :1,
    index : 1,
    category_name : '酸野',
    category_type : '酸',
    category_icon : 'xx',
    category_sort : 2,
  } 
];
 


 const Category = function({ dispatch, goodsEditFormVisible, searchFormVisible, limit, loading, total, page }){

    const onTableChange = pageNumber => {}

    const onTableShowSizeChange = (current,pageSize) => {}


     useEffect(() =>{}, []);
      
      return (
         <AppLayout style={{ backgroundColor : '#f0f2f5'}} >

             <div className="category-toolbar"> 
                 <Button  style={{ margin : '15px 0 0 10px' }} type="primary"> 添加分类 </Button>
               </div>
             
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
                  total : Number(total) | 0,
                  showTotal: function(total,pageSize){
                      return `共${Number(total)}条`
                  },
                      onChange: onTableChange,
                      onShowSizeChange: onTableShowSizeChange
                  }} 
                 columns={
                     [
                        {
                            title: '序号',
                            dataIndex: 'index',
                             key: 'index',
                             align : 'center',
                          },
                      {
                        title: '名称',
                        dataIndex: 'category_name',
                        key: 'category_name',
                        align : 'center',

                      },

                      {
                        title: '商品类型',
                        dataIndex: 'category_type',
                        key: 'category_type',
                        align : 'center',

                      },

                      {
                        title: '图标',
                        dataIndex: 'category_icon',
                        key: 'category_icon',
                        align : 'center',

                      },


                      {
                        title: '排序',
                        dataIndex: 'category_sort',
                        key: 'category_sort',
                        align : 'center',

                      },

                      {
                        title: '前台显示',
                        dataIndex: 'is_show',
                        key: 'is_show',
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
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />
         </AppLayout>    
      )
}



function mapStateToProps(state) {
  const { goodsEditFormVisible, searchFormVisible, limit, total, page } = state.goods;
  return {
        searchFormVisible,
        goodsEditFormVisible,
        page,
        limit,
        total,
       loading: state.loading.models.goods,
  };

}

export default connect(mapStateToProps)(Category);