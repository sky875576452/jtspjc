
import {ajax} from './config'

export const listSysSetting = params => { return ajax.getData({url:`api/videoDeviceController/listSysSetting`, params}); };
export const getVideoDeviceInfo = params => { return ajax.getData({ url:`api/videoDeviceController/getVideoDeviceInfo`, params }) };
export const listVideoDevice = params => { return ajax.getData({ url:`api/videoDeviceController/listVideoDevice`, params }) };
