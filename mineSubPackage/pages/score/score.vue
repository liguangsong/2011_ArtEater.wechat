<template>
	<TopNavbar title='积分排行榜' bg='#fff' paddingTop='-1' :tabbarBg='false'>
		<view class="myPage">
			<view class="headView">
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/sourcebg.png" mode=""></image>
				<view class="headView-title">
					<view>
						<view style='margin-right: 128rpx;'>排名</view>
						<view>昵称</view>
					</view>
					<view>积分</view>
				</view>
			</view>
			<view class="scoreView">
				<view class="scoreItem" v-for="(user,index) in scoreList">
					<view v-if="index==0" class="index first">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/first.png" mode=""></image>
					</view>
					<view v-if="index==1" class="index second">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/second.png" mode=""></image>
					</view>
					<view v-if="index==2" class="index third">
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/third.png" mode=""></image>
					</view>
					<view v-if="index>2" class="index">{{index + 1}}</view>
					<view class="cont">
						<view class="headIcon">
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
				<view style="height: 134rpx;"></view>
				
			</view>
			<view class="btmScore">
				
				<view class="scoreItem">
					<view class="index">{{myscore.index + 1}}</view>
					<view class="cont">
						<view class="headIcon" @click="handleScoreRecord">
							<image :src="myscore.avatarUrl"></image>
						</view>
						<view class="nickName regular">{{myscore.nickName}}</view>
						<view class="score regular">{{myscore.score}}</view>
					</view>
				</view>
				<image class='paiming' src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/source-paiming.png"></image>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				page: 1,
				pageSize: 50,
				status: 'loadmore',
				loadText: {
					loadmore: '点击加载更多',
					loading: '正在拼命加载中',
					nomore: '没有更多了'
				},
				scoreList: [],
				myscore: null
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {
			this.bindData()

			var self = this
			uni.getStorage({
				key: 'userInfo',
				success(res) {
					res.data.index = -1
					self.myscore = res.data
					var query = new self.Parse.Query(self.Parse.User)
					query.equalTo('role', 'student')
					// query.descending('score','updatedAt')
					query.greaterThan('score', res.data.score)
					query.count().then(sres => {
						var query1 = new self.Parse.Query(self.Parse.User)
						query1.equalTo('score', res.data.score)
						query1.equalTo('role', 'student')
						query1.greaterThan('updatedAt', res.data.updatedAt)
						query1.count().then(s1res => {
							self.myscore.index = sres + s1res
						})
					})
				}
			})
		},
		methods: {
			handleLoadMore() {
				this.status = 'loading'
				this.page = this.page + 1
				this.bindData()
			},
			bindData() {
				var self = this
				var userQuery = new this.Parse.Query(this.Parse.User)
				userQuery.equalTo('role', 'student')
				userQuery.descending('score', 'updatedAt')
				// userQuery.descending('score')
				// userQuery.skip((this.page - 1) * this.pageSize)
				userQuery.limit(this.pageSize)
				userQuery.find().then(res => {
					if (res.length > 0) {
						self.status = 'loadmore'
						self.scoreList = self.scoreList.concat(res)
						// console.log(self.scoreList);
					} else {
						self.status = 'nomore'
					}
				})
			},
			/* 点击头像显示积分记录 */
			handleScoreRecord() {
				uni.navigateTo({
					url: '../scorerecord/scorerecord'
				})
			}
		}
	}
</script>

<style>
	.myPage .headView {
		position: relative;
		width: 100%;
		height: 482rpx;
	}

	.myPage .headView image {
		position: absolute;
		top: 0;
		z-index: 100;
		width: 100%;
		height: 100%;
	}

	.myPage .headView .headView-title {
		position: absolute;
		bottom: 102rpx;
		z-index: 102;
		padding: 0 72rpx 0 60rpx;
		width: 100%;
		display: flex;
		font-size: 24rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 34rpx;
		justify-content: space-between;
	}

	.myPage .headView .headView-title view {
		display: flex;
	}

	.myPage .scoreView {
		height: calc(100vh - 482rpx);
		position: relative;
		top: -80rpx;
		z-index: 200;
		border-top-right-radius: 24rpx;
		border-top-left-radius: 24rpx;
		background: #fff;
		overflow-y: auto;
	}

	.myPage .scoreItem {
		display: flex;
		align-items: center;
		height: 134rpx;
		line-height: 134rpx;
	}

	.myPage .scoreItem .index {
		flex: 0 1 168rpx;
		font-size: 30rpx;
		color: rgba(53, 32, 38, 0.7);
		text-align: right;
		/* text-align: center; */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.myPage .scoreItem image {
		width: 72rpx;
		height: 72rpx;
	}

	.myPage .scoreItem .index.first {
		color: #ED3535;
		font-size: 38rpx;
	}

	.myPage .scoreItem .index.second {
		color: #FF6867;
		font-size: 38rpx;
	}

	.myPage .scoreItem .index.third {
		color: #FF9D83;
		font-size: 38rpx;
	}

	.myPage .scoreItem .cont {
		border-bottom: 2rpx solid #f4f4f4;
		flex: 1;
		display: flex;
		padding-right: 48rpx;
	}

	.myPage .scoreItem .cont .headIcon {
		flex: 0 1 68rpx;
	}

	.myPage .scoreItem .cont .headIcon image {
		display: inline-block;
		vertical-align: middle;
		width: 68rpx;
		height: 68rpx;
		border-radius: 50%;
		left: 0;
		margin-right: 20rpx;
	}

	.myPage .scoreItem .cont .nickName {
		flex: 1;
		color: rgba(53, 32, 38, 0.69);
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
	}

	.myPage .scoreItem .cont .score {
		width: 100rpx;
		text-align: right;
		color: rgba(20, 58, 68, 0.69);
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
	}

	.myPage .scoreItem .cont .score.first {
		color: #ff6867;
	}

	.myPage .scoreItem .cont .score.second {
		color: rgba(255, 100, 45, 0.7);
	}

	.myPage .scoreItem .cont .score.third {
		color: rgba(255, 138, 0, 0.7);
	}

	.loadmore {
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

	.btmScore {
		width: 100%;
		height: 134rpx;
		line-height: 134rpx;
		border-top: 2rpx solid #E3E3E3;
		position: fixed;
		bottom: 0;
		color: #fff;
		z-index: 999999;
	}
	.btmScore .paiming {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.btmScore .scoreItem {
		position: relative;
		z-index: 100;
		font-size: 28rpx;
	}
	.btmScore .scoreItem .index {
		font-size: 32rpx;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 44rpx;
	}
	.btmScore .scoreItem .cont .nickName, .btmScore .scoreItem .cont .score {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
