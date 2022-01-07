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
								<view class="comments" @click="isShowProductDetail = true">会员权益</view>
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
							<text class="price">{{discountCash}}</text>
						</view>

						<view class="shuoming" @click="isShowBuyTips = true">购买说明</view>


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
							1.您购买的会员服务为线上数字化商品，一经购买不支持退订、转让。
						</view>
						<view class="tips">
							2.自开通之日起365个自然日内为您的服务有效期，期限内您将享受会员等级对应的全部会员权益。
						</view>
						<view class="tips">
							3.会员服务到期后系统将自动关闭所有会员权限，但仍会保留您的使用数据，为不影响正常使用，请提前续费。
						</view>
						<view class="tips">
							4.科学、合理使用食艺兽小程序，让它真正替你清除备考综合焦虑。
						</view>
						<view class="tips">
							5.您可通过全国统一客服电话 4006406558 与我们取得联系，也可在小程序首页点击【我的-意见反馈】提出你的疑问。
						</view>
						<view class="tips">
							6.请详细阅读会员产品说明及购买说明，开通视为已知悉并接受以上内容。
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
				<!-- <view class="detailView"> -->
				<view class="buylView">
					<view style='padding: 48rpx 48rpx 128rpx;'>
						<view v-if='list[0].type == 0'>
							<view class="title">
								<text>黑金VIP权益</text>
							</view>
							<view class="tips">
								<text></text>VIP课程畅享
								<view class='info'>食艺兽线上音视频VIP课程免费畅享，持续上新中。</view>
							</view>
							<view class="tips">
								<text></text>题库一卡通
								<view class='info'>基础知识点复习利器，食艺兽线上题库畅行无阻。</view>
							</view>
							<view class="tips">
								<text></text>课堂福利
								<view class='info'>报名线下/线上班尊享食艺兽会员超级折扣。</view>
							</view>
							<view class="tips">
								<text></text>独家工具书
								<view class='info'>由食艺兽金牌名师团队多年积累、研发的史论复习工具书，包邮哟。</view>
							</view>
							<view class="tips">
								<text></text>专属备考顾问
								<view class='info'>史论类专业课程顾问为您提供1V1专属报/备考咨询服务。</view>
							</view>
							<view class="tips">
								<text></text>备考学习群
								<view class='info'>食艺兽VIP备考学习群入群邀请。</view>
							</view>
							<view class="tips">
								<text></text>专属头像勋章
								<view class='info'>食艺兽VIP会员专属头像勋章，让您以尊贵的身份出现在排行榜中。</view>
							</view>
						</view>
						<view v-if='list[0].type == 1'>
							<view class="title">
								<text>铂金VIP权益</text>
							</view>
							<view class="tips">
								<text></text>VIP课程畅享
								<view class='info'>食艺兽线上音视频VIP课程免费畅享，持续上新中。</view>
							</view>
							<view class="tips">
								<text></text>课堂福利
								<view class='info'>报名线下/线上班尊享食艺兽会员超级折扣。</view>
							</view>
							<view class="tips">
								<text></text>独家工具书
								<view class='info'>由食艺兽金牌名师团队多年积累、研发的史论复习工具书，包邮哟。</view>
							</view>
							<view class="tips">
								<text></text>专属备考顾问
								<view class='info'>史论类专业课程顾问为您提供1V1专属报/备考咨询服务。</view>
							</view>
							<view class="tips">
								<text></text>专属头像勋章
								<view class='info'>食艺兽VIP会员专属头像勋章，让您以尊贵的身份出现在排行榜中。</view>
							</view>
						</view>
						<view v-if='list[0].type == 2'>
							<view class="title">
								<text>白银VIP权益</text>
							</view>
							<view class="tips">
								<text></text>题库一卡通
								<view class='info'>基础知识点复习利器，食艺兽线上题库畅行无阻。</view>
							</view>
							<view class="tips">
								<text></text>课堂福利
								<view class='info'>报名线下/线上班尊享食艺兽会员超级折扣。</view>
							</view>
							<view class="tips">
								<text></text>专属头像勋章
								<view class='info'>食艺兽VIP会员专属头像勋章，让您以尊贵的身份出现在排行榜中。</view>
							</view>
						</view>
					</view>
					<view @click="isShowProductDetail=false" class="btnActions"
						style='position: absolute; bottom: 0; width: 100%; height:78rpx;text-align: center;font-size: 24rpx;border-top:2rpx solid rgba(0,0,0,.06);line-height:78rpx;'>
						<text>关闭</text>
					</view>
				</view>
			</u-popup>
			<Modal @cancle='isShow=false' :cancleIcon='cancleIcon' :isShow='isShow' :title='title' :submit='submit' @submitFn='submitFn' />
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
				discountCash: '',	// 优惠完合计
				isShowBuyTips: false,
				isShowProductDetail: false,
				couponCount: null, // 优惠券
				couponAmount: null,	// 已选择的优惠券
				
				memberType: [],
				isShow: false,
				title: '',
				submit: '',
				submitFn: null,
				cancleIcon: true,
				
				memberInfo: null,
				member: null,
				chooseCoupon: [],  //被选择的优惠券
			}
		},
		components: {
			TopNavbar, Modal
		},

		onLoad(options) {
			this.list = JSON.parse(options.obj);
			// this.list = [{
			// 	price: 999,
			// 	title: '开通黑金VIP',
			// 	type: 1,
			// 	upgrade: true
			// }]
			// // console.log(this.list);
			this.cash = this.list[0].price;
			this.discountCash = this.list[0].price;
			
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
				let url
				if (this.chooseCoupon.length) {
					url = '/mineSubPackage/pages/vip/choosecoupon?chooseCoupon=' + JSON.stringify(this.chooseCoupon)
				} else {
					url = '/mineSubPackage/pages/vip/choosecoupon'
				}
				uni.navigateTo({
					url,
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('selectedCoupon', self.list[0].type)
					},
					events: {
						choosed: function(arr) {
							if (arr) {
								let amount = 0
								arr.forEach(data => {
									amount += data.amount
								})
								self.discountPrice = amount
								self.discountCash = self.cash - amount < 0 ? 0 : self.cash - amount
								self.couponAmount = `共选择${arr.length}张优惠券`
								self.chooseCoupon = arr
							}
						}
					}
				})
			},
			// 确认支付按钮
			handleSubmit() {
				this.payment(this.discountCash * 100);
			},
			// 支付
			payment(cash) {
				// this.checkSendMessage()
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
					this.chooseCoupon.forEach(async item => {
						var query = new this.Parse.Query('NewCouponRecord')
						query.equalTo('objectId', item.objectId)
						query.get(item.objectId).then(async record => {
							record.set('state', 2)
							await record.save()
						})
					})
				}
				this.checkSendMessage()
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
					if (this.list[0].type == 0) {
						this.member.set('memberType', '0');
					}
					if (this.list[0].type == 1) {
						this.member.set('memberType', '1');
					}
					if (this.list[0].type == 2) {
						this.member.set('memberType', '2');
					}
					if (this.list[0].upgrade) {
						this.member.set('Upgrade', true)
					} else {
						this.member.set('endTime', this.getTime(12) + Number(this.memberInfo.endTime) - Date.now())
					}
					await this.member.save().then(_order => {
						_this.title = '开通成功';
						_this.submit = '确定';
						_this.submitFn = () => {
							// _this.isShowBool = true;
							_this.isShow = false;
							uni.navigateBack({
								delta: 1
							})
						}
						_this.isShow = true;
						_this.cancleIcon = false
					}, (error) => {
						uni.showToast({
							title:'开通失败',
						})
					})
				} else {
					// 初次创建
					var item = this.memberType[this.list[0].type];
					var memberType = item.surfaceId - 1 + '';
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set("nickName", this.userInfo.nickName);
					member.set("realName", this.userInfo.realname);
					member.set("phone", this.userInfo.phone);
					member.set('orderArr', [tradeId]);
					member.set('endTime', this.getTime(12))
					member.set('memberType', memberType)
					member.set('status', 1)
					await member.save().then(_order => {
						_this.title = '开通成功';
						_this.submit = '确定';
						_this.submitFn = () => {
							_this.isShow = false;
							uni.navigateBack({
								delta: 1
							})
						}
						_this.isShow = true;
						_this.cancleIcon = false
					}, (error) => {
						uni.showToast({
							title:'开通失败'
						})
					})
				}
				
				// 设置用户的类型
				var query = new this.Parse.Query('User')
				query.equalTo('objectId', this.userInfo.openid)
				query.first().then(record => {
					record.set('memberType', this.list[0].type + 1)
					record.save()
				})
				
				// 改变拉新列表用户等级
				var query2 = new this.Parse.Query('PullNew')
				query2.equalTo("openid", this.userInfo.openid);
				query2.first().then(record => {
					if (!record) return
					record.set('memberType', this.list[0].type + 1)
					record.save()
				})
				
				let app = getApp();
				var query1 = new this.Parse.Query('MemberList');
				query1.equalTo("openId", this.userInfo.openid);
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
					async success(data) {
						// 判断是否是通过别人的二维码进行注册的
						if (data.data.parentOpenId) {
							let parentInfo = new self.Parse.Query('MemberList');
							parentInfo.equalTo('openId', data.data.parentOpenId)
							parentInfo = await parentInfo.first()
							// 被拉新的用户不是会员就什么也不做
							if (!parentInfo) {
								return ;
							}
							
							let parentMemberType = Number(parentInfo.attributes.memberType)
							// 请求拉够多少人发送优惠券
							let limitNumber = new self.Parse.Query('MemberType')
							limitNumber.equalTo('surfaceId', parentMemberType + 1)
							limitNumber = await limitNumber.first()
							limitNumber = limitNumber.attributes.limitNumber
							let query = new self.Parse.Query('PullNew')
							query.equalTo('openid', data.data.parentOpenId)
							query.first().then(res => {
								let buyNum = res.attributes.buyNum || 0;
								let upgradeBuyNum = res.attributes.upgradeBuyNum || 0;
								let blackPullUser = res.attributes.blackPullUser || 0;
								let userArr = null
								if (res.attributes.buyUser) {
									userArr = Array.from(new Set([data.data.openid, ...res.attributes.buyUser]))
								} else {
									userArr = [data.data.openid]
								}
								if (!buyNum) {
									res.set('buyNum', 1)
									res.set('buyUser', [data.data.openid])
								} else {
									// res.attributes
									res.set('buyUser', userArr)
									res.set('buyNum', buyNum+1)
								}
								
								res.set('memberType', parentMemberType + 1)
								if (parentInfo.attributes.Upgrade) {
									res.set('upgradeBuyNum', upgradeBuyNum + 1)
									if (!upgradeBuyNum) {
										res.set('upgradeBuyNum', 1)
										res.set('upgradeBuyArr', [data.data.openid])
									} else {
										res.set('upgradeBuyNum', upgradeBuyNum+1)
										res.set('upgradeBuyArr', userArr)
									}
								}
								let blackPullUserArr = res.attributes.blackPullUserArr || []
								let m = blackPullUserArr.length
								if (parentInfo.attributes.memberType == 0) {
									if (blackPullUserArr.length == 0) {
										blackPullUserArr = [data.data.openid]
									} else {
										blackPullUserArr = Array.from(new Set([data.data.openid, ...res.attributes.blackPullUserArr]))
									}
									res.set('blackPullUserArr', blackPullUserArr)
									res.set('blackPullUser', blackPullUser + 1)
								}
								res.save()
								// -----------------------------------
								
								if (parentInfo.attributes.memberType == 0) {
									let n = blackPullUserArr.length;
									// console.log(n, res.attributes.blackPullUserArr.length, ';;');
									if (n != m) {
										let Opinions1 = self.Parse.Object.extend("CouponMessage")
										let opinions1 = new Opinions1()
										opinions1.set('openid', data.data.parentOpenId)
										if (n%limitNumber == 0) {
											opinions1.set("content", '新战友招募成功！')
											opinions1.set("message", `恭喜！您招募的新战友已满${n}个了，成功获得“黑金VIP会员招募大礼包”，食艺兽客服专员会在48小时内与您取得联系，沟通礼品兑换事宜。\n\n\r\r\rPs. 当招募的新战友在小程序中产生第一笔消费时，您的战友招募数将 +1。`)
										} else {
											opinions1.set("content", '新战友招募成功！')
											opinions1.set("message", `恭喜！您已成功招募新战友${n}人，只需再招募${limitNumber-n%limitNumber}人即可获得“黑金VIP会员招募大礼包”，届时会有食艺兽客服专员主动与您取得联系，沟通礼品兑换事宜。\n\n\r\r\rPs. 当招募的新战友在小程序中产生第一笔消费时，您的战友招募数将 +1。`)
										}
										opinions1.save()
									}
								}
								
								// -------------------------------------
								if (parentInfo.attributes.memberType != 0) {
									let couponInfo = new self.Parse.Query('NewCouponInfo')
									couponInfo.equalTo('couponType', 'automaticallySend')
									if (parentInfo.attributes.memberType == 1) {
										couponInfo.equalTo('couponRange', 'platinumGoldNew')
									}
									if (parentInfo.attributes.memberType == 2) {
										couponInfo.equalTo('couponRange', 'silverGoldNew')
									}
									couponInfo.first().then(coupon=>{
										if (!coupon) return
										let Opinions = self.Parse.Object.extend("CouponMessage")
										let opinions = new Opinions()
										opinions.set('openid', data.data.parentOpenId)
										if (userArr.length%limitNumber == 0) {
											opinions.set("content", '新战友招募成功！')
											opinions.set("message", '恭喜！您已成功招募1名新战友，系统自动发放1张会员奖券给您，可在下次升级您的VIP会员等级时使用噢～请移步“我的优惠券”查收您的奖券。')
										} else {
											opinions.set("content", '会员拉新消息')
											opinions.set("message", `您当前已拉新${userArr.length%limitNumber}人，还剩${limitNumber-userArr.length%limitNumber}人即可获得优惠券`)
										}
										opinions.save()
									})
								}
								
								if (userArr.length%limitNumber == 0) {
									let range = null;
									if (parentInfo.attributes.memberType == '0') {
										range = 'blackGoldNew'
									}
									if (parentInfo.attributes.memberType == '1') {
										range = 'platinumGoldNew'
									}
									if (parentInfo.attributes.memberType == '2') {
										range = 'silverGoldNew'
									}
									if (parentInfo.attributes.memberType == undefined) {
										return;
									}
									let couponInfo = new self.Parse.Query('NewCouponInfo');
									couponInfo.equalTo('couponType', 'automaticallySend');
									couponInfo.equalTo('couponRange', range);
									couponInfo.first().then(coupon=>{
										if (!coupon) return
										coupon = JSON.parse(JSON.stringify(coupon))
										// 发送优惠券
										var NewCouponRecord = self.Parse.Object.extend("NewCouponRecord")
										var couponRecord = new NewCouponRecord()
										couponRecord.set('openid', data.data.parentOpenId)
										couponRecord.set("couponName", '通用类优惠券')
										couponRecord.set("mode", 'all')
										couponRecord.set("amount", coupon.amount)
										couponRecord.set("state", 0)
										couponRecord.set("couponRange", 'all')
										couponRecord.set("useEndTime", new Date(coupon.termValidity*1000*60*60*24 + Date.now()))
										couponRecord.set("useTime", new Date())
										couponRecord.set("couponType", 'automaticallySend')
										couponRecord.save()
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
		/* border-bottom: 2rpx solid rgba(0, 0, 0, .06); */
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
		margin-right: 28rpx;
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
		margin-bottom: 12rpx;
	}
	.buylView .tips .info{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.6);
		line-height: 34rpx;
	}
	
	.buylView .tips text::before {
		content: "";
		display: inline-block;
		width: 10rpx;
		height: 10rpx;
		line-height: 24rpx;
		border-radius: 50%;
		background: #000;
		margin-right: 12rpx;
		position: relative;
		top: -4rpx;
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
