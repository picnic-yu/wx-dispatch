import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
	config:{
        usingComponents:{
            'i-input':'../../../static/iview/input/index',
            "i-icon": "../../../static/iview/icon/index",
            "i-cell-group": "../../../static/iview/cell-group/index",
            "i-cell": "../../../static/iview/cell/index",
            'i-button':'../../../static/iview/button/index'
		},
		navigationBarTitleText: '搜索'
    }
}
