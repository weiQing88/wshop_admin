import React, { useState, useEffect } from 'react';
import { Tabs, Card, Icon, Badge  } from 'antd';

export default function(){

    useEffect(() =>{}, []);

     return (
        <ul className="toolbar_tabs">
            <li> <span> 全部商品 </span> <Badge count={1} /> </li>
            <li> <span> 全部商品 </span> <Badge count={1} /> </li>
            <li> <span> 全部商品 </span> <Badge count={1} /> </li>
            <li> <span> 全部商品 </span> <Badge count={1} /> </li>
       </ul>
     )
}