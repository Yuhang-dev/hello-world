import axios from 'axios';

//创建实例
var http = axios.create({
    baseURL: '/api/v1',//ajax请求基础路径
    timeout: 60000, //响应超时时间
    withCredentials: true,//跨域时是否可转发cookie
});

// Add a request interceptor
http.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });


export default http;//输出实例

