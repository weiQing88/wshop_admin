import { connect } from 'dva';
import React, { useState, useEffect } from 'react';

import AppLayout from '@/components/app_layout';
import EditAdmin from './components/edit_admin';

import { Tabs, Card, Icon, Badge, Table, Divider, Button  } from 'antd';

const data = [
     {
        id : 123,
        account : 'admin1988@qq.com',
        username : 'tester',
        admin_role : '超级管理员',
     }
];

const Admin = ({ dispatch, limit, visible, isEdited, visible2, loading,  total, page }) => {

 
    let handleToolbarEvent = () => {}

    let onTableChange = () => {}

    let  onTableShowSizeChange = () => {}

    let showEditForm = () => {
         dispatch({ type : 'admin/toggle', payload : {  key : 'visible', visible : true, isEdited : false  } });
    }


    let handleTableCellEvent = ( arg ) => {
           switch( arg.type ){
               case 'point' :  dispatch({ type : 'admin/setState', payload : {  key : 'visible', value : true  } });
               break;
               case 'edit' :  dispatch({ type : 'admin/toggle', payload : {   key : 'visible', visible : true, isEdited : true  } });
               break;
           }
    }


    useEffect(() =>{}, [  ]);

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
                        dataIndex: 'account',
                        key: 'account',
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
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'delete', data: record }) }  type="button"> 删除 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />

            <EditAdmin
                  isEdited={ isEdited }
                  visible={ visible }
                  dispatch={ dispatch }
               />


        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  visible, isEdited, limit, total, page } = state.admin;
    return {
          visible,
          isEdited,
          page,
          limit,
          total,
          loading: state.loading.models.admin,
    };
  
  }
  
  export default connect(mapStateToProps)(Admin);