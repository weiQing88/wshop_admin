import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import EditAttrs from './components/edit_attrs';
import { TableSrollStatus } from '@/components/widgets';
import util from '@/util';
import {  Button, Switch, Tabs, Card, Icon, Badge, Table, Divider, Popconfirm } from 'antd';



/** 商品属性 */
const AttrsCompt  = function({ visible, dispatch, isEdited, limit, loading, total, page, dataSource, formDataSource }){

       let y = TableSrollStatus( 195 );

       const showEditForm = () => {
             dispatch({
                  type : 'attrs/toggle',
                  payload : {
                       visible : true,
                       isEdited : false,
                  }
             })
       }


       const onTableCellEvent = ( arg ) => {
                if( arg.type == 'edit'){
                    dispatch({
                        type : 'attrs/toggle',
                        payload : {
                            visible : true,
                            isEdited : true,
                            data : arg.data,
                        }
                    })
                }else if( arg.type == 'delet' ){
                    dispatch({
                        type : 'attrs/delete',
                        payload : { attr_id : arg.data.attr_id }
                    })
                }
        }

       const onTableChange = (page, pageSize) => {
               dispatch({
                   type : 'attrs/fetAttrs',
                   payload : { page, limit : pageSize }
                });
       }

       const onTableShowSizeChange = (current, size) => {
                dispatch({
                    type : 'attrs/fetAttrs',
                    payload : { page :current , limit : size }
                });
       }


       const transform = ( attrs ) => {
            if( util.isValid( attrs ) ){
                return attrs.join('|')
            }else{
                return ''
            }
        }


       useEffect(() =>{
            dispatch({
                 type : 'attrs/fetAttrs',
                 payload : { page, limit }
                })
       }, []);

       return (
            <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
                <div className="category-toolbar"> 
                    <Button  onClick={ showEditForm } style={{ margin : '15px 0 0 10px' }} type="primary"> 添加属性 </Button>
                 </div>
                 <Table  
                 bordered 
                //  expandedRowRender={ record => <p className="expanded-row" >{ transform( record.category_attrs ) }</p>}
                 style={{ backgroundColor : '#fff' }}
                 scroll={{ y }}
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
                  dataSource={ dataSource }
                  rowKey="id"
                  columns={[
                     {
                         title: '名称',
                         dataIndex: 'attr_name',
                         key: 'attr_name',
                         align : 'center',
                      },
                      {
                        title: '属性值',
                        dataIndex: 'attr_value',
                        key: 'attr_id',
                        align : 'center',
                        render : ( text, record ) => (
                                <span style={{ display: 'block',textAlign : 'center', maxWidth : '100%' }}
                                   className="ell category-table-cell"> 
                                   { transform( record.attr_value ) } 
                                </span>
                             )
                     },
                     {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button type="button"  onClick={ onTableCellEvent.bind( this, { type : 'edit', data : record }) }  > 编辑 </button>
                              <Popconfirm  onConfirm={  onTableCellEvent.bind( this, { type : 'delet', data : record })  } title="确定删除该项？" okText="是" cancelText="否">
                                  <button className="deletebutton" type="button" > 删除 </button>
                              </Popconfirm>
                          </span>
                        ),
                      },

                  ]} />


                <EditAttrs
                    visible={ visible }
                    data={ formDataSource }
                    dispatch={ dispatch }
                    isEdited={ isEdited }   
                  />
                  
            </AppLayout>
       )
}


function mapStateToProps(state) {
   const { visible, isEdited, limit, total, page, dataSource, formDataSource } = state.attrs;
    return {
          visible,
          isEdited,
          page,
          limit,
          total,
          dataSource,
          formDataSource,
          loading: state.loading.models.attrs,
    };
  }
  
  export default connect(mapStateToProps)( AttrsCompt );