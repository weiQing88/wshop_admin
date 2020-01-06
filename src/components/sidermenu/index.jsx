import { useEffect, useState } from 'react';
import { Layout, Menu, Icon  } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';
import util from '@/util';
import { IconFont }  from '@/components/widgets';
const { Sider } = Layout;
const { SubMenu } = Menu;

const fontStyle = {  fontSize : '18px', fontWeight : 'bolder' };

export default ( props ) => {

       let { location, collapsed } = props;

       let getDefaultOpenKeys = () => {
         let path = location.pathname;
          if( path == '/' ){
                return ['/']
          }else{
               return [  '/' + path.split('/')[1] ]
          }
     }

      let [ openKeys, setOpenKeys ] = useState( getDefaultOpenKeys() ); 


      let [ menuDataSource, setMenuDataSource ] = useState([]);

   

    // 转化路径
   let conversionPath = path => {
      if (path && path.indexOf('http') === 0) {
      return path;
      } else {
      return `/${path || ''}`.replace(/\/+/g, '/');
      }
   };


         
  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   */
  let getMenuItemPath = item => {
      const itemPath = conversionPath(item.path);
     // const icon = getIcon(item.icon);
        const { target, name, icon } = item;

      // Is it a http link
      if (/^https?:\/\//.test(itemPath)) {
      return (
         <a href={itemPath} target={target}>
            <Icon type="home"/>
            <span>{name}</span>
         </a>
      );
      }
      return (
      <Link
         to={ itemPath }
        // target={ target }
         replace={ itemPath === props.location.pathname }
         onClick={ () => {} } >
         { icon ? <IconFont style={ fontStyle } type={ icon }/> : null }
          <span>{ name }</span>
      </Link>
      );
   };


         /**
            * 获得菜单子节点
          */
      let  getNavMenuItems = menusData => {
            if (!menusData) return '';
             return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                  // make dom
               // const ItemDom = this.getSubMenuOrItem(item);
               //  return this.checkPermissionItem(item.authority, ItemDom);
                return getSubMenuOrItem(item);
            })
            .filter( item => item );
         };



      let  getSubMenuOrItem = item => {
         if ( item.children && item.children.some( child => child.name ) ) {
           const childrenItems = getNavMenuItems(item.children);
               // 当无子菜单时就不展示菜单
               if ( childrenItems && childrenItems.length > 0) {
                  return (
                     <SubMenu
                       title={
                         item.icon ? (
                           <span>
                              <IconFont style={ fontStyle } type={ item.icon } /> 
                              <span>{ item.name }</span>
                              </span>
                        ) : (
                           item.name
                        )
                     }
                     key={ item.path }
                     >
                     { childrenItems  }
                     </SubMenu>
                  );
               }
               return null;
         } else {
           return <Menu.Item key={ item.path }>{ getMenuItemPath(item) }</Menu.Item>;
         }


       };



   let handleMenuClickEvent = ( { item, key, keyPath, domEvent } ) => {
                 setOpenKeys( keyPath )
           }

     let  handleOpenChange = openKeys => {
            setOpenKeys( openKeys )
     }


      useEffect(() => {
            if( JSON.stringify( props.data ) != JSON.stringify( menuDataSource ) ){
                   setMenuDataSource(  props.data )
            }
      }, [ props.data ]);

       return (
        <Sider trigger={null} collapsible collapsed={ collapsed }>
        <div id="app-logo"> WSHOP 商城 </div>
         <Menu  
             mode="inline" 
             theme="dark" 
             onClick={ handleMenuClickEvent }
             onOpenChange={ handleOpenChange }
             openKeys={ openKeys } 
             defaultSelectedKeys={[ location.pathname ]}>
            {
              getNavMenuItems( menuDataSource )
            }
         </Menu>
       </Sider>
       )
}