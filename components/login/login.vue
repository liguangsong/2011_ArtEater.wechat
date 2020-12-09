<template>
	<view>
		<u-popup mode="center" width="640rpx" height="336rpx" border-radius="40" @close="handleCancle" v-model="isShowLogin">
			<view class="content">
				<view class="title">欢迎来到食艺兽小程序</view>
				<view class="action">
					<view class="btn">
						<view class="btnCancel" @click="handleCancle">取消</view>
					</view>
					<view class="btn">
						<button open-type="getUserInfo" @getuserinfo="handleGetuserinfo" class="btnConfirm">微信授权</button>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props:{
			visiable:{
				type: Boolean,
				default: false
			},
			to:{
				type: String,
				default: ''
			}
		},
		onLoad() {
			uni.loadFontFace ({
				family: 'PingFangSC-Medium',
				source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
				success: function(){
					console.log('load font success')
				}
			})
		},
		data() {
			return {
				isShowLogin: this.visiable,
				openid:'',
				avatarUrl:'',
				nickname:''
			};
		},
		watch:{
			visiable(newval){
				console.log(newval)
				this.isShowLogin = newval
			}
		},
		methods:{
			handleCancle(){
				this.$emit('cancle')
			},
			/*用户授权*/
			handleGetuserinfo({detail}){
				var self = this
				console.log('开始授权，openid:' + self.openid)
				uni.showLoading()
				uni.getStorage({
					key:'openid',
					success:function(res){
						self.openid = res.data
						// 获取用户信息
						uni.getSetting({
							success: sres => {
								console.log('获取授权信息成功')
								if (sres.authSetting['scope.userInfo']) {
									console.log('已授权，'+self.openid)
									// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
									uni.getUserInfo({
									  success: res => {
										let app = getApp()
										self.avatarUrl = res.userInfo.avatarUrl
										self.nickname = res.userInfo.nickName
										var query = new self.Parse.Query(self.Parse.User)
										// self.hasLogin = true
										query.equalTo('openid', self.openid)
										query.first().then(ures=>{
											if(ures){ // 已注册，直接登录
												console.log('已注册，去登录')
												self.Parse.User.logIn(self.openid,self.openid).then(lres=>{
													uni.setStorage({
														key:'userInfo',
														data: lres
													})
													uni.navigateTo({
														url: self.to
													})
													self.$emit('ok')
													console.log('登录成功')
													uni.hideLoading()
												}, error=>{
													uni.hideLoading()
													console.log('登录失败，' + error)
												})
											} else {
												console.log('未注册，去注册')
												self.handleSignUp()
											}
										})
									  }
									})
								} else {
									uni.hideLoading()
									console.log('未授权')
									// 未授权
								}
							},
							fail(e) {
								uni.hideLoading()
								console.log('获取授权信息失败,'+e)
							}
						})
					}
				})
			},
			/*注册*/
			handleSignUp(){
				var self = this
				var user = new self.Parse.User();
				user.set('openid', self.openid)
				user.set('avatarUrl', self.avatarUrl)
				user.set('nickName', self.nickname)
				user.set('username', self.openid)
				user.set('password', self.openid)
				user.set("role", 'student');
				user.set("score", 0);
				user.set("amount", 0);
				user.signUp().then((ruser)=> {
					uni.hideLoading()
					var postACL = new self.Parse.ACL();
					postACL.setRoleWriteAccess("admin", true);
					postACL.setPublicReadAccess(true);
					ruser.setACL(postACL);
					ruser.save().then(res=>{
						self.Parse.User.logIn(self.openid,self.openid).then(lres=>{
							uni.setStorage({
								key:'userInfo',
								data: lres
							})
							uni.reLaunch({
								url: '/pages/login/login',
								events:{
									back:function(data){
										uni.navigateTo({
											url: self.to
										})
									}
								}
							})
							self.$emit('ok')
						})
					},error=>{
						console.log('设置角色权限失败')
						console.log(error)
					})
					const role = self.Parse.Role
					let query1 = new self.Parse.Query(role);
					query1.equalTo('name','student')
					query1.first().then(role=>{
						role.getUsers().add(ruser);
						role.save().then(res=>{
							console.log('设置角色成功')
						},error=>{
							console.log('设置角色失败')
							console.log(error)
						})
					})
				},(error)=> {
					uni.hideLoading()
					console.log("Error: " + error.code + " " + error.message);
				});
			}
		}
	}
</script>

<style>
	.content{
		padding: 48rpx;
		position: relative;
	}
	.content .title{
		padding-top: 48rpx;
		height: 138rpx;
		text-align: center;
		font-size: 34rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.content .action{
		height: 102rpx;
		line-height: 102rpx;
		display: flex;
		width: 100%;
	}
	.content .action .btn{
		height: 102rpx;
		line-height: 102rpx;
		flex: 1;
		text-align: center;
	}
	.content .action .btn view{
		width: 276rpx;
		height: 70rpx;
		line-height: 70rpx;
		background-color: #ffffff;
		display: inline-block;
		vertical-align: middle;
		border: 0;
	}
	.btnCancel{
		font-size: 34rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.btnConfirm{
		font-size: 34rpx;
		font-weight: bold;
		color: #ff6867;
		font-family: PingFangSC-Medium;
		background-color: #ffffff;
		border: 1rpx solid #ffffff;
	}
	.btnConfirm::after{
		border: none;
	}
</style>
