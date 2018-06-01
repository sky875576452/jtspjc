
import {ajax} from './config'

export const getLoginCount = params => { return ajax.postData({url:`api/noAuthController/getGoodsTypeTree.do`, params}); };
export const getGoodsTypeTree = params => { return ajax.postData({ url:`api/noAuthController/getGoodsTypeTree.do`, params }) };
