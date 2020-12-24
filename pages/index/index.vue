<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow-y': isShowTips ? 'auto' : 'scroll'}">
		<!--轮播 start-->
		<view class="page-section">
			<view class="page-section-spacing">
				<swiper class="swiper" :autoplay="true">
					<swiper-item>
						<view class="swiperItem">
							<image src="../../static/banner.jpg"></image>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!--轮播 end-->
		<!--导航 start-->
		<view class="navView">
			<view class="navSection">
				<view class="navItem" @click="handleNoteClick">
					<view class="img">
						<image src="../../static/icon/icon_errorques.png"></image>
					</view>
					<view class="title">错题集</view>
				</view>
				<view class="navItem" @click="handleImportantClick">
					<view class="img">
						<image src="../../static/icon/icon_question.png"></image>
					</view>
					<view class="title">重点题库</view>
				</view>
				<view class="navItem" @click="handleExamClick">
					<view class="img">
						<image src="../../static/icon/icon_test.png"></image>
					</view>
					<view class="title">模拟试卷</view>
				</view>
				<view class="navItem" @click="handleMyClick">
					<view class="img">
						<image src="../../static/icon/icon_mine.png"></image>
					</view>
					<view class="title">个人中心</view>
				</view>
			</view>
		</view>
		<!--导航 end-->
		<!--热门专题 start-->
		<view class="groupView">
			<view class="subjectView">
				<view class="subjectItem" @click="handleSubjectClick" :data-item="item" v-for="(item,index) in subjects" :key='item.id'>
					<image :src="item.backgroundImg"></image>
					<!-- <view class="txt">{{item.subject_name}}</view> -->
				</view>
			</view>
		</view>
		<!--热门专题 end-->
		<!--精品推荐 start-->
		<view class="groupView" style="margin-top: 24rpx;">
			<view class="headView">
				<view class="title">推荐</view>
			</view>
			<view class="newsView">
				<view class="newsItem" @click="handleToOtherMiniApp">
					<view class="imgView">
						<image src="../../static/tuijian1.jpg"></image>
					</view>
					<view class="conView">
						<view class="title">仅考一科，就上央美！央美中法超级课程来喽</view>
						<view class="content"></view>
					</view>
				</view>
				<view class="newsItem" @click="handleToOtherMiniApp">
					<view class="imgView">
						<image src="../../static/tuijian2.jpg"></image>
					</view>
					<view class="conView">
						<view class="title">艺术史论免费试听课第一讲《原始古代文明》</view>
						<view class="content"></view>
					</view>
				</view>
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
		<login :visiable="isShowLogin" @cancle="isShowLogin=false" @ok="isShowLogin=false" :to="toUrl"></login>
		<u-mask :custom-style="{'background': 'rgba(255, 255, 255, 0.7)'}" :show="isShowTips" :mask-click-able="false" :zoom="false" @click="show = false">
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
					<view class="action" @click="handleStep">我知道了</view>
				</view>
			</view>
			<view v-show="step==2" class="step step2">
				<view class="navItem">
					<view class="img">
						<image src="../../static/icon/icon_question.png"></image>
					</view>
					<view class="title">重点题库</view>
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
					<view class="action" @click="handleStep">我知道了</view>
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
					<view class="action" @click="handleStep">我知道了</view>
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
					<view class="action" @click="handleStep">我知道了</view>
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
					<view class="action" @click="handleStep">我知道了</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import login from '../../components/login/login.vue'
	export default {
		components:{
			login
		},
		data() {
			return {
				openid: '',
				userInfo: {},
				isShowLogin: false,
				isShowTips: false,
				step: 1,
				toUrl:'',
				isShowImportBuy: false,
				isShowTestBuy: false,
				title: 'Hello',
				subjects: [],
				actionConfig:{},
				zdtkConfig:{}, // 重点题库配置
				mnksConfig:{}, // 模拟考试配置
				hasBuyedZDTK:false, // 是否购买了重点题库
				hasBuyedMNKS:false, // 是否购买了模拟考试
				windowHeight: 0
			}
		},
		onShow() {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success: res => {
					self.userInfo = res.data
					self.bindConfig()
				}
			})
		},
		onLoad() {
			var self = this
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
			uni.getSystemInfo({
			   success: res => {
			 	self.windowHeight = res.windowHeight
			   }
			})
			query.ascending("createdAt")
			query.equalTo("parent_ID", "0")
			query.find().then(list => {
				self.subjects = list
			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		methods: {
			/*加载配置*/
			bindConfig(){
				var self = this
				const query1 = new this.Parse.Query('ActionConfig')
				query1.ascending("createdAt")
				query1.find().then(configList=>{
					self.zdtkConfig = configList.find(t=>{
						return t.get('code') == 'zhongdiantiku'
					})
					self.mnksConfig = configList.find(t=>{
						return t.get('code') == 'monishiti'
					})
					self.bindOrder()
				})
			},
			bindOrder(){
				var self = this
				const query2 = new self.Parse.Query('Order')
				query2.equalTo('openId', self.userInfo.openid)
				query2.equalTo('state', 1)==''
				query2.ascending("createdAt")
				query2.find().then(orderList=>{
					let zdtkOrder = orderList.find(t=> {
						return t.get('subjectId')==self.zdtkConfig.id
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
							url:'../mine/note'
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/mine/note'
				}
			},
			/*重点题库*/
			handleImportantClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){ // 已绑定手机号
						if(this.zdtkConfig.get('isNeedPay')==1&&!this.hasBuyedZDTK){ // 需要购买，但是没买
							this.isShowImportBuy = true
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
					this.toUrl = '/pages/important/index'
				}
			},
			/*考试*/
			handleExamClick() {
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						if(this.mnksConfig.get('isNeedPay')==1&&!this.hasBuyedMNKS){ // 需要购买，但是没买
							this.isShowTestBuy = true
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
					this.toUrl = '/pages/exam/index'
				}
			},
			/* 点击“我” */
			handleMyClick(){
				if(this.userInfo&&this.userInfo.openid){
					if(this.userInfo.phone){
						uni.navigateTo({
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
			handleToOtherMiniApp(){
				uni.navigateTo({
					url:'./news'
				})
			},
			/*确认购买重点题库*/
			handleBuyZDTKClick(){
				var self = this
				uni.showLoading()
				// var _subject = this.currSubjectDetail
				var user = self.Parse.User.current()
				var price = self.zdtkConfig.get('price') * 100
				this.Parse.Cloud.run('initiatePayment',
					{price: price,},
					{sessionToken: user.get('sessToken'),}).then(res=>{
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
						var dbOrder = self.Parse.Object.extend("Order")
						var order = new dbOrder()
						order.set('orderNo', tradeId)
						order.set("subjectId",  self.zdtkConfig.id)
						order.set("subjectName",  self.zdtkConfig.get('action'))
						order.set("price",  self.zdtkConfig.get('price'))
						order.set("openId", self.userInfo.openid)
						order.set("state", 1)
						order.set("wechatPayOrderId", '') // 支付流水号
						order.save().then(_order => {
							uni.hideLoading()
							self.isShowImportBuy = false
							uni.showModal({
								content:'恭喜，购买成功',
								showCancel: false
							})
							self.bindOrder()
						},(error)=>{
							uni.hideLoading()
							console.log(error)
						})
						var user = self.Parse.User.current()
						user.set('amount', user.get('amount') + parseFloat(self.zdtkConfig.get('price')))
						user.save().then(ruser=>{
							uni.setStorage({
								key: 'userInfo',
								data: ruser
							})
						})
					  },
					  fail (res) {
						uni.hideLoading()
						console.log("支付失败"+ JSON.stringify(res))
					  }
					})
				})
			},
			/*确认购买模拟考试*/
			handleBuyMNKSClick(){
				var self = this
				uni.showLoading()
				// var _subject = this.currSubjectDetail
				var user = self.Parse.User.current()
				var price = self.mnksConfig.get('price') * 100
				this.Parse.Cloud.run('initiatePayment',
					{price: price,},
					{sessionToken: user.get('sessToken'),}).then(res=>{
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
						var dbOrder = self.Parse.Object.extend("Order")
						var order = new dbOrder()
						order.set('orderNo', tradeId)
						order.set("subjectId",  self.mnksConfig.id)
						order.set("subjectName",  self.mnksConfig.get('action'))
						order.set("price",  self.mnksConfig.get('price'))
						order.set("openId", self.userInfo.openid)
						order.set("state", 1)
						order.set("wechatPayOrderId", '') // 支付流水号
						order.save().then(_order => {
							uni.hideLoading()
							self.isShowTestBuy = false
							uni.showModal({
								content:'恭喜，购买成功',
								showCancel: false
							})
							self.bindOrder()
						},(error)=>{
							uni.hideLoading()
							console.log(error)
						})
						var user = self.Parse.User.current()
						user.set('amount', user.get('amount') + parseFloat(self.mnksConfig.get('price')))
						user.save().then(ruser=>{
							uni.setStorage({
								key: 'userInfo',
								data: ruser
							})
						})
					  },
					  fail (res) {
						uni.hideLoading()
						console.log("支付失败"+ JSON.stringify(res))
					  }
					})
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
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbf8f7;
		overflow: hidden;
	}
	.myPage{
		/* padding: 0 30rpx; */
	}
	.swiper{
		margin-top: 20rpx;
		border-radius: 20rpx;
		/* width: 690rpx; */
		width: calc(100% - 60rpx);
		height: 320rpx;
		padding: 0 30rpx;
	}
	.swiperItem{
		height: 320rpx;
		border-radius: 30rpx;
	}
	.swiperItem image{
		width: 690rpx;
		height: 320rpx;
		border-radius: 30rpx;
	}
	.navView{
		/* width: calc(100% - 40rpx); */
		margin-top:20rpx;
	}
	.navView .navSection{
		display: flex;
	}
	.navView .navSection .navItem{
		flex: 1;
		width: 100%;
		text-align: center;
	}
	.navView .navSection .navItem .img{
		width: 130rpx;
		height: 130rpx;
		display: block;
		text-align: center;
		margin: auto;
	}
	.navView .navSection .navItem .img image{
		width: 130rpx;
		height: 130rpx;
	}
	.navView .navSection .navItem .title{
		width: 130rpx;
		height: 30rpx;
		line-height: 30rpx;
		display: inline-block;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		font-size: 22rpx;
		color: #352026;
		display: block;
		margin: auto;
	}
	.groupView{
		/* width: calc(100% - 40rpx); */
		/* padding: 30rpx; */
		margin-top: 6rpx;
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
		padding: 20rpx 0;
	}
	.groupView .subjectView .subjectItem{
		display: inline-block;
		width: 336rpx;
		height: 152rpx;
		margin-left: 30rpx;
		text-align: center;
		/* border: 1rpx solid #2C405A; */
		border-radius: 56rpx;
		position: relative;
	}
	.groupView .subjectView .subjectItem:nth-child(2n){
		margin-left: 18rpx;
	}
	.groupView .subjectView .subjectItem image{
		width: 336rpx;
		height: 152rpx;
		border-radius: 56rpx;
		position: absolute;
		left: 0;
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
		margin-top: 12rpx;
	}
	
	.newsView{
		padding: 0 30rpx;
	}
	.newsView .newsItem{
		background-color: #ffffff;
		border-radius: 30rpx;
		margin: 18rpx 0;
		display: flex;
		width: 690rpx;
		height: 214rpx;
		padding: 25rpx;
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
		width: 130rpx;
		height: 130rpx;
		display: block;
		text-align: center;
		margin: auto;
	}
	.step .navItem .img image{
		width: 130rpx;
		height: 130rpx;
	}
	.step .navItem .title{
		width: 130rpx;
		height: 30rpx;
		line-height: 30rpx;
		display: inline-block;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		font-size: 22rpx;
		color: #352026;
		display: block;
		margin: auto;
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
		width: 130rpx;
		height: 167rpx;
		position: absolute;
		top: 359rpx;
		left: 30rpx;
	}
	
	.step2{
		width: 130rpx;
		height: 167rpx;
		position: absolute;
		top: 359rpx;
		left: 218rpx;
	}
	
	.step3{
		width: 130rpx;
		height: 167rpx;
		position: absolute;
		top: 359rpx;
		left: 405rpx;
	}
	
	.step4{
		width: 130rpx;
		height: 167rpx;
		position: absolute;
		top: 359rpx;
		left: 593rpx;
	}
	
	
	.step5{
		width: 336rpx;
		height: 152rpx;
		position: absolute;
		top: 722rpx;
		left: 381rpx;
	}
	
	.tip1{
		width: 290rpx;
		left: 115rpx;
		top: 490rpx;
	}
	.tip2{
		width: 395rpx;
		left: 300rpx;
		top: 490rpx;
	}
	.tip3{
		width: 320rpx;
		left: 135rpx;
		top: 490rpx;
	}
	.tip4{
		width: 344rpx;
		left: 315rpx;
		top: 490rpx;
	}
	.tip5{
		width: 220rpx;
		left: 496rpx;
		top: 860rpx;
	}
</style>
