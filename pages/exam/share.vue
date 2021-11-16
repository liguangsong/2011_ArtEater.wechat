<template>
	<view>
		<view class="bg" :style="{'height':screenHeight+'rpx'}">
			<image mode="scaleToFill" src="../../static/sharebg.png"></image>
		</view>
		<view class="contains">
			<view class="head">
				<image :src="userInfo.avatarUrl"></image>
			</view>
			<view class="title">考试名称</view>
			<view class="time">考试时间：{{history.minutes}}</view>
			<view class="user">{{userInfo.nickName}}-本次考试得分</view>
			<view class="scoreView">
				<view class="score">{{history.score}}</view>
				<view class="tips">分</view>
			</view>
			<view class="qrcode">
				<image src="../../static/qrcode.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				screenHeight: 0,
				history:{},
				userInfo:{}
			}
		},
		onLoad(options) {
			var self = this
			uni.getSystemInfo({
				success: res => {
					let factor = 750/res.screenWidth
					self.screenHeight = res.windowHeight * factor
				}
			})

			
			if(options.hid){
				var self = this
				const history = this.Parse.Object.extend("TestHistory")
				const query = new this.Parse.Query(history)
				query.get(options.hid).then(res => {
					self.handleGetUser(res.get('openid'))
					res.set('minutes', self.createMinutes(res.get('seconds')))
					self.history = res
				})
			}
		},
		methods: {
			handleGetUser(openid){
				var self = this
				const query = new this.Parse.Query(this.Parse.User)
				query.equalTo('openid',openid)
				query.first().then(res => {
					self.userInfo = res
				})
			},			
			createMinutes(seconds){
				return Math.floor(seconds/60)+'分钟'+(seconds%60)+'秒'
			},
		}
	}
</script>

<style>
	.bg{
		position: relative;
		width: 100%;
		overflow: hidden;
		min-height: 1340rpx;
	}
	.bg image{
		width: 100%;
		height: 100%;
	}
	.contains{
		position: absolute;
		left: 30rpx;
		top: 222rpx;
		width: 690rpx;
		height: 1072rpx;
		margin: auto;
		background-color: rgba(255,255,255,0.69);
		border-radius: 40rpx;
	}
	.contains .head{
		width: 240rpx;
		height: 240rpx;
		position: absolute;
		top: -120rpx;
		left: calc(50% - 120rpx);
		margin: 0 auto;
	}
	.contains .head image{
		width: 240rpx;
		height: 240rpx;
		border-radius: 50%;
	}
	.contains .title{
		height: 76rpx;
		line-height: 76rpx;
		margin-top: 210rpx;
		font-size: 54rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #352026;
		text-align: center;
	}
	.contains .time{
		height: 42rpx;
		line-height: 42rpx;
		margin-top: 8rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
		text-align: center;
	}
	.contains .user{
		height: 48rpx;
		line-height: 48rpx;
		margin-top: 62rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
		text-align: center;
	}
	.contains .scoreView{
		height: 224rpx;
		line-height: 224rpx;
		text-align: center;
		position: relative;
	}
	.contains .scoreView .score{
		font-size: 160rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #ff6867;
		text-align: center;
		display: inline;
	}
	.contains .scoreView .tips{
		width: 48rpx;
		height: 48rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
		text-align: left;
		display: inline;
	}
	.contains .qrcode{
		width: 300rpx;
		height: 300rpx;
		margin-top: 60rpx;
		text-align: center;
		width: 100%;
	}
	.contains .qrcode image{
		width: 300rpx;
		height: 300rpx;
		border-radius: 50%;
	}
</style>
