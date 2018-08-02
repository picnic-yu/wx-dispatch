import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()

export default {
	config: {
		navigationBarTitleText: '设备列表'
	},
	usingComponents:{
		"i-row": "../../../static/iview/row/index",
		"i-col": "../../../static/iview/col/index"
	},
}
