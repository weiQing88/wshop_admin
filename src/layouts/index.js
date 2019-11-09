// import styles from './index.css';
import React, { useState } from 'react';
import Redirect from 'umi/redirect';
import util from '@/util';
import SiderMenu from '@/components/sidermenu';
import Breadcrumbs from '@/components/breadcrumbs';
import App from './app';

function BasicLayout(props) {
      let { location } = props;
      let [ collapsed, setCollapsed ] = useState( false );

      if( util.getCookie('wshopLoginToken') ){
           return (<App { ...props } /> )
      }else{
          return ( <Redirect to="/login" /> )
      }
}

export default BasicLayout;
