<template>
	<TopNavbar title='购买' bg='#f7f7f7'>
		<view>
			<view style='height: 20rpx'></view>
			<view class="myView" style="padding-bottom:345rpx">
				<view class="buyView">
					<view class="productItem" v-for='(item,i) in list' :key='i'>
						<!-- <view class="iconView" @click="handleProductCheckedChange(product)"> -->
						<view class="iconView">
							<image src="../../../static/icon/icon_check_checked.png"></image>
							<!-- <image v-else src="../../../static/icon/icon_check_normal.png"></image> -->
						</view>
						<view class="contentView">
							<view class="titleView">
								<view class="title" @click="handleProductCheckedChange(product)">
									{{item.title}}
								</view>
								<view class="comments" @click="isShowProductDetail = true">查看介绍</view>
							</view>
							<view class="titleView">
								<view class="price" @click="handleProductCheckedChange(product)">
									¥{{item.price}}
								</view>

							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="buyConfirmView">
				<view class="couponItem">
					<view class="left">优惠券</view>
					<view class="right" @click="handleChooseCoupon">
						<view v-if="discountPrice">
							<text>-{{discountPrice}}/{{couponAmount}}</text>
						</view>
						<view v-else>
							<text v-if="couponCount.length > 0">去选择优惠券</text>
							<text v-else>暂无优惠券</text>
						</view>
					</view>
					<view class="icon" v-if="couponCount.length > 0">
						<u-icon name="arrow-right" color="#ccc" style="opacity:0.4" size="26"></u-icon>
					</view>
				</view>
				<view class="payment">
					<view class='payment-info'>
						<view>
							<text class="youhui" v-if="discountPrice > 0">
								已优惠：¥{{discountPrice}},
							</text>
							<text class="heji">
								合计：
							</text>
							<text class='fuhao'>¥</text>
							<text class="price">{{cash}}</text>
						</view>

						<view class="shuoming" @click="isShowBuyTips = true">查看支付说明</view>


					</view>
					<view class="btnView">
						<button class="btnPay" @click="handleSubmit">确认支付</button>
					</view>
				</view>
			</view>


			<!--购买须知-->
			<u-popup v-model="isShowBuyTips" width="578rpx" :closeable="false" mode="center" border-radius="24">
				<view class="buylView">
					<view style='padding: 48rpx 48rpx 128rpx;'>
						<view class="title">
							购买说明
						</view>
						<view class="tips">
							·您购买的商品为线上虚拟内容服务，购买后不支持退订、转让
						</view>
						<view class="tips">
							·本服务有效期为一年，一年内不限使用次数
						</view>
						<view class="tips">
							·购买后可在[我的-已购买项目]中查看
						</view>
					</view>
					<view @click="isShowBuyTips=false" class="btnActions"
						style='position: absolute; bottom: 0; width: 100%; height:78rpx;text-align: center;font-size: 24rpx;border-top:2rpx solid rgba(0,0,0,.06);line-height:78rpx;'>
						<text>关闭</text>
					</view>
				</view>
			</u-popup>
			<!--产品说明-->
			<u-popup v-model="isShowProductDetail" width="578rpx" mode="center" border-radius="24">
				<view class="detailView">
					<view style='padding: 48rpx 48rpx 128rpx;'>
						<view class="tips">
							此VIP会员服务有效期为365天，到期会系统将关闭所有系统权限，为不影响使用，请提前续费
						</view>
					</view>
					<view @click="isShowProductDetail=false" class="btnActions"
						style='position: absolute; bottom: 0; width: 100%; height:78rpx;text-align: center;font-size: 24rpx;border-top:2rpx solid rgba(0,0,0,.06);line-height:78rpx;'>
						<text>关闭</text>
					</view>
				</view>
			</u-popup>
			<Modal @cancle='isShow=false' :isShow='isShow' :title='title' :submit='submit' @submitFn='submitFn'/>
		</view>
	</TopNavbar>
</template>

<script>
	import {
		formatDate,
		dateFormat,
		GetRandomNum,
		toDateFromString
	} from '../../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import Modal from '@/components/modal/modal.vue'
	export default {
		data() {
			return {
				userInfo: null,
				list: [],
				user: null,
				discountPrice: 0, //已优惠
				cash: 0, // 合计
				isShowBuyTips: false,
				isShowProductDetail: false,
				couponCount: null, // 优惠券
				couponAmount: null,	// 已选择的优惠券
				
				memberType: [],
				isShow: false,
				title: '',
				submit: '',
				submitFn: null,
				
				memberInfo: null,
				member: null,
				chooseCoupon: null,  //被选择的优惠券
			}
		},
		components: {
			TopNavbar, Modal
		},
		onLoad(options) {
			// this.list = JSON.parse(options.obj);
			this.list = [{
				price: 999,
				title: '开通黑金VIP',
				type: 0
			}]
			// console.log(this.list);
			this.cash = this.list[0].price;
			
		},
		async created() {
			this.user = this.Parse.User.current();
			var query = new this.Parse.Query('MemberType');
			var ls = await query.find();
			this.memberType = ls.map(item => JSON.parse(JSON.stringify(item))).sort((a, b) => a.surfaceId - b
				.surfaceId);
			let _this = this;
			uni.getStorage({
				key: 'userInfo',
				success(u) {
					_this.userInfo = u.data
					_this.bindCoupons();
					_this.getMember()
				}
			})
		},
		methods: {
			// 获取是否是会员
			async getMember() {
				var Member = new this.Parse.Query('MemberList')
				Member.equalTo("openId", this.userInfo.openid);
				this.member = await Member.first();
				if (this.member) {
					this.memberInfo = JSON.parse(JSON.stringify(this.member));
				}
			},
			/*加载优惠券*/
			bindCoupons() {
				var self = this
				// console.log(this.userInfo);
				var couponRecord = new self.Parse.Query('NewCouponRecord')
				couponRecord.equalTo('openid', self.userInfo.openid)
				couponRecord.equalTo('state', 0)
				couponRecord.find().then(list => {
					self.couponCount = list;
				})
			},
			/* 去选择优惠券 */
			handleChooseCoupon() {
				var self = this
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/choosecoupon',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('selectedCoupon', self.list[0].type)
					},
					events: {
						choosed: function(data) {
							if (data) {
								self.discountPrice = data.amount;
								self.cash = self.cash - data.amount;
								self.couponAmount = data.couponName;
								self.chooseCoupon = data;
							}
						}
					}
				})
			},
			// 确认支付按钮
			handleSubmit() {
				this.payment(this.cash * 100);
			},
			// 支付
			payment(cash) {
				
				this.checkSendMessage()
				return
				cash = 0;
				var _this = this;
				if (cash == 0) {
					var orderNo = dateFormat(new Date(), 'yyyyMMddHHmmss') + GetRandomNum(5);
					this.paymentSuccess(orderNo, cash);
				} else {
					this.Parse.Cloud.run('initiatePayment', {
						price: cash
					}, {
						sessionToken: this.user.get('sessToken')
					}).then(res => {
						var payload = res.payload
						var tradeId = res.tradeId
						uni.requestPayment({
							appId: payload.appId,
							timeStamp: payload.timeStamp,
							nonceStr: payload.nonceStr,
							package: payload.package,
							signType: payload.signType,
							paySign: payload.paySign,
							success(res) {
								_this.paymentSuccess(tradeId, cash);
							},
							fail(res) {
								_this.paymentFail();
							}
						})
					})
				}
			
			},
			// 支付成功
			async paymentSuccess(tradeId, cash) {
				// 判断有没有使用优惠券，有则设置优惠券的状态为已使用
				if (this.chooseCoupon) {
					var query = new this.Parse.Query('NewCouponRecord')
					query.equalTo('objectId', this.chooseCoupon.objectId)
					query.get(this.chooseCoupon.objectId).then(async record => {
						record.set('state', 2)
						await record.save()
					})
				}
				await this.getIntegral(cash / 100);
				this.createOrder(tradeId);
				this.createMember(tradeId);
			},
			// 支付失败
			paymentFail() {
				this.title = '开通失败';
				this.submit = '确定';
				this.submitFn = () => {
					this.isShow = false;
				}
				this.isShow = true;
			},
			// 获取积分与赠送积分
			async getIntegral(cash) {
				// cash = 10000;
				await this.Parse.Config.get().then(async config => {
					this.userInfo.score = (this.userInfo.score || 0) + parseInt(cash * config.attributes.shopScore);
					this.userInfo.score_all = (this.userInfo.score_all || 0) + parseInt(cash * config.attributes.shopScore);
					this.user.set('score', this.userInfo.score);
					this.user.set('score_all', this.userInfo.score_all);
					await this.user.save();
					uni.setStorage({
						key: 'userInfo',
						data: this.userInfo
					})
				})
			},
			// 创建订单
			createOrder(tradeId) {
				var _this = this;
				var item = this.memberType[this.list[0].type];
				var dbOrder = this.Parse.Object.extend("Order")
				var order = new dbOrder()
				order.set('orderNo', tradeId)
				order.set("subjectId", item.objectId)
				order.set("subjectName", item.memberName)
				order.set("price", this.cash)
				order.set("cash", this.cash)
				order.set('couponAmount', 0)
				order.set('scoreAmount', this.userInfo.score)
				order.set('couponId', '')
				order.set("openId", this.userInfo.openid)
				order.set("state", 1)
				order.set("wechatPayOrderId", '') // 支付流水号
				order.save()
			},
			// 创建会员
			async createMember(tradeId) {
				let _this = this;
				if (this.member) {
					var arr = this.memberInfo.orderArr;
					arr.push(tradeId);
					this.member.set('orderArr', arr);
					this.member.set('status', 1)
					if (this.memberInfo.memberType == 0) {
						this.member.set('memberType', '0');
					}
					if (this.memberInfo.memberType == 1) {
						if (this.active == 1) {
							this.member.set('memberType', '1');
						} else {
							this.member.set('memberType', '0');
						}
					}
					if (this.memberInfo.memberType == 2) {
						if (this.active == 2) {
							this.member.set('memberType', '2');
						} else {
							this.member.set('memberType', '0');
						}
					}
					if (this.memberInfo.memberType = '') {
						this.member.set('endTime', this.getTime(12))
					} else {
						this.member.set('endTime', this.getTime(12) + Number(this.memberInfo.endTime) - Date.now())
					}
					await this.member.save().then(_order => {
						_this.title = '开通成功';
						_this.submit = '确定';
						_this.submitFn = () => {
							_this.isShow = false;
						}
						_this.isShow = true;
					}, (error) => {
						uni.showToast({
							title:'开通失败'
						})
					})
				} else {
					// 初次创建
					var item = this.memberType[this.list[0].type];
					var memberType = item.surfaceId - 1 + '';
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set('orderArr', [tradeId]);
					member.set('endTime', this.getTime(12))
					member.set('memberType', memberType)
					member.set('status', 1)
					await member.save().then(_order => {
						_this.title = '开通成功';
						_this.submit = '确定';
						_this.submitFn = () => {
							_this.isShow = false;
						}
						_this.isShow = true;
					}, (error) => {
						uni.showToast({
							title:'开通失败'
						})
					})
				}
				let app = getApp();
				var query = new this.Parse.Query('MemberList');
				query.equalTo("openId", this.userInfo.openid);
				var results = await query.first();
				if (results) {
					app.globalData.member = JSON.parse(JSON.stringify(results));
				}
			},
			// 获取会员截止日期的毫秒数
			getTime(n) {
				var date = new Date();
				var month = date.getMonth() + 1;
				date.setMonth(month + Number(n) - 1)
				return date.getTime()
			},
			// 支付成功后判断用不用发送消息
			checkSendMessage() {
				let self = this;
				
				uni.getStorage({
					key: 'userInfo',
					success(data) {
						
						if (data.data.parentOpenId) {
							let query = new self.Parse.Query('PullNew');
							query.equalTo('openid', data.data.parentOpenId)
							query.first().then(res => {
								let buyNum = res.attributes.buyNum || 0;
								if (!buyNum) {
									res.set('buyNum', 1)
								} else {
									res.set('buyNum', buyNum+1)
								}
								res.save()
							
							
								var Opinions = self.Parse.Object.extend("Opinions")
								var opinions = new Opinions()
								opinions.set('openid', data.data.parentOpenId)
								opinions.set("content", '有人通过你的二维码购买啦')
								opinions.set("message", '有人通过你的二维码注册啦')
								opinions.save()
								if (1) {
								// if ((buyNum+1)%5 == 0) {
									let memberList = new self.Parse.Query('MemberList')
									memberList.equalTo('openId', data.data.parentOpenId)
									memberList.first().then(member => {
										let range = null;
										if (member) {
											if (member.attributes.memberType == '0') {
												range = 'blackGoldNew'
											}
											if (member.attributes.memberType == '1') {
												range = 'platinumGoldNew'
											}
											if (member.attributes.memberType == '2') {
												range = 'silverGoldNew'
											}
										} else {
											range = 'pullNewUser'
										}
										let couponInfo = new self.Parse.Query('NewCouponInfo');
										couponInfo.equalTo('couponType', 'automaticallySend');
										couponInfo.equalTo('couponRange', range);
										couponInfo.first().then(coupon=>{
											coupon = JSON.parse(JSON.stringify(coupon))
											if (Date.now() > new Date(coupon.useEndTime)) {
												return ;
											}
											// 发送优惠券
											var NewCouponRecord = self.Parse.Object.extend("NewCouponRecord")
											var couponRecord = new NewCouponRecord()
											couponRecord.set('openid', data.data.parentOpenId)
											couponRecord.set("couponName", '通用类优惠券')
											couponRecord.set("mode", 'all')
											couponRecord.set("amount", coupon.amount)
											couponRecord.set("state", 0)
											couponRecord.set("couponRange", 'all')
											couponRecord.set("useEndTime", new Date(1671870172910))
											couponRecord.set("useTime", new Date())
											couponRecord.set("couponType", 'automaticallySend')
											couponRecord.save()
											
											opinions.set('openid', data.data.parentOpenId)
											opinions.set("content", '发送通用型优惠券')
											opinions.set("message", '累计有5人购买')
											opinions.save()
										})
										
									})
								}
							
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
	.myView {
		width: 100%;
		overflow-y: auto;
	}

	.buyView {
		width: 690rpx;
		margin: 0 auto;
		border-radius: 24rpx;
		background: #fff;
		padding-left: 28rpx;
		box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.06);
	}



	.buyView view:last-child {
		border: none;
	}


	image {
		width: 32rpx;
		height: 32rpx;
	}



	.contentView {
		padding-left:
	}

	.myView {
		overflow-y: auto;
	}

	.myView .buyView {
		padding-left: 30rpx;
	}

	.myView .productItem {
		display: flex;
		height: 148rpx;
		border-bottom: 2rpx solid rgba(0, 0, 0, .06);
	}

	.myView .iconView {
		flex: 0 1 70rpx;
	}

	.myView .iconView image {
		width: 32rpx;
		height: 34rpx;
		margin-top: 56rpx;
	}

	.myView .contentView {
		padding-top: 32rpx;
		padding-right: 48rpx;
		flex: 1;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.myView .contentView .titleView {
		display: flex;
		/* justify-content: space-between; */
		flex-direction: column;
	}

	.myView .contentView .titleView .title {
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .9);
		line-height: 44rpx;
	}

	.myView .contentView .titleView .price {
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ED3535;
		margin-top: 18rpx;
		line-height: 48rpx;
	}

	.myView .contentView .titleView .comments {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		line-height: 28rpx;
		margin-top: 12rpx;
		color: rgba(0, 0, 0, .8);
		text-decoration: underline;
	}

	.myView .contentView .titleView .intro {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, .5);
		line-height: 28rpx;
	}

	



	.recommendView {
		padding-left: 58rpx;
	}

	.recommendView view:last-child {
		border: none;
	}

	.buyConfirmView {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 260rpx;
		background-color: #fff;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		box-shadow: 0 -4rpx 8rpx 0 rgba(0, 0, 0, 0.04);
	}

	.buyConfirmView .couponItem {
		/* width: 100%; */
		height: 84rpx;
		margin-left: 48rpx;
		border-bottom: 2rpx solid rgba(0, 0, 0, .06);
		display: flex;
		align-items: center;
	}

	.buyConfirmView .couponItem .left {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, 0.9);
		line-height: 34rpx;
		flex: 1;
	}

	.buyConfirmView .couponItem .right {
		margin-right: 24rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(53, 32, 38, .39);
		line-height: 28rpx;
	}

	.buyConfirmView .couponItem .right image {
		width: 32rpx;
		height: 32rpx;
	}

	.buyConfirmView .couponItem .icon {
		margin-right: 78rpx;
	}

	.buyConfirmView .payment {
		height: auto;
		border-top: 2rpx solid rgba(0, 0, 0, .06);
		display: flex;
	}

	.payment .payment-info {
		display: flex;
		flex: 1;
		flex-direction: column;
		padding-left: 30rpx;
		padding-top: 14rpx;
	}

	.payment .payment-info .youhui {
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .4);
		line-height: 28rpx;
		margin-right: 6rpx;
	}

	.payment .payment-info .heji {
		font-size: 20rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .8);
		line-height: 28rpx;
		
	}

	.payment .payment-info .price {
		font-size: 44rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ED3535;
		line-height: 60rpx;
	}

	.payment .payment-info .fuhao {
		color: rgba(237, 53, 53, 1);
	}

	.payment .payment-info .shuoming {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, .8);
		line-height: 28rpx;
	}

	.btnView {
		padding: 24rpx 26rpx 0 30rpx;
	}

	.buylView .title {
		font-size: 28rpx;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
		margin-bottom: 20rpx;
		text-align: center;
	}

	.buylView .tips {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #000000;
		line-height: 34rpx;
	}

	.btnPay {
		width: 332rpx;
		height: 86rpx;
		line-height: 86rpx;
		text-align: center;
		background-color: #ed3535;
		border-radius: 46rpx;
		color: #ffffff;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
	}
</style>
