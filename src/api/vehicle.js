
import {ajax} from './config'

export const list = params => { return ajax.postData({url:`vehicle/list`, params}); };
export const findCategory = params => { return ajax.postData({ url:`vehicle/findCategory`, params }) };
