import axios from 'axios';
import util from './index'


export default (function (params) {
    // 带上请求头
   axios.defaults.headers.common['Authorization'] = util.getCookie('loginToken');


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
