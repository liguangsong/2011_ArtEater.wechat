<template>
	<view>
		<!-- <button type="default" @click="scan">扫码</button> -->
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
				url:undefined,
				isShowLogin: false,
			}
		},
		components: {
			login
		},
		created() {
		},
		onLoad(options) {
           this.url=decodeURIComponent(options.q);
		},
		onShow() {
			if(this.url){
				   this.handleLoginComplate();
			}else{
			   uni.showToast({
				   title:'扫码失败',
				   icon:'none'
			   });
			}
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
						if(res.data.openid){
							if(res.data.phone){
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
								Curriculum.scanCode(member,this.url);
							}else{
								uni.navigateTo({
									// q为告诉登陆学习页面要原页面使用navigateTo条状过来的，要原路返回的标识
									url:'/pages/login/login?q=true'
								})
							}
						}
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
