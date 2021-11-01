<template>
	<view class="vip">
		<Navbar align='center' surplusHeight='70' navbarBg='#1A1512' height='450rpx' title='会员中心'>
			<template v-slot:img>
				<image style='width: 100%;' src="../../static/bg.png" mode='aspectFill'></image>
			</template>
			<view class="box">
				<view class="head">
					<view class="image">
						<image class="img" src="../../static/icon.png"></image>
						<image class='icon' src="../../static/icon.png"></image>
					</view>
					<view class="info">
						<view class="txt">
							<view>侍朋雁</view>
							<view>铂金VIP</view>
						</view>
						<view class="vip-btn">
							<text>续费</text>
						</view>
					</view>
				</view>
				<view class="view">
					<view class="viewHead">
						<view class="vipuser">
							会员权益
						</view>
						<view class="tel">
							联系我们:13811219735
						</view>
					</view>
					<view class="viewItem">
						<view class="viewItem-vip">
							<view class="bg">
								<image src="../../static/heijin.png"></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<text>黑金VIP</text>
								</view>
								<view class="viewItem-vip-txt">
									<text>黑金VIP共享7项权益，术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。</text>
								</view>
								<view class="viewItem-vip-bottom">
									<view class="viewItem-vip-price">
										<text>¥498</text>
										<text>¥678</text>
									</view>
									<view class="vip-btn">
										<text>续费</text>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item" v-for='(item,i) in [1,2,3,5,6,7,8]' :keys='i'>
								<view class="item-img">
									<image src="../../static/icon.png"></image>
								</view>
								<view class="item-title">
									VIP课程畅听
								</view>
								<view class="item-txt">
									关于会员权益中的描述性文字，关于会员权益中的描述性文字，关于会员权益中的描述性文字。
								</view>
							</view>
						</view>
					</view>
					<view class="br"></view>
					<view class="viewItem bojin">
						<view class="viewItem-vip">
							<view class="bg">
								<image src="../../static/bojin.png"></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<text>黑金VIP</text>
								</view>
								<view class="viewItem-vip-txt">
									<text>黑金VIP共享7项权益，术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。</text>
								</view>
								<view class="viewItem-vip-bottom">
									<view class="viewItem-vip-price">
										<text>¥498</text>
										<text>¥678</text>
									</view>
									<view class="vip-btn">
										<text>续费</text>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item" v-for='(item,i) in [1,2,3,5,6]' :keys='i'>
								<view class="item-img">
									<image src="../../static/icon.png"></image>
								</view>
								<view class="item-title">
									VIP课程畅听
								</view>
								<view class="item-txt">
									关于会员权益中的描述性文字，关于会员权益中的描述性文字，关于会员权益中的描述性文字。
								</view>
							</view>
						</view>
					</view>
					<view class="br"></view>
					<view class="viewItem baiyin">
						<view class="viewItem-vip">
							<view class="bg">
								<image src="../../static/baiyin.png"></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<text>黑金VIP</text>
								</view>
								<view class="viewItem-vip-txt">
									<text>黑金VIP共享7项权益，术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。</text>
								</view>
								<view class="viewItem-vip-bottom">
									<view class="viewItem-vip-price">
										<text>¥498</text>
										<text>¥678</text>
									</view>
									<view class="vip-btn">
										<text>续费</text>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item" v-for='(item,i) in [1,2,3]' :keys='i'>
								<view class="item-img">
									<image src="../../static/icon.png"></image>
								</view>
								<view class="item-title">
									VIP课程畅听
								</view>
								<view class="item-txt">
									关于会员权益中的描述性文字，关于会员权益中的描述性文字，关于会员权益中的描述性文字。
								</view>
							</view>
						</view>
					</view>
				</view>
				<view style='height: 100rpx'></view>
			</view>
		</Navbar>
		<view class="fixed" :class='{leval: showFixed}'>
			<view class="bg" @click='showFixed = false'></view>
			<view class="fixed-bottom">
				<view @click='showFixed = !showFixed'>限时优惠498，立即畅想课程</view>
			</view>
			<view class="openfixed">
				<view class="openfixed-title">
					食艺兽大会员
				</view>
				<view class="openbox">
			
						<view class="list">
							<view class="item heijin">
								<view class="img">
									<image class='imgbg' src="../../static/heijin.png"></image>
									<!-- <image class='righttop' src="../../static/bojin.png"></image> -->
								</view>
								<view class="info">
									<view class="title">
										<text>年度大会员</text>
									</view>
									<view class="price">
										<text class='discount'>¥498</text>
										<text class='old-price'>¥698</text>
									</view>
								</view>
							</view>
							<view class="item bojin">
								<view class="img">
									<image class='imgbg' src="../../static/bojin.png"></image>
									<!-- <image class='righttop' src="../../static/bojin.png"></image> -->
								</view>
								<view class="info">
									<view class="title">
										<text >年度大会员</text>
									</view>
									<view class="price">
										<text class='discount'>¥498</text>
										<text class='old-price'>¥698</text>
									</view>
								</view>
							</view>
							<view class="item baiyin">
								<view class="img">
									<image class='imgbg' src="../../static/baiyin.png"></image>
									<!-- <image class='righttop' src="../../static/bojin.png"></image> -->
								</view>
								<view class="info">
									<view class="title">
										<text >年度大会员</text>
									</view>
									<view class="price">
										<text class='discount'>¥498</text>
										<text class='old-price'>¥698</text>
									</view>
								</view>
							</view>
						</view>
				</view>
				<view class="buy-info">
					<view class="buy-title">购买说明</view>
					<view class="buy-info-item">
						<view>
							1.自开通之日起一年内，为您的有效服务期，
						</view>
						<view>
							可享受该计划对应服务权益
						</view>
					</view>
					<view class="buy-info-item">
						<view>
							 2.购买的会员服务为虚拟物品，不支持退订
						</view>
						<view>
							开通则表示您同意
							<text>食艺兽会员服务协议</text>、
							<text>隐私政策</text>
						</view>
					</view>
					<view class="buy-info-item">
						<view>
							3.关于会员更多请见
							<text>常见问题</text>、
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navbar from '../../../components/navBar/navbar.vue'
	export default {
		data() {
			return {
				showFixed: false
			}
		},
		components: {
			Navbar
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.vip {
		height: 100vh;
	}
	.box {
		width: 100%;
		position: absolute;
		top: 174rpx;
		.vip-btn {
			width: 144rpx;
			height: 48rpx;
			line-height: 46rpx;
			text-align: center;
			border-radius: 24rpx;
			border: 1px solid rgba(255, 205, 131, 1);
			color: rgba(255, 205, 131, 1);
			font-size: 20rpx;
		}
		.head {
			display: flex;
			margin: 0 78rpx 0 72rpx;
			.image {
				flex: 0 1 128rpx;
				height: 128rpx;
				margin-right: 28rpx;
				position: relative;
				border-radius: 50%;
				border: 1px solid #FFCD83;
				.img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}
				.icon {
					width: 68rpx;
					height: 64rpx;
					position: absolute;
					top: -32rpx;
					right: -8rpx;
				}
			}
			.info {
				flex: 1 1 auto;
				display: flex;
				padding-top: 34rpx;
				justify-content: space-between;
				align-items: center;
				.txt {
					view {
						&:first-child {
							font-size: 36rpx;
							font-weight: 600;
							color: #FFFFFF;
							line-height: 50rpx;
						}
						&:last-child {
							font-size: 20rpx;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 28rpx;
							margin-top: 10rpx;
						}
					}
				}
			}
		}
		.view {
			margin-top: 70rpx;
			background: #fff;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;
			.viewHead {
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 28rpx 48rpx 0 30rpx;
				color: #995D05;
				font-weight: 500;
				.vipuser {
					font-size: 28rpx;
					line-height: 40rpx;
					&::before {
						content: '';
						display: inline-block;
						width: 10rpx;
						height: 24rpx;
						background: #995D05;
						border-radius: 2px;
						margin-right: 8rpx;
					}
				}
				.tel {
					font-size: 16rpx;
					line-height: 22rpx;
				}
			}
			.viewItem {
				padding: 48rpx 40rpx;
				color: #FFCD83;
				&.bojin {
					color: #995D05;
					.vip-btn {
						color: #995D05;
						border-color: #995D05;
					}
				}
				&.baiyin {
					color: #000000;
					.vip-btn {
						color: #000;
						border-color: #000;
					}
				}
				.viewItem-vip {
					position: relative;
					width: 670rpx;
					height: 390rpx;
					.viewItem-vip-info {
						padding: 52rpx 52rpx 40rpx;
						position: relative;
						z-index: 100;
						.viewItem-vip-titel {
							font-size: 40rpx;
							font-weight: 600;
							line-height: 56rpx;
						}
						.viewItem-vip-txt {
							font-size: 20rpx;
							font-weight: 400;
							line-height: 28rpx;
							margin-top: 16rpx;
						}
						.viewItem-vip-bottom {
							margin-top: 76rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.viewItem-vip-price {
								text {
									font-weight: 600;
									&:first-child {
										font-size: 48rpx;
										line-height: 66rpx;
										margin-right: 48rpx;
									}
									&:last-child {
										font-size: 32rpx;
										line-height: 44rpx;
										text-decoration: line-through;
									}
								}
							}
						}
					}
					.bg {
						position: absolute;
						z-index: 0;
						top: 0;
						width: 100%;
						height: 100%;
						image {
							width: 100%;
							height: 100%;
						}
					}
				}
				.list {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					margin-top: 28rpx;
					&:after {
						content: '';
						display: inline-block;
						width: 204rpx;
					}
					.item {
						flex: 0 1 204rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 40rpx;
						color: #C4966C;
						.item-img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;
							border: 1px solid #C4966C;
							image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}
						.item-title {
							font-size: 20rpx;
							font-weight: 500;
							line-height: 28rpx;
							margin: 16rpx 0;
						}
						.item-txt {
							font-size: 16rpx;
							font-weight: 400;
							line-height: 22rpx;
						}
					}
				}
			}
		}
		.br {
			width: 100%;
			height: 12rpx;
			background: rgba(0, 0, 0, 0.05);
			box-shadow: 0 0 6rpx 0 rgba(0,0,0,.1);
		}
	}

	.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 200;
		.bg {
			position: absolute;
			left: 0;
			bottom: 0;
			height: 100vh;
			width: 100%;
			background: rgba(0,0,0,0.6);
			z-index: 90;
			overflow: hidden;
			display: none;
		}
		.fixed-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 140rpx;
			background: #fff;
			z-index: 2100;
			font-size: 32rpx;
			font-weight: 600;
			color: #995D05;
			line-height: 44rpx;
			view {
				height: 80rpx;
				width: 690rpx;
				border-radius: 40rpx;
				margin: 10rpx auto 0;
				background: linear-gradient(90deg, #efdec3, #e3c89a);
				text-align: center;
				line-height: 80rpx;
			}
		}
		.openfixed {
			background: #fff;
			position: absolute;
			bottom: 0;
			height: 836rpx;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			background: #fff;
			width: 100%;
			z-index: 1100;
			transform: translateY(836rpx);
			transition: .3s;
			.openfixed-title {
				width: 100%;
				text-align: center;
				margin: 48rpx auto;
				font-size: 32rpx;
				font-weight: 600;
				color: #995D05;
				line-height: 44rpx;
			}
			.openbox {
				width: 100%;
				height: 320rpx;
				overflow: hidden;
				.list {
					width: 100%;
					height: 340rpx;
					overflow-x: auto;
					white-space: nowrap;
					.item {
						display: inline-block;
						border-radius: 20rpx;
						height: 320rpx;
						width: 550rpx;
						padding: 48rpx;
						margin-right: 20rpx;
						position: relative;
						&:first-child {
							margin-left: 100rpx;
						}
						&.heijin {
							color: #FFCD83;
						}
						&.bojin {
							color: #995D05;
						}
						&.baiyin {
							color: #000000;
						}
						.img {
							position: absolute;
							z-index: 120;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							.imgbg {
								width: 100%;
								height: 100%;
							}
							.righttop {
								width: 116rpx;
								height: 116rpx;
								position: absolute;
								top: 0;
								right: 0;
							}
						}
						.info {
							position: relative;
							z-index: 150;
							.title {
								font-size: 40rpx;
								font-weight: 600;
								line-height: 56rpx;
							}
							.price {
								margin-top: 102rpx;
								.discount {
									font-size: 48rpx;
									font-weight: 600;
									line-height: 66rpx;
								}
								.old-price {
									font-size: 32rpx;
									font-weight: 600;
									line-height: 44rpx;
									margin-left: 48rpx;
									text-direction: line-through;
								}
							}
						}
					}
				}
			}
			.buy-info {
				margin-top: 18rpx;
				height: 220rpx;
				overflow-y: auto;
				text-align: center;
				font-size: 20rpx;
				font-weight: 400;
				color: #995D05;
				line-height: 30rpx;
				.buy-title {
					font-size: 24rpx;
					font-weight: 500;
					line-height: 30rpx;
					margin-bottom: 24rpx;
				}
				.buy-info-item {
					margin-top: 30rpx;
					text {
						text-decoration: underline;
					}
				}
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

