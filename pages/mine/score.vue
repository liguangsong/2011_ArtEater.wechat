<template>
	<view class="myPage">
		<view class="headView">
			<view class="title">排名</view>
			<view class="title">积分</view>
		</view>
		<view class="scoreItem" v-for="(user,index) in scoreList">
			<view v-if="index==0" class="index first">{{index + 1}}</view>
			<view v-if="index==1" class="index second">{{index + 1}}</view>
			<view v-if="index==2" class="index third">{{index + 1}}</view>
			<view v-if="index>2" class="index">{{index + 1}}</view>
			<view class="cont">
				<view class="headIcon">
					<image class="bg" v-if="index==0" src="../../static/icon/icon_head_bg_first.png"></image>
					<image class="bg" v-if="index==1" src="../../static/icon/icon_head_bg_second.png"></image>
					<image class="bg" v-if="index==2" src="../../static/icon/icon_head_bg_third.png"></image>
					<image :src="user.avatarUrl"></image>
				</view>
				<view class="nickName">{{user.nickName}}</view>
				<view v-if="index==0" class="score first">{{user.score}}</view>
				<view v-if="index==1" class="score second">{{user.score}}</view>
				<view v-if="index==2" class="score third">{{user.score}}</view>
				<view v-if="index>2" class="score">{{user.score}}</view>
			</view>
		</view>
		<view class="loadmore">
			<u-loadmore @loadmore="handleLoadMore" :status="status" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				pageSize: 20,
				status:'loadmore',
				loadText:{
					loadmore: '点击或上拉加载更多',
					loading:'正在拼命加载中',
					nomore:'没有更多了'
				},
				scoreList:[]
			}
		},
		onLoad() {
			this.bindData()
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		methods: {
			handleLoadMore(){
				this.status = 'loading'
				this.page= this.page+1
				this.bindData()
			},
			bindData(){
				var self = this
				var userQuery = new this.Parse.Query(this.Parse.User)
				userQuery.equalTo('role','student')
				userQuery.descending('score','updatedAt')
				userQuery.skip((this.page - 1) * this.pageSize)
				userQuery.limit(this.pageSize)
				userQuery.find().then(res=>{
					if(res.length > 0) {
						self.status = 'loadmore'
						self.scoreList = self.scoreList.concat(res)
					} else {
						self.status = 'nomore'
					}
				})
			}
		}
	}
</script>

<style>
	.myPage .headView{
		padding: 0 30rpx;
		margin-bottom: 18rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 26rpx;
		color: rgba(53,32,38, 0.4);
		font-family: PingFangSC-Medium;
		display: flex;
		border-bottom: 2rpx solid #f2f2f2;
	}
	.myPage .headView .title:first-child{
		text-align: left;
		flex: 1;
	}
	.myPage .headView .title:last-child{
		text-align: right;
		flex: 1;
	}
	.myPage .scoreItem{
		margin: 0 30rpx;
		display: flex;
		height: 106rpx;
		line-height: 106rpx;
	}
	.myPage .scoreItem .index{
		width: 50rpx;
		font-size: 30rpx;
		color: rgba(53,32,38,0.7);
		font-family: PingFangSC-Medium;
		text-align: right;
	}
	.myPage .scoreItem .index.first{
		color: rgba(255,104,103, 0.7);
		font-size: 38rpx;
	}
	.myPage .scoreItem .index.second{
		color: rgba(255,100,45, 0.7);
		font-size: 38rpx;
	}
	.myPage .scoreItem .index.third{
		color: rgba(255,138,0, 0.7);
		font-size: 38rpx;
	}
	.myPage .scoreItem .cont{
		border-bottom: 2rpx solid #f4f4f4;
		flex: 1;
		display: flex;
		margin-left: 30rpx;
	}
	.myPage .scoreItem .cont .headIcon{
		width: 100rpx;
		text-align: center;
		position: relative;
	}
	.myPage .scoreItem .cont .headIcon image.bg{
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		left: 0;
	}
	.myPage .scoreItem .cont .headIcon image{
		/* position: absolute; */
		display: inline-block;
		vertical-align: middle;
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		left: 0;
	}
	.myPage .scoreItem .cont .nickName{
		flex: 1;
		color: rgba(53,32,38,0.69);
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
	}
	.myPage .scoreItem .cont .score{
		width: 100rpx;
		text-align: right;
		color: rgba(20,58,68,0.69);
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
	}
	.myPage .scoreItem .cont .score.first{
		color: #ff6867;
	}
	.myPage .scoreItem .cont .score.second{
		color: rgba(255,100,45, 0.7);
	}
	.myPage .scoreItem .cont .score.third{
		color: rgba(255,138,0, 0.7);
	}
	.loadmore{
		margin: 20rpx 0;
	}
</style>
