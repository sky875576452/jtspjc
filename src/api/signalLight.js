
import {ajax} from './config'

export const listSysSetting = params => { return ajax.getData({url:`api/alarminfoController/listSysSetting`, params}); };
export const getAlarmininfo = params => { return ajax.getData({ url:`api/alarminfoController/getAlarmininfo`, params }) };
