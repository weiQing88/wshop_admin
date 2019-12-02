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
  let handleEvent = item => {
       props.onClick && props.onClick( item )
  }
    useEffect(() =>{}, []);

     return (
        <ul className="toolbar_tabs" >
             {
                items.map( ( item, index ) =>(
                    <li key={ index } onClick={ handleEvent.bind( this, item ) } 
                       className={ item.selected ? 'active' : '' }> <span> { item.name } </span> <Badge count={ item.count } /> </li>
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



// 倒计时
export const Countdown = props => {
      let [ time, setTime ] = useState( 60 );
      let cdTimer = null;
       let activate = () => {
         cdTimer = setInterval(() => {
              console.log('running')
                if( time <= 1 ){
                    clearInterval( cdTimer );
                    setTime( 60 );
                    props.afterStop();
                }else{
                  setTime( --time )
                }
             }, 1000);
           }
      
      let reset = () => {
           clearInterval( cdTimer );
           setTime( 60 );
      }

      useEffect(() =>{
            if( props.state == 'start' ){
                   reset();
                   activate();
              }

         console.log('Countdown 仅仅执行一次');

      }, [props.state])
      
      return (
         <span className="app-countdown-box">
             <em style={{ visibility : props.state == 'start' ? 'visible' : 'hidden' }}>{ time }秒</em>
         </span>
      )
}


 // 表单项提示必填红星
export const RStar = props => ( <em className="formItem-required-star">*</em> );


// Table 组件的 y 属性值
export const TableSrollStatus = offset => {
        let [ y, setY ] = useState( true );
        let resize = () => {
              setTimeout(() =>{  setY(  window.appLayoutHeight - offset ) })
        }
       useEffect(() =>{
             resize();
              window.addEventListener('resize', resize );
           return () => {
                window.removeEventListener('resize', resize );
           }
       }, [])
        return y  
}



export const UploadImages = props => {
       let [ imageUrl, setImageUrl ] = useState([]);
       let { src = '', fileList = [], onClick = () => {} } = props;

       let getBase64 = (file) => {
             return new Promise((resolve, reject) => {
                   const reader = new FileReader();
                         reader.readAsDataURL(file);
                         reader.onload = () => resolve(reader.result);
                         reader.onerror = error => reject(error);
               })
        }

        if( fileList.length ){
             let urls = [];
             fileList.forEach( async file => {
                  if( file.url ){
                       urls.push( file.url );
                  }else{
                    let u = await getBase64( file );
                      urls.push( u );  
                  }
                
             });
             setImageUrl( urls );
        }

      return (
           <div className="upload-image-list">
                  {
                    imageUrl.map( url =>(
                         <div className="upload-image-box">
                         <img src={ url } alt=""/>
                         <span className="upload-image-box-cover">
                             <Icon type="delete" onClick={ onClick } />
                            </span>
                        </div>
                    ))
                  }
           </div>)
}

export const UploadPlusButton = props => {
    let { text = '图片', loading = false } = props;
     return (
      <div>
      <Icon type={ loading ? 'loading' : 'plus'} /> 
          <p className="ant-upload-text">{ text }</p>
      </div>
     )
}