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
            "i-row": "../../../static/iview/row/index",
            "i-col": "../../../static/iview/col/index",
            'i-input':'../../../static/iview/input/index',
            "i-modal": "../../../static/iview/modal/index",
            "i-cell-group": "../../../static/iview/cell-group/index",
            "i-cell": "../../../static/iview/cell/index"
        },
        navigationBarTitleText:'主页',
    }
}
