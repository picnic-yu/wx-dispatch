import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config:{
        usingComponents:{
            'i-button':'../../../static/iview/button/index',
            'i-icon':'../../../static/iview/icon/index',
            'i-spin':'../../../static/iview/spin/index',
            'i-panel':'../../../static/iview/panel/index'
        },
        navigationBarTitleText:'我的派工单'
    }
}
