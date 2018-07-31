
const rootDocment = 'http://172.16.100.210:8083/management-api/';
let header = {
  'authorization': '',
  'content-type': 'application/json'
}

// 同步获取
// try {
//     var token = wx.getStorageSync('token');
//     console.log(token,'token')
//     if(token){
//         header.authorization = token;
//     }
    
// } catch (e) {
//     // Do something when catch error
// }
export const  getReq =(url, cb)=> {
    try {
        var token = wx.getStorageSync('token');
        console.log(token,'token')
        if(token){
            header.authorization = token;
        }
        
    } catch (e) {
        // Do something when catch error
    }
    wx.showLoading({
        title: '加载中',
    })
    console.log("header=="),
    console.log(header)
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
 
export const  postReq = (url, data, cb) => {
    try {
        var token = wx.getStorageSync('token');
        console.log(token,'token')
        if(token){
            header.authorization = token;
        }
        
    } catch (e) {
        // Do something when catch error
    }
    wx.showLoading({
        title: '加载中',
    })
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
    

    console.log("header==")
    console.log(header)

    
}