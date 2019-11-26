import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import EditForm from './components/edit_form';
import util from '@/util';
import {  Button, Switch, Tabs, Card, Icon, Badge, Table, Divider, Popconfirm } from 'antd';

/** 商品类型 */
 const Category = function({ dispatch, dataSource, formDataSource, visible, isEdited, limit, loading, total, page }){

    const onTableCellEvent = ( arg ) => {
            if( arg.type == 'edit'){
                  dispatch({
                    type : 'category/toggle',
                     payload : {
                        visible : true,
                        isEdited : true,
                        data : arg.data,
                    }
                  })
            }else if( arg.type == 'delet' ){
                  dispatch({
                    type : 'category/delete',
                    payload : { category_id : arg.data.category_id }
                  })
            }
    }




    const onTableChange = pageNumber => {}

    const onTableShowSizeChange = (current,pageSize) => {}


    
    const showEditForm = () => {
          dispatch({
              type : 'category/toggle',
              payload : {
                  visible : true,
                  isEdited : false,
              }
          })
    }


    const handleFormEvent =  () => {}

    const transform = ( attrs ) => {
           if( util.isValid( attrs ) ){
              let ats = attrs.map( item => item.attr_name );
              return ats.join('、')
           }else{
             return ''
           }
    }


     useEffect(() =>{
          dispatch({   type : 'category/fetCategory'});
          console.log(' category 仅执行一次')
     }, []);

    
      return (
         <AppLayout style={{ backgroundColor : '#f0f2f5'}} >

             <div className="category-toolbar"> 
                 <Button  onClick={ showEditForm } style={{ margin : '15px 0 0 10px' }} type="primary"> 添加分类 </Button>
               </div>
             
               <Table  
                 bordered 
                //  expandedRowRender={ record => <p className="expanded-row" >{ transform( record.category_attrs ) }</p>}
                 style={{ backgroundColor : '#fff' }}
                // scroll={{ y : '600px' }}
                
                 pagination={{
                  hideOnSinglePage : true,
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
                             dataIndex: 'id',
                             key: 'id',
                             align : 'center',
                             width : 80
                          },
                      {
                        title: '名称',
                        dataIndex: 'category_name',
                        key: 'category_name',
                        align : 'center',

                      },

                      {
                        title: '类型ID',
                        dataIndex: 'category_id',
                        key: 'category_id',
                        align : 'center',

                      },

                      {
                        title: '属性',
                        dataIndex: 'category_attrs',
                        key: 'category_attrs',
                        align : 'center',
                        width: 400,
                        render : ( text, record ) => (
                          <span style={{ display: 'block',textAlign : 'center', maxWidth : '100%' }} className="ell category-table-cell"> { transform( record.category_attrs ) } </span>
                        )
                      },

                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        width : 230,
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button type="button"  onClick={ onTableCellEvent.bind( this, { type : 'edit', data : record }) }  > 编辑 </button>
                              <Popconfirm  onConfirm={ onTableCellEvent.bind( this, { type : 'delet', data : record })  } title="确定删除该项？" okText="是" cancelText="否">
                                 <button className="deletebutton" type="button" > 删除 </button>
                              </Popconfirm>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />

           <EditForm
                visible={ visible }
                data={ formDataSource }
                dispatch={ dispatch }
                isEdited={ isEdited }
            />

         </AppLayout>    
      )
}



function mapStateToProps(state) {
 const { visible, isEdited, limit, total, page, dataSource, formDataSource } = state.category;
  return {
        visible,
        isEdited,
        page,
        limit,
        total,
        dataSource,
        formDataSource,
        loading: state.loading.models.category,
  };
}

export default connect(mapStateToProps)(Category);