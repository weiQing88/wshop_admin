import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import Toolbar from './components/toolbar';
import { ToolbarTabs, TableSrollStatus } from '@/components/widgets';
import GoodsEditForm from './components/edit_goods';
import GoodsPromotion from './components/edit_goods_promotion';
import BulkEditModal from './components/bulk_edit';
import { Table, Switch, Popconfirm, message, Modal  } from 'antd';
import util from '@/util';

 const Goods = props => {
      let {
         dispatch, 
         promotionFormVisible,
         goodsFormInitialData,
         goodsEditFormVisible,
         promotionInitialData,
         isEdited, 
         categoryDataSource, 
         dataSource,
         searchFormVisible, 
         bulkEditVisible,
         limit, 
         loading, 
         total,
         history,
         tabsItem,
         selectedRowKeys,
         bulkEditType,
         page } = props;


      // Table Scroll Y 
      let y = TableSrollStatus( 217 );

     // 分页处理函数
     let onTableChange = (page, pageSize) => {
       let query = util.getQuery();
          query.page = page;
          query.limit = pageSize;
          dispatch({ type : 'goods/fetGoodsData', payload : query })
       };


     // 分页页码处理函数
      let onTableShowSizeChange = (current, size) => {
             let query = util.getQuery();
                  query.page = current;
                  query.limit = size;
              dispatch({ type : 'goods/fetGoodsData', payload : query })
        };



    // 表单单元事件  
    let handleTableCellEvent = ({ type, record }) => {
               if( loading ) return;
                if( type == 'edit' ){
                      dispatch({
                             type : 'goods/setState', 
                            payload : [
                              {  key : 'goodsEditFormVisible', value : true  },
                              {  key : 'isEdited', value : true },
                              {  key : 'goodsFormInitialData', value :  record  }
                            ]
                      });
                   dispatch({   type : 'category/fetCategory'});
                }else if( type == 'delete' ){
                  dispatch({
                          type : 'goods/deleteGoods', 
                          payload : { goods_id : record.goods_id }
                  });
                }else if( type == 'promotion' ){
                  if( record.is_on_sale == '1' ){
                        dispatch({
                          type : 'goods/setState', 
                            payload : [
                              {  key : 'promotionFormVisible', value : true  },
                              {  key : 'promotionInitialData', value :  record  }
                            ]
                      })
                  }else{
                     message.warning('商品必须先上架')
                  }
                   
                }else if( type == 'comment' ){ 
                 // 留后期做
              }
    }




   // 工具栏处理函数
   let  handleToolbarEvent = ( arg ) => {
            if( loading ) return;
            let { type, visible, data } = arg;
            if( type == 'search' ){ // 搜索
               let items = util.deepCopyArray( tabsItem ),
                   query = util.getQuery(),
                   { data } = arg;
                    Object.keys( data ).forEach( key =>{  query[key] = data[key] });
                     query.page = 1;
                     query.limit = limit;
                     query.type = undefined;
                     items.forEach( itm => { itm.selected = itm.name == '全部商品' ? true : false  });
                     dispatch({ type : 'goods/setState', payload : { key : 'tabsItem', value : items } });
                     dispatch({  type : 'goods/fetGoodsData', payload : query });
            }else if( type == 'reset' ){  // 重置搜索框
                  let items = util.deepCopyArray( tabsItem );
                      items.forEach( itm => { itm.selected = itm.name == '全部商品' ? true : false  });
                  dispatch({ type : 'goods/setState',  payload : { key : 'tabsItem', value : items } });
                  dispatch({ type : 'goods/fetGoodsData', payload : undefined });
                  return true; // 返回true,清空搜索栏
            } else if( type == 'add' ){
                  dispatch({ 
                        type : 'goods/setState', 
                        payload : [
                                {  key : 'goodsEditFormVisible', value : true  },
                                {  key : 'isEdited', value : false },
                                {  key : 'goodsFormInitialData', value : {} }
                          ]  
                    });
            }else if( type == 'menuEvent' ){
                 if( selectedRowKeys.length ){
                      let { key } = arg.data; 
                      if( key == 'price' || key == 'stock' ){
                              dispatch({
                                type : 'goods/setState',
                                payload : [
                                  {
                                      key : 'bulkEditVisible',
                                      value : true
                                  },{
                                    key : 'bulkEditType',
                                    value : key,
                                  }
                                ]
                            })
                      }else if( key == 'on_sale' ||  key == 'not_sale' ){
                            let param = selectedRowKeys.map( id =>({ id, on_sale :  key == 'on_sale' ? '1' : '0' }));
                            dispatch({ type : 'goods/bulkedit', payload : { goods : param, type : 'update' } });
                      }else if( key == 'delete'){
                            Modal.confirm({
                              title: '确定要删除?',
                              content: '',
                              okText: '是',
                              okType: 'danger',
                              cancelText: '否',
                              onOk : () => {
                                    dispatch({ type : 'goods/bulkedit', payload : { goods : selectedRowKeys, type : 'delete' } });
                              },
                              onCancel() {},
                            });
                      }

                 }else{
                     message.warning('请选择商品')
                 }
            }else if( type == 'searchModal' ){ // 预留后期搜索项比较多的时
                  // dispatch({ 
                  //     type : 'goods/setState', 
                  //     payload : { key : 'searchFormVisible',value : true }
                  //   });
            }
    }

  
    
   // table cell event
   let  handleSwitchEvent = arg => {
          if( loading ) return;
          let { type, id, checked } = arg;
          dispatch({ 
                  type : 'goods/editStatus',
                  payload : { id, [type] : checked ? '1' : '0'  }
          });

   }


   let  handleTabsEvent = ({ name, type }) => {
         if( loading ) return;
         let items = util.deepCopyArray( tabsItem ),
             query = util.getQuery();
             items.forEach( itm => { itm.selected = itm.type == type ? true : false  });
          dispatch({
              type : 'goods/setState',
              payload : { key : 'tabsItem', value : items }
          });
          query.type = type == 'all' ? undefined : type;
          query.page = 1;
          query.limit = limit;
          dispatch({
              type : 'goods/fetGoodsData',
              payload : query,
          });
  
    }


   // 选择table 项
   let handleSelectChange = selectedRowKeys => {
       dispatch({
           type : 'goods/setState',
           payload : { key : 'selectedRowKeys', value : selectedRowKeys }
       })
  };




     useEffect(() =>{
        // 清空参数
       if( history.location.search ) history.push('/goods\/');
       // 获取商品类型数据
        dispatch({   type : 'category/fetCategory'});
       // 初始化获取数据
       dispatch({ type : 'goods/fetGoodsData', payload : undefined  });
        console.log(' goods 仅仅需要执行一次')
     }, []);

      return (
         <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
               <Toolbar category={ categoryDataSource } onClick={ handleToolbarEvent  } />
                <ToolbarTabs 
                   items={ tabsItem  }
                   onClick={ handleTabsEvent }
                    />
               <Table  
                  rowSelection={{
                      columnWidth : '40',
                      selectedRowKeys,
                      onChange: handleSelectChange,
                  }}
                  bordered
                  tableLayout="fixed" 
                  style={{ backgroundColor : '#fff' }}
                  scroll={{ y }}
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
                        title: '销售价格/元',
                        dataIndex: 'shop_price',
                        key: 'shop_price',
                         align : 'center',
                         width : '10%',
                          ellipsis: true,
                      },

                      {
                        title: '市场价/元',
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
                          render : ( text, record ) => (
                             <img style={{ 
                                 display : 'block', 
                                 margin : '0 auto', 
                                 width : 50, 
                                 height : 50,
                                 cursor : 'pointer'
                                 }} src={ (  record.goods_img && record.goods_img[0] ) ? record.goods_img[0].url : '' } alt=""/>
                          )
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
                          render : ( text, record ) => (
                            <Switch onChange={ checked => {  handleSwitchEvent({ type : 'is_hot', id : record.goods_id , checked })   }} 
                                checkedChildren="开" unCheckedChildren="关" checked={ text == '1' ? true : false }  />
                          )
                      },

                      {
                        title: '推荐',
                        dataIndex: 'is_recommend',
                        key: 'is_recommend',
                         align : 'center',
                         width : '5%',
                          ellipsis: true,
                          render : ( text, record ) => (
                            <Switch onChange={ checked => {  handleSwitchEvent({ type : 'is_recommend', id : record.goods_id , checked })   }} 
                              checkedChildren="开" unCheckedChildren="关" checked={ text == '1' ? true : false }  />
                          )
                      },

                      {
                        title: '上下架',
                        dataIndex: 'is_on_sale',
                        key: 'is_on_sale',
                        align : 'center',
                        width : '5%',
                         ellipsis: true,
                         render : ( text, record ) => (
                          <Switch onChange={ checked => { handleSwitchEvent({ type : 'is_on_sale', id : record.goods_id , checked })   }}
                             checkedChildren="上" unCheckedChildren="下" checked={ text == '1' ? true : false }  />
                        )
                      },

                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        width : '15%',
                        ellipsis: true,
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button type="button" onClick={ handleTableCellEvent.bind(this, { type : 'edit', record }) } > 编辑 </button>
                               <Popconfirm title="确定删除？" onConfirm={ handleTableCellEvent.bind(this, { type : 'delete', record }) } okText="是" cancelText="否" >
                                 <button type="button"> 删除 </button>
                               </Popconfirm>
                              <button type="button" onClick={ handleTableCellEvent.bind(this, { type : 'promotion', record }) } > 促销 </button>
                              {/* 暂时隐藏该功能 <button type="button" onClick={ handleTableCellEvent.bind(this, { type : 'comment', record }) } > 查看评价 </button> */}
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />

         {/* <AdvancedSearch  visible={ searchFormVisible }   onClick={ handleAdSearch } />  高级搜索 */}

            <BulkEditModal
                    dispatch={ dispatch }
                    loading={ loading }
                    data={{ selected : selectedRowKeys, type : bulkEditType }}
                    visible={ bulkEditVisible }
              />
                
           <GoodsEditForm
                  visible={ goodsEditFormVisible }
                  isEdited={ isEdited }
                  dispatch={ dispatch }
                  loading={ loading }
                  initData={ goodsFormInitialData }
                  category={ categoryDataSource }
             />

          <GoodsPromotion
               visible={ promotionFormVisible }
               dispatch={ dispatch }
               loading={ loading }
               initData={ promotionInitialData }
             />

         </AppLayout>    
      )
}



function mapStateToProps(state) {
  const { goodsEditFormVisible,goodsFormInitialData, 
        promotionInitialData, promotionFormVisible, 
        searchFormVisible, 
        tabsItem,
        selectedRowKeys,
        bulkEditVisible,
        bulkEditType,
        isEdited, dataSource, limit, total, page } = state.goods;
  const { dataSource : categoryDataSource } = state.category;

  return {
        promotionFormVisible,
        promotionInitialData,
        searchFormVisible,
        goodsEditFormVisible,
        categoryDataSource,
        goodsFormInitialData,
        selectedRowKeys,
        bulkEditVisible,
        bulkEditType,
        tabsItem,
        isEdited,
        page,
        limit,
        total,
        dataSource,
       loading: state.loading.models.goods,
  };

}

export default connect(mapStateToProps)(Goods);