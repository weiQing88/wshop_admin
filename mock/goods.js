import Mock from 'mockjs';

 var categoryData = (function(){
          let time = Mock.mock('@natural(1, 30)');
          let data = [];
          for( let i = 0; i < time; i++ ){
              let category_attrs = [];
                  for( let i = 0; i < 2; i++ ){
                      category_attrs.push({
                         id : Mock.mock('@id'),
                           name : '大份',
                      })
                  }

                data.push({
                        id : Mock.mock('@id'),
                        index : i + 1,
                        category_name : Mock.mock('@ctitle'),
                        category_type : '酸',
                        category_icon : 'xx',
                        category_sort : 2,
                        is_show : '0',
                        category_attrs,
                })
          }

     return data

 })();




 const goodsData = (function(){
      let time = Mock.mock('@natural(10, 30)');
      let data = [];
      for( let i = 0; i< time; i++ ){
            data.push({
                id : Mock.mock('@id'),
                goods_name : '爽脆姜酸--' + Mock.mock('@ctitle(3, 5)'),
                goods_number : 20,
                shop_price : 36,
                market_price : 37,
                goods_thumb : '',
                category_name : '酸野',
                is_hot : Mock.mock('@boolean') ? 1 : 0,
                is_recommend :  Mock.mock('@boolean') ? 1 : 0,
                is_on_sale :  Mock.mock('@boolean') ? 1 : 0,
            })
     }

  return  data;

})();






export default {
     "GET /api/goods/category" : categoryData,
     "GET /api/goods/" : goodsData,
}