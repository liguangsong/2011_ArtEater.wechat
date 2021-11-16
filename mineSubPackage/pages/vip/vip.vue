<template>
	<view class="vip" :style='{overflow: showFixed ? "auto" : "hidden"}'>
		<Navbar align='center' surplusHeight='70' navbarBg='#1A1512' height='450rpx' title='会员中心'>
			<template v-slot:img>
				<image style='width: 100%;' src="../../static/bg.png" mode='aspectFill'></image>
			</template>
			<view class="box">
				<view class="head">
					<view class="image">
						<image class="img" :src="userInfo.avatarUrl"></image>
						<image class='icon' v-if='isMember' src="../../static/icon.png"></image>
					</view>
					<view class="info">
						<view class="txt">
							<view class="txtname">{{userInfo.nickName}}</view>
							<view class='txttype' v-if='memberInfo && memberInfo.memberType'>
								{{memberInfo.memberType == 0 ? '黑金VIP' : memberInfo.memberType == 1 ? '铂金VIP' : '白银VIP'}}
							</view>
							<view class="txttype" v-else>
								未开通会员
							</view>
						</view>
						<view class="xufei" @click='changeShowFixed'>
							<image v-if='isMember && memberInfo.memberType ' src="../../static/bjxf.png" mode='heightFix'></image>
							<image v-else src="../../static/bjkt.png" mode='heightFix'></image>
							<!-- <text>{{isMember && memberInfo.memberType ? '续 &nbsp; 费' : '立即开通'}}</text> -->
						</view>
					</view>
				</view>

				<view class="view">
					<view class="viewHead">
						<view class="vipuser">
							会员权益
						</view>
						<view class="tel">
							客服电话/微信: 13811219735
						</view>
					</view>
					<view class="viewItem heijin">
						<view class="viewItem-vip">
							<view class="bg">
								<image :src='list[0].surface'></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<view class="viewItem-vip-price">
										<text class='oldprice'
											v-if='list[0].memberPrice && list[0].discount'>¥{{list[0].memberPrice}}</text>
										<text class='price semibold'>¥{{list[0].promotionPrice}}</text>
									</view>
								</view>
								<view class="viewItem-vip-bottom">
									<view class="vip-btn" @click='changeShowFixed'>
										<view v-if='isMember'>
											<!-- <text v-if='memberInfo.memberType == 0'>续 &nbsp; 费</text>
											<text v-else>立即升级黑金会员</text> -->
											<image v-if='memberInfo.memberType == 0' src="../../static/bjxf.png" mode="heightFix"></image>
											<image v-else src="../../static/bjsj.png" mode="heightFix"></image>
											
										</view>
										<view v-else>
											<!-- <text>立即开通</text> -->
											<image src="../../static/bjkt.png" mode="heightFix"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip1.png"></image>
								</view>
								<view class="item-title">
									VIP课程畅享
								</view>
								<view class="item-txt1">
									食艺兽线上音视频VIP课程* 免费畅享，持续上新中
								</view>
								<view class="item-txt2">
									*包含美术史基础课程和时下高考阶段所有史论类专业方向的独家应试课程。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip2.png"></image>
								</view>
								<view class="item-title">
									题库一卡通
								</view>
								<view class="item-txt1">
									基础知识点复习利器——食艺兽线上题库* 畅行无阻
								</view>
								<view class="item-txt2">
									*包含美术史基础题库、必考题库、模拟试卷、历年真题，共计2000道题，50份试卷和试题解析。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip3.png"></image>
								</view>
								<view class="item-title">
									课堂福利
								</view>
								<view class="item-txt1">
									报名线下/线上班* 尊享食艺兽会员超级折扣
								</view>
								<view class="item-txt2">
									*线下/线上班各班型授课内容和收费标准详情请咨询客服。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip4.png"></image>
								</view>
								<view class="item-title">
									独家工具书
								</view>
								<view class="item-txt1">
									由食艺兽金牌名师团队多年积累、研发的史论复习工具书*，包邮噢
								</view>
								<view class="item-txt2">
									*开通后请联系客服，告知收件人姓名、电话和收件地址，否则视为自动放弃该福利。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip6.png"></image>
								</view>
								<view class="item-title">
									专属备考顾问
								</view>
								<view class="item-txt1">
									史论类专业* 课程顾问为您提供1V1专属报/备考咨询服务
								</view>
								<view class="item-txt2">
									*关于美术学、艺术史论、艺术学理论、艺术与设计管理（中法）、文物修复等专业的报/备考疑问解答。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip5.png"></image>
								</view>
								<view class="item-title">
									备考学习群
								</view>
								<view class="item-txt1">
									食艺兽VIP备考学习群* 入群邀请
								</view>
								<view class="item-txt2">
									*每日干货分享、名师答疑、考情播报、学习交流。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/heijin/vip7.png"></image>
								</view>
								<view class="item-title">
									专属头像勋章
								</view>
								<view class="item-txt1">
									食艺兽VIP会员专属头像勋章*，让您以尊贵的身份出现在排行 榜中
								</view>
								<view class="item-txt2">
									*此勋章仅在会员期内生效
								</view>
							</view>
						</view>
					</view>
					<view class="br"></view>
					<view class="viewItem bojin">
						<view class="viewItem-vip">
							<view class="bg">
								<image :src="list[1].surface"></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<view class="viewItem-vip-price">
										<text class='oldprice'
											v-if='list[0].memberPrice && list[1].discount '>¥{{list[1].memberPrice}}</text>
										<text class='price semibold'>¥{{list[1].promotionPrice}}</text>
									</view>
								</view>
			
								<view class="viewItem-vip-bottom">
									<view class="vip-btn" @click='changeShowFixed'>
										<view v-if='isMember'>
											<!-- <text v-if='memberInfo.memberType == 1'>续费</text>
											<text v-else>立即升级黑金会员</text> -->
											<image v-if='memberInfo.memberType == 1' src="../../static/hjxf.png" mode="heightFix"></image>
											<image v-else src="../../static/hjsj.png" mode="heightFix"></image>
										</view>
										<view v-else>
											<!-- <text>立即开通</text> -->
											<image src="../../static/hjkt.png" mode="heightFix"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item">
								<view class="item-img">
									<image src="../../static/bojin/vip1.png"></image>
								</view>
								<view class="item-title">
									VIP课程畅享
								</view>
								<view class="item-txt1">
									食艺兽线上音视频VIP课程* 免费畅享，持续上新中
								</view>
								<view class="item-txt2">
									*包含美术史基础课程和时下高考阶段所有史论类专业方向的独家应试课程。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/bojin/vip2.png"></image>
								</view>
								<view class="item-title">
									课堂福利
								</view>
								<view class="item-txt1">
									报名线下/线上班* 尊享食艺兽会员超级折扣
								</view>
								<view class="item-txt2">
									*线下/线上班各班型授课内容和收费标准详情请咨询客服。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/bojin/vip3.png"></image>
								</view>
								<view class="item-title">
									独家工具书
								</view>
								<view class="item-txt1">
									由食艺兽金牌名师团队多年积累、研发的史论复习工具书*，包邮噢
								</view>
								<view class="item-txt2">
									*开通后请联系客服，告知收件人姓名、电话和收件地址，否则视为自动放弃该福利。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/bojin/vip4.png"></image>
								</view>
								<view class="item-title">
									专属备考顾问
								</view>
								<view class="item-txt1">
									史论类专业* 课程顾问为您提供1V1专属报/备考咨询服务
								</view>
								<view class="item-txt2">
									*关于美术学、艺术史论、艺术学理论、艺术与设计管理（中法）、文物修复等专业的报/备考疑问解答。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/bojin/vip5.png"></image>
								</view>
								<view class="item-title">
									专属头像勋章
								</view>
								<view class="item-txt1">
									食艺兽VIP会员专属头像勋章*，让您以尊贵的身份出现在排行 榜中
								</view>
								<view class="item-txt2">
									*此勋章仅在会员期内生效
								</view>
							</view>
						</view>
					</view>
					<view class="br"></view>
					<view class="viewItem baiyin">
						<view class="viewItem-vip">
							<view class="bg">
								<image :src="list[2].surface"></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<view class="viewItem-vip-price">
										<text class='oldprice'
											v-if='list[0].memberPrice && list[2].discount '>¥{{list[2].memberPrice}}</text>
										<text class='price semibold'>¥{{list[2].promotionPrice}}</text>
									</view>
								</view>
								<view class="viewItem-vip-bottom">
									<view class="vip-btn" @click='changeShowFixed'>
										<view v-if='isMember'>
										<!-- 	<text v-if='memberInfo.memberType == 2'>续费</text>
											<text v-else>立即升级黑金会员</text> -->
											<image v-if='memberInfo.memberType == 2' src="../../static/byxf.png" mode="heightFix"></image>
											<image v-else src="../../static/bysj.png" mode="heightFix"></image>
										</view>
										<view v-else>
											<image src="../../static/bykt.png" mode="heightFix"></image>
										</view>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item">
								<view class="item-img">
									<image src="../../static/baiyin/vip1.png"></image>
								</view>
								<view class="item-title">
									题库一卡通
								</view>
								<view class="item-txt1">
									基础知识点复习利器——食艺兽线上题库* 畅行无阻
								</view>
								<view class="item-txt2">
									*包含美术史基础题库、必考题库、模拟试卷、历年真题，共计2000道题，50份试卷和试题解析。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/baiyin/vip2.png"></image>
								</view>
								<view class="item-title">
									课堂福利
								</view>
								<view class="item-txt1">
									报名线下/线上班* 尊享食艺兽会员超级折扣
								</view>
								<view class="item-txt2">
									*线下/线上班各班型授课内容和收费标准详情请咨询客服。
								</view>
							</view>
							<view class="item">
								<view class="item-img">
									<image src="../../static/baiyin/vip3.png"></image>
								</view>
								<view class="item-title">
									专属头像勋章
								</view>
								<view class="item-txt1">
									食艺兽VIP会员专属头像勋章*，让您以尊贵的身份出现在排行 榜中
								</view>
								<view class="item-txt2">
									*此勋章仅在会员期内生效
								</view>
							</view>
						</view>
					</view>

				</view>
				<view style='height: 100rpx'></view>
			</view>
		</Navbar>
		<view class="fixed" :class='{leval: showFixed}'>
			<view class="bg" @click='changeShowFixed(1)'></view>
			<view class="fixed-bottom">
				<view class='semibold'>
					<view v-if='memberInfo'>
						<view v-if='memberInfo.memberType == 0' @click='heijinRenew'>
							<text>续费黑金VIP</text>
							即刻畅享
						</view>
						<view v-if='memberInfo.memberType == 1' @click='bojinRenew'>
							<text v-if='active == 1'>续费铂金VIP</text>
							<text v-else>升级黑金VIP</text>
							即刻畅享
						</view>
						<view v-if='memberInfo.memberType == 2' @click='baiyinRenew'>
							<text v-if='active == 2'>续费白银VIP</text>
							<text v-else>升级黑金VIP</text>
							即刻畅享
						</view>
					</view>
					<view v-else>
						<view v-if='!showFixed' @click='changeShowFixed'>
							<text>开通会员VIP</text>
							即刻畅享
						</view>
						<view v-else @click='firstBuy'>
							<text v-if='active == 0'>购买黑金VIP</text>
							<text v-if='active == 1'>购买铂金VIP</text>
							<text v-if='active == 2'>购买白银VIP</text>
							即刻畅享
						</view>
					</view>
				</view>
			</view>
			<view class="openfixed">
				<view class="openfixed-title">
					食艺兽大会员
				</view>
				<view class="openbox"  @touchstart='touchstart' @touchend='touchend'>
					<!-- <view class="list" :style='{left: -active*550 + 20 + "rpx"}'> -->
					<view class="list" :style='{left: active==0 ? "20rpx" : active==1 ? "-550rpx":"-1120rpx"}'>
						<view class="item" v-for='(item,i) in list' :keys='item.id'
							:class='{heijin: item.surfaceId == 1, bojin: item.surfaceId == 2, baiyin: item.surfaceId == 3}'
							@click='active = i'>
							<!-- :class='{active: active == i}' -->
							<view class="img">
								<image class='imgbg' :src="imgArr[i]"></image>
								<view v-if='isMember'>
									<view v-if='memberInfo.memberType == 0'>
										<image class='righttop' src="../../static/time.png"></image>
									</view>
									<view v-if='memberInfo.memberType == 1'>
										<image class='righttop' v-if='i==1' src="../../static/time.png"></image>
										<image class='righttop' v-else src="../../static/upgrade.png"></image>
									</view>
									<view v-if='memberInfo.memberType == 2'>
										<image class='righttop' v-if='i==2' src="../../static/time.png"></image>
										<image class='righttop' v-else src="../../static/upgrade.png"></image>
									</view>
								</view>
								<view v-else>
									<view v-if='item.promotionPrice && item.discount'>
										<image class='righttop' v-if='!isChajia' src="../../static/time.png"></image>
										<image class='righttop' v-else src="../../static/upgrade.png"></image>
									</view>
								</view>
							</view>
							<view class="info">
								<view class="price">
									<text class='discount semibold'>¥{{item.promotionPrice}}</text>
									<text class='old-price semibold' style='text-decoration: line-through;'
										v-if='item.promotionPrice && item.discount'>¥{{item.memberPrice}}</text>
								</view>
							</view>
						</view>

					</view>
				</view>
			
	
				<view class="buchajia" v-if='isChajia'>
					<view class="icon"></view>
					<text>您的剩余时长可以抵扣金额，只需支付{{cash}}元即可升级！ 升级后会员时长为：{{cashTime1}}至{{cashTime2}}</text>
				</view>
				<view class="buy-info" :style='{height: isChajia ? "240rpx" : "360rpx"}'>
					<view class="buy-title">购买说明</view>
					<view class="buy-info-item">
						<view v-for='(item,i) in list[active].explain' :key='i'>
							{{item}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navbar from '../../../components/navBar/navbar.vue'
	import {
		dateFormat,
		GetRandomNum
	} from '../../../js/common.js'
	export default {
		data() {
			return {
				showFixed: false,
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
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/card%EF%BC%8F%E9%BB%91%E9%87%91vip-%E8%B4%AD%E4%B9%B0%E7%95%8C%E9%9D%A2%402x.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/card%EF%BC%8F%E9%BB%91%E9%87%91vip%E5%A4%87%E4%BB%BD%402x.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/card%EF%BC%8F%E7%99%BD%E9%93%B6vip%E5%A4%87%E4%BB%BD%402x.png'
				]
			}
		},
		components: {
			Navbar
		},
		async onShow() {
			uni.showLoading({
				title:'加载中……'
			})
			this.user = this.Parse.User.current();
			this.userInfo = JSON.parse(JSON.stringify(this.user));

			var query = new this.Parse.Query('MemberType');
			var ls = await query.find();
			this.list = ls.map(item => JSON.parse(JSON.stringify(item))).sort((a, b) => a.surfaceId - b
				.surfaceId);

			var date = new Date();
			var year = date.getFullYear(); //年
			var month = date.getMonth() + 1; //月
			var day = date.getDate(); //日
			month = month >= 10 ? month : '0' + month;
			day = day >= 10 ? day : '0' + day;
			var time = ' ' + year + month + day;
			this.list.forEach(item => {
				var time1 = parseInt(item.expirationDate.split('-').join(''));
				ls.forEach(attr => {
					if (attr.attributes.surfaceId == item.surfaceId) {
						item.explain = this.parseStrToHtml(attr.attributes.explain)
					}
				})
				if (time1 >= time) {
					item.discount = true;
				} else {
					item.discount = false;
				}
			})
			this.getMember();
		},
		// created() {
		// 	this.getIntegral(0/100)
		// },
		computed: {
			isMember() {
				if (this.memberInfo && Date.now() < this.memberInfo.endTime) {
					return true;
				} else {
					return false;
				}
			},
			isChajia() {
				if (this.memberInfo && this.memberInfo.memberType == 1 && this.active != 1) {
					// 现在白银的价格
					var baiyinPrice = this.list[1].promotionPrice || this.list[1].memberPrice;
					var time = Math.ceil((this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
					var n = this.list[0].promotionPrice || this.list[0].memberPrice;
					this.cash = (n - baiyinPrice) / 365 * (Math.abs(time - 365) || 365);
					this.cashTime1 = this.getDateTime();
					this.cashTime2 = this.getDateTime(this.memberInfo.endTime)
					return true;
				}
				if (this.memberInfo && this.memberInfo.memberType == 2 && this.active != 2) {
					// 现在白银的价格
					var bojinPrice = this.list[2].promotionPrice || this.list[2].memberPrice;
					var time = Math.ceil((this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
					var n = this.list[0].promotionPrice || this.list[0].memberPrice;
					this.cash = (n - bojinPrice) / 365 * (Math.abs(time - 365) || 365);
					this.cashTime1 = this.getDateTime();
					this.cashTime2 = this.getDateTime(this.memberInfo.endTime)
					return true;
				}
				return false;
			}
		},
		methods: {
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
			changeShowFixed(f) {
				if (f != 1) {
					this.showFixed = true;
				} else {
					this.showFixed = false;
				}
			},
			touchstart(e) {
				this.clientX = e.changedTouches[0].clientX;
			},
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
			// 获取是否是会员
			async getMember() {
				var Member = new this.Parse.Query('MemberList')
				Member.equalTo("openId", this.userInfo.openid);
				this.member = await Member.first();
				if (this.member) {
					this.memberInfo = JSON.parse(JSON.stringify(this.member));
					this.active = Number(this.memberInfo.memberType);
				}
				uni.hideLoading()
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
				this.showFixed = true;
				var cash = this.list[this.active].promotionPrice || this.list[this.active].memberPrice;
				this.payment(cash * 100)
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
				if (this.isChajia) {
					var _this = this;
					uni.showModal({
						title: '购买完成将自动升级为黑金VIP会员',
						confirmColor: '#ED3535',
						success(res) {
							// 升级为黑金
							if (res.confirm) {
								var time = Math.ceil((_this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
								var n = _this.list[0].promotionPrice || _this.list[0].memberPrice;
								cash = (n - baiyinPrice) / 365 * Math.abs(time - 365) * 100;
								_this.payment(cash)
							}
						}
					})
				} else {
					this.payment(baiyinPrice * 100)
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
				if (this.isChajia) {
					var _this = this;
					uni.showModal({
						title: '购买完成将自动升级为黑金VIP会员',
						confirmColor: '#ED3535',
						confirmText: '继续购买',
						success(res) {
							// 升级为黑金
							if (res.confirm) {
								var time = Math.ceil((_this.memberInfo.endTime - Date.now()) / (1000 * 60 * 60 * 24));
								var n = _this.list[0].promotionPrice || _this.list[0].memberPrice;
								cash = (n - bojinPrice) / 365 * Math.abs(time - 365);
								_this.payment(cash * 100)
							}
						}
					})
				} else {
					this.payment(bojinPrice * 100)
				}
			},
			// 黑金续费
			heijinRenew() {
				if (!this.showFixed) {
					this.showFixed = true;
					return;
				}
				var heijinPrice = this.list[0].promotionPrice || this.list[0].memberPrice;
				this.payment(heijinPrice * 100)
			},

			// 支付
			payment(cash) {
				// cash = 1;
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
				var _this = this;
				uni.showModal({
					title: '购买成功',
					confirmColor: '#ED3535',
					confirmText: '确定',
					success(res) {
						if (res.confirm) {
							_this.showFixed = false;
						}
					}
				})
				await _this.getIntegral(cash / 100);
				_this.createOrder(tradeId);
				_this.createMember(tradeId);
			},
			// 支付失败
			paymentFail() {
				uni.showModal({
					title: '购买失败',
					confirmColor: '#ED3535',
					confirmText: '确定',
				})
			},
			// 获取积分与赠送积分
			async getIntegral(cash) {
				// cash = 10000;
				await this.Parse.Config.get().then(async config => {
					console.log(this.userInfo);
					this.userInfo.score = (this.userInfo.score || 0) + parseInt(cash * config.attributes.shopScore);
					this.userInfo.score_all = (this.userInfo.score_all || 0) + parseInt(cash * config.attributes.shopScore);
					this.user.set('score', this.userInfo.score);
					this.user.set('score_all', this.userInfo.score_all);
					console.log(this.userInfo);
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
				var item = this.list[this.active];
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
				}, (error) => {
					// uni.showModal({
					// 	content: '购买失败',
					// 	showCancel: false
					// })
					uni.showToast({
						title:'购买失败'
					})
				})
			},
			// 创建会员
			async createMember(tradeId) {
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
					await this.member.save();
				} else {
					// 初次创建
					var item = this.list[this.active];
					var memberType = item.surfaceId - 1 + '';
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set('orderArr', [tradeId]);
					member.set('endTime', this.getTime(12))
					member.set('memberType', memberType)
					member.set('status', 1)
					await member.save();
				}
				this.getMember();
				let app = getApp();
				var query = new this.Parse.Query('MemberList');
				query.equalTo("openId", this.userInfo.openid);
				var results = await query.first();
				// console.log(12345,results);
				if (results) {
					app.globalData.member = JSON.parse(JSON.stringify(results));
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.vip {
		height: 100vh;
	}

	.box {
		width: 100%;
		position: absolute;
		top: 204rpx;

		.vip-btn {
			// padding: 0 42rpx;
			// height: 48rpx;
			// line-height: 46rpx;
			// text-align: center;
			// border-radius: 24rpx;
			// border: 1px solid rgba(255, 205, 131, 1);
			// color: #FFCD83;
			// font-size: 20rpx;
			// font-weight: 500;
			view {
				display: flex;
				align-items: flex-end;
				image {
					height: 48rpx;
					margin-top: 6rpx;
				}
			}
		}

		.head {
			display: flex;
			margin: 0 78rpx 0 72rpx;

			.image {
				flex: 0 1 128rpx;
				height: 128rpx;
				margin-right: 28rpx;
				position: relative;
				border-radius: 50%;
				border: 1px solid #FFCD83;

				.img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
				}

				.icon {
					width: 68rpx;
					height: 64rpx;
					position: absolute;
					top: -32rpx;
					right: -8rpx;
				}
			}

			.info {
				flex: 1 1 auto;
				display: flex;
				padding-top: 34rpx;
				justify-content: space-between;
				align-items: center;

				.txt {
					.txtname {
						font-size: 36rpx;
						font-weight: 500;
						color: #FFFFFF;
						line-height: 50rpx;
					}

					.txttype {
						font-size: 20rpx;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 28rpx;
						margin-top: 10rpx;
						opacity: .8;
						font-family: PingFangSC-Regular;
					}
				}
				.xufei {
					height: 48rpx;
					width: 200rpx;
					text-align: right;
					image {
						height: 48rpx;
					}
				}
			}
		}

		.view {
			margin-top: 70rpx;
			background: #fff;
			border-top-left-radius: 24rpx;
			border-top-right-radius: 24rpx;

			.viewHead {
				display: flex;
				justify-content: space-between;
				padding: 28rpx 48rpx 0;
				color: #995D05;

				.vipuser {
					font-size: 28rpx;
					line-height: 40rpx;
					height: 40rpx;
					font-weight: 500;
					display: flex;
					align-items: center;
					
					&::before {
						content: '';
						display: inline-block;
						width: 10rpx;
						height: 24rpx;
						background: #995D05;
						border-radius: 1px;
						margin-right: 8rpx;
					}
				}

				.tel {
					font-size: 16rpx;
					line-height: 22rpx;
					opacity: .4;
					padding-top: 14rpx;
				}
			}

			.viewItem {
				padding: 28rpx 40rpx;
				&.heijin {
					.vip-btn {
						color: #FFCD83;
						border-color: #FFCD83;
					}
					.viewItem-vip-titel {
						color: #FFCD83;
					}
					.item {
						color: #C4966C;
					}
				}

				&.bojin {
					.vip-btn {
						color: #995D05;
						border-color: #995D05;
					}
					.viewItem-vip-titel {
						color: #995D05;
					}
					.item {
						color: #BC914C;
					}
				}

				&.baiyin {
					.vip-btn {
						color: #000000 ;
						border-color: #000000;
					}
					.viewItem-vip-titel {
						color: #000000;
					}
					.item {
						color: #555555;
					}
				}

				.viewItem-vip {
					position: relative;
					width: 670rpx;
					height: 390rpx;

					.viewItem-vip-info {
						width: 100%;
						height: 100%;
						padding: 46rpx 52rpx 38rpx;
						position: relative;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						z-index: 100;

						.viewItem-vip-titel {
							font-weight: 500;
							display: flex;
							justify-content: flex-end;
							
							.viewItem-vip-price {
								font-weight: 500;
								height: 66rpx;
								line-height: 66rpx;
								.price {
									font-size: 48rpx;
									line-height: 66rpx;
									font-weight: 600;
								}

								.oldprice {
									font-weight: 600;
									margin-right: 40rpx;
									font-size: 32rpx;
									line-height: 44rpx;
									text-decoration: line-through;
									opacity: .6;
								}
							}
						}

						.viewItem-vip-txt {
							margin-top: 64rpx;
							display: flex;
							justify-content: space-between;

							image,
							view {
								width: 48rpx;
								height: 48rpx;
							}
						}

						.viewItem-vip-bottom {
							margin-top: 76rpx;
							display: flex;
							align-items: center;
							justify-content: flex-end;

							.viewItem-vip-inderice {
								width: 256rpx;
								font-size: 14rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								line-height: 18rpx;
							}
						}
					}

					.bg {
						position: absolute;
						z-index: 0;
						top: 0;
						width: 100%;
						height: 100%;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}

				.list {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
					margin-top: 28rpx;

					&:after {
						content: '';
						display: inline-block;
						width: 204rpx;
					}

					.item {
						flex: 0 1 204rpx;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 40rpx;

						.item-img {
							width: 80rpx;
							height: 80rpx;
							border-radius: 50%;

							image {
								width: 100%;
								height: 100%;
								border-radius: 50%;
							}
						}

						.item-title {
							font-size: 20rpx;
							font-weight: 500;
							line-height: 28rpx;
							margin: 16rpx 0;
						}

						.item-txt1 {
							font-size: 16rpx;
							font-weight: 500;
							line-height: 22rpx;
							margin-bottom: 20rpx;
						}

						.item-txt2 {
							font-size: 14rpx;
							font-weight: 400;
							line-height: 18rpx;
							width: 100%;
							opacity: .7;;
							font-family: PingFangSC-Regular;
						}
					}
				}
			}
		}

		.br {
			width: 100%;
			height: 12rpx;
			background: rgba(0, 0, 0, 0.08);
			// box-shadow: 0 0 6rpx 0 rgba(0,0,0,0.08);
		}
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
			}
			
			.openbox {
				width: 100%;
				height: 320rpx;
				// overflow: hidden;
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
							color: #000000;
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

							.righttop {
								width: 110rpx;
								height: 110rpx;
								position: absolute;
								top: 4rpx;
								right: 4rpx;
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
								}

								.old-price {
									font-size: 32rpx;
									font-weight: 600;
									line-height: 44rpx;
									margin-left: 48rpx;
								}
							}
						}
					}
				}
			}

			.buchajia {
				width: 486rpx;
				height: 74rpx;
				font-size: 18rpx;
				font-weight: 500;
				color: #995D05;
				line-height: 26rpx;
				margin: 20rpx auto 44rpx;
				background: rgba(230, 203, 161, 0.32);
				border: 2rpx solid rgba(153, 93, 5, 0.46);
				border-radius: 10rpx;
				padding: 10rpx 24rpx 0;
				position: relative;

				view {
					position: absolute;
					width: 18rpx;
					height: 18rpx;
					background: #F6EEEF;
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
				}

				.buy-info-item {
					font-family: PingFangSC-Regular;
					text {
						text-decoration: underline;
					}
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
