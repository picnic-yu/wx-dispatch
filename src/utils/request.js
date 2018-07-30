
const rootDocment = 'http://172.16.100.210:8081/management-api/';
let header = {
  'Authorization': null,
  'content-type': 'application/json'
}
// 获取token
wx.getStorage({
    key: 'token',
    success: function(res) {
        console.log(res.data)
        header.Authorization = res.data;
    } 
})
export const  getReq =(url, cb)=> {
    wx.showLoading({
        title: '加载中',
    })
    console.log("header=="),
    console.log(header)
    // 获取token
    wx.getStorage({
        key: 'token',
        success: function(response) {
            console.log(response.data)
            header.Authorization = response.data;
            wx.request({
                url: rootDocment + url,
                header: header,
                success: function (res) {
                    wx.hideLoading();
                    return typeof cb == "function" && cb(res.data)
                },
                fail: function () {
                    wx.hideLoading();
                    wx.showModal({
                        title: '网络错误',
                        content: '网络出错，请刷新重试',
                        showCancel: false
                    })
                    return typeof cb == "function" && cb(false)
                }
            })
        } 
    })
    
}
 
export const  postReq = (url, data, cb) => {
    wx.showLoading({
        title: '加载中',
    })
    wx.getStorage({
        key: 'token',
        success: function(response) {
            console.log(response.data)
            header.Authorization = response.data;
            wx.request({
                url: rootDocment + url,
                header: header,
                data: data,
                method: 'Post',
                success: function (res) {
                    wx.hideLoading();
                    return typeof cb == "function" && cb(res.data)
                },
                fail: function () {
                    wx.hideLoading();
                    wx.showModal({
                        title: '网络错误',
                        content: '网络出错，请刷新重试',
                        showCancel: false
                    })
                    return typeof cb == "function" && cb(false)
                }
            })
        } 
    })
    

    console.log("header==")
    console.log(header)

    
}