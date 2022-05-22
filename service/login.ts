import request from './axios.config';

export const login = (data: any) => request({
  url: '/user/login',
  method: 'POST',
  data: {
    ...data,
    loginMethod: 'PASSWORD'
  }
});