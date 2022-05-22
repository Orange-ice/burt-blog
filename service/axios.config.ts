import axios, {AxiosRequestConfig} from 'axios';
import {Message} from '@arco-design/web-react';

const service = axios.create({
  baseURL: '/api/v1',
  timeout: 5000,
});

service.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return Promise.resolve(response.data);
  },
  (error) => {
    Message.error(error.response.data?.message || '请求异常');

    return Promise.reject(error);
  }
);

const request = (config: AxiosRequestConfig) => {
  const {method = 'GET'} = config;
  if (method === 'GET' || method === 'get') {
    config.params = config.data;
  }
  return service.request(config);
};

export default request;