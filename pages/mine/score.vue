<template>
	<view class="myPage">
		<view class="scoreItem" v-for="(user,index) in scoreList">
			<view class="index">{{index + 1}}</view>
			<view class="headIcon">
				<image :src="user.avatarUrl"></image>
			</view>
			<view class="nickName">{{user.nickName}}</view>
			<view class="score">{{user.score}}</view>
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
		},
		methods: {
			handleLoadMore(){
				this.status = 'loading'
				this.page= this.page+1
				this.bindData()
			},
			bindData(){
				var self = this
				var userQuery = new this.Parse.Query("UserInfo")
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
	.myPage{
		padding: 40rpx;
	}
	.myPage .scoreItem{
		display: flex;
		height: 106rpx;
		line-height: 106rpx;
		border-bottom: 1rpx solid #eeeeee;
	}
	.myPage .scoreItem .index{
		width: 50rpx;
	}
	.myPage .scoreItem .headIcon{
		width: 128rpx;
	}
	.myPage .scoreItem .headIcon image{
		display: inline-block;
		vertical-align: middle;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
	.myPage .scoreItem .nickName{
		flex: 1;
	}
	.myPage .scoreItem .score{
		width: 100rpx;
		text-align: right;
	}
	.loadmore{
		margin: 20rpx 0;
	}
</style>
