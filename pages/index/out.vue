<template>
	<view class="vip" :style='{overflow: showFixed ? "auto" : "hidden"}'>
		<Navbar align='center' surplusHeight='70' navbarBg='#1A1512' :title='options.title'>
			<view>
				<rich-text class='regular ql-editor' :nodes='pagesInfo | formatRichText'></rich-text>
				<view style='height: 140rpx'></view>
			</view>
		</Navbar>
		<view class="fixed" :class='{leval: showFixed}'>
			<view class="bg" @touchmove.stop.prevent="" @click='changeShowFixed'></view>
			<view class="fixed-bottom">
				<view>
					<view v-if='isMember'>
						<view v-if='memberInfo.memberType == 0' @click='heijinRenew'>
							<text>续费黑金VIP</text>
							<text>即刻畅享</text>
						</view>
						<view v-if='memberInfo.memberType == 1' @click='bojinRenew'>
							<text v-if='active == 1'>续费铂金VIP</text>
							<text v-else>升级黑金VIP</text>
							<text>即刻畅享</text>
						</view>
						<view v-if='memberInfo.memberType == 2' @click='baiyinRenew'>
							<text v-if='active == 2'>续费白银VIP</text>
							<text v-else>升级黑金VIP</text>
							<text>即刻畅享</text>
						</view>
					</view>
					<view v-else>
						<view v-if='!showFixed' @click='changeShowFixed'>
							<text>开通会员VIP</text>
							<text>即刻畅享</text>
						</view>
						<view v-else @click='firstBuy'>
							<text v-if='active == 0'>开通黑金VIP</text>
							<text v-if='active == 1'>开通铂金VIP</text>
							<text v-if='active == 2'>开通白银VIP</text>
							<text>即刻畅享</text>
						</view>
					</view>
				</view>
			</view>
			<view class="openfixed">
				<view class="openfixed-title">
					食艺兽大会员
				</view>
				<view class="openbox"  @touchstart='touchstart' @touchend='touchend'>
					<view class="list" :style='{left: active==0 ? "20rpx" : active==1 ? "-552rpx":"-1120rpx"}'>
						<view class="item" v-for='(item,i) in list' :keys='item.id'
							:class='{heijin: item.surfaceId == 1, bojin: item.surfaceId == 2, baiyin: item.surfaceId == 3}' @click='changeActive(i)'>
							<view class="img">
								<image class='imgbg' :src="imgArr[i]"></image>
							</view>
							<view class="info">
								<view class="price">
									<text class='discount semibold'>¥{{item.promotionPrice}}</text>
									<text class='old-price semibold' style='margin-left: 20rpx;text-decoration: line-through;'>¥{{item.memberPrice}}</text>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view class="buchajia" v-if='isMember && isChajia'>
					<view class="icon"></view>
					<text>您原会员服务的剩余时⻓可⽤于抵扣，\n只需要⽀付{{parseInt(cash)}}元即可升级为⿊⾦VIP！\n升级后会员服务周期为{{cashTime1}}至{{cashTime2}}</text>
				</view>
				<view class="buy-info" :style='{height: isChajia ? "250rpx" : "360rpx"}'>
					<view class="buy-title">购买说明</view>
					<view class="buy-info-item">
						<view v-for='(item,i) in list[active].explain' :key='i'>
							{{item}}
						</view>
						<view style='height: 20rpx;'></view>
					</view>
				</view>
			</view>
		</view>
		<Modal @cancle='changeIsShow' :isShow='isShow' :title='title' :submit='submit' @submitFn='submitFn'/>
		<login :visiable="isShowLogin" @cancle="changeShowLogin" @ok="handleLoginComplate"></login>
	</view>
</template>

<script>
	import Navbar from '../../components/navBar/navbar.vue'
	import Modal from '@/components/modal/modal.vue'
	import login from '@/components/login/outLogin.vue'
	import Curriculum from '../../curriculumSubPackage/js/curriculum.js'
	import {
		dateFormat,
		GetRandomNum
	} from '../../js/common.js'
	export default {
		data() {
			return {
				// 弹出框信息
				isShow: false,
				title: '',
				submit: '',
				submitFn: '',
				
				userInfo: null,	 // 有没有用户信息
				pagesInfo: null, // 页面信息
				isShowLogin: false,	// 是否显示授权
				isLogin: false,	// 有没有授权
				showFixed: false,
				options: false, // 是否渠道进来
				parentData: null, // 渠道通过谁进来的
				list: null,
				active: 0,
				user: null,
				userInfo: null,
				member: null,
				memberInfo: null,
				cash: 0, // 差价金额
				cashTime1: '',
				cashTime2: '',
				clientLeft: 0,
				clientX: 0,
				touchSwitch: true,
				imgArr: [
					'https://art-eater.oss-cn-beijing.aliyuncs.com/%E9%BB%91%E9%87%91vip-%E8%B4%AD%E4%B9%B0%E7%95%8C%E9%9D%A2.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/%E9%93%82%E9%87%91vip-%E8%B4%AD%E4%B9%B0%E7%95%8C%E9%9D%A2.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/%E7%99%BD%E9%93%B6vip-%E8%B4%AD%E4%B9%B0%E7%95%8C%E9%9D%A2.png'
				],
			}
		},
		components: {
			Navbar, Modal, login
		},
		filters: {
			formatRichText(html) { //控制小程序中图片大小
				return Curriculum.formatRichText(html);
			}
		},
		onLoad(options) {
			// options = {id: "XJOZt5lEvT", ids: "1"}
			if (options.title == "undefined") {
				options.title = ''
			}
			// options = {id: "U94UDo1cGE"}
			this.options = options
			
			this.getNoticeOrChanneInfo(options.id)
			// 判断有没有授权
			let userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.userInfo = userInfo
				this.isLogin = true
				this.getMember()
			}
			this.user = this.Parse.User.current();
		},
		
		computed: {
			isMember() {
				if (this.memberInfo && Date.now() < this.memberInfo.endTime) {
					return true;
				} else {
					return false;
				}
			},
			isChajia() {
				if (this.isMember && this.memberInfo.memberType == 1 && this.active != 1) {
					// 现在白银的价格
					var baiyinPrice = this.list[1].promotionPrice || this.list[1].memberPrice;
					var time = Math.ceil((this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
					var n = this.list[0].promotionPrice || this.list[0].memberPrice;
					this.cash = parseInt((n - baiyinPrice) / 365 * (Math.abs(time) || 365));
					this.cashTime1 = this.getDateTime();
					this.cashTime2 = this.getDateTime(this.memberInfo.endTime)
					return true;
				}
				if (this.isMember && this.memberInfo.memberType == 2 && this.active != 2) {
					// 现在铂金的价格
					var bojinPrice = this.list[2].promotionPrice || this.list[2].memberPrice;
					var time = Math.ceil((this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
					var n = this.list[0].promotionPrice || this.list[0].memberPrice;
					this.cash = parseInt((n - bojinPrice) / 365 * (Math.abs(time) || 365));
					this.cashTime1 = this.getDateTime();
					this.cashTime2 = this.getDateTime(this.memberInfo.endTime)
					return true;
				}
				return false;
			}
		},
		methods: {
			changeShowLogin() {
				this.isShowLogin = false
			},
			changeActive(i) {
				this.active = i
			},
			changeIsShow() {
				this.isShow = false
			},
			// 授权登陆
			handleLoginComplate() {
				var _this = this
				this.isShowLogin = false
				this.isLogin = true
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						_this.userInfo = res.data
						_this.getMember()
					}
				})
			},
			// 获取是否是会员
			async getMember() {
				var Member = new this.Parse.Query('MemberList')
				Member.equalTo("openId", this.userInfo.openid);
				this.member = await Member.first();
				if (this.member) {
					this.memberInfo = JSON.parse(JSON.stringify(this.member));
					this.active = Number(this.memberInfo.memberType);
				}
			},
			// 获取会员数据
			async getMemberList(arr) {
				let query = new this.Parse.Query('MemberType');
				let ls = await query.find();
				this.list = ls.map(item => JSON.parse(JSON.stringify(item))).sort((a, b) => a.surfaceId - b.surfaceId)
				
				this.list.forEach((item, i) => {
					let time1 = parseInt(item.expirationDate.split('-').join(''));
					ls.forEach(attr => {
						if (attr.attributes.surfaceId == item.surfaceId) {
							item.explain = this.parseStrToHtml(attr.attributes.explain)
							item.oldPrice = item.promotionPrice
							item.promotionPrice = arr[i]
						}
					})
				})
			},
			// 根据公告或渠道进来的ID请求数据
			async getNoticeOrChanneInfo(id) {
				let query = new this.Parse.Query('ActiveManagement')
				query.equalTo("objectId", id);
				query = await query.first();
				// console.log(query);
				if (query) {
					query = JSON.parse(JSON.stringify(query))
					this.parentData = query
					this.pagesInfo = query.baseMap
					let arr = [query.blackActivePrice, query.platinumActivePrice, query.silverActivePrice]
					this.getMemberList(arr)
				} else {
					this.endAndInIndex()
				}
			},
			// 活动结束，并且回到首页
			endAndInIndex() {
				this.title = '此活动已结束';
				this.submit = '确定';
				this.submitFn = () => {
					this.isShow = false
					uni.switchTab({
						url: '/pages/index/index'
					})
				}
				this.isShow = true
			},
			// 解析换行
			parseStrToHtml(str) {
				return str.replace(/\n/g,'-+-').split('-+-');
			},
			getDateTime(time) {
				var date = null;
				if (time) {
					date = new Date(time);
				} else {
					date = new Date();
				}
				var year = date.getFullYear(); //年
				var month = date.getMonth() + 1; //月
				var day = date.getDate(); //日
				month = month >= 10 ? month : '0' + month;
				day = day >= 10 ? day : '0' + day;
				return year + '-' + month + '-' + day;
			},
			// 底部按钮打开大会员
			changeShowFixed() {
				if (!this.isLogin) {
					this.isShowLogin = true;
					return
				}
				setTimeout(()=>{
					this.showFixed = !this.showFixed;
				},300)
			},
			// 触摸卡片滑动
			touchstart(e) {
				this.clientX = e.changedTouches[0].clientX;
			},
			// 触摸结束卡片停止
			touchend(e) {
				let x = e.changedTouches[0].clientX - this.clientX;
				if (x > 0 && x > 30) {
					if (this.active <= 0) {
						this.active = 0;
					} else {
						this.active --;
					}
				}
				if (x < 0 && x < -30) {
					if (this.active >= 2) {
						this.active = 2;
					} else {
						this.active ++;
					}
				}
			},
			
			// 获取会员截止日期的毫秒数
			getTime(n) {
				var date = new Date();
				var month = date.getMonth() + 1;
				date.setMonth(month + Number(n) - 1)
				return date.getTime()
			},
			// 不是会员第一次进行购买
			firstBuy() {
				let _this = this;
				if (this.active==undefined) {
					this.active=0
				}
				let str = `开通${this.active==0?'黑金VIP':this.active==1?'铂金VIP':'白银VIP'}`;
				this.title = str;
				this.submit = '确定';
				this.submitFn = () => {
					_this.isShow = false;
					_this.showFixed = true;
					var cash = _this.list[_this.active].promotionPrice || _this.list[_this.active].memberPrice;
					_this.payment(parseInt(cash * 100))
				}
				this.isShow = true;
			},
			// 白银续费
			baiyinRenew() {
				if (!this.showFixed) {
					this.showFixed = true;
					return;
				}
				let cash = 0;
				// 现在白银的价格
				var baiyinPrice = this.list[2].promotionPrice || this.list[2].memberPrice;
				var _this = this;
				if (this.isChajia) {
					this.title = '升级为黑金VIP会员';
					this.submit = '继续开通';
					this.submitFn = () => {
						var time = Math.ceil((this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
						var n = this.list[0].promotionPrice || this.list[0].memberPrice;
						cash = parseInt((n - baiyinPrice) / 365 * Math.abs(time)) * 100
						this.isShow = false;
						this.showFixed = false;
						// 1 代表为升级，改变数据库的字段
						this.payment(parseInt(cash), 1)
					}
					this.isShow = true;
				} else {
					this.title = '续费白银VIP';
					this.submit = '确定';
					this.submitFn = () => {
						this.isShow = false;
						this.showFixed = false;
						this.payment(parseInt(baiyinPrice * 100))
						// this.payment(2)
					}
					this.isShow = true;
				}
			},
			// 铂金续费
			bojinRenew() {
				if (!this.showFixed) {
					this.showFixed = true;
					return;
				}
				let cash = 0;
				// 现在铂金的价格
				var bojinPrice = this.list[1].promotionPrice || this.list[1].memberPrice;
				var _this = this;
				if (this.isChajia) {
					this.title = '升级为黑金VIP会员';
					this.submit = '继续开通';
					this.submitFn = () => {
						this.isShow = false;
						this.showFixed = false;
						var time = Math.ceil((_this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
						var n = _this.list[0].promotionPrice || _this.list[0].memberPrice;
						cash = parseInt((n - bojinPrice) / 365 * Math.abs(time)) * 100
						_this.payment(parseInt(cash), 1)
					}
					this.isShow = true;
				} else {
					this.title = '续费铂金VIP';
					this.submit = '确定';
					this.submitFn = () => {
						this.isShow = false;
						this.showFixed = false;
						this.payment(parseInt(bojinPrice * 100))
					}
					this.isShow = true;
				}
			},
			// 黑金续费
			heijinRenew() {
				let _this = this;
				if (!this.showFixed) {
					this.showFixed = true;
					return;
				}
				this.title = '续费黑金';
				this.submit = '确定';
				this.submitFn = () => {
					this.isShow = false;
					this.showFixed = false;
					var heijinPrice = _this.list[0].promotionPrice || _this.list[0].memberPrice;
					this.payment(parseInt(heijinPrice * 100))
				}
				this.isShow = true;
			},

			// 支付
			async payment(cash, bool) {
				// cash = 0
				var _this = this;
				if (cash == 0) {
					var orderNo = dateFormat(new Date(), 'yyyyMMddHHmmss') + GetRandomNum(5);
					this.paymentSuccess(orderNo, cash, bool);
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
								_this.paymentSuccess(tradeId, cash, bool);
							},
							fail(res) {
								_this.paymentFail();
							}
						})
					})
				}

			},
			// 支付成功
			async paymentSuccess(tradeId, cash, bool) {
				this.title = '开通成功';
				this.submit = '确定';
				this.submitFn = () => {
					this.isShow = false;
					this.showFixed = false;
				}
				this.isShow = true;
				this.checkSendMessage()
				await this.getIntegral(cash / 100);
				this.createOrder(tradeId, cash);
				this.createMember(tradeId, bool);
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
				await this.Parse.Config.get().then(async config => {
					this.userInfo.score = (this.userInfo.score || 0) + parseInt(cash * config.attributes.shopScore);
					this.userInfo.score_all = (this.userInfo.score_all || 0) + parseInt(cash * config.attributes.shopScore);
					this.userInfo.amount = (this.userInfo.amount || 0) + cash;
					this.user.set('score', this.userInfo.score);
					this.user.set('score_all', this.userInfo.score_all);
					this.user.set('amount', this.userInfo.amount);
					await this.user.save();
					uni.setStorage({
						key: 'userInfo',
						data: this.userInfo
					})
				})
			},
			// 创建订单
			createOrder(tradeId, cash) {
				var _this = this;
				var item = this.list[this.active];
				var dbOrder = this.Parse.Object.extend("Order")
				var order = new dbOrder()
				order.set('orderNo', tradeId)
				order.set("subjectId", item.objectId)
				order.set("subjectName", item.memberName)
				if (item.oldPrice || item.memberPrice) {
					order.set("price", Number(item.oldPrice) || Number(item.memberPrice))
				}
				order.set("cash", cash/100)
				order.set('couponAmount', 0)
				order.set('scoreAmount', this.userInfo.score)
				order.set('couponId', '')
				order.set("openId", this.userInfo.openid)
				order.set("state", 1)
				order.set("wechatPayOrderId", '') // 支付流水号
				order.save().then(_order => {
					// uni.showModal({
					// 	content: '恭喜，购买成功',
					// 	showCancel: false,
					// 	success() {
					// 		_this.showFixed = false;
					// 	}
					// })
					// console.log(123);
				}, (error) => {
					uni.showToast({
						title:'开通失败'
					})
				})
			},
			// 创建会员
			async createMember(tradeId, bool) {
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
					if (bool) {
						this.member.set('Upgrade', true);
					}
					if (this.memberInfo.memberType = '') {
						this.member.set('endTime', this.getTime(12))
					} else {
						this.member.set('endTime', this.getTime(12) + Number(this.memberInfo.endTime) - Date.now())
					}
					this.member.set("nickName", this.userInfo.nickName);
					this.member.set("realName", this.userInfo.realname);
					this.member.set("phone", this.userInfo.phone);
					await this.member.save();
				} else {
					// 初次创建
					var item = this.list[this.active];
					var memberType = item.surfaceId - 1 + '';
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set('orderArr', [tradeId]);
					member.set("nickName", this.userInfo.nickName);
					member.set("realName", this.userInfo.realname);
					member.set("phone", this.userInfo.phone);
					member.set('endTime', this.getTime(12))
					member.set('memberType', memberType)
					member.set('status', 1)
					await member.save();
				}
				// this.getMember();
				
				// 设置用户的类型
				var query = new this.Parse.Query('User')
				// query.equalTo('objectId', this.userInfo.openid)
				query.get(this.userInfo.openid).then(async record => {
					record.set('memberType', this.memberInfo.memberType + 1)
					await record.save()
				})
				
				// 改变拉新列表用户等级
				var query2 = new this.Parse.Query('PullNew')
				query2.get(this.userInfo.openid).then(async record => {
					if (!record) return
					record.set('memberType', this.memberInfo.memberType + 1)
					await record.save()
				})
				
				let app = getApp();
				var query = new this.Parse.Query('MemberList');
				query.equalTo("openId", this.userInfo.openid);
				var results = await query.first();
				if (results) {
					app.globalData.member = JSON.parse(JSON.stringify(results));
				}
			},
			// 拉新进来的创建消息和优惠券
			// 支付成功后判断用不用发送消息
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
											opinions1.set("message", `恭喜！您已成功招募新战友${n}人，成功获得“黑金VIP会员招募大礼包”，食艺兽客服专员会在48小时内与您取得联系，沟通礼品兑换事宜。\n\n\r\r\rPs. 当招募的新战友在小程序中产生第一笔消费时，您的战友招募数将 +1。`)
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
											opinions.set("message", '恭喜！您已成功招募一名新战友，系统自动发放一张会员奖券给您，可在下次升级您的VIP会员等级时使用噢～请移步“我的优惠券”查收您的奖券。')
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
										couponRecord.set("couponName", coupon.couponName)
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

<style scoped lang="scss">
	.ql-editor {
		padding: 0 !important;
	}
	.vip {
		height: 100vh;
	}
	.fixed {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 200;

		.bg {
			position: absolute;
			left: 0;
			bottom: 0;
			height: 100vh;
			width: 100%;
			background: rgba(0, 0, 0, 0.6);
			z-index: 90;
			overflow: hidden;
			display: none;
		}

		.fixed-bottom {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 140rpx;
			background: #fff;
			z-index: 2100;
			font-size: 32rpx;
			font-weight: 600;
			color: #995D05;
			line-height: 44rpx;

			view {
				height: 90rpx;
				width: 690rpx;
				border-radius: 45rpx;
				margin: 10rpx auto 0;
				background: linear-gradient(90deg, #efdec3, #e3c89a);
				text-align: center;
				line-height: 90rpx;

				text {
					font-family: PingFangSC-Semibold, PingFang SC;
					margin-right: 40rpx;
				}
			}
		}

		.openfixed {
			background: #fff;
			position: absolute;
			bottom: 0;
			height: 982rpx;
			border-top-right-radius: 20rpx;
			border-top-left-radius: 20rpx;
			background: #fff;
			width: 100%;
			z-index: 1100;
			transform: translateY(836rpx);
			transition: .3s;

			.openfixed-title {
				width: 100%;
				text-align: center;
				margin: 48rpx auto;
				font-size: 32rpx;
				font-weight: 600;
				color: #995D05;
				line-height: 44rpx;
				letter-spacing: -1px;
				font-family: PingFangSC-Semibold, PingFang SC;
			}
			
			.openbox {
				width: 100%;
				height: 320rpx;
				position: relative;
				left: 80rpx;
				
				.list {
					width: 100%;
					height: 320rpx;
					white-space: nowrap;
					position: absolute;
					transition: .3s;
					.item {
						display: inline-block;
						border-radius: 20rpx;
						height: 320rpx;
						width: 550rpx;
						margin-right: 20rpx;
						position: relative;
						padding-left: 48rpx;
						&.heijin {
							color: #FFCD83;
						}

						&.bojin {
							color: #995D05;
						}

						&.baiyin {
							color: rgba(0,0,0,.6);
						}

						.img {
							position: absolute;
							z-index: 120;
							top: 0;
							left: 0;
							width: 100%;
							height: 100%;
							border-radius: 20rpx;
							overflow: hidden;

							.imgbg {
								width: 100%;
								height: 100%;
							}
						}

						.active {
							box-shadow: 0 0 10rpx 8rpx rgba(0, 0, 0, .3) inset;
						}

						.info {
							position: relative;
							z-index: 150;

							.title {
								font-size: 40rpx;
								font-weight: 500;
								line-height: 56rpx;
							}

							.img {
								width: 100%;
								height: 40rpx;
								margin-top: 90rpx;
								display: flex;

								image {
									width: 40rpx;
									height: 40rpx;
									margin-right: 28rpx;
								}
							}

							.price {
								margin-top: 226rpx;
								font-family: PingFangSC-Semibold;
								.discount {
									font-size: 48rpx;
									font-weight: 600;
									line-height: 66rpx;
									letter-spacing: -1px;
								}
							}
						}
					}
				}
			}

			.buchajia {
				width: 486rpx;
				font-size: 18rpx;
				font-weight: 500;
				text-align: center;
				color: #995D05;
				line-height: 26rpx;
				margin: 20rpx auto 24rpx;
				background: #f7efe1;
				border: 2rpx solid rgba(153, 93, 5, 0.46);
				border-radius: 10rpx;
				padding: 10rpx 24rpx 10rpx;
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				view {
					position: absolute;
					width: 18rpx;
					height: 18rpx;
					background: #f7efe1;
					border-left: 2rpx solid rgba(153, 93, 5, 0.46);
					border-top: 2rpx solid rgba(153, 93, 5, 0.46);
					left: 242rpx;
					top: -12rpx;
					transform: rotate(45deg);
				}
			}

			.buy-info {
				margin-top: 18rpx;
				height: 300rpx;
				overflow-y: auto;
				text-align: left;
				font-size: 20rpx;
				font-weight: 500;
				color: #995D05;
				line-height: 30rpx;
				padding: 0 100rpx;

				.buy-title {
					font-size: 24rpx;
					font-weight: 500;
					line-height: 30rpx;
					margin-bottom: 20rpx;
					font-family: PingFangSC-Medium, PingFang SC;
				}

				.buy-info-item {
					font-family: PingFangSC-Regular;
					text {
						text-decoration: underline;
					}
				}
				view {
					font-family: PingFangSC-Regular, PingFang SC;
					font-weight: 400;
				}
			}
		}
	}

	.leval {
		.openfixed {
			transform: translateY(0);
		}

		.bg {
			display: block;
		}
	}
</style>
