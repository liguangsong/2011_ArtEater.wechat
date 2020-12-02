import Vue from 'vue'
import App from './App'
import config from 'static/config/index.js'
import uView from "uview-ui"
Vue.use(uView);

import parse from 'parse/weapp'

// 注册parse-server服务
parse.serverURL =config.parseServerBaseUrl
parse.initialize(config.ParseAppId, config.parseServerJsKey)

Vue.prototype.Parse = parse
Vue.BaseConfig = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
