import { useEffect, useState } from 'react';

// “提示可点击”组件
export const Promptbox = props => (
    <div className="prompt-box" title={ props.title || '该项可点击' }>
    <em className="prompt-box-icon"> ! </em>
    { props.children }
   </div> 
)


