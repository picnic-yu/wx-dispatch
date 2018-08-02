import Vue from 'vue'
import App from './index'

const app = new Vue(App)
app.$mount()
export default {
    config:{
        usingComponents:{
            'i-button':'../../../static/iview/button/index',
            "i-row": "../../../static/iview/row/index",
            "i-col": "../../../static/iview/col/index"
        },
        navigationBarTitleText:'派工单详情',
    }
}
