<template>
	<view class="vip">
		<Navbar align='center' surplusHeight='70' navbarBg='#1A1512' height='450rpx' title='会员中心'>
			<template v-slot:img>
				<image style='width: 100%;' src="../../static/bg.png" mode='aspectFill'></image>
			</template>
			<view class="box">
				<view class="head">
					<view class="image">
						<image class="img" :src="userInfo.avatarUrl"></image>
						<image class='icon' src="../../static/icon.png"></image>
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
						<view class="vip-btn" @click='showFixed = true'>
							<text>{{isMember && memberInfo.memberType ? '续费' : '立即开通'}}</text>
						</view>
					</view>
				</view>
				<view class="view">
					<view class="viewHead">
						<view class="vipuser">
							会员权益
						</view>
						<view class="tel">
							联系我们:13811219735
						</view>
					</view>
					<view class="viewItem heijin">
						<view class="viewItem-vip">
							<view class="bg">
								<image :src="list[0].surface"></image>
							</view>
							<view class="viewItem-vip-info">
								<view class="viewItem-vip-titel">
									<text>黑金VIP</text>
									<view class="viewItem-vip-price">
										<text class='oldprice' v-if='list[0].memberPrice && list[0].discount '>¥{{list[0].memberPrice}}</text>
										<text class='price'>¥{{list[0].promotionPrice}}</text>
									</view>
								</view>
								<view class="viewItem-vip-txt">
									<image src="../../static/heijin/vip1.png"></image>
									<image src="../../static/heijin/vip2.png"></image>
									<image src="../../static/heijin/vip3.png"></image>
									<image src="../../static/heijin/vip4.png"></image>
									<image src="../../static/heijin/vip5.png"></image>
									<image src="../../static/heijin/vip6.png"></image>
									<image src="../../static/heijin/vip7.png"></image>
									<!-- <text>黑金VIP共享7项权益，术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。</text> -->
								</view>
								<view class="viewItem-vip-bottom">
									<view class="viewItem-vip-inderice">
										此VIP会员服务有效期为365天 到期后系统将自动关闭所有会员权限 为不影响使用，请提前续费
									</view>
									<view class="vip-btn" @click='showFixed = true'>
										<text>{{isMember && memberInfo.memberType == 0 ? '续费' : '立即开通'}}</text>
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
									VIP课程畅听
								</view>
								<view class="item-txt1">
									食艺兽线上音视频VIP课程* 免费畅享
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
									<image src="../../static/heijin/vip5.png"></image>
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
									<image src="../../static/heijin/vip6.png"></image>
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
									<text>铂金VIP</text>
									<view class="viewItem-vip-price">
										<text class='oldprice' v-if='list[0].memberPrice && list[0].discount '>¥{{list[0].memberPrice}}</text>
										<text class='price'>¥{{list[0].promotionPrice}}</text>
									</view>
								</view>
								<view class="viewItem-vip-txt">
									<image src="../../static/bojin/vip1.png"></image>
									<image src="../../static/bojin/vip2.png"></image>
									<image src="../../static/bojin/vip3.png"></image>
									<image src="../../static/bojin/vip4.png"></image>
									<image src="../../static/bojin/vip5.png"></image>
									<view></view>
									<view></view>
									<!-- <text>黑金VIP共享7项权益，术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。</text> -->
								</view>
								<view class="viewItem-vip-bottom">
									<view class="viewItem-vip-inderice">
										此VIP会员服务有效期为365天 到期后系统将自动关闭所有会员权限 为不影响使用，请提前续费
									</view>
									<view class="vip-btn" @click='showFixed = true'>
										<text>{{isMember && memberInfo.memberType == 0 ? '续费' : '立即开通'}}</text>
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
									VIP课程畅听
								</view>
								<view class="item-txt1">
									食艺兽线上音视频VIP课程* 免费畅享
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
									<text>白银VIP</text>
									<view class="viewItem-vip-price">
										<text class='oldprice' v-if='list[0].memberPrice && list[0].discount '>¥{{list[0].memberPrice}}</text>
										<text class='price'>¥{{list[0].promotionPrice}}</text>
									</view>
								</view>
								<view class="viewItem-vip-txt">
									<image src="../../static/baiyin/vip1.png"></image>
									<image src="../../static/baiyin/vip2.png"></image>
									<image src="../../static/baiyin/vip3.png"></image>
									<view></view>
									<view></view>
									<view></view>
									<view></view>
									<!-- <text>黑金VIP共享7项权益，术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。术查市资建务周二非称向给子走选。</text> -->
								</view>
								<view class="viewItem-vip-bottom">
									<view class="viewItem-vip-inderice">
										此VIP会员服务有效期为365天 到期后系统将自动关闭所有会员权限 为不影响使用，请提前续费
									</view>
									<view class="vip-btn" @click='showFixed = true'>
										<text>{{isMember && memberInfo.memberType == 0 ? '续费' : '立即开通'}}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="list">
							<view class="item">
								<view class="item-img">
									<image src="../../static/baiyin/vip2.png"></image>
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
									<image src="../../static/baiyin/vip3.png"></image>
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
									<image src="../../static/baiyin/vip7.png"></image>
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
			<view class="bg" @click='showFixed = false'></view>
			<view class="fixed-bottom">
				<view @click='changeShowFixed'>
				<!-- {{showFixed ? '' : '限时优惠498，'}}立即畅想课程 -->
					<!-- <text>{{memberInfo.memberType}}</text> -->
					<!-- <view v-if='memberInfo'>
						<view v-if='memberInfo.memberType == 0'>
							<text>续费黑金VIP</text>
							即刻畅享
						</view>
						<view v-if='memberInfo.memberType == 1'>
							<text v-if='active == "" || active == 1'>续费铂金VIP</text>
							<text v-else>升级黑金VIP</text>
							即刻畅享
						</view>
						<view v-if='memberInfo.memberType == 2'>
							<text v-if='active == "" || active == 2'>续费白银VIP</text>
							<text v-else>升级黑金VIP</text>
							即刻畅享
						</view>
					</view>
					<view v-else>
						<text v-if='showFixed'>开通会员VIP</text>
						<view v-else>
							<text v-if='active == 0'>购买黑金VIP</text>
							<text v-if='active == 1'>购买铂金VIP</text>
							<text v-if='active == 2'>购买白银VIP</text>
						</view>
						即刻畅享
					</view> -->
				</view>
			</view>
			<view class="openfixed">
				<view class="openfixed-title">
					食艺兽大会员
				</view>
				<view class="openbox">
					<view class="list">
						<view class="item"
							v-for='(item,i) in list'
							:keys='item.id'
							:class='{heijin: item.surfaceId == 0, bojin: item.surfaceId == 1, baiyin: item.surfaceId == 2}'
							@click='active = i'
						>
							 <!-- :class='{active: active == i}' -->
							<view class="img">
								<image class='imgbg' :src="item.surface"></image>
								<image class='righttop' v-if='item.promotionPrice && item.discount' src="../../static/time.png"></image>
							</view>
							<view class="info">
								<view class="title">
									<text>{{item.memberName}}</text>
								</view>
								<view class="img" v-if='i==0'>
									<image src="../../static/heijin/vip1.png"></image>
									<image src="../../static/heijin/vip2.png"></image>
									<image src="../../static/heijin/vip3.png"></image>
									<image src="../../static/heijin/vip4.png"></image>
									<image src="../../static/heijin/vip5.png"></image>
									<image src="../../static/heijin/vip6.png"></image>
									<image src="../../static/heijin/vip7.png"></image>
								</view>
								<view class="img" v-if='i==1'>
									<image src="../../static/bojin/vip1.png"></image>
									<image src="../../static/bojin/vip2.png"></image>
									<image src="../../static/bojin/vip3.png"></image>
									<image src="../../static/bojin/vip4.png"></image>
									<image src="../../static/bojin/vip5.png"></image>
									<view></view>
									<view></view>
								</view>
								<view class="img" v-if='i==2'>
									<image src="../../static/baiyin/vip1.png"></image>
									<image src="../../static/baiyin/vip2.png"></image>
									<image src="../../static/baiyin/vip3.png"></image>
									<view></view>
									<view></view>
									<view></view>
									<view></view>
								</view>
								<view class="price">
									<text class='discount'>¥{{item.promotionPrice}}</text>
									<text class='old-price' style='text-decoration: line-through;' v-if='item.promotionPrice && item.discount'>¥{{item.memberPrice}}</text>
								</view>
							</view>
						</view>					
					</view>
				</view>
				<view class="buchajia" v-if='isChajia'>
					<view class="icon"></view>
					<text>您的剩余时长可以抵扣金额，只需支付123元即可升级！ 升级后会员时长为：2021.12.11 至 2022.12.10</text>
				</view>
				<view class="buy-info" :style='{height: isChajia ? "240rpx" : "320rpx"}'>
					<view class="buy-title">购买说明</view>
					<view class="buy-info-item">
						<view>
							1.您购买的会员服务为线上数字化商品，一经购买不支持退订、转让。
						</view>
						<view>
							 2.自开通之日起365个自然日内为您的服务有效期，期限内您将享受会员等级对应的全部会员权益。
						</view>
						<view>
							3.会员服务到期后系统将自动关闭所有会员权限，但仍会保留您的使用数据，为不影响正常使用，请提前续费。
						</view>
						<view>
							 4.科学、合理使用食艺兽小程序，让它真正替你清除备考综合焦虑。 
						</view>
						<view>
							5.您可通过客服电话 13811219735（微信同号）与我们取得联系，也可在小程序首页点击【我的-意见反馈】提出你的疑问。 
						</view>
						<view>
							6.请详细阅读会员产品说明及购买说明，开通视为已知悉并接受以上内容。
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Navbar from '../../../components/navBar/navbar.vue'
	import { dateFormat, GetRandomNum } from '../../../js/common.js'
	export default {
		data() {
			return {
				showFixed: false,
				list: null,
				active: 0,
				userInfo: null,
				user: null,
				member: null,
				memberInfo: null,
				renew: false,			//是否为升级
			}
		},
		components: {
			Navbar
		},
		async created() {
			this.user = this.Parse.User.current();
			this.userInfo = JSON.parse(JSON.stringify(this.user));
			
			console.log(this.userInfo,'-----');
			
			var query = new this.Parse.Query('MemberType');
			this.list = await query.find();
			this.list = this.list.map(item => JSON.parse(JSON.stringify(item))).sort((a,b)=>a.surfaceId-b.surfaceId);
			
			var time = new Date().toLocaleDateString().split('/').map(item=>item.length==1 ? '0'+item : item).join('-')
			this.list.forEach(item => {
				 if (item.expirationDate >= time) {
					 item.discount = true;
				 } else {
					 item.discount = false;
				 }
			})
			console.log('list', this.list);
			this.getMember();
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
				if (this.memberInfo.memberType && this.memberInfo.memberType != 0 && this.active != 0) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			// 获取是否是会员
			async getMember() {
				var Member = new this.Parse.Query('MemberList')
				Member.equalTo("openId", this.userInfo.openid);
				this.member = await Member.first();
				if (this.member) {
					this.memberInfo = JSON.parse(JSON.stringify(this.member));
					console.log(this.memberInfo);
					this.active = Number(this.memberInfo.memberType);
				}
			},
			// 获取会员截止日期的毫秒数
			getTime(n) {
				var date= new Date();
				var month = date.getMonth() + 1;
				date.setMonth(month + Number(n) - 1)
				return date.getTime()
			},
			changeShowFixed() {
				if (!this.showFixed) {
					this.showFixed = true;
					return ;
				}
				// 此步骤是在续费
				// console.log(this.isMember, '----');
				if (this.isMember) {
					if (this.active == "") {
						this.active = Number(this.memberInfo.memberType);
					}
					var memberType = this.memberInfo.memberType;	// 之前购买的会员类型
					var surfaceId = this.list[this.active].surfaceId ;	// 现在购买的会员类型
					console.log(memberType, surfaceId);
					
					if (memberType == 0) {
						this.active = 0;
					}
					if (memberType == 1) {
						this
					}
					if (memberType == 2) {
						
					}
					return
					if (surfaceId != memberType) {
						
						// 之前购买了白银，却续费白金
						// if (memberType == '2' && surfaceId == 1) {
						// 	uni.showModal({
						// 		content:'只能续费白银或升级为黑金',
						// 		showCancel: false,
						// 	})
						// 	return ;
						// }
						// // 之前购买了白金，却续费白银
						// if (memberType == '1' && surfaceId == 2) {
						// 	uni.showModal({
						// 		content:'只能续费白金或升级为黑金',
						// 		showCancel: false,
						// 	})
						// 	return ;
						// }
						// // 之前购买了黑金，现在买的却不是黑金
						// if (memberType == '0' && surfaceId != 0) {
						// 	uni.showModal({
						// 		content:'只能续费黑金',
						// 		showCancel: false,
						// 	})
						// 	return ;
						// }
						// // 之前购买了白金或白银，升级为黑金时
						// if (surfaceId == '0' && memberType != 0) {
						// 	uni.showModal({
						// 		content:'继续操作将自动升级为黑金卡',
						// 		success: (res) => {
						// 			if (res.confirm) {
						// 				this.renew = true;
						// 				this.payment()
						// 			}
						// 		}
						// 	})
						// 	return ;
						// }
					} else {
						uni.showModal({
							title: '提示',
							content: `确定购买${this.list[this.active].memberName}吗？`,
							success: (res) => {
								if (res.confirm) {
									this.payment()
								}
							}
						})
					}
				} else {
					uni.showModal({
						title: '提示',
						content: `确定购买${this.list[this.active].memberName}吗？`,
						success: (res) => {
							if (res.confirm) {
								this.payment()
							}
						}
					})
				}
			},
			// 支付
			payment() {
				// this.user = this.Parse.User.current()
				// 补价算法，使用了n天，（黑金会员价-白金会员价）/365 * （365-n）=差价
				// return ;
				var cash = this.list[this.active].promotionPrice || this.list[this.active].memberPrice;
				// 升级为黑金
				if (this.renew) {
					var time = Math.ceil((this.memberInfo.endTime - Date.now())/(1000*60*60*24));
					var n1 = this.list[0].promotionPrice || this.list[0].memberPrice;
					var n2 = this.list[this.active].promotionPrice || this.list[this.active].memberPrice;
					cash = (n1 - n2)/365*(365-time) * 100;
				}
				cash = 0;
				if(cash == 0){
					var orderNo = dateFormat(new Date(), 'yyyyMMddHHmmss')+GetRandomNum(5);
					this.paymentSuccess(orderNo);
				} else {
					this.Parse.Cloud.run('initiatePayment',
						{price: cash,},
						{sessionToken: this.user.get('sessToken')}).then(res=>{
						var payload = res.payload
						var tradeId = res.tradeId
						uni.requestPayment({
							appId: payload.appId,
							timeStamp: payload.timeStamp,
							nonceStr: payload.nonceStr,
							package: payload.package,
							signType: payload.signType,
							paySign: payload.paySign,
							success (res) {
								this.paymentFail(tradeId);
							},
							fail (res) {
								this.paymentSuccess();
							}
						})
					})
				}
				
			},
			// 支付成功
			async paymentSuccess(tradeId) {
				await this.getIntegral();
				this.createOrder(tradeId);
				this.createMember(tradeId);
			},
			// 支付失败
			paymentFail() {
				
			},
			// 获取积分与赠送积分
			async getIntegral() {				
				await this.Parse.Config.get().then(async config=>{
					var n = this.list[this.active].promotionPrice || this.list[this.active].memberPrice;
					this.userInfo.score = (this.userInfo.score || 0) + parseInt(n * config.attributes.shopScore);
					this.user.set('score', this.userInfo.score);
					this.user.set('score_all', this.userInfo.score);
					this.user.save();
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
				order.set("subjectId",  item.objectId)
				order.set("subjectName",  item.memberName)
				order.set("price",  item.promotionPrice || item.memberPrice)
				order.set("cash",  item.promotionPrice || item.memberPrice)
				order.set('couponAmount', 0)
				order.set('scoreAmount', this.userInfo.score)
				order.set('couponId', '')
				order.set("openId", this.userInfo.openid)
				order.set("state", 1)
				order.set("wechatPayOrderId", '') // 支付流水号
				order.save().then(_order => {
					uni.showModal({
						content:'恭喜，购买成功',
						showCancel: false,
						success(){
							_this.showFixed = false;
						}
					})
				},(error)=>{
					uni.showModal({
						content:'购买失败',
						showCancel: false
					})
				})
			},
			// 创建会员
			async createMember(tradeId) {
				var item = this.list[this.active];
				var memberType = item.surfaceId + '';
				if (this.member) {
					var arr = this.memberInfo.orderArr;
					arr.push(tradeId);
					this.member.set('orderArr', arr);
					if (this.renew) {
						this.member.set('memberType', '0');
					} else {
						if (this.memberInfo.memberType = '') {
							this.member.set('endTime', this.getTime(12))
						} else {
							this.member.set('endTime', this.getTime(12) + Number(this.memberInfo.endTime) - Date.now() )
						}
					}
					await this.member.save();
				} else {
					// 初次创建
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set('orderArr', [tradeId]);
					member.set('endTime', this.getTime(12))
					member.set('memberType', memberType)
					await member.save();
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
			// 原先的创建会员
			async createMember11(tradeId) {
				var item = this.list[this.active];
				var query = new this.Parse.Query('MemberList');
				query.equalTo("openId", this.userInfo.openid);
				var results = await query.first();
				var res = null;
				if (results) {
					res = JSON.parse(JSON.stringify(results));
				}
				var time = Date.now();
				var endTime = '';		// 截止日期
				var permanent = false;		// 是否永久
				var orderArr = [];		// 购买编号
				var memberType = 'whiteSilver';		//确认购买的是那种会员
				
				if (item.surfaceId == 2) {
					memberType = 'blockGold';
				}
				if (item.surfaceId == 1) {
					memberType = 'whiteGold';
				}
				
				switch(item.memberPeriod) {
					case 'threeWeek':
						endTime = time + (1000*60*60*24*21)
						break;
					case 'twoWeek':
						endTime = time + (1000*60*60*24*14)
						break;
					case 'oneWeek':
						endTime = time + (1000*60*60*24*7)
						break;
					case 'perpetual':
						permanent = true;
					default:
						endTime = this.getTime(item.memberPeriod)
				}

				if (!results) {
					// 初次创建
					var Member = this.Parse.Object.extend("MemberList");
					var member = new Member();
					member.set("openId", this.userInfo.openid);
					member.set('orderArr', [tradeId]);
					member.set(memberType, {
						endTime,
						vip: true,
						permanent
					});
					member.save()
				} else {
					console.log(res);
					var obj = res[memberType];
					var arr = res.orderArr
					if (obj) {
						obj.endTime = obj.endTime - time + endTime;
						obj.permanent = permanent;
					} else {
						obj = {
							endTime,
							vip: true,
							permanent
						}
					}
					arr.push(tradeId);
					results.set(memberType, obj);
					results.set('orderArr', arr);
					results.save();
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
		top: 174rpx;
		.vip-btn {
			width: 144rpx;
			height: 48rpx;
			line-height: 46rpx;
			text-align: center;
			border-radius: 24rpx;
			border: 1px solid rgba(255, 205, 131, 1);
			color: rgba(255, 205, 131, 1);
			font-size: 20rpx;
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
				height: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 28rpx 48rpx 0 30rpx;
				color: #995D05;
				font-weight: 500;
				.vipuser {
					font-size: 28rpx;
					line-height: 40rpx;
					&::before {
						content: '';
						display: inline-block;
						width: 10rpx;
						height: 24rpx;
						background: #995D05;
						border-radius: 2px;
						margin-right: 8rpx;
					}
				}
				.tel {
					font-size: 16rpx;
					line-height: 22rpx;
				}
			}
			.viewItem {
				padding: 48rpx 40rpx;
				&.heijin {
					color: rgba(196, 150, 108, 0.7);
					.vip-btn {
						color: rgba(196, 150, 108, 0.7);
						border-color: rgba(196, 150, 108, 0.7);
					}
					.viewItem-vip-titel, .item-title {
						color: rgba(196, 150, 108, 1);
					}
				}
				&.bojin {
					color: rgba(188, 145, 76, 0.7);
					.vip-btn {
						color: rgba(188, 145, 76, 0.7);
						border-color: rgba(188, 145, 76, 0.7);
					}
					.viewItem-vip-titel, .item-title {
						color: rgba(188, 145, 76, 1);
					}
				}
				&.baiyin {
					color: rgba(0, 0, 0, 0.6);
					.vip-btn {
						color: rgba(0, 0, 0, 0.6);
						border-color: rgba(0, 0, 0, 0.6);
					}
					.viewItem-vip-titel, .item-title {
						color: rgba(0, 0, 0, 1);
					}
				}
				.viewItem-vip {
					position: relative;
					width: 670rpx;
					height: 390rpx;
					.viewItem-vip-info {
						padding: 52rpx 52rpx 40rpx;
						position: relative;
						z-index: 100;
						.viewItem-vip-titel {
							font-size: 40rpx;
							font-weight: 500;
							height: 66rpx;
							line-height: 66rpx;
							display: flex;
							justify-content: space-between;
							padding-right: 4rpx;
							.viewItem-vip-price {
								font-weight: 500;
								.price {
									font-size: 48rpx;
									line-height: 66rpx;
								}
								.oldprice {
									margin-right: 48rpx;
									font-size: 32rpx;
									line-height: 44rpx;
									text-decoration: line-through;
								}
							}
						}
						.viewItem-vip-txt {
							// font-size: 20rpx;
							// font-weight: 400;
							// line-height: 28rpx;
							// margin-top: 16rpx;
							margin-top: 64rpx;
							display: flex;
							justify-content: space-between;
							image, view {
								width: 48rpx;
								height: 48rpx;
							}
						}
						.viewItem-vip-bottom {
							margin-top: 76rpx;
							display: flex;
							align-items: center;
							justify-content: space-between;
							.viewItem-vip-inderice {
								width: 256rpx;
								font-size: 14rpx;
								font-family: PingFangSC-Regular, PingFang SC;
								font-weight: 400;
								// color: #C4966C;
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
						}
					}
				}
			}
		}
		.br {
			width: 100%;
			height: 12rpx;
			background: rgba(0, 0, 0, 0.05);
			box-shadow: 0 0 6rpx 0 rgba(0,0,0,.1);
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
			background: rgba(0,0,0,0.6);
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
			font-weight: 500;
			color: #995D05;
			line-height: 44rpx;
			view {
				height: 80rpx;
				width: 690rpx;
				border-radius: 40rpx;
				margin: 10rpx auto 0;
				background: linear-gradient(90deg, #efdec3, #e3c89a);
				text-align: center;
				line-height: 80rpx;
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
				font-weight: 500;
				color: #995D05;
				line-height: 44rpx;
			}
			.openbox {
				width: 100%;
				height: 320rpx;
				overflow: hidden;
				.list {
					width: 100%;
					height: 340rpx;
					overflow-x: auto;
					white-space: nowrap;
					.item {
						display: inline-block;
						border-radius: 20rpx;
						height: 320rpx;
						width: 550rpx;
						padding: 48rpx;
						margin-right: 20rpx;
						position: relative;
						&:first-child {
							margin-left: 100rpx;
						}
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
							box-shadow: 0 0 10rpx 8rpx rgba(0,0,0,.3) inset;
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
								margin-top: 102rpx;
								.discount {
									font-size: 48rpx;
									font-weight: 500;
									line-height: 66rpx;
								}
								.old-price {
									font-size: 32rpx;
									font-weight: 500;
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
				background: #f7efe1;
				border: 2rpx solid rgba(153, 93, 5, 0.46);
				border-radius: 10rpx;
				padding: 10rpx 24rpx 0;
				position: relative;
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
				font-weight: 400;
				color: #995D05;
				line-height: 30rpx;
				padding: 0 100rpx;
				.buy-title {
					font-size: 24rpx;
					font-weight: 500;
					line-height: 30rpx;
					margin-bottom: 24rpx;
				}
				.buy-info-item {
					margin-top: 30rpx;
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

