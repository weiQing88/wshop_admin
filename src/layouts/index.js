// import styles from './index.css';
import React, { useState } from 'react';
import { Layout, Icon  } from 'antd';
import SiderMenu from '@/components/sidermenu';
import Breadcrumbs from '@/components/breadcrumbs';

const { Header, Content } = Layout;


function BasicLayout(props) {
      let { location } = props;
      let [ collapsed, setCollapsed ] = useState( false );
      let toggle = () => {
           setCollapsed(  !collapsed  )
      }
  return (
    <Layout style={{ height : '100%' }} >
       <SiderMenu location={ location } collapsed={ collapsed }  />
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={ collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={ toggle}
          />
        </Header>

        <Breadcrumbs />

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
