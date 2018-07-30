import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/login/main'],
    window: {
		backgroundTextStyle: 'light',
		navigationBarBackgroundColor: '#1296db',
		navigationBarTitleText: '派工助手',
		navigationBarTextStyle: 'black',
	},
	tabBar: {
		"color": "#9E9E9E",
		"selectedColor": "#1296db",
		"backgroundColor": "#fff",
		"borderStyle": "#ccc",
		"list": [
			{
				"pagePath": "pages/index/main",
				"text": "主页",
				"iconPath": "static/images/home.png",
				"selectedIconPath": "static/images/home-active.png",
			},
			{
				"pagePath": "pages/equipment-list/main",
				"text": "设备",
				"iconPath": "static/images/equipment.png",
				"selectedIconPath": "static/images/equipment-active.png",
			},
			{
				"pagePath": "pages/mine/main",
				"text": "我的",
				"iconPath": "static/images/mine.png",
				"selectedIconPath": "static/images/mine-active.png",
			}
		],
	}
  }
}
