<template>
	<view class="vip" :style='{overflow: showFixed ? "auto" : "hidden"}'>
		<Navbar align='center' surplusHeight='70' navbarBg='#1A1512' :icon='false' >
			<view>
				<rich-text class='regular ql-editor' :nodes='pagesInfo | formatRichText'></rich-text>
				<view style='height: 140rpx'></view>
			</view>
		</Navbar>
		<view class="fixed" :class='{leval: showFixed}'>
			<view class="bg" @touchmove.stop.prevent="" @click='changeShowFixed'></view>
			<view class="fixed-bottom">
				<view>
					<view v-if='!showFixed' @click='changeShowFixed'>
						<text>开通会员VIP</text>
						<text>即刻畅享</text>
					</view>
					<view v-else @click='firstBuy'>
						<text>开通黑金VIP</text>
						<text>即刻畅享</text>
					</view>
				</view>
			</view>
			<view class="openfixed">
				<view class="openfixed-title">
					食艺兽大会员
				</view>
				<view class="openbox">
					<view class="list" style='left:20rpx'>
						<view class='item heijin'>
							<view class="img">
								<image class='imgbg' :src="imgArr[0]"></image>
							</view>
							<view class="info">
								<view class="price">
									<text class='discount semibold'>¥{{list[0].promotionPrice}}</text>
									<text class='old-price semibold' style='margin-left: 20rpx;text-decoration: line-through;'>¥{{list[0].memberPrice}}</text>
								</view>
							</view>
						</view>

					</view>
				</view>
				<view class="buy-info" style='height:360rpx'>
					<view class="buy-title">购买说明</view>
					<view class="buy-info-item">
					<!-- 	<view>
							{{list[0].explain}}
						</view> -->
						<view v-for='(item,i) in list[0].explain' :key='i'>
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
					'https://art-eater.oss-cn-beijing.aliyuncs.com/%E9%BB%91%E9%87%91vip-%E8%B4%AD%E4%B9%B0%E7%95%8C%E9%9D%A2.png'
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
			let url = unescape(options.q)
			let str = url.split('=')[1]
			this.options = options = {id: str}
			// this.options = options = {id: "jGNZiFqyLf"}
			// 渠道进来的
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
		methods: {
			changeShowLogin() {
				this.isShowLogin = false
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
						// _this.getMember()
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
					// this.active = Number(this.memberInfo.memberType);
				}
			},
			// 获取会员数据
			async getMemberList(arr, ids) {
	
				let query = new this.Parse.Query('MemberType');
				let ls = await query.find();
				this.list = ls.map(item => JSON.parse(JSON.stringify(item))).sort((a, b) => a.surfaceId - b.surfaceId)
				this.list.forEach((item, i) => {
					let time1 = parseInt(item.expirationDate.split('-').join(''));
					ls.forEach(attr => {
						if (attr.attributes.surfaceId == item.surfaceId) {
							item.explain = this.parseStrToHtml(attr.attributes.explain)
							item.promotionPrice = arr[i]
						}
					})
				})

			},
			// 根据公告或渠道进来的ID请求数据
			async getNoticeOrChanneInfo(id) {
				let query = new this.Parse.Query('ChannelManagement')
				query.equalTo("objectId", id);
				query = await query.first();
				if (query) {
					query = JSON.parse(JSON.stringify(query))
					this.parentData = query
					this.pagesInfo = query.baseMap
					let arr = [query.blackActivePrice]
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
				this.title = '开通黑金VIP';
				this.submit = '确定';
				this.submitFn = () => {
					_this.isShow = false;
					_this.showFixed = true;
					var cash = _this.list[0].promotionPrice
					_this.payment(parseInt(cash * 100))
				}
				this.isShow = true;
			},

			// 支付
			async payment(cash) {
				// cash = 0
				var _this = this;
				if (cash != 0) {
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
				this.title = '开通成功';
				this.submit = '确定';
				this.submitFn = () => {
					this.isShow = false;
					this.showFixed = false;
				}
				this.isShow = true;
				this.createCommission()
				// this.createOrder(tradeId);
				// this.createMember(tradeId);
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

			// 创建订单
			createOrder(tradeId) {
				var _this = this;
				var item = this.list[0];
				var dbOrder = this.Parse.Object.extend("Order")
				var order = new dbOrder()
				order.set('orderNo', tradeId)
				order.set("subjectId", item.objectId)
				order.set("subjectName", item.memberName)
				order.set("price", item.promotionPrice || item.memberPrice)
				order.set("cash", item.promotionPrice || item.memberPrice)
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
			async createMember(tradeId) {
				let _this = this;
				if (this.member) {
					var arr = this.memberInfo.orderArr;
					arr.push(tradeId);
					this.member.set('orderArr', arr);
					this.member.set('status', 1)
					
					// 设置用户的类型
					var query = new this.Parse.Query('User')
					query.get(this.userInfo.openid).then(async record => {
						record.set('memberType', 0)
						await record.save()
					})
					
					this.member.set('memberType', '0');
					this.member.set('endTime', this.getTime(12))
			
					this.member.save().then(_order => {
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
					let _this = this;
					var item = this.list[0];
					var memberType = item.surfaceId - 1 + '';
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set('orderArr', [tradeId]);
					member.set('endTime', this.getTime(12))
					member.set('memberType', memberType)
					member.set('status', 1)
					member.save().then(_order => {
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
				this.getMember();
				let app = getApp();
				var query = new this.Parse.Query('MemberList');
				query.equalTo("openId", this.userInfo.openid);
				var results = await query.first();
				if (results) {
					app.globalData.member = JSON.parse(JSON.stringify(results));
				}
			},
			// 渠道进来的创建提成
			createCommission() {
				let _this = this;
				let dbOrder = this.Parse.Object.extend("RoyaltyBill")
				let order = new dbOrder()
				order.set('parentId', this.parentData.objectId)
				order.set('memberType', '1')
				order.set("price", this.list[0].promotionPrice)
				order.set("openid", this.userInfo.openid);
				if (_this.userInfo.phone) {
					order.set('phone',_this.userInfo.phone)
				}
				order.set("commissionPrice", this.list[0].promotionPrice * this.parentData.divideInto / 100 )
				order.save().then(_order => {
					let query = new _this.Parse.Query('ChannelManagement')
					query.equalTo("objectId", _this.parentData.objectId);
					query.first().then(res => {
						let total = res.attributes.TotalAmountCommission
						total = total ? total : 0
						res.set('TotalAmountCommission', total + _this.list[0].promotionPrice * _this.parentData.divideInto / 100)
						res.save()
					})
				})
				
			}		
		}
	}
</script>

<style scoped lang="scss">
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
