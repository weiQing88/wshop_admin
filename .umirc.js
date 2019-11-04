
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index/index' },
        { path: '/goods', component: '../pages/goods/goods' },
        { path: '/category', component: '../pages/category/category' }
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
         immer : true
      },
      dynamicImport: false,
      title: 'wshop_admin',
      dll: false,
      local : {
          enable : true,
          default : 'zh-CN',
          baseNavigator : true
      },
      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],

  theme: {
    'primary-color': '#eb3232',
  },



}
