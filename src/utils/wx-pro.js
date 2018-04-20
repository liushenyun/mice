import Errors, { INVALID_TOKEN } from './errors'
// import { showWxFailToast } from './util'
function promisify() {
	wx.pro = {} // wx.pro 下面挂载着返回 promise 的 wx.API
	// 普通的要转换的函数
	const functionNames = [
		'login',
		'getUserInfo',
		'navigateTo',
		'checkSession',
		'getStorageInfo',
		'requestPayment',
		'removeStorage',
		'clearStorage',
		'getNetworkType',
		'getSystemInfo',
		'uploadFile',
		'getImageInfo',
		'downloadFile',
		'showToast',
	]

	functionNames.forEach(fnName => {
		wx.pro[fnName] = (obj = {}) => {
			return new Promise((resolve, reject) => {
				obj.success = function (res) {
					resolve(res)
				}
				obj.fail = function (err) {
					console.error(`wx.${fnName} fail`, err)
					reject(err)
				}
				wx[fnName](obj)
			})
		}
	})

	// 特殊改造的函数

	wx.pro.getStorage = key => {
		return new Promise((resolve, reject) => {
			wx.getStorage({
				key: key,
				success: res => {
					resolve(res.data) // unwrap data
				},
				fail: err => {
					resolve() // not reject, resolve undefined
				}
			})
		})
	}

	wx.pro.setStorage = (key, value) => {
		return new Promise((resolve, reject) => {
			wx.setStorage({
				key: key,
				data: value,
				success: res => {
					resolve(value) // 将数据返回
				},
				fail: err => {
					reject(err)
				}
			})
		})
	}

	wx.pro.request = options => {
		return new Promise((resolve, reject) => {
			const user = wx.getStorageSync('loginInfo')
			wx.showLoading({
				title: '加载中',
			})
			wx.request({
				url: options.url,
				method: options.method || 'GET',
				data: options.data,
				// application/x-www-form-urlencoded'  
				header: {
					'Hb-Token': (user && user.token) || '',
					'content-type':'application/x-www-form-urlencoded',
					...options.header
				},
				success: res => {
					setTimeout(() => {
						wx.hideLoading();
					}, 800);
					let { statusCode, data } = res;
					let errorCode = Number(data.errorCode);
					if (statusCode===200 && errorCode && errorCode === 0) {
						reject(res)
					} else{
						resolve(res.data)
					}
				},
				fail: err => {
					console.error('wx.request fail [network]', options, err)
					wx.showToast({
						title: '加载失败',
						image: '/images/ic_home_delete.png',
						duration: 3000,
					})
					reject(err)
				}
			})
		})

	}
}

export default promisify()
