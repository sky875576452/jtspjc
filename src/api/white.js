
import {ajax} from './config'

export const listSysSetting = params => { return ajax.getData({url:`api/alarmWhiteListController/listSysSetting`, params}); };
export const listWhiteList = params => { return ajax.getData({ url:`api/alarmWhiteListController/listWhiteList`, params }) };
export const getWhiteList = params => { return ajax.getData({url:`api/alarmWhiteListController/getWhiteList`, params}); };
export const saveOrUpdate = params => { return ajax.postData({url:`api/alarmWhiteListController/saveOrUpdate`, params}); };
