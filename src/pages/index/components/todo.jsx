import { useEffect, useState } from 'react';
import { Card } from 'antd';
import util from '@/util/index';
import Link from 'umi/link';


export default function(){

    useEffect(() => {
       
       
    },[])
      
    return (
       <Card title="代办事项" bordered={false} style={{ width: '30%', margin: '0 1%', float : 'left' }}>
           <ul className="ell">
               <li className="todo-card-item">
                <Link to="/">
                        <em> 待支付 </em>
                        <p>324</p>
                </Link>
               </li>

               <li className="todo-card-item">
                <Link to="/">
                    <em> 待发货 </em>
                     <p>11</p>
                </Link>
                  
               </li>

               <li className="todo-card-item">
                   <Link to="/">
                     <em> 库存预警 </em>
                     <p>11</p>
                   </Link>
                  
               </li>

               <li className="todo-card-item">
                     <Link to="/">
                     <em> 其他 </em>
                     <p>11</p>
                    </Link>
                   
               </li>
               
           </ul>
        </Card>  
    )
}