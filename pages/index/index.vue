<template>
	<view class="myPage"
		:style="{'height':height+'px','overflow-y': isShowTips ? 'auto' : 'scroll','padding-bottom':pdbtm+'rpx'}">
		<!--轮播 start-->
		<Navbar :icon="false" title="食艺兽" height="514rpx" navbarBg="#fff" :fontColor="fontColor" :fontSize="34"
			titleLeft="62rpx">
			<template v-slot:img>
				<view class="page-section">
					<view class="page-section-spacing">
						<swiper class="swiper" :autoplay="true" indicator-dots indicator-color="#ffffff"
							indicator-active-color="#ED3535" circular>
							<swiper-item v-for="item in banners" @click="handleBannerClick" :data-item="item">
								<view class="swiperItem">
									<image :src="item.img"></image>
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</template>
			<template v-slot:other>
				<!--导航 start-->
				<view class="navSection">
					<view class="innerSection">
							<view class="nav-box">
							<view class="navItem" @click="handleAuditionClick">
								<view class="img">
									<image src="../../static/icon/icon_kcst.png"></image>
								</view>
								<view class="title">免费试听</view>
							</view>
							<view class="navItem" @click="handleImportantClick">
								<view class="img">
									<image src="../../static/icon/icon_question.png"></image>
								</view>
								<view class="title">必考题库</view>
							</view>
							<view class="navItem" @click="handleExamClick">
								<view class="img">
									<image src="../../static/icon/icon_test.png"></image>
									<!-- <text class="badge">12待添加数字</text> -->
								</view>
								<view class="title">模拟试卷</view>
							</view>
							<view class="navItem" @click="handleNoteClick">
								<view class="img">
									<image src="../../static/icon/icon_errorques.png"></image>
								</view>
								<view class="title">错题集</view>
							</view>
						</view>
						<!-- <view class="line"></view> -->
						<view class="nav-box">
							<view class="navItem" @click="handleSubjectClick" :data-item="item"
								v-for="(item,index) in subjects" :key='item.id'>
								<view class="img">
									<image :src="item.backgroundImg"></image>
								</view>
								<view class="title">{{item.subject_name}}</view>
							</view>
						</view>
					</view>
				</view>

				<audition-learning v-if="studyList.length" title="正在学习" :showMore="showLearningMore"
					:list="studyList.slice(0,2)" @learnChangeUrl="learnChangeUrl" @learnCheckMore="learnCheckMore">
				</audition-learning>
				<view class="h-line" v-if="studyList.length"></view>
				<audition :title="item.name" :list="item.list.slice(0,item.showAmount)"
					:showMore="item.list.length>item.showAmount" v-for="(item,index) in moduleList" :key="index"
					@changeUrl="changeUrl" @checkMore="checkMore"></audition>
				<!--精品推荐 start-->
				<!-- <view class="groupView" style="margin-top: 24rpx;">
					<view class="headView">
						<view class="title">推荐</view>
					</view>
					<view class="newsView">
						<view class="newsItem" v-for="item in recommends" @click="handleToOtherMiniApp"
							:data-item="item">
							<view class="imgView">
								<image :src="item.headImg"></image>
							</view>
							<view class="conView">
								<view class="title">{{item.title}}</view>
								<view class="content"></view>
							</view>
						</view>
					</view>
				</view> -->
				<!--精品推荐 end-->
				<!--购买重点题库 start-->
				<u-popup v-model="isShowImportBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
					<view class="buylView" style="padding:74rpx 40rpx;">
						<view class="title">{{zdtkConfig.action}}</view>
						<view class="price">¥{{zdtkConfig.price}}</view>
						<view class="tips">
							您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
						</view>
						<view class="tips">
							购买后可在【个人中心-已购项目】中查看
						</view>
						<view class="btnActions">
							<button @click="handleBuyZDTKClick">确认购买</button>
						</view>
					</view>
				</u-popup>
				<!--购买重点题库 end-->

				<!--购买重点题库 start-->
				<u-popup v-model="isShowTestBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
					<view class="buylView" style="padding:74rpx 40rpx;">
						<view class="title">{{mnksConfig.action}}</view>
						<view class="price">¥{{mnksConfig.price}}</view>
						<view class="tips">
							您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
						</view>
						<view class="tips">
							购买后可在【个人中心-已购项目】中查看
						</view>
						<view class="btnActions">
							<button @click="handleBuyMNKSClick">确认购买</button>
						</view>
					</view>
				</u-popup>
				<!--购买重点题库 end-->
				
				
			</template>

		</Navbar>
        <login :visiable="isShowLogin" @cancle="isShowLogin=false" @ok="handleLoginComplate" :to="toUrl"></login>
		<!--轮播 end-->
		<!-- <u-mask :custom-style="{'background': 'rgba(0, 0, 0, 0.7)'}" :show="isShowTips" :mask-click-able="true"
			:zoom="false" @click="handleStep"> -->
		<view class='mask'  @click="handleStep" v-if='isShowTips'>
			<view v-if="step==1" class="step bottom">
				<view class="navItem" style="right:4rpx">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask1.png" :style="{bottom:tabbarPdBtm?'0rpx':'-26rpx'}"></image>
				</view>
			</view>
			<view v-if="step==2" class="step bottom" style="left:4rpx">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask2.png" :style="{bottom:tabbarPdBtm?'0rpx':'-26rpx'}"></image>
				</view>
			</view>
			<view v-if="step==3" class="step top">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask3.png"></image>
				</view>
			</view>
			<view v-if="step==4" class="step top">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask4.png"></image>
				</view>
			</view>
			<view v-if="step==5" class="step top">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask5.png"></image>
				</view>
			</view>
			<view v-if="step==6" class="step top">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask6.png"></image>
				</view>
			</view>
			<view v-if="step==7" class="step top">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask7.png"></image>
				</view>
			</view>
			<view v-if="step==8" class="step top">
				<view class="navItem">
					<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask8.png"></image>
				</view>
			</view>
		<!-- </u-mask> -->
		</view>
		<view-tabbar :current="0" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Utils from '@/js/utils/index.js'
	import Navbar from '@/components/navBar/navBarIndex.vue'
	import Tabbar from '@/components/tabBar/tabBar.vue'
	import login from '../../components/login/login.vue'
	import audition from '@/components/audition/audition.vue'
	import auditionLearning from '@/components/audition/auditionLearning.vue'
	import Curriculum from '@/js/utils/curriculum.js'
	export default {
		components: {
			login,
			'view-tabbar': Tabbar,
			audition,
			auditionLearning,
			Navbar
		},
		data() {
			return {
				tabbarPdBtm:0,
				showLearningMore:false,
				relationId: '',
				fontColor: 'rgb(255,255,255)',
				pdbtm: 0, //兼容iphonexr+
				openid: '',
				userInfo: {},
				isShowLogin: false,
				isShowTips: false,
				step: 1,
				toUrl: '',
				toAction: '',
				isShowImportBuy: false,
				isShowTestBuy: false,
				title: 'Hello',
				subjects: [],
				banners: [], // 轮播图
				recommends: [], // 推荐
				actionConfig: {},
				zdtkConfig: {}, // 重点题库配置
				mnksConfig: {}, // 模拟考试配置
				hasBuyedZDTK: false, // 是否购买了重点题库
				hasBuyedMNKS: false, // 是否购买了模拟考试
				windowHeight: 0,
				msgCount: 0,
				couponCount: 0,
				studyList: [],
				moduleList: [], //动态模块
				height: 0
			}
		},
		mounted() {
			var _this = this;
			uni.getSystemInfo({
				success(res) {
					_this.height = res.windowHeight;
				}
			})
			
		},
		async onShow() {
			uni.hideTabBar({
				animation: false
			});
			let res = await Utils.getcount();
			if (res) {
				this.userInfo = res.userInfo;
				this.msgCount = res.msgCount;
				this.couponCount = res.couponCount;
				// //获取本地正在学习的课程
				this.getLearning();
				var app = getApp();
				var member = app.globalData.member;
				// 判断是不是会员
				if (member) {
					if (member.memberType != 2) {
						if (member.endTime > Date.now()) {
							this.vip = true;
						} else {
							var query = new this.Parse.Query('MemberList');
							var user1 = JSON.parse(JSON.stringify(user));
							query.equalTo("openId", user1.openid);
							var results = await query.first();
							results.set('memberType', '');
							results.save();
						}
					}
				} else {
					await this.getMember();
				}

			}
			this.bindConfig();
			//获取所有的模块
			this.getModules();
			// this.getLearning()
		},
		onLoad() {
			var self = this
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm = 116 + app.globalData.paddingBottomHeight;
			this.tabbarPdBtm = app.globalData.paddingBottomHeight;
			uni.getStorage({
				key: 'hasHomeTiped',
				success: (res) => {
					self.isShowTips = res.data ? false : true
				},
				fail() {
					self.isShowTips = true
				}
			})
			const Subjects = this.Parse.Object.extend("Subjects")
			const query = new this.Parse.Query('Subjects')

			query.ascending("createdAt")
			query.equalTo("parent_ID", "0")
			query.find().then(list => {
				self.subjects = list
			})

    //          uni.loadFontFace ({
				//   family: 'PingFangSC-Medium',
				//   source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
				//   // source: 'url("https://www.arteater.cn/PingFang.ttc")',
				//   success: function(){
				// 	  console.log('load font success')
				//   }
				// })
			var bannerQuery = new this.Parse.Query('Banner')
			bannerQuery.equalTo('state', 1)
			bannerQuery.ascending('sort')
			bannerQuery.find().then(banners => {
				self.banners = banners
			})
			var recommendQuery = new this.Parse.Query('Recommend')
			recommendQuery.descending('createdAt')
			recommendQuery.find().then(recommends => {
				self.recommends = recommends
			})
		},
		methods: {
			async getMember() {
				var r = uni.getStorageSync('userInfo');
				if (!r) {
					return
				}
				var app = getApp();
				var user = await this.Parse.User.current();
				var query = new this.Parse.Query('MemberList');
				var user1 = JSON.parse(JSON.stringify(user));
				query.equalTo("openId", user1.openid);
				var results = await query.first();
				if (results) {
					var r = JSON.parse(JSON.stringify(results));
					app.globalData.member = r;
					if (r.memberType != 2) {
						if (r.endTime > Date.now()) {
							this.vip = true;
						} else {
							results.set('memberType', '');
							results.save();
						}
					}
				}
			},
			async checkVip() {
				await this.getMember();
				let app = getApp();
				let member = app.globalData.member;
				let vip = false;
				if (member && member.memberType != 2 && (member.endTime > Date.now())) {
					vip = true;
				}
				return vip;
			},
			// 正在学习的item被点击时
			async learnChangeUrl(item) {
				let vip = await this.checkVip();
				//配置url
				let toUrl = await Curriculum.configUrl({course: item}, vip);
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: toUrl
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} 
			},
			async changeUrl(item) {
				let vip = await this.checkVip();
				//配置url
				let toUrl = await Curriculum.configUrl(item, vip);
				
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						// 记录点击量
						await Curriculum.recordClickNum(item.objectId);
						uni.navigateTo({
							url: toUrl
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toAction = "clickNum";
					this.relationId = item.objectId;
					this.toUrl = toUrl;
				}
			},
			// 正在学习
			async learnCheckMore(params) {
				// uni.navigateTo({
				// 	url: '/homeSubPackage/pages/curriculumList/curriculumList?&moduleName=' + params.moduleName
				// })

				// })
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/curriculumList/curriculumList?&moduleName=' + params.moduleName
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/curriculumList/curriculumList?objId=' + params.objectId +
						'&moduleName=' + params.moduleName;
				}
			},
			async checkMore(params) {
				// var r = uni.getStorageSync('userInfo');
				// if (!r) {
				// 	this.isShowLogin = true;
				// }
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/curriculumList/curriculumList?objId=' + params
								.objectId + '&moduleName=' + params.moduleName
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/curriculumList/curriculumList?objId=' + params.objectId +
						'&moduleName=' + params.moduleName;
				}
			},
			// Tab	
			tabbarChange(item) {
				if (item.text == '我的') {
					this.handleMyClick();
				} else if (item.text == '课程') {
					this.handleCurriculumClick();
				} else if (item.text == '题库') {
					this.handleQuestionBankClick();
				}
			},
			/*加载配置*/
			bindConfig() {
				var self = this
				const query1 = new this.Parse.Query('ActionConfig')
				query1.ascending("createdAt")
				query1.find().then(configList => {
					var app = getApp()
					app.globalData.zdtkConfig = configList.find(t => {
						return t.get('code') == 'zhongdiantiku'
					})
					app.globalData.mnksConfig = configList.find(t => {
						return t.get('code') == 'monishiti'
					})
					app.globalData.dajxConfig = configList.find(t => {
						return t.get('code') == 'daanjiexi'
					})
					self.zdtkConfig = app.globalData.zdtkConfig
					self.mnksConfig = app.globalData.mnksConfig
					self.bindOrder()
				})
			},
			//正在学习
			async getLearning() {
				let res = await Curriculum.getLearning();
				// console.log(res, 4567865)
				this.studyList = res;
				this.$nextTick(()=>{
					if(this.studyList.length>2){
						this.showLearningMore=true;
					}else{
						this.showLearningMore=false;
					}
				})
			},
			//获取模块
			async getModules() {
				let res = await Curriculum.getModule();
				console.log(JSON.parse(JSON.stringify(res)), 89989999)
				this.moduleList = res;
			},
			/* 登录完成 */
			handleLoginComplate() {
				console.log(11111111000000);
				var self = this
				this.isShowLogin = false
				uni.getStorage({
					key: 'userInfo',
					success: res => {
						self.userInfo = res.data
						// debugger
						if (self.toAction == 'exam') { // 模拟考试
							self.handleExamClick()
						}
						if (self.toAction == 'important') { // 重点题库
							self.handleImportantClick()
						}
						if (self.toAction == 'clickNum') {
							Curriculum.recordClickNum(this.relationId);
						}
					},
				})
			},
			bindOrder() {
				var self = this
				const query2 = new self.Parse.Query("Order")
				query2.equalTo('openId', self.userInfo.openid)
				query2.equalTo('state', 1)
				query2.ascending("createdAt")
				query2.find().then(orderList => {
					let zdtkOrder = orderList.find(t => {
						return t.get('subjectId').indexOf(self.zdtkConfig.id) != -1
					})
					self.hasBuyedZDTK = zdtkOrder ? true : false
					let mnksOrder = orderList.find(t => {
						return t.get('subjectId') == self.mnksConfig.id
					})
					self.hasBuyedMNKS = mnksOrder ? true : false
				})
			},
			/*错题集*/
			handleNoteClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/error/index'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/error/index'
				}
			},
			/*重点题库*/
			handleImportantClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) { // 已绑定手机号
						if (this.zdtkConfig.get('isNeedPay') == 1 && !this.hasBuyedZDTK) { // 需要购买，但是没买
							// this.isShowImportBuy = true
							uni.navigateTo({
								url: '/pages/buy/buy?subjectId=' + this.zdtkConfig.id,
								event: {
									reloadOrder: function(data) {
										self.bindOrder()
									}
								}
							})
						} else {
							uni.navigateTo({
								url: '../important/index'
							})
						}
					} else { // 未绑定手机号，跳转至绑定页
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toAction = 'important'
				}
			},
			/*考试*/
			handleExamClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						if (this.mnksConfig.get('isNeedPay') == 1 && !this.hasBuyedMNKS) { // 需要购买，但是没买
							// this.isShowTestBuy = true
							uni.navigateTo({
								url: '/pages/buy/buy?subjectId=' + this.mnksConfig.id,
								event: {
									reloadOrder: function(data) {
										self.bindOrder()
									}
								}
							})
						} else {
							uni.navigateTo({
								url: '../exam/index'
							})
						}
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toAction = 'exam'
				}
			},
			// 点击免费试听
			handleAuditionClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/curriculumList/curriculumList?moduleName=免费试听'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/curriculumList/curriculumList?moduleName=免费试听'
				}
			},
			/*课程Tab*/
			handleCurriculumClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.switchTab({
							url: '/pages/curriculum/curriculum'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/curriculum/curriculum'
				}
			},
			/*题库*/
			handleQuestionBankClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.switchTab({
							url: '/pages/questionBank/questionBank'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/questionBank/questionBank'
				}
			},
			/* 点击“我” */
			handleMyClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.switchTab({
							url: '../mine/mine'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/mine/mine'
				}
			},
			/*点击科目*/
			handleSubjectClick(e) {
				var item = e.currentTarget.dataset.item
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/subject/subject?sid=' + item.objectId
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/subject/subject?sid=' + item.objectId
				}
			},
			/*点击推荐*/
			handleToOtherMiniApp(e) {
				var _item = e.currentTarget.dataset.item
				this.Parse.Config.get().then(config => {
					let isShowVideo = config.get('isShowVideo')
					if (isShowVideo) {
						// if(false) {
						if (this.userInfo && this.userInfo.openid) {
							uni.navigateTo({
								url: '/pages/course/course?rid=' + _item.objectId
							})
						} else {
							this.isShowLogin = true
							this.toUrl = '/pages/course/course?rid=' + _item.objectId
						}
					} else {
						if (_item.href.indexOf('http') == 0) {
							uni.navigateTo({
								url: './news?url=' + _item.href
							})
						} else if (_item.href.indexOf('/pages') == 0) {
							uni.navigateTo({
								url: _item.href
							})
						}

					}
				})
			},
			handleStep() {
				this.step += 1
				if (this.step > 8) {
					uni.setStorage({
						key: 'hasHomeTiped',
						data: true
					})
					this.isShowTips = false
				}
			},
			/*点击banner图*/
			handleBannerClick(e) {
				var _item = e.currentTarget.dataset.item
				if (_item.src) {
					if (_item.src.indexOf('http') == 0) {
						uni.navigateTo({
							url: './news?url=' + _item.src
						})
					} else if (_item.src.indexOf('/pages') == 0) {
						uni.navigateTo({
							url: _item.src
						})
						console.log('2' + _item.src)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		overflow: hidden;
	}

	.myPage {
		background-color: #F7F7F7;
	}

	.swiper {
		height: 514rpx;
		line-height: 36rpx;
		text-align: center;
	}

	.swiperItem {
		vertical-align: middle;
	}

	.swiperItem image {
		width: 750rpx;
		height: 514rpx;
		background-color: #ffcec9;
		box-shadow: 0rpx 8rpx 22rpx 0rpx rgba(180, 102, 102, 0.24);
	}

	.navSection {
		
		background: url(../../static/home_questions_bg.png) no-repeat;
		background-size: cover;
		margin: 0 auto;
		height: 364rpx;
		position: relative;
		top: -30rpx;
		margin-bottom: -30rpx;
		.innerSection{
			display: flex;
			width: 690rpx;
			margin: auto;
		}
		.nav-box {
			width: 50%;
			height: 364rpx;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-around;
			.navItem {
				// flex: 1;
				width: 50%;
				height: 182rpx;
				text-align: center;
			}

			.navItem:nth-of-type(1),
			.navItem:nth-of-type(2) {
				padding-top: 42rpx;
			}

			.navItem:nth-of-type(3),
			.navItem:nth-of-type(4) {
				padding-top: 12rpx;
			}
		}
		.nav-box::after {
			content: "";
			flex-grow: 4;
		}
	}

	.h-line {
		width: 750rpx;
		height: 12rpx;
		background: rgba(0, 0, 0, 0.05);
		box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.08) inset;
	}

	.navSection .navItem .img {
		width: 92rpx;
		height: 92rpx;
		display: block;
		text-align: center;
		margin: 0rpx auto 6rpx auto;
		position: relative;
	}

	.navSection .navItem .badge {
		min-width: 20rpx;
		background: linear-gradient(180deg, #D81E1F 0%, rgba(238, 64, 66, 0.31) 100%);
		border-radius: 100rpx;
		min-height: 20rpx;
		font-size: 16rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 22rpx;
		position: absolute;
		padding: 2rpx 8rpx;
		left: 70rpx;
		top: 2rpx;
	}

	.navSection .navItem .img image {
		width: 92rpx;
		height: 92rpx;
	}

	.navSection .navItem .title {
		height: 32rpx;
		line-height: 32rpx;
		display: inline-block;
		text-align: center;
		font-size: 22rpx;
		font-weight: 600;
		color: #352026;
		display: block;
		margin: auto;
		font-family: PingFangSC-Medium, PingFang SC;
	}

	.groupView {
		/* width: calc(100% - 40rpx); */
		/* padding: 30rpx; */
		/* margin-top: 6rpx; */
	}

	.groupView .headView {
		display: flex;
		padding: 0 40rpx;
	}

	.groupView .headView .title {
		flex: 1;
		font-size: 38rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
		font-weight: bold;
	}

	.groupView .subjectView {
		width: 100%;
		/* padding: 20rpx 0; */
		padding-top: 40rpx;
	}

	.groupView .subjectView .subjectItem {
		display: inline-block;
		width: 354rpx;
		height: 172rpx;
		text-align: center;
		border-radius: 64rpx;
		position: relative;
	}

	.groupView .subjectView .subjectItem:nth-child(2n-1) {
		margin-left: 30rpx;
	}

	.groupView .subjectView .subjectItem image {
		width: 336rpx;
		height: 152rpx;
		border-radius: 64rpx;
		position: absolute;
		left: 0;
	}

	.groupView .subjectView .subjectItem:nth-child(1) image {
		background-image: linear-gradient(0deg,
				#ce203d 0%,
				#e02222 4%,
				#da3c4b 38%,
				#da3c4b 92%,
				#d95457 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(230, 58, 76, 0.19);
	}

	.groupView .subjectView .subjectItem:nth-child(2) image {
		background-image: linear-gradient(0deg,
				#e06121 0%,
				#dd884f 5%,
				#dd6a46 35%,
				#e16840 92%,
				#df662e 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(229, 201, 184, 0.34);
	}

	.groupView .subjectView .subjectItem:nth-child(3) image {
		background-image: linear-gradient(0deg,
				#ddbe39 0%,
				#d6d265 4%,
				#e6bf3d 38%,
				#ffb659 92%,
				#f9bc54 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(236, 174, 63, 0.15);
	}

	.groupView .subjectView .subjectItem:nth-child(4) image {
		background-image: linear-gradient(0deg,
				#4287a3 0%,
				#619bbd 4%,
				#53afb4 38%,
				#46999a 92%,
				#46899a 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx rgba(173, 194, 199, 0.28),
			0rpx 8rpx 16rpx 0rpx rgba(173, 194, 199, 0.28);
	}

	.groupView .subjectView .subjectItem .progress {
		position: absolute;
		top: 145rpx;
		width: 100%;
	}

	.groupView .subjectView .subjectItem .txt {
		width: 336rpx;
		height: 152rpx;
		line-height: 152rpx;
		display: inline-block;
		z-index: 11;
		position: absolute;
		left: 0;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		color: #ffffff;
		/* font-weight: bold; */
	}

	.groupView .subjectView .subjectItem:nth-child(n+2) {
		/* margin-top: 12rpx; */
	}

	.newsView {
		padding: 0 30rpx;
	}

	.newsView .newsItem {
		/* background-color: #ffffff; */
		border-radius: 30rpx;
		margin: 18rpx 0;
		display: flex;
		width: 690rpx;
		height: 214rpx;
		padding: 25rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 16rpx 44rpx 0rpx rgba(226, 171, 166, 0.21);
		border-radius: 40rpx;
	}

	.newsView .newsItem .imgView {
		width: 208rpx;
		height: 164rpx;
		line-height: 164rpx;
		text-align: center;
	}

	.newsView .newsItem .imgView image {
		width: 208rpx;
		height: 164rpx;
		margin: auto;
		display: inline-block;
		vertical-align: middle;
		border-radius: 10rpx;
	}

	.newsView .newsItem .conView {
		flex: 1;
		padding: 10rpx 0 0 25rpx;
	}

	.newsView .newsItem .conView .title {
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		color: #352026;
		font-weight: bold;
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
	}

	.newsView .newsItem .conView .content {
		font-family: PingFangSC-Medium;
		font-size: 30rpx;
		color: #352026;
	}

	.buylView {
		width: 100%;
	}

	.buylView .title {
		font-size: 38rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #352026;
	}

	.buylView .price {
		font-size: 34rpx;
		margin-top: 12rpx;
		font-family: PingFangSC-Medium;
		color: #ed3535;
	}

	.buylView .tips {
		font-size: 26rpx;
		margin-top: 54rpx;
		font-family: PingFangSC-Medium;
		color: rgba(53, 32, 38, 0.4);
	}

	.buylView .btnActions {
		margin-top: 96rpx;
	}

	.buylView .btnActions button {
		width: 100%;
		height: 92rpx;
		border-radius: 46rpx;
		background-color: #ED3535;
		color: #ffffff;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0,0,0,0.7);
		z-index: 99;
	}
	.step {
		position: absolute;
		top: 0;
		bottom: 0;
		z-index: 9999;
	}
	.step .navItem {
		flex: 1;
		width: 100%;
		height: 100vh;
		position: relative;
		z-index: 1999;
	}


	.step .navItem image {
		width: 750rpx;
		height: 368rpx;
		position: absolute;
	}

	// .bottom image {
	// 	top: calc(100vh - 368rpx + 10rpx);
	// }

	.top image {
		top: 480rpx;
	}


	.u-badge-dot {
		border-radius: 50% !important;
	}

	.u-badge {
		min-width: 32rpx;
		min-height: 32rpx;
	}
</style>
