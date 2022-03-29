<template>
	<view class="">


		<view class="myPage"
			:style="{'height':height+'px','overflow-y': isShowTips ? 'auto' : 'scroll','padding-bottom':pdbtm +'rpx'}">
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
								<view class="navItem" @click="handleShareClick">
									<view class="img">
										<image
											src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/fenxiangyouli.png">
										</image>
									</view>
									<view class="title">分享有礼</view>
								</view>
								<view class="navItem" @click="handleAuditionClick">
									<view class="img">
										<image
											src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E8%AF%BE%E7%A8%8B%E8%AF%95%E5%90%AC.png">
										</image>
									</view>
									<view class="title">免费试听</view>
								</view>
								<view class="navItem" @click="handleImportantClick">
									<view class="img">
										<image
											src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E5%BF%85%E8%80%83%E9%A2%98%E5%BA%93.png">
										</image>
									</view>
									<view class="title">重点题库</view>
								</view>
								<view class="navItem" @click="handleExamClick">
									<view class="img">
										<image
											src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%8B%9F%E8%AF%95%E5%8D%B7.png">
										</image>
									</view>
									<view class="title">模拟试卷</view>
								</view>

							</view>
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

					<!-- 公告栏 -->
				<!-- 	<view class='scrollx' v-if='notice.length'>
						<Notice :notice='notice' :isScroll='isScroll' />
					</view>
 -->

					<!-- 正在学习 -->
					<!-- <audition-learning v-if="studyList.length" title="正在学习" :showMore="showLearningMore"
					:list="studyList.slice(0,2)" @learnChangeUrl="learnChangeUrl" @learnCheckMore="learnCheckMore">
				</audition-learning> -->

					<!-- <view class="h-line"></view> -->
					<audition :title="item.name" :list="item.list.slice(0,item.showAmount)"
						:showMore="item.list.length>item.showAmount" :pageof='true' @changePage='changePage'
						v-for="(item,index) in moduleList" :key="index" @changeUrl="changeUrl" @checkMore="checkMore"
						@doneLogin='doneLogin' :userInfo='userInfo'></audition>
					<!--精品推荐 start-->
					<view style='height:24rpx;width:100%;'></view>
					<view class="h-line" v-if='isShowDaily && newsKnow.length'></view>
					<!-- 每日新知 -->
					<view class="title-info title newsKnow" v-if='isShowDaily && newsKnow.length'>
						<view class="left">
							<view class="red-block"></view>
							每日新知
						</view>
						<view class="more" v-if="newsKnow.length>4" @click="gotolist">查看更多 ></view>
					</view>

					<view class="auditon" v-if='isShowDaily && newsKnow.length'>
						<view class="item" v-for='(item,i) in newsKnowList1' :key='i' @click='jump(item)'>
							<view class="image-info">
								<image :src="item.surface[0]" mode="widthFix" class="main-image"></image>
								<view class="image-bottom-info">
									<view class="view">
										<image src="../../static/icon/play.png" class="play-image"></image>
										<text class="play-num">
											{{(item.baseNum+item.N*(item.realNum||0))<10000?item.baseNum+item.N*(item.realNum||0):((item.baseNum+item.N*(item.realNum||0))/10000).toFixed(1)+'w'}}
										</text>
									</view>
									<text class='time' v-if="item.course.duration&&item.course.duration!='00:00'">
										{{item.course.duration || ''}}
									</text>
								</view>
								<view class="opcity"></view>
							</view>
							<image src="../../static/icon/icon_vip.png" class="icon-vip" v-if="item.course.vip"></image>
							<view class="txt-info">
								<view class="txt-title">
									{{item.title}}
								</view>
								<text class='tag'>
									No.{{newsKnow.length-i < 10 ? '00'+(' '+newsKnow.length-i) : newsKnow.length-i < 100 ?  '0'+(newsKnow.length-i+' ') : newsKnow.length-i}}/{{item.createdAt.getFullYear() +'.'+(Number(item.createdAt.getMonth()+1)) +'.'+ item.createdAt.getDate()}}
								</text>
							</view>
						</view>
						<view class="item" v-if='newsKnowList2.length'>
							<view class="newsknow-item" v-for='(item,i) in newsKnowList2' :key='i' @click='jump(item)'>
								<view class="newsknowView">
									<view class="newsknow-title">
										{{item.title}}
									</view>
									<view class="newsknow-time">
										No.{{newsKnow.length-i-1 < 10 ? '00'+(newsKnow.length-i-1+' ') : newsKnow.length-i-1 < 100 ?  '0'+(newsKnow.length-i-1+' ') : newsKnow.length-i-1}}
										/
										{{item.createdAt.getFullYear() +'.'+(Number(item.createdAt.getMonth())+1) +'.'+ item.createdAt.getDate()}}
									</view>
								</view>
							</view>
						</view>
					</view>

					<!-- 每日新知 -->
					<view class="h-line"></view>
					<view class="groupView" style="margin-top: 24rpx;">
						<view class="title-info">
							<view class="left" v-if="title">
								<view class="red-block"></view>
								推荐阅读
							</view>
						</view>
						<view class="newsView">
							<view class="newsItem" v-for="item in recommends" @click="handleToOtherMiniApp"
								:data-item="item">
								<view class="imgView">
									<image :src="item.headImg"></image>
								</view>
								<view class="conView">
									<view class="title">{{item.title}}</view>
									<view class="content">{{item.subtitle}}</view>
								</view>
							</view>
						</view>
					</view>
					<!--精品推荐 end-->
					<!--购买重点题库 start-->
					<view style='height:20rpx'></view>

				</template>

			</Navbar>

			<view class='mask mask_collection' @click="handleStep" v-if='isShowTips'>
				<view v-if="step==9">
					<!-- <view class="navItem" style="right: 4rpx"> -->
					<view :style='{top: navbarheight+"px"}' style='position:absolute;bottom:0;left:0;right:0'>
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E6%94%B6%E8%97%8F.png"
							style='height: 100%;' mode='aspectFit'></image>
					</view>
					<!-- </view> -->
				</view>
				<view v-if="step==8" class="step bottom">
					<view class="navItem" style="right:4rpx">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E9%A2%98%E5%BA%93.png"
							:style="{bottom:tabbarPdBtm?'0rpx':'-26rpx'}"></image>
					</view>
				</view>
				<view v-if="step==7" class="step bottom" style="left:4rpx">
					<view class="navItem">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E8%AF%BE%E7%A8%8B.png"
							:style="{bottom:tabbarPdBtm?'0rpx':'-26rpx'}"></image>
					</view>
				</view>
				<view v-if="step==6" class="step top">
					<view class="navItem">
						<image
							src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E7%A7%91%E6%8A%80%E6%96%87%E8%89%BA%E5%B8%B8%E8%AF%86.png">
						</image>
					</view>
				</view>
				<view v-if="step==2" class="step top">
					<view class="navItem">
						<image
							src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E5%85%8D%E8%B4%B9%E8%AF%95%E5%90%AC.png">
						</image>
					</view>
				</view>
				<view v-if="step==1" class="step top">
					<view class="navItem">
						<image
							src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E5%88%86%E4%BA%AB%E6%9C%89%E7%A4%BC.png">
						</image>
					</view>
				</view>
				<view v-if="step==4" class="step top">
					<view class="navItem">
						<image
							src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E6%A8%A1%E6%8B%9F%E8%AF%95%E5%8D%B7.png">
						</image>
					</view>
				</view>
				<view v-if="step==3" class="step top">
					<view class="navItem">
						<image
							src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E9%87%8D%E7%82%B9%E9%A2%98%E5%BA%93.png">
						</image>
					</view>
				</view>
				<view v-if="step==5" class="step top">
					<view class="navItem">
						<image
							src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E4%B8%89%E5%90%88%E4%B8%80.png">
						</image>
					</view>
				</view>
				<!-- </u-mask> -->
			</view>
			<view-tabbar :current="0" @tabbarChange="tabbarChange"></view-tabbar>
		</view>
		<login :visiable="isShowLogin" @cancle="cancleIsShowLogin" @ok="handleLoginComplate" :to="toUrl"></login>
		<Modal :isShow='isShow' @cancle='isShow=false' submit='确定' title='需要开通会员' @submitFn='submitFn' />
	</view>
</template>

<script>
	import Utils from '@/js/utils/index.js'
	import Navbar from '@/components/navBar/navBarIndex.vue'
	import Tabbar from '@/components/tabBar/tabBar.vue'
	import login from '../../components/login/login.vue'
	import audition from '@/components/audition/audition.vue'
	import Curriculum from '@/js/utils/curriculum.js'
	import Notice from '@/components/notice/notice.vue'
	import Modal from '@/components/modal/modalvip.vue'
	export default {
		components: {
			login,
			'view-tabbar': Tabbar,
			audition,
			Navbar,
			Notice,
			Modal
		},
		data() {
			return {
				isShowDaily: true, // 每日新知是否显示
				tabbarPdBtm: 0,
				showLearningMore: false,
				relationId: '',
				fontColor: 'rgb(255,255,255)',
				pdbtm: 0, //兼容iphonexr+
				openid: '',
				userInfo: {},
				isShowLogin: false,
				isShowTips: false,
				isShowCollection: false,
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
				height: 0,
				notice: [], // 公告
				noticeTitleArr: [], // 公告标题
				navbarheight: 0,
				isScroll: true,
				isShow: false,
				newsKnow: [],
				newsKnowList1: [],
				newsKnowList2: [],
				vip: false,
				read: false, //是否是后台扫码进来的
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
		async created() {
			this.Parse.Config.get().then(config => {
				this.isShowDaily = config.attributes.isShowDaily
			})
			if (!this.isShowTips) {
				uni.getSystemInfo({
					success: (e) => {
						let statusBar = 0
						let customBar = 0
						statusBar = e.statusBarHeight
						let custom = wx.getMenuButtonBoundingClientRect()
						customBar = custom.bottom + custom.top - e.statusBarHeight
						this.navbarheight = customBar * 2 - e.statusBarHeight * 2;
					}
				})
			}
		},
		onHide() {
			this.isScroll = false
		},
		async onShow() {
			this.isScroll = true
			uni.hideTabBar({
				animation: false
			});
			var app = getApp();
			var member = app.globalData.member;
			let res = null
			try {
				res = await Utils.getcount();
			} catch (e) {
				uni.showToast({
					title: '数据获取失败，请重新进入小程序',
					icon: 'none'
				})
				return
			}
			if (res) {
				this.userInfo = res.userInfo;
				this.msgCount = res.msgCount;
				this.couponCount = res.couponCount;
				// //获取本地正在学习的课程
				this.getLearning();

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
			this.getNotice()
			this.getModules();
			// this.getLearning()
			this.getDailyCourse()
		},
		onLoad(options) {
			// 是不是通过别人的二维码进来的
			if (options && options.scene) {
				uni.setStorage({
					key: 'parentOpenId',
					data: options.scene,
				})
			}
			if (options && options.read) {
				this.read = true
			}
			// this.send()

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
			uni.getStorage({
				key: 'collection',
				success: (res) => {
					self.isShowCollection = res.data
				}
			})

			const Subjects = this.Parse.Object.extend("Subjects")
			const query = new this.Parse.Query('Subjects')

			query.ascending("createdAt")
			query.equalTo("parent_ID", "0")
			query.find().then(list => {
				self.subjects = list
			})
			var bannerQuery = new this.Parse.Query('Banner')
			bannerQuery.equalTo('state', 1)
			bannerQuery.ascending('sort')
			bannerQuery.find().then(banners => {
				self.banners = banners
			})
			var recommendQuery = new this.Parse.Query('Recommend')
			recommendQuery.descending('createdAt')
			recommendQuery.find().then(recommends => {
				if (self.read) {
					self.recommends = recommends
				} else {
					self.recommends = recommends.filter(item => item.attributes.hideCourse)
				}
			})


		},
		methods: {
			cancleIsShowLogin() {
				this.isShowLogin = false
				this.isShow = false
			},
			async jump(item) {
				let userInfo = this.userInfo;
				if (!userInfo) {
					userInfo = uni.getStorageSync('userInfo')
				}

				if (userInfo && userInfo.openid) {
					if (userInfo.phone) {
						if (!item.attributes.course.attributes.vip) {
							uni.navigateTo({
								url: '/curriculumSubPackage/pages/details/details?objectId=' + item.attributes
									.course.id
							})
						} else {
							if (this.vip) {
								uni.navigateTo({
									url: '/curriculumSubPackage/pages/details/details?objectId=' + item
										.attributes.course.id
								})
							} else {
								this.isShow = true
							}
						}
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
				}
				await Curriculum.recordDailyCourseNum(item.id);
			},
			// 获取公告栏内容
			getNotice() {
				let _this = this;
				var query = new this.Parse.Query('BulletinBoard');
				query.equalTo("isShow", true);
				query.find().then(data => {
					if (data) {
						data = JSON.parse(JSON.stringify(data));
						_this.notice = data;
					}
				})
			},
			// 点击公告栏内容
			noticeBar(i) {
				let _this = this;
				if (this.notice[i % this.notice.length].type == 1) {
					uni.navigateTo({
						url: '/pages/index/notice?objectId=' + _this.notice[i % this.notice.length].objectId
					})
				} else {
					let path = _this.notice[i % this.notice.length].link.split('?')
					uni.navigateTo({
						url: '/pages/index/out?' + path[1]
					})
				}
			},
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
			// async learnChangeUrl(item) {
			// 	let vip = await this.checkVip();
			// 	//配置url
			// 	let toUrl = await Curriculum.configUrl({
			// 		course: item
			// 	}, vip);
			// 	if (this.userInfo && this.userInfo.openid) {
			// 		if (this.userInfo.phone) {
			// 			uni.navigateTo({
			// 				url: toUrl
			// 			})
			// 		} else {
			// 			uni.reLaunch({
			// 				url: '/pages/login/login'
			// 			})
			// 		}
			// 	}
			// },
			async changePage(item) {
				// this.isShow = true
				let vip = await this.checkVip();
				//配置url
				let toUrl = await Curriculum.configUrl(item, vip);
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						if (!this.vip) {
							this.isShow = true
						} else {
							uni.navigateTo({
								url: toUrl
							})
						}
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					// this.toAction = 'modalvip'
				}
			},
			async changeUrl(item) {
				let vip = await this.checkVip();
				//配置url
				let toUrl = await Curriculum.configUrl(item, vip);
				await Curriculum.recordClickNum(item.objectId);
				uni.navigateTo({
					url: toUrl
				})


				// if (this.userInfo && this.userInfo.openid) {
				// 	if (this.userInfo.phone) {
				// 		// 记录点击量
				// 		await Curriculum.recordClickNum(item.objectId);
				// 		uni.navigateTo({
				// 			url: toUrl
				// 		})
				// 	} else {
				// 		uni.reLaunch({
				// 			url: '/pages/login/login'
				// 		})
				// 	}
				// } else {
				// 	this.isShowLogin = true
				// 	this.toAction = "clickNum";
				// 	this.relationId = item.objectId;
				// 	this.toUrl = toUrl;
				// }
			},
			// 正在学习
			// async learnCheckMore(params) {
			// 	if (this.userInfo && this.userInfo.openid) {
			// 		if (this.userInfo.phone) {
			// 			uni.navigateTo({
			// 				url: '/homeSubPackage/pages/curriculumList/curriculumList?&moduleName=' + params
			// 					.moduleName
			// 			})
			// 		} else {
			// 			uni.reLaunch({
			// 				url: '/pages/login/login'
			// 			})
			// 		}
			// 	} else {
			// 		this.isShowLogin = true
			// 		this.toUrl = '/homeSubPackage/pages/curriculumList/curriculumList?objId=' + params.objectId +
			// 			'&moduleName=' + params.moduleName;
			// 	}
			// },
			gotolist() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/homeSubPackage/pages/curriculumList/daily'
						})
					} else {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/curriculumList/daily'
				}
			},
			async checkMore(params) {
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
			doneLogin(userInfo) {
				this.userInfo = userInfo;
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
				this.studyList = res;
				this.$nextTick(() => {
					if (this.studyList.length > 2) {
						this.showLearningMore = true;
					} else {
						this.showLearningMore = false;
					}
				})
			},
			//获取模块
			async getModules() {
				let res = await Curriculum.getModule();
				// this.moduleList = res.filter(item => item.name != '每日新知')
				this.moduleList = res
			},
			async getDailyCourse() {
				let _this = this;
				var query = new this.Parse.Query('DailyCourse');
				query.descending("createdAt");
				query.find().then(data => {
					if (data.length == 0) {
						return;
					}
					this.newsKnow = data
					this.newsKnowList1 = [this.newsKnow[0]]
					if (this.newsKnow[1]) {
						this.newsKnowList2 = [this.newsKnow[1]]
					}
					if (this.newsKnow[2]) {
						this.newsKnowList2 = [this.newsKnow[1], this.newsKnow[2]]
					}
					if (this.newsKnow[3]) {
						this.newsKnowList2 = [this.newsKnow[1], this.newsKnow[2], this.newsKnow[3]]
					}
				})
			},
			/* 登录完成 */
			handleLoginComplate() {
				var self = this
				this.isShowLogin = false
				uni.getStorage({
					key: 'userInfo',
					success: async res => {
						self.userInfo = res.data
						if (self.toAction == 'exam') { // 模拟考试
							self.handleExamClick()
						}
						if (self.toAction == 'important') { // 重点题库
							self.handleImportantClick()
						}
						if (self.toAction == 'clickNum') {
							Curriculum.recordClickNum(this.relationId);
						}
						// if (self.toAction == 'modalvip') {
						// 	let vip = await this.checkVip();
						// 	if (!this.vip) {
						// 		self.isShow = true
						// 	}
						// }
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
			/*分享送好礼*/
			handleShareClick() {
				if (this.userInfo && this.userInfo.openid) {
					if (this.userInfo.phone) {
						uni.navigateTo({
							url: '/mineSubPackage/pages/invitation/invitation'
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
			handleImportantClick() {
				let app = getApp()
				if (this.userInfo && this.userInfo.openid) {
					var member = app.globalData.member;
					if (this.userInfo.phone) { // 已绑定手机号
						if (member) {
							if (member.memberType == 0 || member.memberType == 2) {
								uni.navigateTo({
									url: '/homeSubPackage/pages/important/index?buy=' + true
								})
								return;
							}
						}

						if (this.zdtkConfig.get('isNeedPay') == 1 && !this.hasBuyedZDTK) { // 需要购买，但是没买
							// this.isShowImportBuy = true
							// uni.navigateTo({
							// 	// url: '/pages/buy/buy?subjectId=' + this.zdtkConfig.id,
							// 	url: '/mineSubPackage/pages/vip/vip',
							// 	event: {
							// 		reloadOrder: function(data) {
							// 			self.bindOrder()
							// 		}
							// 	}
							// })
							uni.navigateTo({
								url: '/homeSubPackage/pages/important/index?buy=' + false
							})
						} else {
							uni.navigateTo({
								url: '/homeSubPackage/pages/important/index?buy=' + true
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
				let app = getApp()
				if (this.userInfo && this.userInfo.openid) {
					var member = app.globalData.member;
					if (this.userInfo.phone) {
						if (member) {
							if (member.memberType == 0 || member.memberType == 2) {
								uni.navigateTo({
									url: '/homeSubPackage/pages/exam/index'
								})
								return;
							}
						}
						if (this.mnksConfig.get('isNeedPay') == 1 && !this.hasBuyedMNKS) { // 需要购买，但是没买
							this.isShow = true
						} else {
							uni.navigateTo({
								url: '/homeSubPackage/pages/exam/index'
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
			submitFn() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
				this.isShow = false
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
				if (this.step > 9) {
					uni.setStorage({
						key: 'hasHomeTiped',
						data: true
					})
					uni.setStorage({
						key: 'collection',
						data: true
					})
					this.isShowTips = false
				}
			},
			// 显示收藏小程序
			handleShowCollection() {
				this.isShowCollection = false;
				uni.setStorage({
					key: 'collection',
					data: false
				})
			},
			/*点击banner图*/
			handleBannerClick(e) {
				var _item = e.currentTarget.dataset.item
				if (_item.src) {
					if (_item.src.indexOf('http') == 0) {
						if (_item.src.indexOf('www.arteater.cn/vip') != -1) {
							let path = _item.src.split('?')
							uni.navigateTo({
								url: '/pages/index/out?' + path[1]
							})
						} else if (_item.src.indexOf('www.arteater.cn/channel') != -1) {
							let path = _item.src.split('?')
							uni.navigateTo({
								url: '/pages/index/notice?objectId=' + _item.objectId
							})
						} else {
							uni.navigateTo({
								url: './news?url=' + _item.src
							})
						}

					} else if (_item.src.indexOf('/pages') == 0) {
						uni.navigateTo({
							url: _item.src
						})
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

	.more {
		font-size: 16rpx;
		font-weight: 500;
		color: #000000;
		top: 10rpx;
		opacity: 0.4;
		padding-right: 20rpx;
	}

	.scrollx {
		margin-top: 6rpx;
		width: 100%;
		height: 72rpx;
		z-index: 10000;
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

		.innerSection {
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
		font-weight: 500;
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
		font-weight: 500;
		color: #352026;
		display: block;
		margin: auto;
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

	.newsView {
		padding: 0 30rpx;
	}

	.newsView .newsItem {
		display: flex;
		padding: 22rpx 0 24rpx;
		width: 690rpx;
		height: 196rpx;
		border-bottom: 1px solid rgba(0, 0, 0, .06);
	}

	.newsView .newsItem .imgView {
		width: 220rpx;
		height: 150rpx;
	}

	.newsView .newsItem .imgView image {
		width: 220rpx;
		height: 150rpx;
		display: inline-block;
		vertical-align: middle;
		border-radius: 16rpx;
	}

	.newsView .newsItem .conView {
		flex: 1;
		padding: 10rpx 0 0 20rpx;
	}

	.newsView .newsItem .conView .title {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

		font-size: 24rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rrgba(0, 0, 0, .8);
		line-height: 34rpx;
	}

	.newsView .newsItem .conView .content {
		word-break: break-all;
		text-overflow: ellipsis;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

		font-size: 18rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		line-height: 26rpx;
		margin-top: 8rpx;
	}

	.newsView .newsItem:last-child {
		border-bottom: none;
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

	.mask_collection image {
		position: absolute;
		height: calc(100vh - 100rpx);
		bottom: 0;
	}

	.mask {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 10000;
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

	.newsKnow {
		margin-top: 24rpx;
	}

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

	/deep/ .u-type-warning-light-bg {
		background: rgba(237, 231, 230, 1) !important;
	}

	/deep/ .u-news-item {
		color: rgba(0, 0, 0, 0.37);
	}

	/deep/ .u-icon__icon--warning.data-v-172979f2 {
		color: rgba(0, 0, 0, 0.37);
	}


	.auditon {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		padding: 0rpx 30rpx 0rpx 30rpx;
		justify-content: space-between;
	}

	.item {
		width: 336rpx;
		position: relative;
		margin-top: 24rpx;

		.icon-vip {
			position: absolute;
			right: 0;
			top: -5rpx;
			width: 98rpx;
			height: 28rpx;
		}
	}

	.image-info {
		width: 336rpx;
		height: 176rpx;
		overflow: hidden;
		position: relative;
		background: #fff;
		border-radius: 20rpx;
		margin-bottom: 8rpx;
	}

	.image-bottom-info {
		width: 100%;
		height: 24rpx;
		position: absolute;
		bottom: 8rpx;
		display: flex;
		align-items: center;
		align-content: center;
		justify-content: space-between;
		font-size: 22rpx;
		z-index: 1;
	}

	.opcity {
		position: absolute;
		bottom: 0;
		width: 336rpx;
		height: 32rpx;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.1) 33%, rgba(0, 0, 0, 0.6) 100%);
	}

	.image-info .main-image {
		width: 100%;
		height: 176rpx;
	}

	.txt-info {
		padding-left: 18rpx;
	}

	.txt-info .txt-title {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		height: 34rpx;
		font-size: 24rpx;
		letter-spacing: 0rpx;
		font-weight: 500;
		color: #171717;
		line-height: 34rpx;
	}

	.txt-info .tag {
		height: 22rpx;
		font-size: 18rpx;
		letter-spacing: 0rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		display: inherit;
		line-height: 22rpx;
		margin-bottom: 24rpx;
	}

	.view {
		height: 24rpx;
		font-size: 16rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 12rpx;
		display: flex;
		align-items: center;
		align-content: center;

		.play-image {
			width: 24rpx;
			height: 24rpx;
		}

		.play-num {
			font-size: 16rpx;
			font-weight: 500;
			color: #FFFFFF;
		}

		image {
			margin-top: -2rpx;
		}

	}

	.newsknow-item:before {
		content: "";
		display: inline-block;
		width: 8rpx;
		min-width: 8rpx;
		height: 8rpx;
		background: #D81E1F;
		border-radius: 6rpx;
		margin-top: 14rpx;
		margin-right: 6rpx;
	}

	.newsknowView {
		padding-left: 10rpx;
		width: 100%;
	}

	.newsknow-item {
		margin-bottom: 30rpx;
		display: flex;
	}

	.newsknow-title {
		font-size: 24rpx;
		font-weight: 500;
		color: #171717;
		line-height: 34rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.newsknow-time {
		height: 26rpx;
		font-size: 18rpx;
		letter-spacing: 0rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #989898;
		display: inherit;
		line-height: 26rpx;
		margin-top: 2rpx;
	}

	.time {
		font-size: 16rpx;
		font-weight: 500;
		color: #FFFFFF;
		margin-right: 12rpx;
	}
</style>
