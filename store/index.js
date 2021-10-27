import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		mine:false
	},
    mutations: {
		// 设置点击建议按钮后的建议信息res
		setMineDot(state,info) {
			console.log(info,7878)
			state.mine=info;
		}
	},
    actions: {}
})
export default store