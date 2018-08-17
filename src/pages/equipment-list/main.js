import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
	config: {
		navigationBarTitleText: '设备列表'
	},
	usingComponents:{
		'i-page':'../../../static/iview/page/index',
		'i-panel':'../../../static/iview/panel/index',
		"i-row": "../../../static/iview/row/index",
		"i-icon": "../../../static/iview/icon/index",
		"i-col": "../../../static/iview/col/index"
	}
}
