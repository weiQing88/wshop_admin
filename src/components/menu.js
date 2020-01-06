export default [
    {
        title : '商品管理',
        key : 'goods',
        value : 'goods',
        children : [
             {
                title : '商品列表',
                key : 'goods-list',
                value : 'goods-list',
             },
             {
              title : '商品分类',
              key : 'goods-category',
              value : 'goods-category',
             },
             {
                title : '商品属性',
                key : 'goods-attrs',
                value : 'goods-attrs',
             }
        ]
     },

     {
        title : '订单管理',
        key : 'order',
        value : 'order',
        children : [
              {
                title : '订单列表',
                key : 'order-list',
                value : 'order-list',
              },
              {
                title : '发货单列表',
                key : 'order-deliver',
                value : 'order-deliver',
              },
              {
                title : '退货单列表',
                key : 'order-cancel',
                value : 'order-cancel',
              },
              {
                title : '售后单列表',
                key : 'order-service',
                value : 'order-service',
              }
        ]
     },

     {
        title : '微信管理',
        key : 'wx',
        value : 'wx',
        children : [
              {
                title : '小程序配置',
                key : 'wx-setting',
                value : 'wx-setting',
              }
        ]
     },

     {
      title : '会员管理',
      key : 'members',
      value : 'members',
      children : [
            {
             title : '用户列表',
             key : 'members-list',
             value : 'members-list',
            },
            {
             title : '管理员管理',
             key : 'members-admin',
             value : 'members-admin',
            },
            {
             title : '角色管理',
             key : 'members-roles',
             value : 'members-roles',
            },
      ]
   },

     {
       title : '操作日志',
       key : 'logs',
       value : 'logs',
       children : [
            {
             title : '管理员日志',
             key : 'logs-admin',
             value : 'logs-admin',
            }
      ]
   }
]