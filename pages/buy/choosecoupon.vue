<template>
	<TopNavbar title='选择优惠券' paddingTop="204" bg='#f7f7f7'>
	<view style="text-align: center;padding-bottom: 200rpx;">
		<view class="noChooseItem" @click="handleCheckCoupon(null)">
			<view class="title">暂不使用优惠券</view>
			<view class="radio">
				<image v-if="checkCoupon==null" src="../../static/icon/icon_answer_nocheck.png"></image>
				<image v-else src="../../static/icon/icon_answer_checked.png"></image>
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
	</TopNavbar>
</template>

<script>
	import {dateFormat} from '../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
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
		components: {
			TopNavbar
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
		width: 690rpx;
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
		/* width: 104rpx; */
		/* text-align: center; */
		margin-right: 48rpx;
		height: 104rpx;
		line-height: 104rpx;
	}
	.noChooseItem .radio image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.couponItem{
		position: relative;
		width: 750rpx;
		height: 156rpx;
		display: inline-block;
	}
	.couponItem .bg{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 10;
	}
	.couponItem .bg image{
		width: 100%;
		height: 100%;
	}
	.couponItem .content{
		position: relative;
		display: flex;
		z-index: 100;
		width: 100%;
	}
	.couponItem .price{
		width: 210rpx;
		padding-left: 42rpx;
		padding-top: 52rpx;
		font-size: 38rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ed3535;
	}
	.couponItem .title{
		flex: 1;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		text-align: left;
		padding-top: 28rpx;
	}
	.couponItem .title .name{
		font-stretch: normal;
		letter-spacing: 0rpx;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
	}
	.couponItem .title .date{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.5);
		line-height: 28rpx;
	}
	.couponItem .radio{
		height: 156rpx;
		line-height: 156rpx;
	}
	.couponItem .radio image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 78rpx;
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
		letter-spacing: 0rpx;
		color: #ffffff;
		font-weight: bold;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
	}
</style>
