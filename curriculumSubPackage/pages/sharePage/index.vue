<template>
	<view>
		<button type="default" @click="scan">扫码</button>
		<login :visiable="isShowLogin" @cancle="isShowLogin=false" @ok="handleLoginComplate" :to="toUrl">
		</login>
	</view>
</template>

<script>
	import Curriculum from '../../js/curriculum.js'
	import login from '../../../components/login/login.vue'
	export default {
		data() {
			return {
				isShowLogin: false,
			}
		},
		components: {
			login
		},
		created() {
			// Curriculum.scanCode();
			this.handleLoginComplate()
		},
		
		methods: {
			scan() {
				Curriculum.scanCode();
			},
			/* 登录完成 */
			handleLoginComplate() {
				var _this = this;
				uni.getStorage({
					key: 'userInfo',
					success: async res => {

						var app = getApp();
						var member = app.globalData.member;
						// 判断是不是会员
						if (!member) {
							var query = new this.Parse.Query('MemberList');
							query.equalTo("openId", res.data.openid);
							var results = await query.first();
							if (results) {
								member = JSON.parse(JSON.stringify(results));
								app.globalData.member = member;
							}
						}
						console.log(member,'member');
						Curriculum.scanCode(member);
					},
					fail() {
						_this.isShowLogin = true;
					}
				})
			},
		}
	}
</script>

<style>

</style>
