
import Vue from 'vue'
import App from './App'
import '@/static/pcpx'
Vue.config.productionTip = false
//引入自建请求封装
import $request from './common/request.js'
Vue.prototype.$request = $request
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
