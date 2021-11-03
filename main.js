import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
import config from 'static/config/index.js'
import parse from '@/parse/index.js'
import uView from "uview-ui"
Vue.use(uView);

Vue.prototype.$store = store
Vue.prototype.Parse = parse
Vue.BaseConfig = config

let Member = parse.Object.extend("member");
Vue.prototype.$member = JSON.parse(JSON.stringify(new Member()))

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount()
