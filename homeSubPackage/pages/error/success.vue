<template>
	<view class="success">
		<view class="img">
			<image src="../../../static/icon/icon_success.png"></image>
		</view>
		<view class="title">错题已灭杀</view>
		<view class="content">
			<text>今日公共错题灭杀行动已完成
			做错的题目已转入你的个人错题集</text>
		</view>
		<view class="btnView">
			<button @click="handleBack">返回</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},

		methods: {
			handleBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style>

	.success{
		text-align: center;
	}
	.success .img{
		width: 100%;
		text-align: center;
		margin-top: 206rpx;
	}
	.success .img image{
		width: 228rpx;
		height: 228rpx;
		/* border-radius: 50%;
		border: solid 8rpx #144430;
			opacity: 0.7; */
	}
	.success .title{
		height: 52rpx;
		line-height: 52rpx;
		font-family: PingFangSC-Medium;
		font-size: 38rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		margin-top: 26rpx;
		font-weight: bold;
	}
	.success .content{
		height: 84rpx;
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
		margin-top: 46rpx;
	}
	.success .btnView{
		position: fixed;
		width: 100%;
		bottom: 150rpx;
		text-align: center;
		padding: 30rpx;
	}
	.success .btnView button{
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		width: 100%;
		border-radius: 46rpx;
		background-color: #ffffff;
		color: #352026;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: bold;
		border: solid 2rpx #ff6867;;
	}
	.success .btnView button::after{
		border: 0;
	}
</style>
