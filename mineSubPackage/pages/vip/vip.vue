<template>
	<view class="vip">
		<view class='user_info'>
			<view class='img'>
				<image src="../../../static/bg_null.png"></image>
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
		<view class="public interests">
			<view class="title">
				<text>会员权益</text>
			</view>
			<view class="list">
				<view class="item">
					<image src="../../../static/icon/icon_action_daka.png"></image>
					<view>123</view>
				</view>
				<view class="item">
					<image src="../../../static/icon/icon_action_daka.png"></image>
					<view>123</view>
				</view>
				<view class="item">
					<image src="../../../static/icon/icon_action_daka.png"></image>
					<view>123</view>
				</view>
				<view class="item">
					<image src="../../../static/icon/icon_action_daka.png"></image>
					<view>123</view>
				</view>
			</view>
			<view class="tel">
				<text>专属会员课程顾问，加微信：***********</text>
			</view>
			<view class="bigmember">
				<view class="bigmember-title">课程大会员</view>
				<view class="bigmember-info">
					文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍
				</view>
				<view class="vip-price">
					<view class="price">
						¥ <text class='discount'>498</text>
						<text class='old-price'>¥ 698</text>
					</view>
					<view class="open">
						<text>开通</text>
					</view>
				</view>
			</view>
		</view>
		<view class="public interests">
			<view class="title">
				<text>专属课程</text>
			</view>
			<view class="bigmember">
				<view class="bigmember-title">课程大会员</view>
				<view class="bigmember-info">
					文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍
				</view>
				<view class="bigmember-bottom">
					<view class="price">
						¥ <text class='discount'>498</text>
						<text class='old-price'>¥ 698</text>
					</view>
					<view class="open">
						<text>开通</text>
					</view>
				</view>
			</view>
		</view>
		<view class="fixed" :class='{leval: showFixed}'>
			<view class="bg" @click='showFixed = false'></view>
			<view class="fixed-bottom" @click='showFixed = true'>
				<text>限时优惠498，立即畅想课程</text>
			</view>
			<view class="openfixed">
				<view class="title">
					成为课程大会员
				</view>
				<view class="viewbox">
					<view class="box">
						<view class="list">
							<view class="item">
								<text class='title'>年度大会员</text>
								<view class="vip-price">
									<view class="price">
										¥ <text class='discount'>498</text>
										<text class='old-price'>¥ 698</text>
									</view>
									<view>
										<text>限时优惠</text>
									</view>
								</view>
							</view>
							<view class="item">
								<text class='title'>年度大会员</text>
								<view class="vip-price">
									<view class="price">
										¥ <text class='discount'>498</text>
										<text class='old-price'>¥ 698</text>
									</view>
									<view>
										<text>限时优惠</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="buy-info">
						<view class="">购买说明：</view>
						<view class="">自开通之日一年内，为您的有效服务器，可正常享受该计划服务内对应权益</view>
						<view class="">自开通之日一年内，为您的有效服务器，可正常享受该计划服务内对应权益</view>
						<view class="">自开通之日一年内，为您的有效服务器，可正常享受该计划服务内对应权益</view>
						<view class="">自开通之日一年内，为您的有效服务器，可正常享受该计划服务内对应权益</view>
						<view class="">自开通之日一年内，为您的有效服务器，可正常享受该计划服务内对应权益</view>
					</view>
				</view>
				<view class="payment-btn">
					<text>立即支付</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showFixed: false
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.vip-price {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40rpx 0 20rpx;
		.price {
			.discount {
				font-size: 40rpx;
				margin-right: 20rpx;
			}
			.old-price {
				text-decoration: line-through;
			}
		}
		.open {
			padding: 16rpx 40rpx;
			background: #fff;
			border-radius: 30rpx;
		}
	}
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
	.public {
		width: 100%;
		padding: 20rpx 40rpx;
		border-bottom: 10rpx solid #eee;
		.title {
			font-weight: 900;
			margin-bottom: 30rpx;
		}
	}
	.interests {
		.list {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			.item {
				flex: 0 1 150rpx;
				padding: 30rpx 0 20rpx;
				background: #eee;
				text-align: center;
				image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					border: 1px solid #000;
					margin-bottom: 20rpx;
				}
				view {
					font-weight: 800;
					font-size: 28rpx;
				}
			}
		}
		.tel {
			color: #ccc;
			font-size: 26rpx;
			padding:10rpx 0 30rpx;
			border-bottom: 1px solid #ccc;
		}
		.bigmember {
			background: #eee;
			padding: 30rpx;
			margin: 30rpx 0;
			.bigmember-title {
				text-align: center;
				font-size: 32rpx;
				margin-bottom: 20rpx;
			}
			.bigmember-info {
				font-size: 26rpx;
				line-height: 40rpx;
			}
		}
	}
	.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		.bg {
			position: absolute;
			left: 0;
			bottom: 0;
			height: 100vh;
			width: 100%;
			background: rgba(0,0,0,0.4);
			z-index: 90;
			overflow: hidden;
			display: none;
		}
		.viewbox {
			height: 660rpx;
			overflow-y: auto;
		}
		.fixed-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			text-align: center;
			background: #888;
			color: #fff;
		}
		.openfixed {
			background: #fff;
			position: absolute;
			bottom: 0;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			border: 1px solid #ccc;
			padding: 0 30rpx;
			width: 100%;
			z-index: 999;
			transform: translateY(750rpx);
			transition: .3s;
			.title {
				font-size: 30rpx;
				font-weight: 900;
				padding: 20rpx 0;
			}
			.box {
				width: 100%;
				height: 250rpx;
				overflow: hidden;
				margin: 20rpx 0;
				.list {
					width: 100%;
					height: 270rpx;
					overflow-x: auto;
					white-space: nowrap;
					.item {
						display: inline-block;
						border: 1px solid red;
						border-radius: 20rpx;
						background: #eee;
						height: 250rpx;
						width: 450rpx;
						padding: 30rpx;
						margin-right: 30rpx;
						.title {
							font-size: 30rpx;
							font-weight: 900;
						}
						.vip-price {
							margin-top: 90rpx;
						}
					}
				}
			}
			.buy-info {
				background: #eee;
				padding: 20rpx;
				border-radius: 20rpx;
				margin-top: 50rpx;
				view {
					margin: 12rpx 0;
				}
			}
			.payment-btn {
				position: absolute;
				bottom: 20rpx;
				background: #ccc;
				width: 690rpx;
				height: 80rpx;
				border-radius: 40rpx;
				text-align: center;
				line-height: 80rpx;
				fong-size: 30rpx;
				font-weight: 900;
			}
		}
	}
	.leval {
		.openfixed {
			transform: translateY(0);
		}
		.bg {
			display: block;
		}
	}
</style>

