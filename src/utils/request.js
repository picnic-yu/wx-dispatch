
// export const rootDocment = 'https://manager.cloudkeeper.cn/management-api/';
export const rootDocment = 'https://tmanager.cloudkeeper.cn/management-api/';
// export const rootUrl = 'https://manager.cloudkeeper.cn';
export const rootUrl = 'https://tmanager.cloudkeeper.cn/management-api/';
let header = {
  'authorization': '',
  'content-type': 'application/json'
}
// 无权限跳到登陆页面
const goToLogin = (status) => {
    if(status == 401){
        wx.navigateTo({
            url: '/pages/login/main'
      })
    }
}

export const  getReq =(url, cb)=> {
    try {
        var token = wx.getStorageSync('token');
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
        success: function (res) {
            wx.hideLoading();
            goToLogin(res.statusCode);
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
//  flag if  true close loading
export const  postReq = (url, data, cb,flag=false) => {
    try {
        var token = wx.getStorageSync('token');
        if(token){
            header.authorization = token;
        }
        
    } catch (e) {
        // Do something when catch error
    }
    if(!flag){
        wx.showLoading({
            title: '加载中',
        })
    }
    
    wx.request({
        url: rootDocment + url,
        header: header,
        data: data,
        method: 'Post',
        success: function (res) {
            goToLogin(res.statusCode);
            
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
export const  putReq = (url, data, cb,flag=false) => {
    try {
        var token = wx.getStorageSync('token');
        if(token){
            header.authorization = token;
        }
        
    } catch (e) {
        // Do something when catch error
    }
    if(!flag){
        wx.showLoading({
            title: '加载中',
        })
    }
    
    wx.request({
        url: rootDocment + url,
        header: header,
        data: data,
        method: 'Put',
        success: function (res) {
            goToLogin(res.statusCode);
            
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