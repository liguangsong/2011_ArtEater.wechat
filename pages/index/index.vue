<template>
	<view class="myPage">
		<!--轮播 start-->
		<view class="page-section">
			<view class="page-section-spacing">
				<swiper class="swiper" :autoplay="true">
					<swiper-item>
						<view class="swiperItem">
							<image src="../../static/banner.png"></image>
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
				<view class="subjectItem" @click="handleSubjectClick" :data-item="item" v-for="(item,index) in subjects">
					<image :src="item.backgroundImg"></image>
					<!-- <view class="txt">{{item.subject_name}}</view> -->
				</view>
			</view>
		</view>
		<!--热门专题 end-->
		<!--精品推荐 start-->
		<view class="groupView">
			<view class="headView">
				<view class="title">推荐</view>
			</view>
			<view class="newsView">
				<view class="newsItem">
					<view class="imgView">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="conView">
						<view class="title">欧洲文艺复兴时期的...风格</view>
						<view class="content">17世纪巴洛克时代的美术风格要点分析</view>
					</view>
				</view>
				<view class="newsItem">
					<view class="imgView">
						<image src="../../static/banner.png"></image>
					</view>
					<view class="conView">
						<view class="title">欧洲文艺复兴时期的...风格</view>
						<view class="content">17世纪巴洛克时代的美术风格要点分析</view>
					</view>
				</view>
			</view>
		</view>
		<!--精品推荐 end-->
		
		<u-popup v-model="isShowImportBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
			<view class="buylView" style="padding:74rpx 40rpx;">
				<view class="title">{{subjectDetail.subject_name}}</view>
				<view class="price">¥{{subjectDetail.price}}</view>
				<view class="tips">
					您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
				</view>
				<view class="tips">
					购买后可在【个人中心-已购项目】中查看
				</view>
				<view class="btnActions">
					<button @click="handleBuyBtnClick">确认购买</button>
				</view>
			</view>
		</u-popup>
		<login :visiable="isShowLogin" @cancle="isShowLogin=false" @ok="isShowLogin=false" :to="toUrl"></login>
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
				toUrl:'',
				isShowImportBuy: false,
				title: 'Hello',
				subjects: []
			}
		},
		onShow() {
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
				}
			})
		},
		onLoad() {
			var self = this
			const Subjects = this.Parse.Object.extend("Subjects")
			const query = new this.Parse.Query('Subjects')
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
			/*错题集*/
			handleNoteClick(){
				if(this.userInfo&&this.userInfo.openid){
					uni.navigateTo({
						url:'../mine/note'
					})
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/mine/note'
				}
			},
			/*重点题库*/
			handleImportantClick(){
				if(this.userInfo&&this.userInfo.openid){
					uni.navigateTo({
						url:'../important/index'
					})
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/important/index'
				}
			},
			/*考试*/
			handleExamClick() {
				if(this.userInfo&&this.userInfo.openid){
					uni.navigateTo({
						url:'../exam/index'
					})
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/exam/index'
				}
			},
			/* 点击“我” */
			handleMyClick(){
				if(this.userInfo&&this.userInfo.openid){
					uni.navigateTo({
						url:'../mine/mine'
					})
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/mine/mine'
				}
			},
			/*点击科目*/
			handleSubjectClick(e){
				var item = e.currentTarget.dataset.item
				if(this.userInfo&&this.userInfo.openid){
					uni.navigateTo({
						url:'../subject/subject?sid='+item.objectId
					})
				} else {
					this.isShowLogin = true
					this.toUrl = '/pages/subject/subject?sid='+item.objectId
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbf8f7;
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
		margin-top: 38rpx;
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
</style>
