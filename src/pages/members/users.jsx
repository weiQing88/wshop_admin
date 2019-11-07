import { connect } from 'dva';
import React, { useState, useEffect } from 'react';

import AppLayout from '@/components/app_layout';

import Toolbar from './components/toolbar_u';
import EditPoints from './components/edit_point';
import EditUser from './components/edit_user';


import { Table  } from 'antd';

const data = [
     {
        id : 123,
        mobile : 13641439075,
        gender : '男',
        avatar : 'http://iph.href.lu/90x90?text=[头像]',
        username : 'AABBB',
        points : 432,
        status : '1',
     }
];

const Users = ({ dispatch, limit, visible, visible2, loading,  total, page }) => {

 
    let handleToolbarEvent = () => {}

    let onTableChange = () => {}

    let  onTableShowSizeChange = () => {}


    let handleTableCellEvent = ( arg ) => {
           switch( arg.type ){
               case 'point' :  dispatch({ type : 'users/setState', payload : {  key : 'visible', value : true  } });
               break;
               case 'edit' :  dispatch({ type : 'users/setState', payload : {  key : 'visible2', value : true  } });
               break;
           }
    }


    useEffect(() =>{}, [  ]);

     return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
            <Toolbar onClick={ handleToolbarEvent  } />

            <Table  
                 bordered 
                 rowSelection={{
                    columnWidth : 50,
                    selectedRowKeys : [],
                    onChange: (selectedRowKeys, selectedRows) => {
                           console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    }
                   }}
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
                        title: 'ID',
                        dataIndex: 'id',
                        key: 'id',
                        align : 'center',
                      },
                      {
                        title: '手机号码',
                        dataIndex: 'mobile',
                        key: 'mobile',
                        align : 'center',
                      },
                           
                      {
                        title: '性别',
                        dataIndex: 'gender',
                        key: 'gender',
                        align : 'center',
                      },
                
                      {
                        title: '头像',
                        dataIndex: 'avatar',
                        key: 'avatar',
                        align : 'center',
                        render : text => (
                            <figure className="app-tableCell-image">
                               <img src={ text } alt="头像"/>
                            </figure>
                        )
                      },
                      {
                        title: '昵称',
                        dataIndex: 'username',
                        key: 'username',
                        align : 'center',
                      },
                           
                      {
                        title: '积分',
                        dataIndex: 'points',
                        key: 'points',
                        align : 'center',
                      },
                      {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                        align : 'center',
                        render : text => (
                             <span> {
                                  text == '1' ? '正常' : '禁用'
                             } </span>
                        )
                      },    
                      {
                        title: '操作 ',
                        key: 'action',
                        align : 'center',
                        render: (text, record) => (
                          <span className="table-action-buttons">
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'point', data: record }) } type="button"> 修改积分 </button>
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'edit', data: record }) }  type="button"> 编辑 </button>
                              <button onClick={ handleTableCellEvent.bind(this, { type : 'delete', data: record }) }  type="button"> 删除 </button>
                          </span>
                        ),
                      },
                  
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />

        <EditPoints
            visible={ visible }
            dispatch={ dispatch }
          />

          <EditUser
             visible={ visible2 }
             dispatch={ dispatch }
           />

        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  visible, visible2, limit, total, page } = state.users;
    return {
          visible,
          visible2,
          page,
          limit,
          total,
          loading: state.loading.models.users,
    };
  
  }
  
  export default connect(mapStateToProps)(Users);