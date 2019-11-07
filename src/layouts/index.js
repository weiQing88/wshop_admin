// import styles from './index.css';
import React, { useState } from 'react';
import { Layout, Icon,Row, Col, Dropdown, Menu, Avatar  } from 'antd';
import SiderMenu from '@/components/sidermenu';
import Breadcrumbs from '@/components/breadcrumbs';
const { Header, Content } = Layout;


function BasicLayout(props) {
      let { location } = props;
      let [ collapsed, setCollapsed ] = useState( false );

      let defaultAvater = require('../assets/images/avater.png');

      let toggle = () => {
           setCollapsed(  !collapsed  )
      }

  return (
    <Layout style={{ height : '100%' }} >
       <SiderMenu location={ location } collapsed={ collapsed }  />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row>
            <Col span={ 5 }> 
              <Icon
                title="收起/展开"
                id="app-header-trigger-icon"
                type={ collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={ toggle}
                 />
                 <Icon  title="刷新有页面" id="app-header-reload-icon" type="redo" />
             </Col>
             <Col span={ 10 } offset={ 9 } > 
                   <figure id="user-info-block">
                      <Avatar size={ 25 } shape="square" src={ defaultAvater } />
                       <Dropdown overlay={<Menu>
                                          <Menu.Item>
                                            <span > 个人中心 </span>
                                          </Menu.Item>
                                          <Menu.Divider />
                                          <Menu.Item>
                                            <span > 退出登录 </span>
                                          </Menu.Item>
                                        </Menu>}>
                        <span className="user-dropdown-name" > 超级用户 <Icon type="down" /></span>
                        </Dropdown>
                  </figure>
              </Col>
          </Row>
        </Header>

        <Breadcrumbs />

        <Content id="wshop_app_layout" >
          { props.children }
        </Content>
      </Layout>
   </Layout>

  );
}

export default BasicLayout;
