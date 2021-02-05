<template>
	<view style="text-align: center;padding-bottom: 100rpx;">
		<view class="testView" v-if="!coupons||coupons.length==0">
			<view style="text-align: center;padding-top: 200rpx;">
				<view style="text-align: center;height: 228rpx;">
					<image mode="aspectFit" src="../../static/bg_null.png" style="width: 228rpx;height: 228rpx;"></image>
				</view>
				<view style="height: 50rpx;font-family: PingFangSC-Medium;font-size: 38rpx;color: rgba(53, 32, 38, 0.4);margin-top: 30rpx;margin-bottom: 28rpx;">暂无可使用的优惠券</view>
			</view>
		</view>
		<view :class="'couponItem '+((coupon.tipName&&coupon.productType&&coupon.productType!='all')?'large':'')" v-for="coupon in coupons">
			<view class="bg">
				<image src="../../static/couponbg.png"></image>
			</view>
			<view :class="'content '+  (coupon.state!=0?'enable':'')">
				<view style="display: flex;width: 100%;">
					<view class="price">减¥{{coupon.amount}}</view>
					<view class="title" :style="{paddingTop:(coupon.state!=0?'54rpx':'40rpx')}">
						<view class="name">{{coupon.couponName}}</view>
						<view class="date" v-if="coupon.state==0">
							<u-count-down style="display: inline;" color="#b1b1b1" font-size="22" separator="zh" separator-size="22" 
								:show-seconds="false" :show-minutes="false"
								@end='bindData' separator-color="#b1b1b1" @change="handleChange" :timestamp="coupon.seconds"></u-count-down>
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
				<view class="bg1">
					<image src="../../static/couponbg1.png"></image>
				</view>
				<view class="content1" v-if="coupon.tipName&&coupon.productType&&coupon.productType!='all'">
					<view class="price">
						<view class="price1">券后价</view>
						<view class="price2">¥{{ coupon.total}}</view>
						<view class="price3">原价¥{{coupon.price}}</view>
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
		<!-- <view class="confirmView">
			<button @click="handleChooseCoupon">确认选择</button>
		</view> -->
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
				products: []
			}
		},
		onLoad(options) {
			var self = this
			uni.getStorage({
				key:'openid',
				success(o) {
					self.openid = o.data
					self.bindData()
				}
			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		methods: {
			bindData(){
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
					subjects.forEach(t=>{
						if(t.get('price')>0){
							_price += t.get('price')
							// _products.push({id:t.id, price:t.get('price'), checked: false, productName: t.get('subject_name'), maxScoreMoney: t.get('maxScoreMoney'), minScore: t.get('minScore'), comments:t.get('comments')})
						}
					})
					_products.push({id:'subjectAll', price: _price, type:'subjectAll'})
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
					actionConfigs.forEach(t=>{
						if(t.get('price')>0){
							_products.push({id:t.id, price:t.get('price'), type: 'actionConfig' })
						}
					})
					self.products = JSON.parse(JSON.stringify(self.products)).concat(_products)
					self.bindCoupons()
				})
			},
			handleChange(timestamp){
			},
			/*加载优惠券*/
			bindCoupons(){
				var self = this
				let couponRecord = new self.Parse.Query('CouponRecord')
				couponRecord.equalTo('openid', self.openid)
				// couponRecord.equalTo('state', 0)
				couponRecord.greaterThan('useEndTime', new Date())
				// couponRecord.ascending('state')
				// couponRecord.descending('useEndTime', 'state')
				couponRecord.find().then(coupons=>{
					let _coupons = []
					coupons.forEach(t=>{
						let state = t.get('state')
						if(state == 0 && t.get('useEndTime') > new Date()){
							state = 0 // 可以使用
						} else if(state == 0 && t.get('useEndTime') <= new Date()){
							state = 1 // 已过期
						} else if(state == 1){
							state = 2 // 已使用
						}
						let useEndDate = dateFormat(t.get('useEndTime'), 'yyyy年MM月dd日HH:mm')
						let seconds = t.get('useEndTime').getTime() - new Date().getTime()
						var product = self.products.find(p=>{
							return p.id == t.get('productType')
						})
						_coupons.push({
							id: t.id, 
							amount: t.get('amount'), 
							couponName: t.get('couponName'), 
							state: state,
							price: (product ? product.price : 0),
							total: parseFloat(((product ? product.price : 0) - t.get('amount')).toFixed(2)),
							seconds: seconds/1000,
							useEndDate:useEndDate, 
							productType:t.get('productType'),
							tipName: t.get('tipName'),
							tipContent: t.get('tipContent')
						})
					})
					var _canuse = _coupons.filter(t=>{
						return t.state == 0
					})
					var _cannotuse = _coupons.filter(t=>{
						return t.state != 0
					})
					self.coupons = _canuse.concat(_cannotuse)
				})
			},
			/* 立即使用 */
			handleUseClick(e){
				var _item = e.currentTarget.dataset.item
				if(_item) {
					uni.redirectTo({
						url:'./order?ptype='+_item.productType+'&cid='+_item.id+'&amount='+_item.amount+'&'
					})
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfa;
	}
	.couponItem{
		position: relative;
		width: 706rpx;
		/* height: 152rpx; */
		height: 206rpx;
		line-height: 152rpx;
		/* background-color: #ffffff; */
		display: inline-block;
		border-radius: 20rpx;
		
		margin-top: 6rpx;
	}
	.couponItem.large{
		height: 362rpx;
	}
	.couponItem .bg{
		position: absolute;
	}
	.couponItem .bg image{
		width: 706rpx;
		height: 152rpx;
		/* box-shadow: 0rpx 4rpx 10rpx 2rpx 
				rgba(219, 193, 193, 0.37); */
	}
	.couponItem .content{
		position: relative;
		display: flex;
		width: 100%;
	}
	.couponItem .content .price{
		width: 165rpx;
		text-align: center;
		padding-left: 14rpx;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867;
	}
	.couponItem .content.enable .price{
		/* color: rgba(53, 32, 38, 0.4); */
	}
	.couponItem .content .title{
		flex: 1;
		padding: 40rpx 0 28rpx 24rpx;
		width: 350rpx;
		/* height: 98rpx; */
	}
	.couponItem .content .title .name{
		height: 42rpx;
		line-height: 42rpx;
		/* padding-left: 28rpx; */
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		text-align: left;
		font-weight: bold;
	}
	.couponItem .content.enable .title .name{
		color: rgba(28, 28, 28, 0.4);
	}
	.couponItem .content .title .date{
		margin-top: 6rpx;
		width: 350rpx;
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
	.couponItem .content .radio{
		width: 154rpx;
		text-align: center;
		height: 134rpx;
		/* line-height: 134rpx; */
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867;
		text-align: right;
		padding-right: 30rpx;
	}
	.couponItem .content .radio .btn{
		border: solid 2rpx #ff6867;
		border-radius: 24rpx;
		height: 48rpx;
		line-height: 46rpx;
		text-align: center;
		display: inline-block;
		width: 122rpx;
	}
	.couponItem .content.enable .radio{
		color: rgba(28, 28, 28, 0.4);
	}
	.couponItem .content .radio image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.couponItem .couponDetail{
		position: absolute;
		top: 75rpx;
		z-index: -1;
		width: 706rpx;
	}
	.couponItem .couponDetail .bg1{
		height: 276rpx;
	}
	.couponItem .couponDetail .bg1 image{
		width: 100%;
		height: 120rpx;
		border-radius: 20rpx;
		box-shadow: -14rpx 4rpx 16rpx 0rpx 
				rgba(255, 51, 51, 0.06);
	}
	.couponItem.large .couponDetail .bg1 image{
		height: 276rpx;
	}
	.couponItem .couponDetail .content1{
		position: absolute;
		top: 90rpx;
		width: 100%;
		height: 186rpx;
		display: flex;
	}
	.couponItem .couponDetail .content1 .price{
		width: 186rpx;
		text-align: left;
		/* border: 1rpx solid black; */
		padding-left: 34rpx;
	}
	.couponItem .couponDetail .content1 .price .price1{
		height: 22rpx;
		line-height: 32rpx;
		font-family: PingFangSC-Medium;
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
	}
	.couponItem .couponDetail .content1 .price .price2{
		height: 50rpx;
		line-height: 58rpx;
		font-family: PingFangSC-Medium;
		font-size: 42rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
	}
	.couponItem .couponDetail .content1 .price .price3{
		height: 32rpx;
		line-height: 32rpx;
		font-family: PingFangSC-Medium;
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(255, 255, 255, 0.7);
		text-decoration: line-through;
	}
	.couponItem .couponDetail .content1 .content{
		flex: 1;
		display: block;
		text-align: left;
		padding-right: 10rpx;
	}
	.couponItem .couponDetail .content1 .content .title{
		height: 48rpx;
		line-height: 38rpx;
		font-family: PingFangSC-Semibold;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
		display: block;
		padding: 0;
	}
	.couponItem .couponDetail .content1 .content .content{
		display: block;
		height: 96rpx;
		font-family: PingFangSC-Medium;
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #fbfbfa;
		line-height: 35rpx;
	}
	.confirmView{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 150rpx;
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
	}
</style>
