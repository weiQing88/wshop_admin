import { useEffect, useState } from 'react';
import { Card } from 'antd';
import Link from 'umi/link';

export default function(){
     return (
        <Card title="快捷操作" bordered={false} style={{ width: '32.5%', float : 'left' }}>
            <ul className="ell" >
                  <li className="shortcut-card-item">
                    <Link to="/">
                        <span> <i> icon </i> </span>
                        <em> 商品 </em>
                    </Link>
                </li>

                <li className="shortcut-card-item">
                    <Link to="/">
                        <span> <i> icon </i> </span>
                        <em> 商品 </em>
                    </Link>
                </li>

                <li className="shortcut-card-item">
                    <Link to="/">
                        <span> <i> icon </i> </span>
                        <em> 商品 </em>
                    </Link>
                </li>

                <li className="shortcut-card-item">
                    <Link to="/">
                        <span> <i> icon </i> </span>
                        <em> 商品 </em>
                    </Link>
                </li>

                <li className="shortcut-card-item">
                    <Link to="/">
                        <span> <i> icon </i> </span>
                        <em> 商品 </em>
                    </Link>
                </li>

            </ul>
         </Card>  
     )
}