<template>
	<view class="myView1" :style="{'padding-bottom':pdbtm+'rpx'}">
		<view-tabbar :current="3" @tabbarChange="tabbarChange"></view-tabbar>
		<view class='fixed'>
			<view class="headView1">
				<view class="title" :style='{height: navbarHeight + "rpx", top: tabbarHeight - navbarHeight+ "rpx"}'>
					<text>个人中心</text>
				</view>
				<view class="headCon" @click="handleInfoClick">
					<view class="headIconView">
						<image class='icon' style='opacity:1;' v-if='memberType' src="../../static/mine/icon.png"></image>
						<image v-if="userInfo&&userInfo.avatarUrl" :src="userInfo.avatarUrl"></image>
					</view>
					<view>
						<view class="nickName">{{userInfo.nickName}}</view>
						<view class="icon" v-if='memberType'>
							{{memberType}}
							<!-- <u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="20"></u-icon> -->
							<!-- <text>></text> -->
							<image src="../../static/mine/icon-left.png"></image>
						</view>
						<view class="icon" v-else>
							未开通会员
							<!-- <text>></text> -->
							<image src="../../static/mine/icon-left.png"></image>
						</view>
					</view>
				</view>
				<image class='bg' src="../../static/mine-head.png" mode='aspectFill'></image>
			</view>
			<view class="box scoreView">
				<image src="../../static/mine/mine-bg.png" mode=""></image>
				<view class="content">
					<view class="scoreItem">
						<view class="score">{{rightCount ? rightCount : 0}}</view>
						<view class="contentTitle regular">答题量</view>
					</view>
					<view class="scoreItem" @click="handleNoteClick">
						<view class="score">{{errorCount ? errorCount : 0}}</view>
						<view class="contentTitle regular">错题集</view>
					</view>
					<view class="scoreItem" @click="handleScoreRecord">
						<view class="score">{{userInfo.score ? userInfo.score : 0}}</view>
						<view class="contentTitle regular">总积分</view>
					</view>
				</view>
			</view>
		</view>

		<view class="scroll">
			<view class="vipView" @click='jumpvip'>
				<view class='open'>
					<view class="" v-if='memberType'>
						续 &nbsp; 费
					</view>
					<view class="" v-else>
						立即开通
					</view>
					<!-- <image  src="../../static/mine/mine_xufei.png" mode=""></image> -->
					<!-- <image src="../../static/mine/mine_open.png" mode=""></image> -->
				</view>
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.png"></image>
			</view>
			<view class="box actionView">
				<view class="actionItem" @click="handleSignInClick">
					<view class="licon">
						<image src="../../static/mine/mine_qiandao.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>签到</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
				<view class="actionItem" @click="handleScoreListClick">
					<view class="licon">
						<image src="../../static/mine/mine_paihang.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>积分排行榜</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
				<!-- <view class="actionItem" @click="handleOrderClick">
					<view class="licon">
						<image src="../../static/mine/mine_huiyuan.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>积分兑换</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view> -->
				<view class="actionItem" @click="handleCouponClick">
					<view class="licon">
						<image src="../../static/mine/mine_youhui.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>我的优惠券</text>
							<view class='semibold' v-if="couponCount > 0">{{couponCount}}</view>
							<!-- <u-badge v-if="couponCount > 0" type="error" bgColor="#ff7c7c" :offset="[39,0]" :count="couponCount"></u-badge> -->
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
				<view class="actionItem" @click="handleTestHisClick">
					<view class="licon">
						<image src="../../static/mine/mine_jilu.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>考试记录</text>
							<!-- <view>0</view> -->
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
				<view class="actionItem" @click="handleCollectionClick">
					<view class="licon">
						<image src="../../static/mine/mine_shoucang.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>收藏</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="box actionView">
				<view class="actionItem" @click="handleInvitationClick">
					<view class="licon">
						<image src="../../static/mine/mine_fenxiang.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>分享给好友</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
				<view class="actionItem" @click="handleMessageClick">
					<view class="licon">
						<image src="../../static/mine/mine_xiaoxi.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>消息中心</text>
							<!-- <view>3</view> -->
							<view class='semibold' v-if="msgCount > 0">{{msgCount}}</view>
							<!-- <view style="position: relative;">消息中心
								<u-badge  type="error" bgColor="#ff7c7c" :offset="[39,0]" :count="msgCount"></u-badge>
							</view> -->
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
				<view class="actionItem" @click="handleFeedBackClick">
					<view class="licon">
						<image src="../../static/mine/mine_yijian.png"></image>
					</view>
					<view class="cont">
						<view class="title">
							<text>意见反馈</text>
						</view>
						<view class="icon">
							<u-icon name="arrow-right" color="rgba(0,0,0,.1)" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Utils from '@/js/utils/index.js'
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Navbar from '@/curriculumSubPackage/components/navbar/navbar.vue';
	export default {
		data() {
			return {
				pdbtm: 0, //兼容iphonexr+
				windowHeight: 0,
				userInfo: {},
				rightCount: 0,
				errorCount: 0,
				msgCount: 0,
				couponCount: 0,
				screenHeight: 0,
				tabbarHeight: 0,
				navbarHeight: 0,
				opacity: 0,
				memberType: ''
			}
		},
		components: {
			'view-tabbar': Tabbar
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					this.screenHeight = e.screenHeight;
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					let custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight
					this.tabbarHeight = customBar * 2;
					this.navbarHeight = customBar * 2 - e.statusBarHeight * 2;
				}
			})
		},
		async onShow() {
			// if (!this.errorCount) {
				
			uni.showLoading({
				title:'加载中……'
			})
			// }
			uni.hideTabBar({
				animation: false
			});
			var self = this
			var userQuery = new self.Parse.Query(self.Parse.User)
			userQuery.equalTo('openid', self.Parse.User.current().get('openid'))
			userQuery.first().then(res => {
				uni.setStorage({
					key: 'userInfo',
					data: res
				})
				self.userInfo = res
				var query = new self.Parse.Query("ErrorHistory")
				query.equalTo('openid', self.userInfo.get('openid'))
				query.count().then(count => {
					self.errorCount = count
				})
				var query = new self.Parse.Query("RightHistory")
				query.equalTo('openid', self.userInfo.get('openid'))
				query.first().then(r => {
					if (r) {
						self.rightCount = r.get('questions').length
					}
				})
			})
			uni.hideLoading()
			let res = await Utils.getcount();
			if (res) {
				this.msgCount = res.msgCount;
				this.couponCount = res.couponCount;
			}
			
			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			if (member) {
				if (member.endTime > Date.now()) {
					if (member.memberType == 0) {
						this.memberType = '黑金VIP'
					}
					if (member.memberType == 1) {
						this.memberType = '铂金VIP'
					}
					if (member.memberType == 2) {
						this.memberType = '白银VIP'
					}
				}
			} 

		},
		onLoad() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm = 125 + app.globalData.paddingBottomHeight;
		},
		methods: {
			jumpvip() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
			},
			tabbarChange(item) {
				uni.switchTab({
					url: item.path
				})
			},
			/*查看已购项目*/
			handleOrderClick() {
				uni.navigateTo({
					url: './order'
				})
			},
			/*查看我的优惠券*/
			handleCouponClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/mycoupon/mycoupon'
				})
			},
			/*签到*/
			handleSignInClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/signin/signin'
				})
			},
			/*积分排行榜*/
			handleScoreListClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/score/score'
				})
			},
			/*查看考试记录*/
			handleTestHisClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/testhistory/testhistory'
				})
			},
			/*查看收藏*/
			handleCollectionClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/collection/collection'
				})
			},
			handleInvitationClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/invitation/invitation'
				})
			},
			/* 消息中心 */
			handleMessageClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/message/message'
				})
			},
			/* 查看详情 */
			handleInfoClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/info/info'
				})
			},
			/*反馈*/
			handleFeedBackClick() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/feedback/feedback'
				})
			},
			/*错题集*/
			handleNoteClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/error/index'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/error/index'
				}
			},
			handleScoreRecord() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/scorerecord/scorerecord'
				})
			}
		}
	}
</script>

<style lang="scss">
	.myView1 {
		padding-top: 560rpx;
		background: #F7F7F7;
	}

	.fixed {
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 90;

		.title {
			position: fixed;
			top: 0;
			width: 100%;
			color: #fff;
			font-size: 34rpx;
			z-index: 1000;
			display: flex;
			font-weight: 500;
			padding-left: 62rpx;
			align-items: center;
		}

		.headView1 {
			width: 100%;
			height: 450rpx;
			position: relative;

			.headCon {
				position: relative;
				display: flex;
				width: 100%;
				height: 100%;
				z-index: 199;
				padding: 204rpx 0 0 72rpx;
				color: #FFFFFF;

				.headIconView {
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
					// overflow: hidden;
					margin-right: 28rpx;
					position: relative;

					image {
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
						z-index: 9999;
					}
				}

				.nickName {
					font-size: 36rpx;
					font-weight: 500;
					line-height: 50rpx;
					margin: 26rpx 0 16rpx;
				}

				.icon {
					font-family: PingFangSC-Regular;
					font-size: 20rpx;
					font-weight: 400;
					height: 28rpx;
					opacity: .8;
					display: flex;
					align-items: center;
					// text {
					// 	display: inline-block;
					// 	transform: scale(1,1.8) translateY(-6%);
					// 	margin-left: 12rpx;
					// 	opacity: .6;
					// }
					image {
						width: 16rpx;
						height: 26rpx;
						margin-left: 10rpx;
					}
				}
			}

			.bg {
				position: absolute;
				top: 0;
				height: 100%;
				width: 100%;
				z-index: 100;
			}
		}
	}

	.box {
		width: 690rpx;
		margin: 0 auto 24rpx;
		background: #fff;
		box-shadow: 0 4rpx 8rpx 0 rgba(0, 0, 0, 0.06);
		border-radius: 24rpx;
		overflow: hidden;
	}

	.scoreView {
		position: absolute;
		height: 148rpx;
		top: 400rpx;
		left: 30rpx;
		z-index: 210;
		width: 692rpx;
		background: none;
		box-shadow: none;
		
		image {
			position: absolute;
			width: 100%;
			height: 100%;
			z-index: 10;
		}
		.content {
			height: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: relative;
			z-index: 20;
			top: 20;

			.scoreItem {
				height: 100%;
				padding-top: 30rpx;
				flex: 0 1 33.3%;
				position: relative;
				text-align: center;

				.score {
					font-size: 46rpx;
					// font-weight: 500;
					color: #000;
					line-height: 64rpx;
				}

				.contentTitle {
					font-size: 22rpx;
					font-weight: 400;
					color: rgba(0, 0, 0, .4);
					line-height: 30rpx;
				}
			}

			.br {
				position: absolute;
				right: 0;
				top: 36rpx;
				width: 0;
				height: 62rpx;
				border-right: 1px solid rgba(0, 0, 0, .05);
			}
		}
	}

	.scroll {
		position: relative;
		z-index: 0;
	}

	.vipView {
		height: 124rpx;
		width: 688rpx;
		margin: 0 auto;
		margin-bottom: 14rpx;;
		position: relative;
		overflow: hidden;
		margin-top: -7rpx;
		display: flex;
		align-items: center;
		
		image {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			width: 100%;
			height: 100%;
		}

		.open {
			position: absolute;
			z-index: 200;
			font-size: 20rpx;
			right: 0;
			margin-right: 28rpx;
			width: 136rpx;
			float: right;
			height: 40rpx;
			// text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 20rpx;
			border: 2rpx solid #995D05;
			color: #995D05;
		}
	}

	.actionView {
		.actionItem {
			height: 84rpx;
			display: flex;

			.licon {
				flex: 0 1 116rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					width: 64rpx;
					height: 64rpx;
				}
			}

			.cont {
				flex: 1 0 auto;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid rgba(0, 0, 0, .06);

				.title {
					flex: 1 0 auto;
					display: flex;
					justify-content: space-between;
					font-size: 24rpx;
					font-weight: 400;
					color: #352026;
					margin-right: 50rpx;
					
					view {
						height: 26rpx;
						border-radius: 13rpx;
						line-height: 26rpx;
						color: #fff;
						letter-spacing: 0;
						padding: 0 4rpx;
						margin-top: 4rpx;
						font-size: 16rpx;
						min-width: 26rpx;
						text-align: center;
						font-family: PingFangSC-Semibold, PingFang SC;
						background: linear-gradient(rgba(218, 39, 39, 1), rgba(218, 39, 39, .3));
					}
					
					text {
						font-family: PingFangSC-Regular, PingFang SC;
					}
				}

				.icon {
					margin-right: 40rpx;
					margin-top: -2rpx;
				}
			}

			&:last-child {
				.cont {
					border-bottom: none;
				}
			}
		}
	}

	page {
		background-color: #fbfbfb;
	}
</style>
