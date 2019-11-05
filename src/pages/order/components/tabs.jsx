import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge  } from 'antd';

export default function(){

    useEffect(() =>{}, []);

     return (
        <ul className="toolbar_tabs">
            <li> <span> 全部订单 </span> <Badge count={1} /> </li>
            <li> <span> 待支付 </span> <Badge count={1} /> </li>
            <li> <span> 待发货 </span> <Badge count={1} /> </li>
            <li> <span> 已取消 </span> <Badge count={1} /> </li>
            <li> <span> 已完成 </span> <Badge count={1} /> </li>
       </ul>
     )
}
