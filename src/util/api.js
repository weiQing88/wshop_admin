import axios from 'axios';
import util from './index'
export default (function (params) {
    // 默认请求域
   axios.defaults.baseURL = 'http://localhost:8000/';

  // node 服务
 // axios.defaults.baseURL = 'http://127.0.0.1:7001';
 
    // 带上请求头
   axios.defaults.headers.common['Authorization'] = `Bearer ${ util.getCookie('wshopLoginToken')}`;

   // 请求拦截
   axios.interceptors.request.use(function(config) {
       return config
   }, function(error) {
       return Promise.reject( error )
   });

   // 响应拦截
   axios.interceptors.response.use(function (response) {
            return response;
   }, function( error ) {
       return Promise.reject( error )
   })


  return axios
})();
