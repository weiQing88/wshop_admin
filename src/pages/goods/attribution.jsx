import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import EditAttrs from './components/edit_attrs';

import util from '@/util';
import {  Button, Switch, Tabs, Card, Icon, Badge, Table, Divider, } from 'antd';



const data = [
    {
        id : 1,
        name : '大小',
        attrs_value : [ 100, 100 ]
    },
    {
        id : 2,
        name : '净重',
        attrs_value : [ '30公斤', '50公斤', '70公斤' ]
    }
];



/** 商品属性 */
const AttrsCompt  = function({ dispatch, visible, isEdited, limit, loading, total, page }){

       const showEditForm = () => {
             dispatch({
                  type : 'attrs/toggle',
                  payload : {
                       visible : true,
                       isEdited : false,
                  }
             })
       }
       const onTableCellEvent = () => {}


       const onTableChange = () => {}
       const onTableShowSizeChange = () => {}

       const transform = ( attrs ) => {
            if( util.isValid( attrs ) ){
                return attrs.join('|')
            }else{
                return ''
            }
        }



       return (
            <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
                <div className="category-toolbar"> 
                    <Button  onClick={ showEditForm } style={{ margin : '15px 0 0 10px' }} type="primary"> 添加属性 </Button>
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
                  dataSource={ data }
                  rowKey="id"
                  columns={[
                     {
                         title: '名称',
                         dataIndex: 'name',
                         key: 'name',
                         align : 'center',
                      },
                      {
                        title: '属性值',
                        dataIndex: 'attrs_value',
                        key: 'attrs_value',
                        align : 'center',
                        render : ( text, record ) => (
                                <span style={{ display: 'block',textAlign : 'center', maxWidth : '100%' }}
                                   className="ell category-table-cell"> 
                                   { transform( record.attrs_value ) } 
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
                              <button type="button"  onClick={ onTableCellEvent.bind( this, { type : 'delet', data : record }) } > 删除 </button>
                          </span>
                        ),
                      },

                  ]} />


                <EditAttrs
                    visible={ visible }
                    data={ {} }
                    dispatch={ dispatch }
                    isEdited={ isEdited }   
                  />
                  
            </AppLayout>
       )
}


function mapStateToProps(state) {
   const { visible, isEdited, limit, total, page } = state.attrs;
    return {
          visible,
          isEdited,
          page,
          limit,
          total,
         loading: state.loading.models.goods,
    };
  }
  
  export default connect(mapStateToProps)( AttrsCompt );