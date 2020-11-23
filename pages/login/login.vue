<template>
	<view>
		<image src="../../static/logo.png"></image>
		<button v-if="canIUse" type="default" open-type="getUserInfo" @getuserinfo="handleGetuserinfo">授权登录</button>
		<!-- <uni-popup ref="popup" type="center">
			<view class="dailogView">
				<view class="title">补全信息</view>
				<view class="formItem">
					<input class="uni-input" maxlength="10" placeholder="请输入报考专业" />
				</view>
				<view class="formItem">
					<input class="uni-input" maxlength="10" placeholder="请输入目标院校" />
				</view>
				<view class="formItem">
					<input class="uni-input" maxlength="10" placeholder="请输入所在地区" />
				</view>
				<view class="formItem">
					<button>保存</button>
				</view>
			</view>
		</uni-popup> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				openid:'',
				userInfo:{},
				canIUse: uni.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {
			var self = this
			uni.getStorage({
				key:'openid',
				success:function(res){
					self.openid = res.data
				}
			})
		},
		methods: {
			handleGetuserinfo({detail}){
				var self = this
				// 获取用户信息
				uni.getSetting({
					success: sres => {
						if (sres.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							uni.getUserInfo({
							  success: res => {
								  let user = new this.Parse.Object('UserInfo')
								  var query = new this.Parse.Query(user);
								  query.equalTo('openid',self.openid)
								  query.find().then(ures=>{
									  debugger
									  if(ures.length==0){
										  user.set('openid', self.openid)
										  user.set('avatarUrl', res.userInfo.avatarUrl)
										  user.set('nickName', res.userInfo.nickName)
										  user.save().then(userRes => {
											  uni.setStorage({
											  	key:'userInfo',
												data: userRes
											  })
											  uni.navigateTo({
											  	url:'edit'
											  })
										  }).catch(console.error)
									  } else {
										  uni.setStorage({
											key:'userInfo',
											data: ures[0]
										  })
										  debugger
										  if(!ures[0].university){
											  uni.navigateTo({
											  	url:'edit'
											  })
										  }
									  }
									  
								  })
							  }
							})
						  } else {
							// 未授权
						  }
					}
				  })
			}
		}
	}
</script>

<style>
	.dailogView{
		width: 600rpx;
		padding: 20rpx;
		height: auto;
		border-radius: 20rpx;
		background-color: #ffffff;
	}
	.dailogView .title{
		border-bottom: 1rpx solid #eeeeee;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 32rpx;
		text-align: center;
	}
	.dailogView .formItem{
		display: inline-block;
		width: 100%;
		border-bottom: 1rpx solid #eeeeee;
		height: 70rpx;
		line-height: 70rpx;
		font-size: 32rpx;
	}
	.dailogView .formItem:last-child{
		border: 0;
	}
	.dailogView .formItem input{
		display: inline-block;
		vertical-align: middle;
		height: 50rpx;
		line-height: 50rpx;
		width: 100%;
	}
</style>
