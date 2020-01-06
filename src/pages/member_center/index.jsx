import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import util from '@/util';
import { Descriptions } from 'antd';

const MemberCenter = props => {
       //style={{ backgroundColor : '#f0f2f5'}} 
       return ( <AppLayout >
              <Descriptions style={{ margin : '10px auto 0', width : '96%' }}  bordered title="用户信息" size='middle'>
                <Descriptions.Item label="名称"> 某某 </Descriptions.Item>
                <Descriptions.Item label="角色">普通管理员</Descriptions.Item>
                <Descriptions.Item label="头像">xxx</Descriptions.Item>
                <Descriptions.Item label="登录IP">127.0.0.1</Descriptions.Item>
                <Descriptions.Item label="其他">x'x'x</Descriptions.Item>
                <Descriptions.Item label="其他">xxxx</Descriptions.Item>
                <Descriptions.Item label="Config Info">xxxx</Descriptions.Item>
           </Descriptions>
        </AppLayout> )
}


function mapStateToProps(state) {
    const {  } = state.memberCenter;
    return {
          loading: state.loading.models.memberCenter,
    };
  
  }
  
  export default connect(mapStateToProps)(MemberCenter);