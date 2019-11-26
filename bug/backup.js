// 代码备份



   // 上传处理

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}


   // 上传处理
   let normFile = ({ file, fileList }) => {
    // 如果是由删除触发的回调，直接返回 fileList
    if( file.hasOwnProperty('status') && file.status == 'removed' ) return fileList;

let travel = (  file, fileList ) => {
    let newFilelist = [];
    fileList.forEach(( f, index ) => {
        if( file.uid != f.uid ) newFilelist.push( f );
    })
    return newFilelist
}

let uid = -1;

//  if( file.hasOwnProperty('originFileObj') || uid < 0 ) return fileList;

if( file.hasOwnProperty('uid') ){  uid =  Number( file.uid ) || -1 }


// 上传图片数量限制在 5 张图片
if( fileList.length > 5  )  return  travel( file, fileList );


if( uid < 0 ){ // 如果是后台返回的数据，uid是负数，不必再进行处理；

let flag = true;
let imgTypes = [ 'image/jpeg', 'image/bmp', 'image/gif', 'image/png' ];


if( imgTypes.indexOf( file.type ) == -1 ){
    flag = false;
    message.error('仅支持 jpg、jpeg、bmp、gif、png 图片文件格式!');
}


const isLt500M = file.size / 1024 / 1024 < 500;

if (!isLt500M) {
        flag = false;
        message.error('限图片文件小于500MB!');
    }

  if( flag ){

         // 防止： Upload  有时会处理过 File 对象，真实的 file 对象是 originFileObj
        if( file.hasOwnProperty('originFileObj')  ){
            getBase64(file.originFileObj, imageUrl => this.setState({ fileList })); 
        }else{
            getBase64(file, imageUrl => this.setState({ fileList })); 
        }

        return fileList;

    }else{

        return  travel( file, fileList );
    }

}else{
      return []
}

}



//  上传 end 