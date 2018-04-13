
import { flow } from 'lodash';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page({
	onLoad() {
		wx.getUserInfo({
			success: res => {
			  console.log(21, res)
			  app.globalData.userInfo = res.userInfo
			  this.setData({
				userInfo: res.userInfo,
				hasUserInfo: true
			  })
			}
		  })
	},
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
		  // 来自页面内转发按钮
		  console.log(res.target)
		}
		wx.showShareMenu({
			withShareTicket: true
		  })
		return {
		  title: '看看我们的消息吧',
		  path: 'pages/index/index',
		  imageUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1523349954261&di=6c8f318161c2e09f5c4e2624cdd32cc3&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Faa18972bd40735fa13899ac392510fb30f24084b.jpg',
		  success: function(res) {
			// 转发成功
			console.log(21, res.shareTickets);
			wx.getShareInfo({
				shareTicket: res.shareTickets[0],
				success:function (info) {
					console.log(29, info);
				}
			})
		  },
		  fail: function(res) {
			// 转发失败
		  }
		}
	  },
	data: {
		motto: 'Hello World',
		userInfo: {},
		iH5Url:[
			'https://file74301aa321a6.iamh5.cn/v3/idea/td1zgHH4',
			'https://file74301aa321a6.iamh5.cn/v3/idea/z3tRYLSD',
			'https://file74301aa321a6.iamh5.cn/v3/idea/a6fTj5UN',
			'https://file74301aa321a6.iamh5.cn/v3/idea/3dgWu6op'
		],
		imgUrls: [
			{
				'img': 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
				'url':'td1zgHH4'
			},
			{
				'img': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
				'url':'z3tRYLSD'
			},
			{
				'img': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg',
				'url':'a6fTj5UN'
			},
			{
				'img': 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
				'url':'3dgWu6op'
			}
		],
		list: [
			{
				'title': '身体年龄测试',
				'url':'td1zgHH4'
			},
			{
				'title': 'AI黑科技',
				'url':'z3tRYLSD'
			},
			{
				'title': '一分钟看透你的心病',
				'url':'a6fTj5UN'
			},
			{
				'title': '2017关键字',
				'url':'3dgWu6op'
			}
		],
		btnList:[
			{title: '全部', type: '1'},
			{title: '趣味测试', type: '2'},
			{title: '专业测试', type: '3'}
		],
		btnActiveType: '1'
	},
	// 跳转测试连接
	toWebViewTab(e) {
		let _url = e.currentTarget.dataset.url;
		wx.navigateTo({
			url:`/pages/webview/index?url=${_url}` 
		})
	},
	btnTap(e) {
		let _type = e.currentTarget.dataset.type;
		this.setData({
			btnActiveType: _type
		})
	},
	previewImg() {
		// http://www.favourfree.com/Public/Home/sharewuliu/img/erweima.png  不费事二维码
		// http://xiaoma.aldwx.com/tool/code/img/mcode.png   小程序二维码
    wx.previewImage({
      current: 'http://www.favourfree.com/Public/Home/sharewuliu/img/erweima.png',     //当前图片地址
      urls: ['http://www.favourfree.com/Public/Home/sharewuliu/img/erweima.png'],               //所有要预览的图片的地址集合 数组形式
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
	},
	showLoading() {
		wx.showLoading({
			title:'玩命加载中...',
			mask: true
		})
	},
	async onLoad() {

		await delay();

		const log = flow(() => {
			console.log('is wechat mini program: ', __WECHAT__);
			console.log('is alipay mini program: ', __ALIPAY__);
			console.log('DEV: ', __DEV__);
		});
		log();
		// 调用应用实例的方法获取全局数据
		app.getUserInfo((userInfo) => {
			// 更新数据
			this.setData({ userInfo });
		});
	},
});
