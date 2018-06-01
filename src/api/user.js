
import {ajax} from './config'
const baseApi='';
// 按用户名称、用户类型查询用户信息。
// userName		否			string
// userType   	否			string
export const queryUser= params => { return ajax.postData({url:`${baseApi}user/list`, params}); };
// 实现对用户信息的增、删、改操作。
// object		       是			   []
// operation   	   是			   string  add/ save/delete/del/ update
export const crud= params => { return ajax.postData({ url:`${baseApi}user/crud`, params }) };
