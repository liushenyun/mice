import config from '../config';
import api from './api'
// let api = config.api;
/**
 * 获取测试列表数据
 */


let searchTestList = (title='') =>{
    console.log(14245454)
    console.log('uri:'+api.getClassBtnList())
    return wx.pro.request({
        url: api.searchTestList(),
        method: 'POST',
        data:{
            'title': title
        }
    })
}
export {
    searchTestList
}