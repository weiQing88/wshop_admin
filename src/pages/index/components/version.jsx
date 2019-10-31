import { useEffect, useState } from 'react';
import { Card } from 'antd';
import util from '@/util/index';
import Link from 'umi/link';


export default props => 
      <Card title="版本信息" bordered={false} style={{ width: '30%', float : 'right' }}>
            <table className="home-version-table">
                <colgroup><col width="100" /><col /></colgroup>
                <tbody>
                <tr>
                    <td>产品名称</td>
                    <td> wshop </td>
                </tr>
                <tr>
                    <td>当前版本</td>
                    <td>v1.0</td>
                </tr>
                <tr>
                    <td>当前版本</td>
                    <td>v1.0</td>
                </tr>
                <tr>
                    <td>当前版本</td>
                    <td>v1.0</td>
                </tr>
                </tbody>
            </table>
        </Card>