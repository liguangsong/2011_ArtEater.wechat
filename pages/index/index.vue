<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow-y': isShowTips ? 'auto' : 'scroll','padding-bottom':pdbtm+'rpx'}">
		<!--轮播 start-->
		<Navbar :icon="false" title="食艺兽" height="514rpx">
			<view class="page-section">
			<view class="page-section-spacing">
				<swiper class="swiper" :autoplay="true" indicator-dots indicator-color="#ffffff" indicator-active-color="#ED3535">
					<swiper-item v-for="item in banners" @click="handleBannerClick" :data-item="item">
						<view class="swiperItem">
							<image :src="item.img"></image>
						</view>
					</swiper-item>
					<!-- <swiper-item>
						<view class="swiperItem">
							<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/20210122%209.9%E5%85%83%E7%A7%92%E6%9D%80%E5%9B%BE-02.jpg"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiperItem">
							<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/20210106%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%A6%96%E9%A1%B5%E5%9B%BE_%E7%94%BB%E6%9D%BF%201%20%E5%89%AF%E6%9C%AC%204.jpg"></image>
						</view>
					</swiper-item>
					<swiper-item>
						<view class="swiperItem">
							<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/20210106%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%A6%96%E9%A1%B5%E5%9B%BE_%E7%94%BB%E6%9D%BF%201%20%E5%89%AF%E6%9C%AC%205.jpg"></image>
						</view>
					</swiper-item> -->
				</swiper>
			</view>
		</view>
		</Navbar>
		
		<!--轮播 end-->
		<!--导航 start-->
			<view class="navSection">
				
				<view class="navItem" @click="handleAuditionClick">
					<view class="img">
						<image src="../../static/icon/icon_test.png"></image>
					</view>
					<view class="title">课程试听</view>
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
					</view>
					<view class="title">模拟试卷</view>
				</view>
				<view class="navItem" @click="handleNoteClick">
					<view class="img">
						<image src="../../static/icon/icon_errorques.png"></image>
					</view>
					<view class="title">错题集</view>
				</view>
				
				<!-- <view class="navItem" @click="handleMyClick">
					<view class="img" style="position: relative;">
						<image src="../../static/icon/icon_mine.png"></image>
						<view style="position: absolute;top: 30rpx;left: 22rpx;width: 100rpx;height: 100rpx;">
							<u-badge v-if="(msgCount+couponCount) > 0" fontSize="24" size="mini" type="error" bgColor="#ff7c7c" :offset="[-15,-10]" :count="(msgCount+couponCount)"></u-badge>
						</view>
					</view>
					<view class="title">个人中心</view>
				</view> -->
				
				
				<view class="navItem" @click="handleSubjectClick" :data-item="item" v-for="(item,index) in subjects" :key='item.id'>
					<view class="img">
						<image :src="item.backgroundImg"></image>
					</view>
					<view class="title">{{item.subject_name}}</view>
				</view>
			</view>
		<!--导航 end-->
		
		<!--热门专题 start-->
		<!-- <view class="groupView">
			<view class="subjectView">
				<view class="subjectItem" @click="handleSubjectClick" :data-item="item" v-for="(item,index) in subjects" :key='item.id'>
					<image :src="item.backgroundImg"></image>
				</view>
			</view>
		</view> -->
		<!--热门专题 end-->
		
		<audition title="正在学习" :showMore="studyList.length>2" :list="studyList.slice(0,2)"></audition>
		<audition :title="item.moduleName" :list="item.list.slice(0,item.showAmount)" :showMore="item.list.length>item.showAmount" v-for="(item,index) in moduleList" :key="index"></audition>
		<!--精品推荐 start-->
		<view class="groupView" style="margin-top: 24rpx;">
			<view class="headView">
				<view class="title">推荐</view>
			</view>
			<view class="newsView">
				<view class="newsItem" v-for="item in recommends" @click="handleToOtherMiniApp" :data-item="item">
					<view class="imgView">
						<image :src="item.headImg"></image>
					</view>
					<view class="conView">
						<view class="title">{{item.title}}</view>
						<view class="content"></view>
					</view>
				</view>
				<!-- <view class="newsItem" @click="handleToOtherMiniApp" data-url="https://mp.weixin.qq.com/s/7JIUt_qVXGOLiTM80r8Maw">
					<view class="imgView">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/20210121%E9%A3%9F%E8%89%BA%E5%85%BD%E5%B0%8F%E7%B2%BE%E7%81%B5%E5%AE%98%E6%96%B9%E5%AE%A2%E6%9C%8D-02.jpg"></image>
					</view>
					<view class="conView">
						<view class="title">食艺兽官方客服：【食艺兽小精灵】</view>
						<view class="content"></view>
					</view>
				</view>
				<view class="newsItem" @click="handleToOtherMiniApp" data-url="https://mp.weixin.qq.com/s/F72bE0bqjt8aFAtNWTQ9OA">
					<view class="imgView">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/20210106%E5%B0%8F%E7%A8%8B%E5%BA%8F%E9%A6%96%E9%A1%B5%E5%9B%BE-09.jpg"></image>
					</view>
					<view class="conView">
						<view class="title">考纲题库更多免费体验已开放！即刻开刷！</view>
						<view class="content"></view>
					</view>
				</view>
				<view class="newsItem" @click="handleToOtherMiniApp" data-url="https://mp.weixin.qq.com/s/P0uaebj8kBGLNR90k-wIxA">
					<view class="imgView">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/20210115%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C-07.jpg"></image>
					</view>
					<view class="conView">
						<view class="title">【食艺兽2.0】小程序操作手册</view>
						<view class="content"></view>
					</view>
				</view> -->
			</view>
		</view>
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
		<login :visiable="isShowLogin" @cancle="isShowLogin=false" @ok="handleLoginComplate" :to="toUrl"></login>
		<u-mask :custom-style="{'background': 'rgba(255, 255, 255, 0.7)'}" :show="isShowTips" :mask-click-able="true" :zoom="false" @click="handleStep">
			<view v-show="step==1" class="step step1">
				<view class="navItem">
					<view class="img">
						<image src="../../static/icon/icon_errorques.png"></image>
					</view>
					<view class="title">错题集</view>
				</view>
			</view>
			<view v-show="step==1" class="tooltip tip1">
				<view class="timg">
					<image src="../../static/icon/icon_tips_left.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>你的错题集中营，
						帮你扫除知识盲区。</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
			<view v-show="step==2" class="step step2">
				<view class="navItem">
					<view class="img">
						<image src="../../static/icon/icon_question.png"></image>
					</view>
					<view class="title">必考题库</view>
				</view>
			</view>
			<view v-show="step==2" class="tooltip tip2">
				<view class="timg">
					<image src="../../static/icon/icon_tips_left.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>权威名师替你缩小复习范围，
						锁定必考知识点，
						有的放矢，事半功倍。</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
			<view v-show="step==3" class="step step3">
				<view class="navItem">
					<view class="img">
						<image src="../../static/icon/icon_test.png"></image>
					</view>
					<view class="title">模拟试卷</view>
				</view>
			</view>
			<view v-show="step==3" class="tooltip tip3">
				<view class="timg" style="left: 250rpx;">
					<image src="../../static/icon/icon_tips_right.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>记得来这里检验一下，
						你的学习效果。</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
			<view v-show="step==4" class="step step4">
				<view class="navItem">
					<view class="img">
						<image src="../../static/icon/icon_mine.png"></image>
					</view>
					<view class="title">个人中心</view>
				</view>
			</view>
			<view v-show="step==4" class="tooltip tip4">
				<view class="timg" style="left: 270rpx;">
					<image src="../../static/icon/icon_tips_right.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>你的个人中心在这里哦！</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
			
			
			<view v-show="step==5" class="step step5">
				<view class="subjectItem">
					<image v-if="subjects && subjects.length > 3" :src="subjects[3].backgroundImg"></image>
				</view>
			</view>
			<view v-show="step==5" class="tooltip tip5">
				<view class="timg" style="left: 30rpx;">
					<image src="../../static/icon/icon_tips_left.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>实验艺术专用</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
		</u-mask>
		<view-tabbar :current="0" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Utils from '@/js/utils/index.js'
	import Navbar from '@/components/navBar/navbar.vue'
	import Tabbar from '@/components/tabBar/tabBar.vue'
	import login from '../../components/login/login.vue'
	import audition from '@/components/audition/audition.vue'
	import Curriculum from '@/js/utils/curriculum.js'
	export default {
		components:{
			login,
			'view-tabbar': Tabbar,
			audition,
			Navbar
		},
		data() {
			return {
				pdbtm:0,//兼容iphonexr+
				openid: '',
				userInfo: {},
				isShowLogin: false,
				isShowTips: false,
				step: 1,
				toUrl:'',
				toAction:'',
				isShowImportBuy: false,
				isShowTestBuy: false,
				title: 'Hello',
				subjects: [],
				banners: [], // 轮播图
				recommends: [], // 推荐
				actionConfig:{},
				zdtkConfig:{}, // 重点题库配置
				mnksConfig:{}, // 模拟考试配置
				hasBuyedZDTK:false, // 是否购买了重点题库
				hasBuyedMNKS:false, // 是否购买了模拟考试
				windowHeight: 0,
				msgCount: 0,
				couponCount: 0,
				studyList:[
					{
						type: 'mp4',
						time: '6:31',
						play_num: '12.1w',
						tag_title: '这是副标题，一般是标签',
						title: '先秦美术发展历程视频术发展历程视频',
						img: '../../static/icon/icon_question.png',
						src: '3',
					},{
						type: 'mp4',
						time: '6:31',
						play_num: '12.1w',
						tag_title: '这是副标题，一般是标签',
						title: '先秦美术发展历程视频术发展历程视频',
						img: '../../static/icon/icon_question.png',
						src: '2',
					},{
						type: 'mp4',
						time: '6:31',
						play_num: '12.1w',
						tag_title: '这是副标题，一般是标签',
						title: '先秦美术发展历程视频术发展历程视频',
						img: '../../static/icon/icon_question.png',
						src: '1',
					}],
				moduleList: []//动态模块
			}
		},
		async onShow() {
			uni.hideTabBar({
				animation: false
			});	
			let res=await Utils.getcount(); 
			    this.userInfo=res.userInfo;
			    this.msgCount=res.msgCount;
			    this.couponCount=res.couponCount;
			    this.bindConfig();
				// //获取本地正在学习的课程
				// this.getLearning();
				//获取所有的模块
				this.getModules();
		},
		onLoad() {
			var self = this
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm=125+app.globalData.paddingBottomHeight;
			uni.getStorage({
				key:'hasHomeTiped',
				success:(res)=>{
					self.isShowTips = res.data ? false : true
				},
				fail() {
					self.isShowTips = true
				}
			})
			const Subjects = this.Parse.Object.extend("Subjects")
			const query = new this.Parse.Query('Subjects')
			// uni.getSystemInfo({
			//    success: res => {
			//  	self.windowHeight = res.windowHeight
			//    }
			// })
			
			query.ascending("createdAt")
			query.equalTo("parent_ID", "0")
			query.find().then(list => {
				self.subjects = list
			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			var bannerQuery = new this.Parse.Query('Banner')
			bannerQuery.equalTo('state', 1)
			bannerQuery.ascending('sort')
			bannerQuery.find().then(banners=>{
				self.banners = banners
			})
			var recommendQuery = new this.Parse.Query('Recommend')
			recommendQuery.descending('createdAt')
			recommendQuery.find().then(recommends=>{
				self.recommends = recommends
			})
		},
		methods: {
			// Tab	
			tabbarChange(item) {
				if(item.text=='我的'){
					this.handleMyClick();
				}else if(item.text=='课程'){
					this.handleCurriculumClick();
				}else if(item.text=='题库'){
					this.handleQuestionBankClick();
				}
			},
			/*加载配置*/
			bindConfig(){
				var self = this
				const query1 = new this.Parse.Query('ActionConfig')
				query1.ascending("createdAt")
				query1.find().then(configList=>{
					var app = getApp()
					app.globalData.zdtkConfig = configList.find(t=>{
						return t.get('code') == 'zhongdiantiku'
					})
					app.globalData.mnksConfig = configList.find(t=>{
						return t.get('code') == 'monishiti'
					})
					app.globalData.dajxConfig = configList.find(t=>{
						return t.get('code') == 'daanjiexi'
					})
					self.zdtkConfig = app.globalData.zdtkConfig
					self.mnksConfig = app.globalData.mnksConfig
					self.bindOrder()
				})
			},
			//正在学习
			async getLearning() {
				// let learning=uni.getStorageSync('userInfo').learning;
			},
			//获取模块
			async getModules() {
				let res = await Curriculum.getHomeSetting();
				console.log(res,345);
				// let List=[{
				// 	module:'课程',
				// 	showSize:2,
				// 	order:2,
				// 	list:[
				// 	{
				// 		type: '1',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '3',
				// 	},{
				// 		type: '2',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '2',
				// 	},{
				// 		type: '3',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '1',
				// 	}
				// ]},{
				// 	title:'精品推荐',
				// 	showSize:2,
				// 	order:1,
				// 	list:[
				// 	{
				// 		type: '1',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		subjectName: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '3',
				// 	},{
				// 		type: '2',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '2',
				// 	},{
				// 		type: '3',
				// 		time: '6:31',
				// 		play_num: '12.1w',
				// 		tag_title: '这是副标题，一般是标签',
				// 		title: '先秦美术发展历程视频术发展历程视频',
				// 		img: '../../static/icon/icon_question.png',
				// 		src: '1',
				// 	}
				// ]}];
				console.log(res,8998)
				this.moduleList=res;
			},
			/* 登录完成 */
			handleLoginComplate(){
				var self = this
				this.isShowLogin = false
				uni.getStorage({
					key:'userInfo',
					success: res => {
						self.userInfo = res.data
						// debugger
						if(self.toAction=='exam'){ // 模拟考试
							self.handleExamClick()
						}
						if(self.toAction=='important'){ // 重点题库
							self.handleImportantClick()
						}
					},
				})
			},
			bindOrder(){
				var self = this
				const query2 = new self.Parse.Query("Order")
				query2.equalTo('openId', self.userInfo.openid)
				query2.equalTo('state', 1)
				query2.ascending("createdAt")
				query2.find().then(orderList=>{
					let zdtkOrder = orderList.find(t=> {
						return t.get('subjectId').indexOf(self.zdtkConfig.id)!=-1
					})
					self.hasBuyedZDTK = zdtkOrder?true:false
					let mnksOrder = orderList.find(t=> {
						return t.get('subjectId')==self.mnksConfig.id
					})
					self.hasBuyedMNKS = mnksOrder?true:false
				})
			},
			/*错题集*/
			handleNoteClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						uni.navigateTo({
							url:'../error/index'
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/error/index'
				}
			},
			/*重点题库*/
			handleImportantClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){ // 已绑定手机号
						if(this.zdtkConfig.get('isNeedPay')==1&&!this.hasBuyedZDTK){ // 需要购买，但是没买
							// this.isShowImportBuy = true
							uni.navigateTo({
								url:'/pages/buy/buy?subjectId=' + this.zdtkConfig.id,
								event:{
									reloadOrder: function(data){
										self.bindOrder()
									}
								}
							})
						} else {
							uni.navigateTo({
								url:'../important/index'
							})							
						}
					} else { // 未绑定手机号，跳转至绑定页
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toAction = 'important'
				}
			},
			/*考试*/
			handleExamClick() {
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						if(this.mnksConfig.get('isNeedPay')==1&&!this.hasBuyedMNKS){ // 需要购买，但是没买
							// this.isShowTestBuy = true
							uni.navigateTo({
								url:'/pages/buy/buy?subjectId=' + this.mnksConfig.id,
								event:{
									reloadOrder: function(data){
										self.bindOrder()
									}
								}
							})
						} else {
							uni.navigateTo({
								url:'../exam/index'
							})
						}
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toAction = 'exam'
				}
			},
			// 点击课程试听
			handleAuditionClick() {
				
			},
			/*课程Tab*/
			handleCurriculumClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						uni.switchTab({
							url:'/pages/curriculum/curriculum'
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/curriculum/curriculum'
				}
			},
			/*题库*/
			handleQuestionBankClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						uni.switchTab({
							url:'/pages/questionBank/questionBank'
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/questionBank/questionBank'
				}
			},
			/* 点击“我” */
			handleMyClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						uni.switchTab({
							url:'../mine/mine'
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/mine/mine'
				}
			},
			/*点击科目*/
			handleSubjectClick(e){
				var item = e.currentTarget.dataset.item
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						uni.navigateTo({
							url:'../subject/subject?sid='+item.objectId
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/subject/subject?sid='+item.objectId
				}
			},
			/*点击推荐*/
			handleToOtherMiniApp(e){
				var _item = e.currentTarget.dataset.item
				this.Parse.Config.get().then(config=>{
					let isShowVideo = config.get('isShowVideo')
					if(isShowVideo) {
					// if(false) {
						if(this.userInfo&&this.userInfo.openid){
							uni.navigateTo({
								url: '/pages/course/course?rid=' + _item.objectId
							})
						} else {
							this.isShowLogin = true
							this.toUrl = '/pages/course/course?rid=' + _item.objectId
						}
					} else {
						if(_item.href.indexOf('http')==0) {
							uni.navigateTo({
								url:'./news?url=' + _item.href
							})
						} else if(_item.href.indexOf('/pages')==0){
							uni.navigateTo({
								url: _item.href
							})
						}
						// else {
						// 	if(this.userInfo&&this.userInfo.openid){
						// 		uni.navigateTo({
						// 			url: '/pages/course/course?rid=' + _item.objectId
						// 		})
						// 	} else {
						// 		this.isShowLogin = true
						// 		this.toUrl = '/pages/course/course?rid=' + _item.objectId
						// 	}
						// }	
					}
				})
			},
			handleStep(){
				this.step += 1
				if(this.step > 5){
					uni.setStorage({
						key:'hasHomeTiped',
						data: true
					})
					this.isShowTips = false	
				}
			},
			/*点击banner图*/
			handleBannerClick(e){
				var _item = e.currentTarget.dataset.item
				if(_item.src){
					if(_item.src.indexOf('http')==0) {
						uni.navigateTo({
							url:'./news?url=' + _item.src
						})
					} else if(_item.src.indexOf('/pages')==0){
						uni.navigateTo({
							url: _item.src
						})
						console.log('2'+ _item.src)
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #fbfbfa;
		overflow: hidden;
	}
	.myPage{
		/* padding-bottom: 125rpx; */
	}
	.swiper{
		/* margin-top: 20rpx; */
		// border-radius: 20rpx;
		/* width: 690rpx; */
		/* width: calc(100% - 60rpx); */
		height: 514rpx;
		line-height: 360rpx;
		/* padding: 0 30rpx; */
		text-align: center;
	}
	.uni-swiper-wrapper {
	    /deep/ .uni-swiper-dots {
		   bottom: 20px!important;
		}
	}
	.swiperItem{
		// height: 320rpx;
		// display: inline-block;
		vertical-align: middle;
	}
	.swiperItem image{
		width: 750rpx;
		height: 514rpx;
		background-color: #ffcec9;
		box-shadow: 0rpx 8rpx 22rpx 0rpx 
			rgba(180, 102, 102, 0.24);
	}
	
	.navSection{
		background: #fff;
		display: flex;
		flex-flow:row wrap;
		justify-content: space-between;
		width:690rpx;
		margin: 0 30rpx;
		height: 340rpx;
		border-radius: 15rpx;
		box-shadow: 0px 4px 12px 0px rgba(0,0,0,0.08);
		position: relative;
		top: -18rpx;
	}
	.navSection .navItem{
		width:25%;
		text-align: center;
	}
	.navSection:after {
			content: "";
			flex-grow: 4;
		}
	.navSection .navItem .img{
		width: 150rpx;
		height: 150rpx;
		display: block;
		text-align: center;
		margin: auto;
	}
	.navSection .navItem .img image{
		width: 150rpx;
		height: 150rpx;
	}
	.navSection .navItem .title{
		width: 130rpx;
		height: 10rpx;
		line-height: 30rpx;
		display: inline-block;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		font-size: 22rpx;
		color: #352026;
		display: block;
		margin: auto;
		position: relative;
		top: -20rpx;
	}
	.groupView{
		/* width: calc(100% - 40rpx); */
		/* padding: 30rpx; */
		/* margin-top: 6rpx; */
	}
	.groupView .headView{
		display: flex;
		padding: 0 40rpx;
	}
	.groupView .headView .title{
		flex: 1;
		font-size: 38rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
		font-weight: bold;
	}
	.groupView .subjectView{
		width: 100%;
		/* padding: 20rpx 0; */
		padding-top: 40rpx;
	}
	.groupView .subjectView .subjectItem{
		display: inline-block;
		width: 354rpx;
		height: 172rpx;
		/* margin-left: 30rpx; */
		text-align: center;
		/* border: 1rpx solid #2C405A; */
		border-radius: 64rpx;
		position: relative;
	}
	.groupView .subjectView .subjectItem:nth-child(2n-1){
		margin-left: 30rpx;
	}
	.groupView .subjectView .subjectItem image{
		width: 336rpx;
		height: 152rpx;
		border-radius: 64rpx;
		position: absolute;
		left: 0;
	}
	.groupView .subjectView .subjectItem:nth-child(1) image{
		background-image: linear-gradient(0deg, 
				#ce203d 0%, 
				#e02222 4%, 
				#da3c4b 38%, 
				#da3c4b 92%, 
				#d95457 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(230, 58, 76, 0.19);
	}
	.groupView .subjectView .subjectItem:nth-child(2) image{
		background-image: linear-gradient(0deg, 
			#e06121 0%, 
			#dd884f 5%, 
			#dd6a46 35%, 
			#e16840 92%, 
			#df662e 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(229, 201, 184, 0.34);
	}
	.groupView .subjectView .subjectItem:nth-child(3) image{
		background-image: linear-gradient(0deg, 
			#ddbe39 0%, 
			#d6d265 4%, 
			#e6bf3d 38%, 
			#ffb659 92%, 
			#f9bc54 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(236, 174, 63, 0.15);
	}
	.groupView .subjectView .subjectItem:nth-child(4) image{
		background-image: linear-gradient(0deg, 
			#4287a3 0%, 
			#619bbd 4%, 
			#53afb4 38%, 
			#46999a 92%, 
			#46899a 100%);
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(173, 194, 199, 0.28), 
			0rpx 8rpx 16rpx 0rpx 
			rgba(173, 194, 199, 0.28);
	}
	.groupView .subjectView .subjectItem .progress{
		position: absolute;
		top: 145rpx;
		width: 100%;
	}
	.groupView .subjectView .subjectItem .txt{
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
	.groupView .subjectView .subjectItem:nth-child(n+2){
		/* margin-top: 12rpx; */
	}
	
	.newsView{
		padding: 0 30rpx;
	}
	.newsView .newsItem{
		/* background-color: #ffffff; */
		border-radius: 30rpx;
		margin: 18rpx 0;
		display: flex;
		width: 690rpx;
		height: 214rpx;
		padding: 25rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 16rpx 44rpx 0rpx 
			rgba(226, 171, 166, 0.21);
		border-radius: 40rpx;
	}
	.newsView .newsItem .imgView{
		width: 208rpx;
		height: 164rpx;
		line-height: 164rpx;
		text-align: center;
	}
	.newsView .newsItem .imgView image{
		width: 208rpx;
		height: 164rpx;
		margin: auto;
		display: inline-block;
		vertical-align: middle;
		border-radius: 10rpx;
	}
	.newsView .newsItem .conView{
		flex: 1;
		padding: 10rpx 0 0 25rpx;
	}
	.newsView .newsItem .conView .title{
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		color: #352026;
		font-weight: bold;
	}
	.newsView .newsItem .conView .content{
		font-family: PingFangSC-Medium;
		font-size: 30rpx;
		color: #352026;
	}
	.buylView {
		width: 100%;
	}
	.buylView .title{
		font-size: 38rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.buylView .price{
		font-size: 34rpx;
		margin-top: 12rpx;
		font-family: PingFangSC-Medium;
		color: #ed3535;
	}
	.buylView .tips{		
		font-size: 26rpx;
		margin-top: 54rpx;
		font-family: PingFangSC-Medium;
		color: rgba(53,32,38,0.4);
	}
	.buylView .btnActions{
		margin-top: 96rpx;
	}
	.buylView .btnActions button{
		width: 100%;
		height: 92rpx;
		border-radius: 46rpx;
		background-color: #ED3535;
		color: #ffffff;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
	}
	
	.step .navItem{
		flex: 1;
		width: 100%;
		text-align: center;
	}
	.step .navItem .img{
		width: 150rpx;
		height: 150rpx;
		display: block;
		text-align: center;
		margin: auto;
	}
	.step .navItem .img image{
		width: 150rpx;
		height: 150rpx;
	}
	.step .navItem .title{
		width: 130rpx;
		height: 10rpx;
		line-height: 30rpx;
		display: inline-block;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		font-size: 22rpx;
		color: #352026;
		display: block;
		margin: auto;
		position: relative;
		top: -20rpx;
	}
	.step .subjectItem{
		display: inline-block;
		width: 336rpx;
		height: 152rpx;
		text-align: center;
		border-radius: 56rpx;
	}
	.step .subjectItem image{
		width: 336rpx;
		height: 152rpx;
		border-radius: 56rpx;
	}
	.tooltip {
	    position: absolute;
	    display: inline-block;
	}
	.tooltip .timg{
		position: relative;
		top: 18rpx;
		left: 35rpx;
	}
	.tooltip .timg image{
		width: 32rpx;
		height: 32rpx;
	}
	.tooltip .tooltiptext {
	    visibility: visible;
	    background-color: #ff6867;
	    color: #ffffff;
	    text-align: center;
		border-radius: 30rpx;
	    z-index: 1;
	}
	.tooltip .tooltiptext .content{
		padding: 20rpx 32rpx 10rpx 32rpx;
		font-size: 26rpx;
		color: #fbfbfa;
		text-align: left;
	}
	
	.tooltip .tooltiptext .action{
		padding-top: 10rpx;
		padding-bottom: 20rpx;
		font-size: 26rpx;
	}
	
	.step1{
		width: 150rpx;
		height: 167rpx;
		position: absolute;
		top: 368rpx;
		left: 20rpx;
	}
	
	.step2{
		width: 150rpx;
		height: 167rpx;
		position: absolute;
		top: 368rpx;
		left: 207rpx;
	}
	
	.step3{
		width: 150rpx;
		height: 167rpx;
		position: absolute;
		top: 368rpx;
		left: 395rpx;
	}
	
	.step4{
		width: 150rpx;
		height: 167rpx;
		position: absolute;
		top: 368rpx;
		left: 583rpx;
	}
	
	
	.step5{
		width: 336rpx;
		height: 152rpx;
		position: absolute;
		top: 745rpx;
		left: 382rpx;
	}
	
	.tip1{
		width: 290rpx;
		left: 115rpx;
		top: 498rpx;
	}
	.tip2{
		width: 395rpx;
		left: 300rpx;
		top: 498rpx;
	}
	.tip3{
		width: 320rpx;
		left: 135rpx;
		top: 498rpx;
	}
	.tip4{
		width: 344rpx;
		left: 315rpx;
		top: 498rpx;
	}
	.tip5{
		width: 220rpx;
		left: 496rpx;
		top: 883rpx;
	}
	
	.u-badge-dot{
		border-radius: 50%!important;
	}
	.u-badge{
		min-width: 32rpx;
		min-height: 32rpx;
	}
</style>
