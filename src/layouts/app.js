// import styles from './index.css';
import router from 'umi/router';
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Layout, Icon,Row, Col, Dropdown, Menu, Avatar  } from 'antd';
import SiderMenu from '@/components/sidermenu';
import Breadcrumbs from '@/components/breadcrumbs';
import util from '@/util';
const { Header, Content } = Layout;


function App(props) {

      let { location, dispatch, menu } = props;
      let [ collapsed, setCollapsed ] = useState( false );
      let [ user, setUser ] = useState({});

      let defaultAvater = require('../assets/images/avater.png');
      let toggle = () => {
           setCollapsed(  !collapsed  )
      }

      let handleReload = () => {
           window.location.reload();
      }

      let handleMenuEvent = ( { key } ) => {
              switch( key ){
                case 'logout': handleLogout();
                break;
                case 'user' : router.push('/user') ;
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
                let  userinfo = util.getUserInfo();
                if( userinfo ){
                      setUser( userinfo );
                    // 获取侧边导航数据
                    dispatch({
                      type : 'home/fetMenu',
                      payload : { name :  userinfo.admin_role }
                    })
                }

    }, [])


  return (
    <Layout style={{ height : '100%' }} >
      <SiderMenu 
         data={ menu }
         location={ location } 
         dispatch={ dispatch } 
         collapsed={ collapsed }  />
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
                 <Icon onClick={  handleReload  }  title="清除缓存" id="app-header-reload-icon" type="redo" />
             </Col>
             <Col span={ 10 } offset={ 9 } > 
                    <figure id="user-info-block">
                        <Avatar size={ 25 } shape="square" src={ user.avatar || defaultAvater } />
                           <Dropdown overlay={<Menu  onClick={ handleMenuEvent } >
                                            <Menu.Item key="user">
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
  const { menu } = state.home;
  return {
        menu,
        loading: state.loading.models.home,
   };

}

export default connect(mapStateToProps)( App );
