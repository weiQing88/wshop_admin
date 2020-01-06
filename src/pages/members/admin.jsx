import { connect } from 'dva';
import React, { useState, useEffect } from 'react';

import AppLayout from '@/components/app_layout';
import EditAdmin from './components/edit_admin';

import { Tabs, Card, Icon, Popconfirm,Badge, Table, Divider, Button  } from 'antd';


const Admin = ({ history, roles, dispatch, limit, visible, isEdited, loading, dataSource, initDataSource,  total, page }) => {



 
    let handleToolbarEvent = () => {}


     // 分页处理函数
     let onTableChange = (page, pageSize) => {
      if( loading ) return;
     let query = util.getQuery();
        query.page = page;
        query.limit = pageSize;
        dispatch({ type : 'admin/fetAdmin', payload : query })
     };


   // 分页页码处理函数
    let onTableShowSizeChange = (current, size) => {
         if( loading ) return;
           let query = util.getQuery();
                query.page = current;
                query.limit = size;
            dispatch({ type : 'admin/fetAdmin', payload : query })
      };




    let showEditForm = () => {   
      if( roles.length == 0 )  dispatch({  type : 'admin/fetRoles'});
       dispatch({ 
            type : 'admin/setState', 
            payload : [
                {  key : 'visible', value : true },
                {  key : 'isEdited', value : false },
                {  key : 'initDataSource', value : {} }, 
            ]
        })
     }


    let handleTableCellEvent = ({ type, data }) => {
            if( type == 'edit' ){
              if( roles.length == 0 )  dispatch({  type : 'admin/fetRoles'})
                  dispatch({ 
                      type : 'admin/setState', 
                      payload : [
                        {  key : 'visible', value : true },
                        {  key : 'isEdited', value : true },
                        {  key : 'initDataSource', value : data } 
                      ]
                  })
            }else if( type == 'delete' ){
                 dispatch({ type : 'admin/deleteAdmin', payload : data.id  })
            }
    }


    useEffect(() =>{
      // 清空参数
    if( history.location.search ) history.push('/members/admin\/');
     dispatch({ type : 'admin/fetAdmin' });
     console.log(' admin 仅仅需要执行一次')

  }, []);




     return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
              <div className="members-toolbar"> 
                 <Button  onClick={ showEditForm } style={{ margin : '15px 0 0 10px' }} type="primary"> 添加 </Button>
               </div>

            <Table  
                 bordered 
                 style={{  backgroundColor : '#fff' }}
                 scroll={{ 
                     //  x : '100%',
                     // y :  tHeight,
                     // scrollToFirstRowOnChange : true,
                    }}
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
                        title: '账号',
                        dataIndex: 'mobile',
                        key: 'mobile',
                        align : 'center',
                      },
                      {
                        title: '昵称',
                        dataIndex: 'username',
                        key: 'username',
                        align : 'center',
                      },
                      {
                        title: '角色',
                        dataIndex: 'admin_role',
                        key: 'admin_role',
                        align : 'center',
                      },
                
                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'edit', data: record }) }  type="button"> 编辑 </button>
                              <Popconfirm title="确定删除？" onConfirm={  handleTableCellEvent.bind(this, { type : 'delete', data: record })  } okText="是" cancelText="否" >
                                  <button  type="button"> 删除 </button>
                               </Popconfirm>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />

            <EditAdmin
                  isEdited={ isEdited }
                  visible={ visible }
                  dispatch={ dispatch }
                  data={ initDataSource }
                  loading={ loading }
                  roles={ roles }
               />


        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  visible, isEdited, limit, total, page,roles, dataSource, initDataSource } = state.admin;
    return {
          visible,
          isEdited,
          dataSource, 
          initDataSource,
          roles,
          page,
          limit,
          total,
          loading: state.loading.models.admin,
    };
  
  }
  
  export default connect(mapStateToProps)(Admin);