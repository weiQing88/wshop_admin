import { useEffect, useState } from 'react';

// 最外层布局元素
function AppLayout( props ){
     let [ hgt, setHgt ] = useState( '100%' );
     let resize = e => {
          setTimeout(() =>{
               let height = document.getElementById('wshop_app_layout').offsetHeight;
               setHgt( height )
          },100)
     }

     useEffect(() => {  
           resize();
           window.addEventListener('resize', resize )
          return function(){
            window.removeEventListener('resize', resize )
          }
     },[]);

     let  _style = {};
      
     if( props.style ){
        let { hegiht, overflowY, ...others } = props.style;
         _style = others;
     }

     return (
        <div style={{ height : hgt, overflowY : 'auto', ..._style }} id="app_content">
            { props.children }
        </div>
     )


}

export default AppLayout

