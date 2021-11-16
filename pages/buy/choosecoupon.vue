<template>
	<view style="text-align: center;padding-bottom: 200rpx;">
		<view class="noChooseItem" @click="handleCheckCoupon(null)">
			<view class="title">暂不使用优惠券</view>
			<view class="radio">
				<image v-if="checkCoupon==null" src="../../static/icon/icon_answer_errpr.png"></image>
				<image v-else src="../../static/icon/icon_answer_errorn.png"></image>
			</view>
		</view>
		<view class="couponItem" v-for="coupon in coupons"  @click="handleCheckCoupon(coupon)">
			<view class="bg">
				<image src="../../static/couponbg.png"></image>
			</view>
			<view class="content">
				<view class="price">¥{{coupon.amount}}</view>
				<view class="title">
					<view class="name">{{coupon.couponName}}</view>
					<view class="date">截止日期：{{coupon.useEndDate}}</view>
					<view class="date">使用范围：{{coupon.tipName}}</view>
				</view>
				<view class="radio">
					<image v-if="coupon.state == 1" src="../../static/icon/icon_answer_errpr.png"></image>
					<image v-else src="../../static/icon/icon_answer_errorn.png"></image>
				</view>				
			</view>
		</view>
		<view class="confirmView">
			<button @click="handleChooseCoupon">确认选择</button>
		</view>
	</view>
</template>

<script>
	import {dateFormat} from '../../js/common.js'
	export default {
		data() {
			return {
				openid: '',
				coupons: [],
				checkCoupon: null,
				selectedProductType: [],
				selectedCouponId:''
			}
		},
		onLoad(options) {
			var self = this
			uni.getStorage({
				key:'openid',
				success(o) {
					self.openid = o.data
					const eventChannel = self.getOpenerEventChannel()
					eventChannel.on('selectedProductType', function(data) {
						self.selectedProductType = data
						self.bindCoupons()
					})
					eventChannel.on('selectedCoupon',function(data){
						self.selectedCouponId = data
					})
				}
			})
		},
		methods: {
			/*加载优惠券*/
			bindCoupons(){
				var self = this
				let couponRecord = new self.Parse.Query('CouponRecord')
				couponRecord.equalTo('openid', self.openid)
				couponRecord.containedIn('productType', self.selectedProductType)
				couponRecord.equalTo('state', 0)
				couponRecord.greaterThan('useEndTime', new Date())
				couponRecord.find().then(coupons=>{
					let _coupons = []
					coupons.forEach(t=>{
						let _coupon = JSON.parse(JSON.stringify(t))
						_coupon.state= 0
						let useEndDate = dateFormat(t.get('useEndTime'), 'yyyy年MM月dd日HH:mm')
						_coupon.tipName = t.get('tipName')
						if(!t.get('productType')||t.get('productType')=='all'){
							_coupon.tipName = '全部产品'
						}
						_coupon.useEndDate = useEndDate
						if(self.selectedCouponId && t.id == self.selectedCouponId){
							_coupon.state = 1
							self.checkCoupon = _coupon
						}
						_coupons.push(_coupon)
					})
					var orderCoupon = _coupons.sort(function(a, b){
						return a.amount - b.amount
					})
					if(!self.selectedCouponId){
						orderCoupon[orderCoupon.length-1].state = 1
						self.checkCoupon = orderCoupon[orderCoupon.length-1]
					}
					self.coupons = _coupons
				})
			},
			/* 选择优惠券 */
			handleCheckCoupon(coupon){
				var self = this
				self.checkCoupon = coupon
				self.coupons.forEach(t=>{
					if(coupon && t.objectId== coupon.objectId){
						t.state = 1
					} else {
						t.state = 0
					}
				})
			},
			/*选择优惠券*/
			handleChooseCoupon(){
				var self = this
				const eventChannel = self.getOpenerEventChannel()
				eventChannel.emit('choosed', self.checkCoupon);
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfa;
	}
	.noChooseItem{
		width: 680rpx;
		height: 106rpx;
		line-height: 106rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		display: inline-flex;
		margin-top: 18rpx;
		margin-bottom: 12rpx;
	}
	.noChooseItem .title {
		flex: 1;
		padding-left: 30rpx;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		text-align: left;
	}
	
	.noChooseItem .radio{
		width: 104rpx;
		text-align: center;
		height: 106rpx;
		line-height: 106rpx;
	}
	.noChooseItem .radio image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.couponItem{
		position: relative;
		width: 710rpx;
		height: 160rpx;
		line-height: 160rpx;
		/* background-color: #ffffff; */
		display: inline-block;
		border-radius: 20rpx;
		
		/* margin-top: 6rpx; */
	}
	.couponItem .bg{
		position: absolute;
	}
	.couponItem .bg image{
		width: 710rpx;
		height: 168rpx;
	}
	.couponItem .content{
		position: relative;
		display: inline-flex;
		width: 100%;
	}
	.couponItem .price{
		width: 174rpx;
		text-align: center;
		padding-left: 14rpx;
		font-size: 38rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ed3535;
	}
	.couponItem .title{
		flex: 1;
		padding-left: 28rpx;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		text-align: left;
		padding-top: 28rpx;
	}
	.couponItem .title .name{
		height: 42rpx;
		line-height: 42rpx;
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #1c1c1c;
	}
	.couponItem .title .date{
		height: 32rpx;
		line-height: 32rpx;
		font-family: PingFangSC-Regular;
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.4);
	}
	.couponItem .radio{
		width: 104rpx;
		text-align: right;
		height: 168rpx;
		line-height: 160rpx;
	}
	.couponItem .radio image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 52rpx;
	}
	.confirmView{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 196rpx;
	}
	.confirmView button{
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
		font-weight: bold;
	}
</style>
