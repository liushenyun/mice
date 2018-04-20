function listToH5Active(detail, p2) {
    console.log(222,detail)
    let { url, topColor, titleColor} = detail;
    if(!url) { return }
    wx.navigateTo({
        url: `/pages/webview/index?url=${url}&topColor=${topColor}&titleColor=${titleColor}`
    })
}

module.exports = {
    listToH5Active
}