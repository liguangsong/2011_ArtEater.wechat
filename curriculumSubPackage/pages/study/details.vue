<template>
	<view>
		<view class="introduce">
			<text class='title'>课程介绍</text>
			<view class="font">
				<text>术查市资建务周二非称向给子走选。</text>
			</view>
			<view class="">
				<image src="../../../static/2.png"></image>
				<image src="../../../static/3.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style>
	.introduce {
		font-size: 30rpx;
		margin-bottom: 20rpx;
		font-weight: 900;
		padding: 0 48rpx;
		color: #D81E1F;
	}
	.introduce .title:before {
		display: inline-block;
		content: "";
		width: 10rpx;
		height: 24rpx;
		background: #D81E1F;
		margin-right: 10rpx;
	}
	.font {
		margin: 16rpx 0;
		color: #000;
		font-weight: 400;
	}
	.font text{
		line-height: 40rpx;
		font-size: 24rpx;
	}
</style>
