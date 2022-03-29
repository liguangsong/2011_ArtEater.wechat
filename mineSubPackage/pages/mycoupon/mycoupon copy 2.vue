<template>
	<TopNavbar title='我的优惠券' bg='#fafafa'>
	<view style="text-align: center;padding-bottom: 100rpx;">
		<view class="testView" v-if="!coupons||coupons.length==0">
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
		<view :class="'couponItem '+((coupon.state==0&&coupon.couponName&&coupon.couponRange&&coupon.couponRange!='all')?'large':'')" v-for="coupon in coupons">
			<view class="bg1" v-if="coupon.state==0&&coupon.couponName&&coupon.couponRange&&coupon.couponRange!='all'">
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/coupon1.png"></image>
			</view>
			<view class="bg" v-else>
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/coupon2.png"></image>
			</view>
			<view :class="'content '+  (coupon.state!=0?'enable':'')">
				<view style="display: flex;width: 100%;">
					<view class="price">
						<view class="pricebox">
							减¥{{coupon.amount}}
						</view>
					</view>
					<view class="title" :style="{paddingTop:(coupon.state!=0?'54rpx':'40rpx')}">
						<view class="name">{{coupon.couponName}}</view>
						<view class="date" v-if="coupon.state==0">
							<u-count-down style="display: inline;" color="#b1b1b1" font-size="22" separator="zh"
								separator-size="22" :show-seconds="false" :show-minutes="false" @end='bindData'
								separator-color="#b1b1b1" :timestamp="coupon.seconds">
							</u-count-down>
							后失效
						</view>
					</view>
					<view class="radio">
						<view class="btn" v-if="coupon.state==0" @click="handleUseClick" :data-item="coupon">立即使用</view>
						<view v-if="coupon.state==1">已过期</view>
						<view v-if="coupon.state==2">已使用</view>
					</view>
				</view>
			</view>
			<view class="couponDetail">
				<!-- <view class="bg1">
					<image src="../../static/coupon1.png"></image>
				</view> -->
				<view class="content1" v-if="coupon.state==0&&coupon.couponName&&coupon.couponRange&&coupon.couponRange!='all'">
					<view class="price">
						<!-- <view class="pricebox"> -->
							<view class="price1">券后价</view>
							<view class="price2">¥{{coupon.total}}</view>
							<view class="price3">原价¥{{coupon.price}}</view>
						<!-- </view> -->
					</view>
					<view class="content">
						<view class="title">{{coupon.couponName}}</view>
						<view class="content">
							<text>{{coupon.tipContent}}</text>
						</view>
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
			// 加载优惠券1
			async memberType () {
				var query = new this.Parse.Query('MemberType');
				var ls = await query.find();
				let list = ls.map(item => JSON.parse(JSON.stringify(item))).sort((a, b) => a.surfaceId - b.surfaceId);
				
				var date = new Date();
				var year = date.getFullYear(); //年
				var month = date.getMonth() + 1; //月
				var day = date.getDate(); //日
				month = month >= 10 ? month : '0' + month
				day = day >= 10 ? day : '0' + day;
				var time = ' ' + year + month + day;
				list.forEach(item => {
					var time1 = parseInt(item.expirationDate.split('-').join(''));
					if (time1 < time) {
						item.promotionPrice = Number(item.memberPrice)
					}
				})
				return list;
			},
			/*加载优惠券*/
			bindCoupons() {
				var self = this
				let couponRecord = new self.Parse.Query('NewCouponRecord')
				couponRecord.equalTo('openid', self.openid)
				// couponRecord.greaterThan('useEndTime', new Date())
				couponRecord.find().then(async coupons => {
					let memberType = await self.memberType()
					let _coupons = []
					coupons.forEach(t => {
						let tipContent = '此VIP会员服务有效期为365天，到期会系统将关闭所有系统权限，为不影响使用，请提前续费'
						let total = null, price = null;
						if (t.attributes.couponRange == 'blackGold') {
							total = memberType[0].promotionPrice - t.attributes.amount
							price = memberType[0].promotionPrice
						}
						if (t.attributes.couponRange == 'platinum') {
							total = memberType[1].promotionPrice - t.attributes.amount
							price = memberType[1].promotionPrice
						}
						if (t.attributes.couponRange == 'silver') {
							total = memberType[2].promotionPrice - t.attributes.amount
							price = memberType[2].promotionPrice
						}
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
							price,
							total: total > 0 ? total : 0,
							seconds: seconds / 1000,
							useEndDate: useEndDate,
							couponRange: t.get('couponRange'),
							couponName: t.get('couponName'),
							tipContent: tipContent
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
			handleUseClick(e) {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
			}
		}
	}
</script>

<style>
	.couponItem {
		position: relative;
		width: 750rpx;
		height: 156rpx;
		display: inline-block;
		margin-top: 6rpx;
	}

	.couponItem.large {
		height: 350rpx;
	}

	.couponItem .bg,
	.couponItem .bg1 {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.couponItem .bg image,
	.couponItem .bg1 image {
		width: 100%;
		height: 100%;
	}

	.couponItem .content {
		position: relative;
		display: flex;
		width: 100%;
		z-index: 100;
	}

	.couponItem .content .price {
		flex: 0 1 272rpx;
		width: 272rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		/* padding-top: 52rpx;
		padding-left: 60rpx;
		text-align: left; */
		font-size: 38rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		color: #ED3535;
	}

	.couponItem .content .price .pricebox {
		text-align: center;
		width: 100%;
		padding: 0 60rpx;
		line-height: 52rpx;
		padding-top: 52rpx;
	}

	.couponItem.large .content .price {
		flex: 0 1 246rpx;
		width: 246rpx;
	}

	.couponItem.large .content .price .pricebox {
		padding: 0;
		padding-top: 52rpx;
		padding-left: 20rpx;
	}

	.couponItem .content .title {
		flex: 1 1 auto;
		padding-top: 42rpx;
	}

	.couponItem .content .title .name {
		height: 42rpx;
		line-height: 42rpx;
		font-size: 28rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #000;
		text-align: left;
		font-weight: bold;
	}

	.couponItem .content.enable .title .name {
		color: rgba(28, 28, 28, 0.4);
	}

	.couponItem .content .title .date {
		margin-top: 6rpx;
		height: 32rpx;
		line-height: 32rpx;
		font-family: PingFangSC-Regular;
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.4);
		text-align: left;
	}

	.couponItem .content .radio {
		flex: 0 1 202rpx;
		text-align: left;
		font-size: 20rpx;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867;
		padding-top: 60rpx;
	}

	.couponItem .content .radio .btn {
		display: inline-block;
		text-align: center;
		line-height: 36rpx;
		width: 136rpx;
		height: 40rpx;
		border-radius: 20rpx;
		color: #ED3535;
		border: 2rpx solid #ED3535;

	}

	.couponItem .content.enable .radio {
		color: rgba(28, 28, 28, 0.4);
	}

	.couponItem .content .radio image {
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}

	.couponItem .couponDetail {
		position: absolute;
		top: 188rpx;
		width: 100%;
		z-index: 101;
	}

	.couponItem .couponDetail .content1 {
		position: absolute;
		width: 100%;
		display: flex;
	}

	.couponItem .couponDetail .content1 .price {
		width: 246rpx;
		text-align: left;
		padding-left: 90rpx;
	}

	.couponItem .couponDetail .content1 .price .price1 {
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .8);
		line-height: 28rpx;
	}

	.couponItem .couponDetail .content1 .price .price2 {
		font-size: 38rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 52rpx;
	}

	.couponItem .couponDetail .content1 .price .price3 {
		text-decoration: line-through;
		font-size: 22rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .3);
		line-height: 32rpx;
	}

	.couponItem .couponDetail .content1 .content {
		flex: 1;
		display: block;
		text-align: left;
	}

	.couponItem .couponDetail .content1 .content .title {
		padding-top: 0;
		line-height: 40rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .7);
	}

	.couponItem .couponDetail .content1 .content .content {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, .5);
		line-height: 28rpx;
		padding-right: 60rpx;
	}

	.confirmView {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 150rpx;
	}

	.confirmView button {
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		background-color: #ed3535;
		border-radius: 46rpx;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
	}
</style>
