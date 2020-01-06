// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path : '/login',
      component : '../layouts/login/login',
    },
    {
      path : '/register',
      component : '../layouts/login/register',
    },


    {
      path: '/',
      component: '../layouts/index',
      routes: [

        {
          path : '/user',
          component: '../pages/member_center/index',
        },
        

        {
          path : '/testpage',
          component: '../pages/testpage',
          Routes: ['src/pages/authorized'],
          authority: ['admin', 'user'],
        },

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
          path: '/403',
          component : '../pages/403'
        },
        {
          component : '../pages/404'
        },
      
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

  chainWebpack(config, { webpack } ) {
     // 设置 alias
     config.resolve.alias.set('$p', require('path').resolve(__dirname, 'public') );

  },


  proxy : [
      {
        context: ['/public', '/api'],
        "target": "http://localhost:7001", 
        logLevel: 'debug',
        "changeOrigin": true,
        // "pathRewrite": { "^/api" : "" },
         "secure": false
      }
  ],

  //  proxy:{
  //       "/api": {
  //         "target": "http://localhost:7001", 
  //         logLevel: 'debug',
  //         "changeOrigin": true,
  //         // "pathRewrite": { "^/api" : "" },
  //          "secure": false
  //       },
  //      "/public" : {
  //        "target": "http://localhost:7001", 
  //        logLevel: 'debug',
  //        "pathRewrite": { "^/public" : "/public" },
  //        "changeOrigin": true,
  //        "secure": false
  //      }
  //   },

  theme: {
    'primary-color': '#eb3232',
  },

  define : { // 这样配置无效，TMD 
      'PUBLICKEY' : 'wshop_201911141230034_5459',
  }



 // ***** 预留配置例子 *****
  // alias: {
  //   api: resolve(__dirname, './src/service/'),
  //   components: resolve(__dirname, './src/components'),
  //   models: resolve(__dirname, './src/models'),
  //   service: resolve(__dirname, './src/service'),
  //   utils: resolve(__dirname, './src/utils'),
  // },
  // extraBabelPresets: ['@lingui/babel-preset-react'],
  // extraBabelPlugins: [
  //   [
  //     'import',
  //     {
  //       libraryName: 'lodash',
  //       libraryDirectory: '',
  //       camel2DashComponentName: false,
  //     },
  //     'lodash',
  //   ],












};


