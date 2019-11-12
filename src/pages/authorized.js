import React, { useEffect, useState } from 'react';
// import { ConnectProps, ConnectState, UserModelState, Route } from '@/models/connect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Redirect from 'umi/redirect';
import util from '@/util';

// https://github.com/ant-design/ant-design-pro/blob/33f562974d1c72e077652223bd816a57933fe242/src/pages/Authorized.tsx

export default props => { 
        const { route } = props;
        const userInfo =  JSON.parse( util.getCookie('userInfo') || '{}' );
        let uindex = -1;
       if( util.isValid( route.authority ) &&  util.isValid( userInfo.role ) ){
            uindex = route.authority.indexOf( userInfo.role );
       }
        // console.log( 'userInfo', userInfo )
        // console.log( 'route', route.authority );
        // console.log( 'props',props )
        if( uindex > -1 ){
          return <route.component { ...props } />
        }else{
            return (  <Redirect to="/403" /> )
        }
 }