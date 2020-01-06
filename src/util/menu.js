import util from '@/util';



const menuData = [
      {
        name : '首页',
        icon : 'icon-shouye',
        path : '',
        key : 'home',
      },
     {
        name : '商品管理',
        icon : 'icon-RectangleCopy',
        path : 'goods',
        key : 'goods',
        children : [
             {
                name : '商品列表',
                path : '',
                authority : 1,
                key : 'goods-list',
             },
             {
              name : '商品分类',
              path : 'category',
              authority : 1,
              key : 'goods-category',
             },
             {
                 name : '商品属性',
                 path : 'attrs',
                 authority : 1,
                   // hideInBreadcrumb: true,
                  // hideInMenu: true,
             }
        ]
     },

     {
        name : '订单管理',
        icon : 'icon-dingdanguanli',
        path : 'order',
        children : [
              {
                name : '订单列表',
                path : '',
                authority : 1,
              },
              {
                name : '发货单列表',
                path : 'deliver',
                authority : 1,
              },
              {
                name : '退货单列表',
                path : 'cancel',
                authority : 1,
              },
              {
                name : '售后单列表',
                path : 'service',
                authority : 1,
              }
        ]
     },

     {
        name : '微信管理',
        icon : 'icon-navicon-wxgl',
        path : 'wx',
        children : [
              {
                name : '小程序配置',
                path : 'setting',
                authority : 1,
              }
        ]
     },

     {
      name : '会员管理',
      icon : 'icon-huiyuanguanli',
      path : 'members',
      children : [
            {
              name : '用户列表',
              path : '',
              authority : 1,
            },
            {
              name : '管理员管理',
              path : 'admin',
              authority : 1,
            },
            {
              name : '角色管理',
              path : 'roles',
              authority : 1,
            },
      ]
   },

     {
      name : '操作日志',
      icon : 'icon-caozuorizhi',
      path : 'logs',
      children : [
            {
              name : '管理员日志',
              path : '',
              authority : 1,
            }
      ]
   },




]



function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!util.isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);