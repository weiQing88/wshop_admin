import { connect } from 'dva';
import React, { useState, useEffect } from 'react';

import AppLayout from '@/components/app_layout';
import EditRole from './components/edit_role';
import EditAuth from './components/edit_auth';


import { Icon, Button, Table, Divider, Modal  } from 'antd';

const data = [
     {
        id : 123,
        name: '超级管理员',
        add_time : '2019-01-01:14:41:55'
     },
     {
        id : 321,
        name: '普通管理员',
        add_time : '2019-01-01:14:41:55'
     }
];




const Roles = ({ dispatch, limit, visible, visible2, loading,  total, page }) => {

 
    let handleToolbarEvent = () => {}

    let onTableChange = () => {}

    let  onTableShowSizeChange = () => {}


    let handleTableCellEvent = ( arg ) => {
           switch( arg.type ){
               case 'auth' :  dispatch({ type : 'roles/setState', payload : {  key : 'visible2', value : true  } });
               break;
            //    case 'edit' :  dispatch({ type : 'roles/setState', payload : {  key : 'visible2', value : true  } });
            //    break;
           }
    }


    let showEditForm = () => {
        dispatch({ type : 'roles/setState', payload : {  key : 'visible', value : true  } });
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
                        title: '角色名称',
                        dataIndex: 'name',
                        key: 'name',
                        align : 'center',
                      },
                      {
                        title: '创建时间',
                        dataIndex: 'add_time',
                        key: 'add_time',
                        align : 'center',
                      },

                    
                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'auth', data: record }) }  type="button"> 权限 </button>
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'delete', data: record }) }  type="button"> 删除 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />

        <EditRole
            visible={ visible }
            dispatch={ dispatch }
           />

           <EditAuth
                visible={ visible2 }
                 dispatch={ dispatch }
             />

        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  visible, visible2, limit, total, page } = state.roles;
    return {
          visible,
          visible2,
          page,
          limit,
          total,
          loading: state.loading.models.roles,
    };
  
  }
  
  export default connect(mapStateToProps)( Roles );