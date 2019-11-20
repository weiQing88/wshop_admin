// import styles from './index.css';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Layout, Icon,Row, Col, Dropdown, Menu, Avatar  } from 'antd';
import SiderMenu from '@/components/sidermenu';
import Breadcrumbs from '@/components/breadcrumbs';
import util from '@/util';
const { Header, Content } = Layout;

function App(props) {

      let { location, dispatch } = props;
      let [ collapsed, setCollapsed ] = useState( false );
      let [ user, setUser ] = useState({  });

      let defaultAvater = require('../assets/images/avater.png');
      let toggle = () => {
           setCollapsed(  !collapsed  )
      }

      let handleMenuEvent = ( { key } ) => {
              switch( key ){
                case 'logout': handleLogout();
                break;
              }
      }


     // 退出登录
    let handleLogout = () => {
            let userInfo = util.getCookie('userInfo');
              if( userInfo ){
                  dispatch({
                    type : 'login/logout',
                    payload : JSON.parse( userInfo )
                  })
              }
      }


    useEffect(() => {
       let userInfo = util.getCookie('userInfo');
         if( userInfo ) setUser( JSON.parse( userInfo ) );
    }, [])



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
                        <Avatar size={ 25 } shape="square" src={ user.Avatar || defaultAvater } />
                           <Dropdown overlay={<Menu  onClick={ handleMenuEvent } >
                                            <Menu.Item key="1">
                                              <span > 个人中心 </span>
                                            </Menu.Item>
                                            <Menu.Divider />
                                            <Menu.Item key="logout" >
                                              <span > 退出登录 </span>
                                            </Menu.Item>
                                          </Menu>}>
                           <span className="user-dropdown-name" > { user.username || '超级用户' }  <Icon type="down" /></span>
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



function mapStateToProps(state) {
  const { islogin } = state.login;
  return {
        loading: state.loading.models.login,
   };

}

export default connect(mapStateToProps)( App );
