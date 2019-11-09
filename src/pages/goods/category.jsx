import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import EditForm from './components/edit_form';
import util from '@/util';
import {  Button, Switch, Tabs, Card, Icon, Badge, Table, Divider, } from 'antd';

const data = [
        {
          id :1,
          index : 1,
          category_name : '酸野',
          category_type : '酸',
          category_icon : 'xx',
          category_sort : 2,
          is_show : '0',
          category_attrs : [
              {
                id : 1,
                name : '大份',
              },
              {
                id : 1,
                name : '小份',
              }
          ]
        } 
    ];




 
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


    // const transform = ( attrs ) => {
    //        if( util.isValid( attrs ) ){
    //           let ats = attrs.map( item => item.name );
    //           return ats.join('、')
    //        }else{
    //          return ''
    //        }
    // }


  
     useEffect(() =>{}, []);
      
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
                        dataIndex: 'id',
                        key: 'id',
                        align : 'center',

                      },

                      // {
                      //   title: '参数',
                      //   dataIndex: 'category_attrs',
                      //   key: 'category_attrs',
                      //   align : 'center',
                      //   width: 400,
                      //   render : ( text, record ) => (
                      //     <span style={{ display: 'block',textAlign : 'center', maxWidth : '100%' }} className="ell category-table-cell"> { transform( record.category_attrs ) } </span>
                      //   )
                      // },

  
                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        width : 230,
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button type="button"  onClick={ onTableCellEvent.bind( this, { type : 'edit', data : record }) }  > 编辑 </button>
                              <button type="button"  onClick={ onTableCellEvent.bind( this, { type : 'delet', data : record }) } > 删除 </button>
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
       loading: state.loading.models.goods,
  };
}

export default connect(mapStateToProps)(Category);