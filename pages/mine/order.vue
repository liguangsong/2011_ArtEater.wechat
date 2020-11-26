<template>
	<view class="myPage">
		<view class="orderView">
			<view class="orderItem">
				<view class="headView">
					<view class="icon">
						<u-icon name="checkmark-circle" color="#143a44" size="28"></u-icon>
					</view>
					<view class="state">购买成功</view>
					<view class="date">2020.11.26</view>
				</view>
				<view class="conView">
					<view class="subject">中国美术史</view>
					<view class="price">实付：¥299</view>
				</view>
			</view>
			<view class="orderItem">
				<view class="headView">
					<view class="icon">
						<u-icon name="checkmark-circle" color="#143a44" size="28"></u-icon>
					</view>
					<view class="state">购买成功</view>
					<view class="date">2020.11.26</view>
				</view>
				<view class="conView">
					<view class="subject">中国美术史</view>
					<view class="price">实付：¥299</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
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
		methods: {
			
		}
	}
</script>

<style>
	.myPage{
		padding: 20rpx;
	}
	.myPage .orderView{
		width: 100%;
	}
	.myPage .orderView .orderItem{
		padding: 0 40rpx;
	}
	.headView{
		display: flex;
		width: 100%;
		margin-top: 36rpx;
	}
	.headView .icon{
		width: 50rpx;
		text-align: left;
	}
	.headView .state{
		flex: 1;
		font-size: 26rpx;
		color: #143a44;
		font-family: PingFangSC-Medium;
	}
	.headView .date{
		width: 140rpx;
		text-align: right;
		font-size: 26rpx;
		color: #143a44;
		font-family: PingFangSC-Medium;
	}
	.conView{
		margin-left: 50rpx;
		margin-top: 30rpx;
		border-bottom: 1rpx solid #f6f6f6;
	}
	.conView .subject{
		font-size: 34rpx;
		height: 48rpx;
		line-height: 48rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.conView .price{
		height: 42rpx;
		line-height: 42rpx;
		font-size: 30rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
		margin-bottom: 36rpx;
	}
</style>
