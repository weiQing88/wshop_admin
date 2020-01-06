import { connect } from 'dva';
import React, { useState, useEffect } from 'react';

import AppLayout from '@/components/app_layout';
import EditRole from './components/edit_role';


import { Icon, Button, Table, Divider, Modal, Popconfirm  } from 'antd';


const Roles = ({ dispatch, limit, visible, loading, isEdited, total, page, dataSource, initDataSource }) => {

 
    let handleToolbarEvent = () => {}

      // 分页处理函数
      let onTableChange = (page, pageSize) => {
        if( loading ) return;
       let query = util.getQuery();
          query.page = page;
          query.limit = pageSize;
          dispatch({ type : 'roles/fetRoles', payload : query })
       };
  
  
     // 分页页码处理函数
      let onTableShowSizeChange = (current, size) => {
           if( loading ) return;
             let query = util.getQuery();
                  query.page = current;
                  query.limit = size;
              dispatch({ type : 'roles/fetRoles', payload : query })
        };
    

    let handleTableCellEvent = ({ type, data }) => {
          let payload = [ {  key : 'isEdited', value : true  },{  key : 'initDataSource', value : data  } ];
           switch( type ){
               case 'edit' : payload.push( {  key : 'visible', value : true  }) ;
               break;
           }
          dispatch({  type :  'roles/setState',payload });
    }


   
    let showEditForm = () => {
        dispatch({ 
               type : 'roles/setState',
                payload : [
                     {  key : 'visible', value : true  },
                     {  key : 'initDataSource', value : {}  },
                     {  key : 'isEdited', value : false  },
                ]
      
          });
    }


    useEffect(() =>{
        dispatch({ type : 'roles/fetRoles'})
    }, []);



     return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
              <div className="members-toolbar"> 
                 <Button  onClick={ showEditForm } style={{ margin : '15px 0 0 10px' }} type="primary"> 添加 </Button>
               </div>
            <Table  
                 bordered 
                 style={{  backgroundColor : '#fff' }}
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
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        align : 'center',
                      },
                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'edit', data: record }) }  type="button"> 编辑 </button>
                              <Popconfirm title="确定删除？" onConfirm={ handleTableCellEvent.bind(this, { type : 'delete', data: record })  } okText="是" cancelText="否" >
                                  <button  type="button"> 删除 </button>
                             </Popconfirm>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ dataSource }
                 rowKey="id"
             />

        <EditRole
            visible={ visible }
            dispatch={ dispatch }
            loading={ loading }
            isEdited={ isEdited }
            data={ initDataSource }
           />

        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  visible, limit, total,isEdited, page, dataSource, initDataSource } = state.roles;
    return {
          visible,
          dataSource, 
          initDataSource,
          isEdited,
          page,
          limit,
          total,
          loading: state.loading.models.roles,
    };
  
  }
  
  export default connect(mapStateToProps)( Roles );