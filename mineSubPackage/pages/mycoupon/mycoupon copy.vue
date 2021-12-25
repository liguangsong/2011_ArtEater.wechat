<template>
	<TopNavbar title='我的优惠券' paddingTop="204" bg='#fafafa'>
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
		<view :class="'couponItem '+((coupon.tipName&&coupon.productType&&coupon.productType!='all')?'large':'')"
			v-for="coupon in coupons">
			<view class="bg1" v-if="coupon.tipName&&coupon.productType&&coupon.productType!='all'">
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
								separator-color="#b1b1b1" @change="handleChange" :timestamp="coupon.seconds">
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
				<view class="content1" v-if="coupon.tipName&&coupon.productType&&coupon.productType!='all'">
					<view class="price">
						<!-- <view class="pricebox"> -->
							<view class="price1">券后价</view>
							<view class="price2">¥{{ coupon.total}}</view>
							<view class="price3">原价¥{{coupon.price}}</view>
						<!-- </view> -->
					</view>
					<view class="content">
						<view class="title">{{coupon.tipName}}</view>
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
					self.bindData()
				}
			})
		},
		methods: {
			bindData() {
				this.bindSubjects()
			},
			/* 加载科目 */
			bindSubjects() {
				var self = this
				var query = new self.Parse.Query('Subjects')
				query.equalTo('parent_ID', '0')
				query.ascending('createdAt')
				query.find().then(subjects => {
					var _products = []
					let _price = 0
					subjects.forEach(t => {
						if (t.get('price') > 0) {
							_price += t.get('price')
						}
					})
					_products.push({
						id: 'subjectAll',
						price: _price,
						type: 'subjectAll'
					})
					self.products = JSON.parse(JSON.stringify(self.products)).concat(_products)
					self.bindActionConfigs()
				})
			},
			/*加载价格配置的收费项目*/
			bindActionConfigs() {
				var self = this
				var query = new self.Parse.Query('ActionConfig')
				query.ascending('createdAt')
				query.find().then(actionConfigs => {
					var _products = []
					actionConfigs.forEach(t => {
						if (t.get('price') > 0) {
							_products.push({
								id: t.id,
								price: t.get('price'),
								type: 'actionConfig'
							})
						}
					})
					self.products = JSON.parse(JSON.stringify(self.products)).concat(_products)
					self.bindCoupons()
				})
			},
			handleChange(timestamp) {},
			/*加载优惠券*/
			bindCoupons() {
				var self = this
				let couponRecord = new self.Parse.Query('CouponRecord')
				couponRecord.equalTo('openid', self.openid)
				// couponRecord.equalTo('state', 0)
				couponRecord.greaterThan('useEndTime', new Date())
				// couponRecord.ascending('state')
				// couponRecord.descending('useEndTime', 'state')
				couponRecord.find().then(coupons => {
					let _coupons = []
					coupons.forEach(t => {
						let state = t.get('state')
						if (state == 0 && t.get('useEndTime') > new Date()) {
							state = 0 // 可以使用
						} else if (state == 0 && t.get('useEndTime') <= new Date()) {
							state = 1 // 已过期
						} else if (state == 1) {
							state = 2 // 已使用
						}
						let useEndDate = dateFormat(t.get('useEndTime'), 'yyyy年MM月dd日HH:mm')
						let seconds = t.get('useEndTime').getTime() - new Date().getTime()
						var product = self.products.find(p => {
							return p.id == t.get('productType')
						})
						_coupons.push({
							id: t.id,
							amount: t.get('amount'),
							couponName: t.get('couponName'),
							state: state,
							price: (product ? product.price : 0),
							total: parseFloat(((product ? product.price : 0) - t.get('amount'))
								.toFixed(2)),
							seconds: seconds / 1000,
							useEndDate: useEndDate,
							productType: t.get('productType'),
							tipName: t.get('tipName'),
							tipContent: t.get('tipContent')
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
				var _item = e.currentTarget.dataset.item
				if (_item) {
					uni.redirectTo({
						url: '/pages/mine/order?ptype=' + _item.productType + '&cid=' + _item.id + '&amount=' +
							_item.amount + '&'
					})
				}
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

	.couponItem .bg, .couponItem .bg1 {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 10;
	}

	.couponItem .bg image, .couponItem .bg1 image  {
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
		color: rgba(0,0,0,.8);
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
		color: rgba(0,0,0,.3);
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
		color: rgba(0,0,0,.7);
	}

	.couponItem .couponDetail .content1 .content .content {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.5);
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
