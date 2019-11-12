import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';

import Toolbar from './components/toolbar';
import { ToolbarTabs } from '@/components/widgets';

import GoodsEditForm from './components/edit_form';
import AdvancedSearch from './components/advancedSearch';
import { Tabs, Card, Icon, Badge, Table, Divider  } from 'antd';
import util from '@/util';

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
 


 const Goods = function({ dispatch, goodsEditFormVisible, categoryDataSource, dataObject, searchFormVisible, limit, loading, total, page }){

    let { data : dataSource = [], dataState = {} } = dataObject;

     // 分页处理函数
    const onTableChange = pageNumber => {}
     // 分页页码处理函数
    const onTableShowSizeChange = (current,pageSize) => {}



    const  handleGoodsEditFormEvent = () => {}


     // 高级搜索
    const handleAdSearch = ( arg ) => {
          switch( arg.type ){
              case 'cancel' : dispatch({  type : 'goods/searchmodal', payload : false  });
              break;
              case 'ok' : dispatch({  type : 'goods/searchmodal', payload : false  });
              break;
          }
    }




   // 工具栏处理函数
    const handleToolbarEvent = ( arg ) => {
            let { type, visible, data } = arg;
            if( type == 'search' ){
                 for( let key in data ){
                       if( !util.isValid( data[key] ) ) delete data[key];
                 }
               util.isValid( data ) &&  dispatch({  type : 'goods/searchGoodsData', payload : data, });
            }else if( type == 'reset'  ){
                    dispatch({
                      type : 'goods/fetGoodsData',
                      payload : undefined,
                   });
                return true;
            } else if( type == 'add' ){
              dispatch({  type : 'goods/toggle', payload : true,  isEdited : false  });
            }else if( type == 'menuEvent' ){
              console.log();
            }else if( type == 'searchModal' ){


                  
                  console.log( 'categoryDataSource', categoryDataSource )

                  
                 dispatch({  type : 'goods/showADVSModal' });


            }else if( type == 'resetFields' ){  // 重置搜索框
                 return true
            }
    }


    const handleTabEvent = ( arg ) => {
            console.log( arg )
    }




     useEffect(() =>{

       // 初始化获取数据
       dispatch({
          type : 'goods/fetGoodsData',
          payload : undefined,
       });
       
     console.log('仅仅需要执行一次')

     }, [dispatch]);


  
     let scrollY  =  window.appLayoutHeight ?  window.appLayoutHeight - 217 : true;

      return (
         <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
               <Toolbar onClick={ handleToolbarEvent  } />
                <ToolbarTabs 
                   items={[
                        { name : '全部商品',  count : 1, selected : true },
                        { name : '上架商品',  count : 1 },
                        { name : '下架商品',  count : 1 },
                        { name : '库存报警',  count : 1 },
                   ]}
                   onClick={ handleTabEvent }
                    />
               <Table  
                  bordered
                  tableLayout="fixed" 
                  style={{ backgroundColor : '#fff' }}
                  scroll={{ y : scrollY }}
                  pagination={{
                   style : { float : 'left', marginLeft : 10 },
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
                        title: '名称',
                        dataIndex: 'goods_name',
                        key: 'goods_name',
                        align : 'center',
                        width : '20%',
                        ellipsis: true,
                      },

                      {
                        title: '库存',
                        dataIndex: 'goods_number',
                        key: 'goods_number',
                         align : 'center',
                         width : '10%',
                          ellipsis: true,
                      },

                      {
                        title: '销售价格',
                        dataIndex: 'shop_price',
                        key: 'shop_price',
                         align : 'center',
                         width : '10%',
                          ellipsis: true,
                      },

                      {
                        title: '市场价',
                        dataIndex: 'market_price',
                        key: 'market_price',
                         align : 'center',
                         width : '10%',
                          ellipsis: true,
                      },

                      {
                        title: '缩略图',
                        dataIndex: 'goods_thumb',
                        key: 'goods_thumb',
                         align : 'center',
                         width : '10%',
                          ellipsis: true,
                      },

                      {
                        title: '分类',
                        dataIndex: 'category_name',
                        key: 'category_name',
                         align : 'center',
                         width : '10%',
                          ellipsis: true,
                      },

                      {
                        title: '热门',
                        dataIndex: 'is_hot',
                        key: 'is_hot',
                         align : 'center',
                         width : '5%',
                          ellipsis: true,
                      },


                      {
                        title: '推荐',
                        dataIndex: 'is_recommend',
                        key: 'is_recommend',
                         align : 'center',
                         width : '5%',
                          ellipsis: true,
                      },


                      {
                        title: '上下架',
                        dataIndex: 'is_on_sale',
                        key: 'is_on_sale',
                        align : 'center',
                        width : '5%',
                         ellipsis: true,
                      },

                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        width : '15%',
                        ellipsis: true,
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button type="button"> 编辑 </button>
                              <button type="button"> 删除 </button>
                              <button type="button"> 查看评价 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />

            <AdvancedSearch 
                    visible={ searchFormVisible }  
                    onClick={ handleAdSearch }

               />
                
           <GoodsEditForm />

         </AppLayout>    
      )
}



function mapStateToProps(state) {
  const { goodsEditFormVisible, searchFormVisible,  dataObject, limit, total, page } = state.goods;
  const { dataSource : categoryDataSource } = state.category;

  return {
        searchFormVisible,
        goodsEditFormVisible,
        categoryDataSource,
        page,
        limit,
        total,
        dataObject,
       loading: state.loading.models.goods,
  };

}

export default connect(mapStateToProps)(Goods);