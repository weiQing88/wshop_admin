import React, { useState, useEffect } from 'react';
import { Modal, Form,  Input, Tree, message } from 'antd';
import util from '@/util';


const _data = [
     {
        title : '商品管理',
        key : 'goods',
        children : [
             {
                title : '商品列表',
                key : 'goods-list',
             },
             {
              title : '商品分类',
              key : 'goods-category',
             },
             {
                title : '商品属性',
                 key : 'goods-attrs',
             }
        ]
     },

     {
        title : '订单管理',
        key : 'order',
        children : [
              {
                title : '订单列表',
                key : '',
              },
              {
                title : '发货单列表',
                key : 'order-deliver',
              },
              {
                title : '退货单列表',
                key : 'order-cancel',
              },
              {
                title : '售后单列表',
                key : 'order-service',
              }
        ]
     },

     {
        title : '微信管理',
        key : 'wx',
        children : [
              {
                title : '小程序配置',
                key : 'wx-setting',
              }
        ]
     },

     {
      title : '会员管理',
      key : 'members',
      children : [
            {
             title : '用户列表',
             key : 'members-list',
            },
            {
            title : '管理员管理',
             key : 'members-admin',
            },
            {
            title : '角色管理',
             key : 'members-roles',
            },
      ]
   },

     {
       title : '操作日志',
       key : 'logs',
       children : [
            {
             title : '管理员日志',
             key : 'logs-admin',
            }
      ]
   },

];


const EditAuth = ( props ) => {
    let { data, visible, dispatch  } = props;
    let [ checkedKeys, setCheckedKeys ] = useState([]);
    
    let handleOk = () => {
           dispatch({ type : 'roles/setState', payload : {  key : 'visible2', value : false,  } });
    }
    let handleCancel = () => {
           dispatch({ type : 'roles/setState', payload : {  key : 'visible2', value : false,  } });
    }


     // 复选框事件
    let onCheck = checkedKeys  => {
        setCheckedKeys( checkedKeys )
        console.log('onCheck', checkedKeys )
    }
  

    useEffect(() =>{}, [ checkedKeys ]);

   return (
        <Modal
            title="配置权限"
            visible={ visible }
            width={ 550 }
            onOk={ handleOk }
            onCancel={ handleCancel }
            cancelText={'取消'}
            okText={'确定'}
        >
        <Tree
                checkable
                onCheck={ onCheck }
                checkedKeys={ checkedKeys }
                treeData={ _data }
            >
      </Tree>
     </Modal>
   )
}


export default Form.create()( EditAuth );