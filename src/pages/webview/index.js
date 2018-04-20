
let topColor = "#ff0000";
let titleColor ="#ffffff";
let url ='https://file74301aa321a6.iamh5.cn/v3/idea/z3tRYLSD'
Page({
	data: {
		url: ''
	},
	onShareAppMessage: function (res) {
		console.log('re-', res)
		wx.showShareMenu({
			withShareTicket: true // 可以获取到此次转发的 shareTicket
		})
		console.log(`/pages/webview/index?topColor=${encodeURIComponent(topColor)}&titleColor=${encodeURIComponent(titleColor)}&url=https://file74301aa321a6.iamh5.cn/v3/idea/z3tRYLSD`)
		return {
			title: '了解从此开始',
			path: `/pages/webview/index?topColor=${encodeURIComponent(topColor)}&titleColor=${encodeURIComponent(titleColor)}&url=${url}`,
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
	onLoad: function(option){
		console.log(option)
		let { url, topColor, titleColor} = option;
		this.setData({
			url: decodeURIComponent(url)
		});
		wx.setNavigationBarColor({
			frontColor: String(decodeURIComponent(titleColor)),
			backgroundColor: String(decodeURIComponent(topColor))
		})
	}
});
