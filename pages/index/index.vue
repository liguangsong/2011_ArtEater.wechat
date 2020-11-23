<template>
	<view class="myPage">
		<!--轮播 start-->
		<view class="page-section swiper">
			<view class="page-section-spacing">
				<swiper class="swiper" :autoplay="true">
					<swiper-item>
						<view class="swiperItem">A</view>
					</swiper-item>
					<swiper-item>
						<view class="swiperItem">B</view>
					</swiper-item>
					<swiper-item>
						<view class="swiperItem">C</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!--轮播 end-->
		<!--导航 start-->
		<view class="navView">
			<view class="navSection">
				<view class="navItem">
					<view class="img">
						<image src="../../static/logo.png"></image>
					</view>
					<view class="title">错误集</view>
				</view>
				<view class="navItem">
					<view class="img">
						<image src="../../static/logo.png"></image>
					</view>
					<view class="title">重点题库</view>
				</view>
				<view class="navItem" @click="handleExamClick">
					<view class="img">
						<image src="../../static/logo.png"></image>
					</view>
					<view class="title">模拟试题</view>
				</view>
				<view class="navItem" @click="handleMyClick">
					<view class="img">
						<image src="../../static/logo.png"></image>
					</view>
					<view class="title">我</view>
				</view>
			</view>
		</view>
		<!--导航 end-->
		<!--热门专题 start-->
		<view class="groupView">
			<view class="headView">
				<view class="title">热门专题</view>
			</view>
			<view class="subjectView">
				<view class="subjectItem" @click="handleSubjectClick" :data-item="item" v-for="(item) in subjects">{{item.subject_name}}</view>
			</view>
		</view>
		<!--热门专题 end-->
		<!--精品推荐 start-->
		<view class="groupView">
			<view class="headView">
				<view class="title">精品推荐</view>
			</view>
			<view class="subjectView">
				<view class="subjectItem">中国美术史</view>
				<view class="subjectItem">外国美术史</view>
				<view class="subjectItem">科技文艺</view>
				<view class="subjectItem">中国美术史1</view>
			</view>
		</view>
		<!--精品推荐 end-->
	</view>
</template>

<script>
	// import Parse from 'parse/weapp'
	
	export default {
		data() {
			return {
				openid: '',
				userInfo: {},
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
			const query = new this.Parse.Query(Subjects)
			query.startsWith("parent_ID", "0")
			query.find().then(list => {
				self.subjects = list
			})
		},
		methods: {
			/*考试*/
			handleExamClick() {
				if(this.userInfo&&this.userInfo.openid){					
					uni.navigateTo({
						url:'../exam/exam'
					})
				} else {
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			/* 点击“我” */
			handleMyClick(){
				if(this.userInfo&&this.userInfo.openid){					
					uni.navigateTo({
						url:'../mine/mine'
					})
				} else {
					uni.navigateTo({
						url:'../login/login'
					})
				}
			},
			/*点击科目*/
			handleSubjectClick(e){
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'../subject/subject?sid='+item._id
				})
			}
		}
	}
</script>

<style>
	.swiperItem{
		background-color: #007AFF;
		height: 100%;
		width: 100%;
	}
	.navView{
		/* width: calc(100% - 40rpx); */
		padding:20rpx;
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
		width: 100rpx;
		height: 100rpx;
		display: inline-block;
		text-align: center;
	}
	.navView .navSection .navItem .img image{
		width: 100rpx;
		height: 100rpx;
	}
	.navView .navSection .navItem .title{
		width: 130rpx;
		height: 40rpx;
		line-height: 40rpx;
		display: inline-block;
		text-align: center;
		font-size: 30rpx;
		
	}
	.groupView{
		/* width: calc(100% - 40rpx); */
		padding: 20rpx;
	}
	.groupView .headView{
		display: flex;
	}
	.groupView .headView .title{
		flex: 1;
		font-size: 40rpx;
		font-weight: bold;
	}
	.groupView .subjectView{
		width: 100%;
	}
	.groupView .subjectView .subjectItem{
		display: inline-block;
		width: calc(50% - 30rpx);
		margin-left: 20rpx;
		text-align: center;
		height: 100rpx;
		line-height: 100rpx;
		border: 1rpx solid #2C405A;
		border-radius: 20rpx;
	}
	.groupView .subjectView .subjectItem:nth-child(n+2){
		margin-top: 20rpx;
	}
</style>
