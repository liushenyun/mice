
import { flow } from 'lodash';
import { LOCAL_TEST_LIST } from '../../utils/const';
let MIXINS = require("../../common/mixin");
import debounce from '../../utils/debounce';
import { getTestList, getBannerList, getClassBtnList } from '../../service/index.js';
const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page({
	onShareAppMessage: function (res) {
		console.log('re-', res)
		wx.showShareMenu({
			withShareTicket: true // 可以获取到此次转发的 shareTicket
		})
		return {
			title: '了解从此开始',
			path: 'pages/index/index?id=12',
			// imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523349954261&di=6c8f318161c2e09f5c4e2624cdd32cc3&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Faa18972bd40735fa13899ac392510fb30f24084b.jpg',
			success: function (res) {
				console.log('res', res)
				// 转发成功
				wx.getShareInfo({
					shareTicket: res.shareTickets[0],
					success: function (info) {
						console.log(29, info);
					}
				})
			},
			fail: function (res) {
				// 转发失败
			}
		}
	},
	data: {
		iH5Url: [
		],
		bannerList: [
		],
		swiperCurrent: 0,
		list: LOCAL_TEST_LIST,
		btnList: [
		],
		btnActiveType: 'all'
	},
	swiperCurrentChange(e) {
		this.setData({
			swiperCurrent: e.detail.current
		})
	},
	// 跳转搜索页面
	toSearchActive() {
		wx.navigateTo({
			url: '/pages/search/index'
		})
	},
	// 跳转测试连接
	bannerClickActive: debounce(function(e) {
		let _detail = this.getBannerJumpInfo(e.currentTarget.dataset.path);
		_detail?MIXINS.listToH5Active(_detail):wx.showToast({
			title: '无效的链接',
			icon: 'none',
			mask: true,
			duration: 2000
		  });
	}, 500),
	getBannerJumpInfo(path) {
		let _arr = path.split('?')[1].split('&');
		let _classId = _arr[0].split('=')[1];
		let _id = Number(_arr[1].split('=')[1]);
		let _allTestList = wx.getStorageSync('mice_all-test-list');
		for (let i = 0; i < _allTestList.length; i++) {
			if (_allTestList[i].classifyId == _classId && _allTestList[i].id == _id) {
				return {
					titleColor: _allTestList[i].titleColor,
					topColor: _allTestList[i].topColor,
					url: _allTestList[i].embeddUrl
				}
			}
		}
	},
	btnTap(e) {
		let _gradation = e.currentTarget.dataset.gradation;
		let _id = e.currentTarget.dataset.id;
		this.getTestList(_gradation, _id);
	},
	listToH5Active(p1, p2) {
		let _detail = p1.detail;
		MIXINS.listToH5Active(_detail, p2);
	},
	getTestList(gradation, id = 'all') {
		getTestList(id).then(msg => {
			let _listData = msg.data;
			this.setData({
				list: _listData
			})
			this.setData({
				btnActiveType: gradation
			})
		});
	},
	getBannerList() {
		getBannerList().then(msg => {
			let _banners = msg.data.banners;
			this.setData({
				bannerList: _banners
			})
		});
	},
	getClassBtnList() {
		getClassBtnList().then(msg => {
			let { classifies, evaluations } = msg.data;
			classifies.unshift({
				gradation: 'all',
				id: 'all',
				title: '全部',
				icon: '../../images/b_all.png',
				iconActive: 'btn_fun_active'
			});
			this.setData({
				list: evaluations,
				btnList: classifies
			})
			wx.setStorageSync('mice_all-test-list', evaluations)
		})
	},
	onShow: function(options) {
		// 如果想在小程序每次显示的时候获取参数
		console.log('options', options)
	},
	async onLoad() {
		await this.getClassBtnList();
		await this.getBannerList();
	},
});
