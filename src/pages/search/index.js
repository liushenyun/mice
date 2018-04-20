let MIXINS = require("../../common/mixin");
import { LOCAL_TEST_LIST } from '../../utils/const'
import { searchTestList } from '../../service/search.js'
import debounce from '../../utils/debounce'
import { S_IRWXG } from "constants";
const app = getApp(); //  eslint-disable-line no-undef
Page({
    data: {
        list:[],
		inputValue: '',
		id_value: 545,
		timer:null
	},
	cancelActive() {
		wx.navigateTo({
			url: '/pages/index/index'
		})
	},
	onLoad: function(option){
		console.log('search-onload', option)
		let { url, topColor, titleColor} = option;
		console.log('url', decodeURIComponent(url))
		console.log('topColor', decodeURIComponent(topColor))
		console.log('titleColor', decodeURIComponent(titleColor))
	},
	onUnload(){
		console.log('onUnload==')
	},
	inputChangeActive: debounce(function (e) {
		let _value = e.detail.value;
		this.setData({
			inputValue: _value
		});
		_value?searchTestList(_value).then(msg => {
			this.setData({
				list: msg.data
			})
		}):''
	}, 500),
	emptyInputValueActive() {
		this.setData({
			inputValue: ''
		})
		console.log('app', app.$PAGE_TIME)
		// wx.reportAnalytics('test_statistics', {
		// 	test_id: $PAGE_TIME
		// })
	},
	listToH5Active(p1, p2) {
		let _detail = p1.detail;
		MIXINS.listToH5Active(_detail, p2)
	}
})