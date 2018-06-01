import {ajax} from './config'
const baseApi='';
export const loginByUsername = params => { return ajax.postData({url:`api/loginController/login`, params}); };
export const logout = params => { return ajax.postData({ url:`${baseApi}logout`, params }) };
export const getUserInfo = params => { return ajax.getData({ url:`${baseApi}api/sysUserController/getUserByToken`, params }) };
