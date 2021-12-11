import Vue from 'vue'
import App from './App'
//引入vuex
import store from './store'
import config from 'static/config/index.js'
import parse from '@/parse/index.js'
import uView from "uview-ui"
import './css/quill.bubble.css'
import './css/quill.core.css'
import './css/quill.snow.css'
Vue.use(uView);

Vue.prototype.$store = store
Vue.prototype.Parse = parse
Vue.BaseConfig = config
Vue.prototype.innerAudioContext = null
Vue.config.productionTip = false
Vue.prototype.audio = uni.getBackgroundAudioManager()

App.mpType = 'app'

const app = new Vue({
    ...App,
	//挂载
	store
})
app.$mount()
