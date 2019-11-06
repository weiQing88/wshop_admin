import { connect } from 'dva';
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import AppLayout from '@/components/app_layout';
import Toolbar from './components/toolbar'; 


const data = [
     { 
        id : 123,
        operator : 'testor',
        opt_time : '2019-11-06 15:52:52',
        descr : '获取规格信息',
        ip : '60.216.69.199',
        content : '{"name":"300ML","type":"text","value":"1","id":"13","__Jshop_Token__":"d7fd2ef1c7b48c5492d3f580578ff948a99b38cb"}'
     },
     { 
        id : 321,
        operator : 'testor2',
        opt_time : '2019-11-06 15:52:52',
        descr : '生成多规格',
        ip : '221.4.221.48',
        content : '{"name":"300ML","type":"text","value":"1","id":"13","__Jshop_Token__":"d7fd2ef1c7b48c5492d3f580578ff948a99b38cb"}'
     },
     { 
        id : 235,
        operator : 'testor3',
        opt_time : '2019-11-06 15:52:52',
        descr : '编辑商品分类：奢侈品',
        ip : '113.69.43.56',
        content : '{"name":"300ML","type":"text","value":"1","id":"13","__Jshop_Token__":"d7fd2ef1c7b48c5492d3f580578ff948a99b38cb"}'
     },
];

const OptLogs = ({ dispatch, limit,  loading,  total, page }) => {

 
    let onTableChange = () => {}

    let  onTableShowSizeChange = () => {}


    useEffect(() =>{}, [  ]);

     return (
        <AppLayout style={{ backgroundColor : '#f0f2f5'}} >
             <Toolbar />
              <Table  
                 bordered 
                 expandedRowRender={record => (
                       <div>
                            <p >{record.content }</p>
                            <p >{record.descr }</p>
                       </div>
                 )}
                 style={{  backgroundColor : '#fff' }}
                 scroll={{ 
                     //  x : '100%',
                     // y :  tHeight,
                     // scrollToFirstRowOnChange : true,
                    }}
                 pagination={{
                  pageSizeOptions: ['10','20', '30', '50'],
                  current: Number(page), 
                  pageSize: Number(limit),
                  showQuickJumper: true,
                  showSizeChanger: true,
                  total : Number(total) | 0,
                  showTotal: function(total,pageSize){
                      return `共${Number(total)}条`
                  },
                      onChange: onTableChange,
                      onShowSizeChange: onTableShowSizeChange
                  }} 
                 columns={
                     [
                      {
                        title: '操作员',
                        dataIndex: 'operator',
                        key: 'operator',
                        align : 'center',
                      },
                      {
                        title: '操作时间',
                        dataIndex: 'opt_time',
                        key: 'opt_time',
                        align : 'center',
                      },
                      {
                        title: '操作内容',
                        dataIndex: 'content',
                        key: 'content',
                        align : 'center',
                        render : text => (
                             <span style={{ display :'block', maxWidth : 450, margin : '0 auto', textAlign : 'center' }} className="ell">{ text }</span>
                        )
                      },
                      
                      {
                        title: '操作描述',
                        dataIndex: 'descr',
                        key: 'descr',
                        align : 'center',
                        render : text => (
                            <span style={{ display :'block', maxWidth : 450, margin : '0 auto', textAlign : 'center' }} className="ell">{ text }</span>
                       )
                      },
                      {
                        title: '操作IP',
                        dataIndex: 'ip',
                        key: 'ip',
                        align : 'center',
                      },
                     
                  ]} 
                 dataSource={ data }
                 rowKey="id"
             />

   
        </AppLayout>
       )
}


function mapStateToProps(state) {
    const {  limit, total, page } = state.logs;
    return {
          page,
          limit,
          total,
          loading: state.loading.models.logs,
    };
  
  }
  
  export default connect(mapStateToProps)(OptLogs);