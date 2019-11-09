// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path : '/login',
      component : '../layouts/login/login'
    },
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/',
          component: '../pages/index/index',
          authority: ['admin', 'user'],
        },
        {
          path: '/goods',
          component: '../pages/goods/goods',
          authority: ['admin', 'user'],
        },
        {
          path: '/goods/category',
          component: '../pages/goods/category',
        },
        {
          path: '/goods/attrs',
          component: '../pages/goods/attribution',
        },
        {
          path: '/order',
          component: '../pages/order/list',
        },
        {
          path: '/order/deliver',
          component: '../pages/order/deliver',
        },
        {
          path: '/order/cancel',
          component: '../pages/order/cancel',
        },
        {
          path: '/order/service',
          component: '../pages/order/service',
        },
        {
          path: '/members',
          component: '../pages/members/users',
        },
        {
          path: '/members/admin',
          component: '../pages/members/admin',
        },
        {
          path: '/members/roles',
          component: '../pages/members/roles',
        },
        {
          path: '/members/setting',
          component: '../pages/members/setting',
        },
        {
          path: '/wx/setting',
          component: '../pages/wx/setting',
        },
        {
          path: '/logs',
          component: '../pages/logs/index',
        },
        {
          component : '../pages/404'
        }
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: {
          immer: true,
        },
        dynamicImport: false,
        title: 'wshop_admin',
        dll: false,
        local: {
          enable: true,
          default: 'zh_CN',
          baseNavigator: true,
          baseSeparator: '_',
        },
        routes: {
          exclude: [/components\//],
        },
        locale: true,
      },
    ],
  ],

  chainWebpack(config, { webpack }) {
    // 设置 alias
    config.resolve.alias.set('$p', require('path').resolve(__dirname, 'public') )
  },

  theme: {
    'primary-color': '#eb3232',
  },
};

