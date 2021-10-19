<template>
	<view class="vip">
		<view class='user_info'>
			<view class='img'>
				<image src="../../static/bg_null.png"></image>
			</view>
			<view class='info'>
				<text class="name">姓名</text>
				<view>
					<text>未开通会员</text>
				</view>
			</view>
			<view class="btn">
				<text>立即开通</text>
			</view>
		</view>
		<view class="item">
			<view class="title">
				<text>会员权益</text>
			</view>
			<view class="">
				<view class="">
					<image src="../../static/icon/icon_action_daka.png"></image>
					<text>123</text>
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
		}
	}
</script>

<style scoped lang="scss">
	.user_info {
		width: 100%;
		height: 240rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #eee;
		.img {
			flex: 0 1 30%;
			text-align: center;
			image {
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}
		.info {
			flex: 0 1 40%;
			text {
				line-height: 60rpx;
				color: #999;
				&.name {
					font-size: 36rpx;
					font-weight: 800;
					color: #000;
				}
			}
		}
		.btn {
			flex: 0 1 30%;
			text-align: center;
			text {
				display: block;
				width: 150rpx;
				height: 60rpx;
				border-radius: 35rpx;
				background: #333;
				font-size: 26rpx;
				text-align: center;
				line-height: 60rpx;
				color: #fff;
				margin: 0 auto;
			}
		}
	}
	.item {
		width: 100%;
		padding: 20rpx;
	}
</style>

