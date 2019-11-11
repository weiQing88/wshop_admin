import React, { useEffect, useState } from 'react';
import { ConnectProps, ConnectState, UserModelState, Route } from '@/models/connect';
import { connect } from 'dva';
import pathToRegexp from 'path-to-regexp';
import Redirect from 'umi/redirect';

// https://github.com/ant-design/ant-design-pro/blob/33f562974d1c72e077652223bd816a57933fe242/src/pages/Authorized.tsx

export default props => { 
     console.log( 'props', props )

     return (
         <div> 权限路由 </div>
     )

 }