import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/app_layout';
import Toolbar from '@/components/toolbar';
import ToolbarTabs from '@/components/toolbar/tabs';
import { Tabs, Card, Icon, Badge, Table, Divider  } from 'antd';

 




export default function(){

    let [ key, setKey ] = useState( 1 )


     useEffect(() =>{}, []);
      
      return (
         <AppLayout style={{ backgroundColor : '#f0f2f5' }} >
               <Toolbar />
               <ToolbarTabs />
               <Table  
                 columns={
                     [
                    {
                      title: 'Name',
                      dataIndex: 'name',
                      key: 'name',
                      render: text => <a>{text}</a>,
                    },

                    {
                      title: 'Age',
                      dataIndex: 'age',
                      key: 'age',
                    },
                    {
                      title: 'Address',
                      dataIndex: 'address',
                      key: 'address',
                    },               
                    {
                      title: 'Action',
                      key: 'action',
                      render: (text, record) => (
                        <span>
                          <a>Invite {record.name}</a>
                          <Divider type="vertical" />
                          <a>Delete</a>
                        </span>
                      ),
                    },
                  ]} 
                 dataSource={[]}
             />
         </AppLayout>    
      )
}