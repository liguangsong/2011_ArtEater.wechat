<template>
	<view class='login'>
		<u-popup mode="center" width="578rpx" height="246rpx" border-radius="24" @close="handleCancle" v-model="isShowLogin">
			<view class="content">
				<view class="title">欢迎来到食艺兽小程序</view>
				<view class="action">
					<view class="btn-box">
						<view class="btn btnCancel" @click="handleCancle">
						    取消
						</view>
						<view class="btn btnConfirm" @click="handleGetuserinfo">
							微信授权
						</view>
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
				source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
				success: function(){
					console.log('load font success')
				}
			})
		},
		data() {
			return {
				tabBarUrls:['/pages/index/index','/pages/curriculum/curriculum','/pages/questionBank/questionBank','/pages/mine/mine'],
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
			handleGetuserinfo(e){
				var self = this
				// console.log('开始授权，openid:' + self.openid)
				uni.showLoading()
				let ores= uni.getStorageSync('openid');
				if(ores){
					console.log(ores,554433)
					self.openid = ores
					// 获取用户信息
					uni.getUserProfile({//授权后可以通过wx.getUserInfo得到用户信息
					  lang: "zh_CN",
					  desc:'用于完善用户信息',
					  success: res => {
						  self.get(res);
					  },
					  fail(e) {
							uni.hideLoading()
							console.log('获取授权信息失败111,',e)
					  }
					})
				}else{
					uni.hideLoading()
					console.log('获取授权信息失败222,',e)
				}
			},
			get(res) {
				let self=this;
				self.avatarUrl = res.userInfo.avatarUrl
				self.nickname = res.userInfo.nickName
				var query = new self.Parse.Query(self.Parse.User);
				query.equalTo('openid', self.openid)
				query.first().then(user=>{
					if(user){ // 已注册，直接登录
						console.log('已注册，去登录')
						self.Parse.User.logIn(self.openid,self.openid).then(async lres=>{
							uni.setStorage({
								key:'userInfo',
								data: lres
							})
							await this.getMember();
							if(self.tabBarUrls.includes(self.to)){
								uni.switchTab({
									url: self.to
								})
							}else{
								uni.navigateTo({
									url: self.to
								})
							}
							
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
			},
			async getMember() {
				var app = getApp();
				var user = await this.Parse.User.current();
				var query = new this.Parse.Query('MemberList');
				var user1 = JSON.parse(JSON.stringify(user));
				query.equalTo("openId", user1.openid);
				var results = await query.first();
				if (results) {
					var r = JSON.parse(JSON.stringify(results));
					app.globalData.member = r;
					if (r.endTime < Date.now()) {
						results.set('memberType', '');
						results.save();
					}
				}
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
				user.set("score_all", 0);
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
							// 赠送优惠券
							var CouponRecords = self.Parse.Object.extend("CouponRecord");
							var query = new self.Parse.Query("CouponInfo");
							query.greaterThan('useEndTime', new Date())
							query.find().then(coupons=>{
								coupons.forEach(couponInfo=>{
									var query1 = new self.Parse.Query("CouponRecord");
									debugger
									query1.equalTo('couponId', couponInfo.id)
									query1.equalTo('mode', 'all')
									query1.first().then(record=>{
										if(record) { // 已全部发送
											var couponRecord = new CouponRecords();
											couponRecord.set("couponName", couponInfo.get('couponName'));
											couponRecord.set("amount", parseFloat(couponInfo.get('amount')));
											couponRecord.set("useEndTime", couponInfo.get('useEndTime'));
											couponRecord.set("tipName", couponInfo.get('tipName'));
											couponRecord.set("tipContent", couponInfo.get('tipContent'));
											couponRecord.set("openid", self.openid);
											couponRecord.set("mode", 'all');
											couponRecord.set("productType", couponInfo.get('productType'));
											couponRecord.set("state", 0);
											couponRecord.set("orderNo", '');
											couponRecord.set("useTime", new Date());
											couponRecord.save()
										}
									})
								})
							})
							// 赠送邀请人积分
							uni.getStorage({
								key:'invitation',
								success(invitation) {
									console.log("邀请人:"+invitation.data+'_end')
									if(invitation.data){ // 如果是被人邀请的，给邀请人送积分
										self.Parse.Config.get().then(config=>{
											var shareScore = config.get('shareScore')
											console.log("邀请人获得积分:"+ shareScore+"_end")
											if(shareScore > 0) {
												var ScoreRecords = self.Parse.Object.extend("ScoreRecord")
												var scoreRecord = new ScoreRecords()
												scoreRecord.set('openid', invitation.data)
												scoreRecord.set('channel', 'share')
												scoreRecord.set('score', shareScore)
												scoreRecord.save()
												
												// 修改用户积分
												var userQuery = new self.Parse.Query(self.Parse.User)
												userQuery.equalTo('openid', invitation.data)
												userQuery.first().then(_user=>{
													if(_user){
														let score = _user.get('score')
														if(!_user.get('score_all') || _user.get('score_all')==0){
															_user.set('score_all', score + shareScore)
														} else {
															_user.set('score_all', _user.get('score_all') + shareScore)
														}
														_user.set('score', score + shareScore)
														_user.save(null,  { useMasterKey: true }).then(()=>{
															console.log('赠送积分成功')
														})
													}
												})
											}
										})
									}
								}
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
	.login {
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 99999;
	}
	.content{
		position: relative;
		height: 100%;
	}
	.content .title{
		padding-top: 70rpx;
		text-align: center;
		height: 40rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 40rpx;
	}
	.content .action{
		border-top: 1rpx solid rgba(0,0,0,.1);
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.content .action .btn-box{
		justify-content: space-between;	
		display: flex;
        background: rgba(0,0,0,.1);
	}
	.content .action .btn{
		height: 78rpx;
		width: 288rpx;
		line-height: 78rpx;
		/* flex: 1; */
		text-align: center;
		background-color: #ffffff;
		display: inline-block;
		vertical-align: middle;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
	}
	.btnCancel{
		color: #000000;
	}
	.btnConfirm{
		color: #ED3535;
	}
	.btnConfirm::after{
		border: none;
	}
</style>
