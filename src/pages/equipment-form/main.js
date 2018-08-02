import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
	config:{
        usingComponents:{
            'i-input':'../../../static/iview/input/index',
            "i-row": "../../../static/iview/row/index",
            "i-col": "../../../static/iview/col/index",
            "i-modal": "../../../static/iview/modal/index",
            'i-button':'../../../static/iview/button/index'
		},
		navigationBarTitleText: '添加设备'
    }
}
