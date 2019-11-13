import { Icon, Badge } from 'antd';
import { useEffect, useState } from 'react';

// “提示可点击”组件
export const Promptbox = props => (
    <div className="prompt-box" title={ props.title || '该项可点击' }>
    <em className="prompt-box-icon"> ! </em>
    { props.children }
   </div> 
)


// 使用 Icon 与 iconfont
export const IconFont = Icon.createFromIconfontCN({
       scriptUrl : '//at.alicdn.com/t/font_978738_mvvaj8605z.js'
});


// 顶部工具栏
export const ToolbarTabs = props => {
  let { items = [],  } = props;
  let handleEvent = type => {
       props.onClick && props.onClick( type )
  }
    useEffect(() =>{}, [ props.items ]);

     return (
        <ul className="toolbar_tabs" >
             {
                items.map( ( item, index ) =>(
                    <li key={ index } onClick={ handleEvent.bind( this, item.name ) }  className={ item.selected ? 'active' : '' }> <span> { item.name } </span> <Badge count={ item.count } /> </li>
                ))
             }
       </ul>
     )
}



// 验证码
export const Captcha = props => {
   useEffect(() => {}, [ props.svg ])
   return (
       <figure onClick={ props.onClick } dangerouslySetInnerHTML={{ __html : props.svg }} id="app-captcha-box"></figure>
   )
}