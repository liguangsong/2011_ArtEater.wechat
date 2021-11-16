<template>
	<view class="myPage">
		<view class="headView">
			<view class="title">排名</view>
			<view class="title">积分</view>
		</view>
		<view style="height: 80rpx;"></view>
		<view class="scoreItem" v-for="(user,index) in scoreList">
			<view v-if="index==0" class="index first">{{index + 1}}</view>
			<view v-if="index==1" class="index second">{{index + 1}}</view>
			<view v-if="index==2" class="index third">{{index + 1}}</view>
			<view v-if="index>2" class="index">{{index + 1}}</view>
			<view class="cont">
				<view class="headIcon">
					<image class="bg" v-if="index==0" src="../../../static/icon/icon_head_bg_first.png"></image>
					<image class="bg" v-if="index==1" src="../../../static/icon/icon_head_bg_second.png"></image>
					<image class="bg" v-if="index==2" src="../../../static/icon/icon_head_bg_third.png"></image>
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
			荣誉只属于最勤奋的50位选手
		</view>
		<view style="height: 106rpx;"></view>
		<view class="btmScore">
			<view class="scoreItem">
				<view v-if="myscore.index==-1" class="index first">
					<u-loading mode="circle"></u-loading>
				</view>
				<view v-if="myscore.index==0" class="index first">{{myscore.index + 1}}</view>
				<view v-if="myscore.index==1" class="index second">{{myscore.index + 1}}</view>
				<view v-if="myscore.index==2" class="index third">{{myscore.index + 1}}</view>
				<view v-if="myscore.index>2" class="index">{{myscore.index + 1}}</view>
				<view class="cont">
					<view class="headIcon" @click="handleScoreRecord">
						<image class="bg" v-if="myscore.index==0" src="../../../static/icon/icon_head_bg_first.png"></image>
						<image class="bg" v-if="myscore.index==1" src="../../../static/icon/icon_head_bg_second.png"></image>
						<image class="bg" v-if="myscore.index==2" src="../../../static/icon/icon_head_bg_third.png"></image>
						<image :src="myscore.avatarUrl"></image>
					</view>
					<view class="nickName">{{myscore.nickName}}</view>
					<view v-if="myscore.index==0" class="score first">{{myscore.score}}</view>
					<view v-if="myscore.index==1" class="score second">{{myscore.score}}</view>
					<view v-if="myscore.index==2" class="score third">{{myscore.score}}</view>
					<view v-if="myscore.index>2" class="score">{{myscore.score}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				pageSize: 50,
				status:'loadmore',
				loadText:{
					loadmore: '点击加载更多',
					loading:'正在拼命加载中',
					nomore:'没有更多了'
				},
				scoreList:[],
				myscore:null
			}
		},
		onLoad() {
			this.bindData()

			var self = this
			uni.getStorage({
				key:'userInfo',
				success(res) {
					res.data.index=-1
					self.myscore = res.data
					var query = new self.Parse.Query(self.Parse.User)
					query.equalTo('role','student')
					// query.descending('score','updatedAt')
					query.greaterThan('score', res.data.score)
					query.count().then(sres=>{
						var query1 = new self.Parse.Query(self.Parse.User)
						query1.equalTo('score', res.data.score)
						query1.equalTo('role','student')
						query1.greaterThan('updatedAt', res.data.updatedAt)
						query1.count().then(s1res=>{
							self.myscore.index = sres+s1res
						})
					})
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
				// userQuery.descending('score')
				// userQuery.skip((this.page - 1) * this.pageSize)
				userQuery.limit(this.pageSize)
				userQuery.find().then(res=>{
					if(res.length > 0) {
						self.status = 'loadmore'
						self.scoreList = self.scoreList.concat(res)
						// console.log(self.scoreList);
					} else {
						self.status = 'nomore'
					}
				})
			},
			/* 点击头像显示积分记录 */
			handleScoreRecord(){
				uni.navigateTo({
					url:'../scorerecord/scorerecord'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfa;
	}
	.myPage .headView{
		position: fixed;
		top: 0;
		width: 100%;
		padding: 0 30rpx;
		margin-bottom: 18rpx;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 26rpx;
		color: rgba(53,32,38, 0.4);
		font-family: PingFangSC-Medium;
		display: flex;
		border-bottom: 2rpx solid #f2f2f2;
		background-color: #fbfbfa;
		z-index: 3;
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
		width: 100%;
		text-align: center;
		margin-top: 58rpx;
		margin-bottom: 58rpx;
		height: 36rpx;
		line-height: 36rpx;
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.4);
	}
	.btmScore{
		width: 100%;
		height: 110rpx;
		line-height: 110rpx;
		background-color: #ffffff;
		border-top: 2rpx solid #E3E3E3;
		position: fixed;
		bottom: 0;
	}
</style>
