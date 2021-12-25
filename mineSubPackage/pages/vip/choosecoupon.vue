<template>
	<TopNavbar title='选择优惠券' bg='#f7f7f7'>
		<view style="text-align: center;padding-bottom: 200rpx;">
			<view class="noChooseItem" @click="handleCheckCoupon(null)">
				<view class="title">暂不使用优惠券</view>
				<view class="radio">
					<image v-if="checkCoupon==null" src="../../../static/icon/icon_answer_nocheck.png"></image>
					<image v-else src="../../../static/icon/icon_answer_checked.png"></image>
				</view>
			</view>
			<view class="couponItem" v-for="coupon in coupons" @click="handleCheckCoupon(coupon)">
				<view class="bg">
					<image src="../../../static/couponbg.png"></image>
				</view>
				<view class="content">
					<view class="type">
						<text v-if='coupon.couponRange == "all"'>通用型优惠券</text>
						<text v-if='coupon.couponRange == "blackGold"'>黑金会员专享</text>
						<text v-if='coupon.couponRange == "platinum"'>铂金会员专享</text>
						<text v-if='coupon.couponRange == "silver"'>白银会员专享</text>
					</view>
					<view class="price">¥{{coupon.amount}}</view>
					<view class="title">
						<view class="name">{{coupon.couponName}}</view>
						<view class="date">截止日期：{{coupon.useEndDate}}</view>
						<view class="date">使用范围：{{coupon.tipName}}</view>
					</view>
					<view class="radio">
						<image v-if="coupon.state == 1" src="../../../static/icon/icon_answer_checked.png"></image>
						<image v-else src="../../../static/icon/icon_answer_nocheck.png"></image>
					</view>
				</view>
			</view>
			<view class="confirmView">
				<button @click="handleChooseCoupon">确认选择</button>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import {
		dateFormat
	} from '../../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				openid: '',
				coupons: [],
				checkCoupon: null,
				selectedProductType: [],
				selectedCouponId: ''
			}
		},
		components: {
			TopNavbar
		},
		onLoad(options) {
			var self = this
			uni.getStorage({
				key: 'openid',
				success(o) {
					self.openid = o.data
					self.bindCoupons()
					const eventChannel = self.getOpenerEventChannel()
					eventChannel.on('selectedCoupon', function(data) {
						self.selectedCouponId = data
					})
				}
			})
		},
		methods: {
			/*加载优惠券*/
			bindCoupons() {
				var self = this
				let couponRecord = new self.Parse.Query('NewCouponRecord')
				couponRecord.equalTo('openid', self.openid)
				couponRecord.equalTo('state', 0)
				couponRecord.find().then(list => {
					list = JSON.parse(JSON.stringify(list))
					let arr = []
					list.forEach(item => {
						if (new Date(item.useEndTime.iso).getTime() > Date.now()) {
							arr.push(item)
						} else {
							var crquery = new self.Parse.Query('NewCouponRecord')
							crquery.get(item.objectId).then(record => {
								record.set('state', 1)
								record.save()
							})
						}
					})
					arr.forEach(item => {
						item.useEndDate = new Date(item.useEndTime.iso).toLocaleDateString().replace(/\//g,'-')
						switch (item.couponRange) {
							case 'all':
								item.tipName = '所有';
							case 'blackGold':
								item.tipName = '黑金会员';
							case 'platinum':
								item.tipName = '铂金会员';
							case 'silver':
								item.tipName = '白银会员';
						}
					})
					self.coupons = arr;
				})
			},
			/* 选择优惠券 */
			handleCheckCoupon(coupon) {
				if (this.selectedCouponId == 0) {
					if (coupon.couponRange != 'all' && coupon.couponRange != 'blackGold') {
						uni.showToast({
							title: '当前购买与此优惠券不匹配',
							icon: 'none'
						})
						return;
					}
				}
				if (this.selectedCouponId == 1) {
					if (coupon.couponRange != 'all' && coupon.couponRange != 'platinum') {
						uni.showToast({
							title: '当前购买与此优惠券不匹配',
							icon: 'none'
						})
						return;
					}
				}
				if (this.selectedCouponId == 2) {
					if (coupon.couponRange != 'all' && coupon.couponRange != 'silver') {
						uni.showToast({
							title: '当前购买与此优惠券不匹配',
							icon: 'none'
						})
						return;
					}
				}
				var self = this
				self.checkCoupon = coupon
				self.coupons.forEach(t => {
					if (coupon && t.objectId == coupon.objectId) {
						t.state = 1
					} else {
						t.state = 0
					}
				})
			},
			/*选择优惠券*/
			handleChooseCoupon() {
				var self = this
				const eventChannel = self.getOpenerEventChannel()
				eventChannel.emit('choosed', self.checkCoupon);
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	page {
		background-color: #fbfbfa;
	}

	.noChooseItem {
		width: 690rpx;
		height: 106rpx;
		line-height: 106rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		display: inline-flex;
		margin-top: 30rpx;
		margin-bottom: 12rpx;
	}

	.noChooseItem .title {
		flex: 1;
		padding-left: 30rpx;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(153, 93, 5, .8);
		text-align: left;
	}

	.noChooseItem .radio {
		/* width: 104rpx; */
		/* text-align: center; */
		margin-right: 48rpx;
		height: 104rpx;
		line-height: 104rpx;
	}

	.noChooseItem .radio image {
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
		opacity: .5;
	}

	.couponItem {
		position: relative;
		width: 750rpx;
		height: 156rpx;
		display: inline-block;
	}

	.couponItem .bg {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}

	.couponItem .bg image {
		width: 100%;
		height: 100%;
	}

	.couponItem .content {
		position: relative;
		display: flex;
		z-index: 100;
		width: 100%;
	}
	.couponItem .type {
		width: 46rpx;
		margin-left: 30rpx;
		font-size: 20rpx;
		font-weight: 500;
		color: #995D05;
		line-height: 22rpx;
		display: flex;
		align-items: center;
		padding: 0 10rpx;
	}
	.couponItem .price {
		width: 140rpx;
		font-size: 38rpx;
		font-stretch: normal;
		letter-spacing: 0rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #995D05;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.couponItem .title {
		flex: 1;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		text-align: left;
		padding-top: 28rpx;
		margin-left: 40rpx;
	}

	.couponItem .title .name {
		font-stretch: normal;
		letter-spacing: 0rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #995D05;
		line-height: 40rpx;
	}

	.couponItem .title .date {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(153, 93, 5, .59);
		line-height: 28rpx;
	}

	.couponItem .radio {
		height: 156rpx;
		line-height: 156rpx;
	}

	.couponItem .radio image {
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 78rpx;
	}

	.confirmView {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		z-index: 1000;
	}

	.confirmView button {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		background-color: #ed3535;
		border-radius: 46rpx;
		letter-spacing: 0rpx;
		color: #ffffff;
		font-weight: bold;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
	}
</style>
