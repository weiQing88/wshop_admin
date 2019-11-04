import styles from './index.css';
import React, { useState } from 'react';
import Link from 'umi/link';
import { Layout, Menu, Icon, Breadcrumb  } from 'antd';
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;


function BasicLayout(props) {
      let [ collapsed, setCollapsed ] = useState( false );

      let toggle = () => {
           setCollapsed(  !collapsed  )
      }
      
  return (
    <Layout style={{ height : '100%' }} >
      <Sider trigger={null} collapsible collapsed={ collapsed }>

       <div className="logo"> logo </div>

        <Menu  mode="inline" theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
             <Icon type="home"/>
              <span>首页</span>
            </Menu.Item>

           <SubMenu key="2" title={ <span><Icon type="mail" /> <span>商品管理</span></span>} >
              <Menu.Item key="2-1">
                 <span>商品列表</span>
              </Menu.Item>
              <Menu.Item key="2-2">
                 <span>商品分类</span>
              </Menu.Item>
              <Menu.Item key="2-3">
                 <span>商品属性</span>
              </Menu.Item>
            </SubMenu>

           <SubMenu key="3" title={ <span><Icon type="mail" /> <span>订单管理</span></span>} >
              <Menu.Item key="3-1">
                 <span>订单列表</span>
              </Menu.Item>
               <Menu.Item key="3-2">
                 <span>发货列表</span>
              </Menu.Item>
              <Menu.Item key="3-3">
                 <span>退货列表</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="4" title={ <span><Icon type="mail" /> <span>微信管理</span></span>} >
              <Menu.Item key="4-1">
                 <span>小程序配置</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="5" title={ <span><Icon type="mail" /> <span>权限管理</span></span>} >
              <Menu.Item key="5-1">
                 <span>用户列表</span>
              </Menu.Item>
              <Menu.Item key="5-2">
                 <span>管理员管理</span>
              </Menu.Item>
              <Menu.Item key="5-3">
                 <span>角色管理</span>
              </Menu.Item>
            </SubMenu>

            <SubMenu key="6" title={ <span><Icon type="mail" /> <span>操作日记</span></span>} >
              <Menu.Item key="6-1">
                 <span>管理员日记</span>
              </Menu.Item>
            </SubMenu>


        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={ collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={ toggle}
          />
        </Header>

          <Breadcrumb style={{ margin: '10px 0 0 16px' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

        <Content
          id="wshop_app_layout" 
          style={{
            margin: '16px',
           // padding: 10,
            background: '#fff',
            minHeight: 280,
          }}
        >
          { props.children }
        </Content>
      </Layout>
   </Layout>

  );
}

export default BasicLayout;
