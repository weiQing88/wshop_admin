import { useEffect, useState } from 'react';
import AppLayout from '@/components/app_layout';
import { Tabs, Descriptions  } from 'antd';
const { TabPane } = Tabs;

export default props => {

        let callback = () => {}

       return (
            <AppLayout>
              <Tabs animated={ false } defaultActiveKey="1" onChange={callback}>
                    <TabPane  tab="账号信息" key="1">
                        <Descriptions style={{ margin : '0 auto', width : '90%' }} bordered className="members-user-descriptions" title="" layout="vertical">
                        <Descriptions.Item label="用户名">Zhou Maomao</Descriptions.Item>
                        <Descriptions.Item label="手机号">1810000000</Descriptions.Item>
                        <Descriptions.Item label="账号状态"> 正常 </Descriptions.Item>
                        </Descriptions>
                    </TabPane>
                    <TabPane tab="修改密码" key="2">
                        修改密码
                    </TabPane>
                </Tabs>,  
            </ AppLayout >
       )
}