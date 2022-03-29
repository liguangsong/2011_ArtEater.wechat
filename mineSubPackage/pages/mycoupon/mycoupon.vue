<template>
	<TopNavbar title='我的优惠券' bg='#fafafa'>
		<view style="text-align: center;padding-bottom: 200rpx;">
			<view style='height: 12rpx'></view>
			<view class="testView" v-if="!coupons.filter(item=>item.state==0).length">
				<view style="text-align: center;padding-top: 200rpx;">
					<view style="text-align: center;height: 228rpx;">
						<image mode="aspectFit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/coupon-white.png" style="width: 750rpx;height: 486rpx;">
						</image>
					<view
						style="line-height: 40rpx;font-family: PingFangSC-Medium;font-size: 28rpx;color: rgba(0,0,0,0.6);margin-top: 28rpx;">
						暂无可使用的优惠券</view>
				</view>
					</view>
			</view>
			<view class="couponItem" v-if='coupon.state==0' v-for="coupon in coupons"
				@click="handleCheckCoupon(coupon)">
				<view class="bg">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E4%BC%98%E6%83%A0%E5%88%B8.png"></image>
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
						<view class="date">
							使用范围：
							<text v-if='coupon.couponRange == "all"'>通用型</text>
							<text v-if='coupon.couponRange == "blackGold"'>黑金会员专属</text>
							<text v-if='coupon.couponRange == "platinum"'>铂金会员专属</text>
							<text v-if='coupon.couponRange == "silver"'>白银会员专属</text>
						</view>
					</view>
				</view>
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
				products: []
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
				}
			})
		},
		methods: {
			bindData() {
				this.bindSubjects()
			},

			/*加载优惠券*/
			bindCoupons() {
				var self = this
				let couponRecord = new self.Parse.Query('NewCouponRecord')
				couponRecord.equalTo('openid', self.openid)
				couponRecord.find().then(async coupons => {
					let _coupons = []
					coupons.forEach(t => {
						let tipContent = '此VIP会员服务有效期为365天，到期会系统将关闭所有系统权限，为不影响使用，请提前续费'

						let state = t.get('state')
						if (state == 0 && t.get('useEndTime') <= new Date()) {
							state = 1
							t.set('state', 1)
							t.save()
						}
						let useEndDate = dateFormat(t.get('useEndTime'), 'yyyy年MM月dd日HH:mm')
						let seconds = t.get('useEndTime').getTime() - new Date().getTime()
						var product = self.products.find(p => {
							return p.id == t.get('couponRange')
						})
						_coupons.push({
							id: t.id,
							amount: t.get('amount'),
							couponName: t.get('couponName'),
							state: state,
							seconds: seconds / 1000,
							useEndDate: useEndDate,
							couponRange: t.get('couponRange'),
							couponName: t.get('couponName')
						})
					})
					var _canuse = _coupons.filter(t => {
						return t.state == 0
					})
					var _cannotuse = _coupons.filter(t => {
						return t.state != 0
					})
					self.coupons = _canuse.concat(_cannotuse)
				})
			},
			/* 立即使用 */
			handleCheckCoupon(e) {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
			}
		}
	}
</script>

<style>
	page {
		background-color: #fbfbfa;
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
		height: 100%;
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
</style>
