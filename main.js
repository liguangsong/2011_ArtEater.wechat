import Vue from 'vue'
import App from './App'
import config from 'static/config/index.js'
import parse from '@/parse/index.js'
import uView from "uview-ui"
Vue.use(uView);


Vue.prototype.Parse = parse
Vue.BaseConfig = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
