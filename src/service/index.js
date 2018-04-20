import config from '../config';
import api from './api'
// let api = config.api;
/**
 * 获取测试列表数据
 */
let getTestList = (classId = 'all') => {
    return wx.pro.request({
        url: api.getTestList(classId)
    })
}

let getBannerList = () =>{
    return wx.pro.request({
        url: api.getBannerList()
    })
}

let getClassBtnList = () =>{
    console.log('uri:'+api.getClassBtnList())
    return wx.pro.request({
        url: api.getClassBtnList()
    })
}
export {
    getTestList,
    getBannerList,
    getClassBtnList
}