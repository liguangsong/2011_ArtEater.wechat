<template>
	<TopNavbar title='积分记录' paddingTop="128">
		<view>
		<view class="scoreView">
			<view class="title">当前积分：</view>
			<view class="score">{{userInfo.score}}</view>
			<view class="intro">累计积分：{{userInfo.score_all?userInfo.score_all:userInfo.score}}</view>
		</view>
		<view class="recordView">
			<view class="title-info">
				<view class="left">
					<view class="red-block"></view>
					积分记录
				</view>
				<view class="right" @click="isShowBuyTips=true">查看积分规则</view>
			</view>
			<view class="recordItem" v-for="record in scoreRecord">
				<view class="left">
					<view class="title" v-if="record.channel=='exam'&&record.extend!='first'">答题赠送积分</view>
					<view class="title" v-if="record.channel=='exam'&&record.extend=='first'">首次答题赠送积分</view>
					<view class="title" v-if="record.channel=='signin'">签到赠送积分</view>
					<view class="title" v-if="record.channel=='shop' && record.score > 0">消费赠送积分</view>
					<view class="title" v-if="record.channel=='shop' && record.score < 0">消费扣除积分</view>
					<view class="title" v-if="record.channel=='share'">分享拉新赠送积分</view>
					<view class="time">{{record.createdDate}}</view>
				</view>
				<view class="right" v-if="record.score>0">+{{record.score}}</view>
				<view class="right" v-else>{{record.score}}</view>
			</view>
			<view class="loadmore" v-if="scoreRecord.length >= pageSize">
				<u-loadmore @loadmore="handleLoadMore" :status="status" :load-text="loadText" />
			</view>
		</view>
		<!--购买须知-->
		<u-popup v-model="isShowBuyTips" height="774rpx" width="578rpx" :closeable="false" mode="center" border-radius="24">
			<view class="buylView">
				<view class="title">
					<text>
						在小程序中存在多种积分的获取方式，以下介绍获取积分的四种方式：
					</text>
				</view>
				<view class="tips">
					<view class="tips-item">
						<view class="tips-item-title">
							1、签到积分：
						</view>
						<text>每次签到可获得{{signUpScore}}积分，\n</text>
						<text>每天只能签到一次。</text>
					</view>
					<view class="tips-item">
						<view class="tips-item-title">
							2、刷题积分：
						</view>
						<text>首次完成一道题可获得{{firstExamScore}}积分，\n</text>
						<text>积分，不限制刷题的重复次数。</text>
					</view>
					<view class="tips-item">
						<view class="tips-item-title">
							3、分享拉新积分：
						</view>
						<text>每成功引入一名新用户，可获得{{shareScore}}积分</text>
					</view>
					<view class="tips-item">
						<view class="tips-item-title">
							4、消费积分：
						</view>
						<text>每消费1元，可获得{{shopScore}}积分</text>
					</view>
				</view>
				<view class="power">
					<view>注：</view>
					<view>
						积分获取规则会不定期进行修改
					</view>
					<view>
						最终解释权归食艺兽@所有。
					</view>
				</view>
			</view>
			<view @click="isShowBuyTips=false" class="btnActions" style='position: absolute; bottom: 0; width: 100%; height:78rpx;text-align: center;font-size: 24rpx;border-top:2rpx solid rgba(0,0,0,.1);line-height:78rpx;'>
				<text>确定</text>
			</view>
		</u-popup>
		</view>
	</TopNavbar>
</template>

<script>
	import {dateFormat} from '../../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
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
				isShowBuyTips: false,
				userInfo: {},
				scoreRecord: [],
				signUpScore: 0,
				firstExamScore: 0,
				secondExamScore: 0,
				shareScore: 0,
				shopScore: 0,
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {
			var self = this

			uni.getStorage({
				key:'userInfo',
				success:function(res){
					self.userInfo = res.data
					self.bindScoreRecords()
				}
			})
			
			self.Parse.Config.get().then(_config=>{
				self.signUpScore = _config.get('signUpScore')
				self.firstExamScore = _config.get('firstExamScore')
				self.secondExamScore = _config.get('secondExamScore')
				self.shareScore = _config.get('shareScore')
				self.shopScore = _config.get('shopScore')
			})
		},
		methods: {
			bindScoreRecords() {
				var self = this
				var scoreRecord = new self.Parse.Query('ScoreRecord')
				scoreRecord.equalTo('openid', self.userInfo.openid)
				scoreRecord.descending('createdAt')
				scoreRecord.skip((this.page - 1) * this.pageSize)
				scoreRecord.limit(this.pageSize)
				scoreRecord.find().then(record=>{
					record.forEach(item=>{
						item.set('createdDate', dateFormat(item.createdAt,'yyyy-MM-dd HH:mm:ss'))
					})
					if(record.length > 0) {
						self.status = 'loadmore'
						self.scoreRecord = self.scoreRecord.concat(record)
					} else {
						self.status = 'nomore'
					}
				})
			},
			handleLoadMore() {
				this.status = 'loading'
				this.page= this.page+1
				this.bindScoreRecords()
			}
		}
	}
</script>

<style>
	.title-info .right {
		font-size: 20rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0,0,0,.4);
		line-height: 28rpx;
		text-decoration: underline;
	}
	.scoreView{
		margin: 0 auto;
		margin-bottom: 42rpx;
		width: 690rpx;
		height: 298rpx;
		background-color: #ffffff;
		box-shadow: 0 4rpx 10rpx 0 rgba(0,0,0,0.06);
		border-radius: 24rpx;
	}
	.scoreView .title{
		line-height: 48rpx;
		margin-left: 36rpx;
		margin-top: 36rpx;
		font-stretch: normal;
		letter-spacing: 0rpx;
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(0,0,0,.9);
		line-height: 44px;
	}
	.scoreView .score{
		width: 100%;
		text-align: center;
		font-size: 80rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ED3535;
		line-height: 112rpx;
		margin0top: 18rpx;
	}
	.scoreView .intro{
		text-align: center;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0,0,0,.5);
		line-height: 34rpx;
	}
	.recordView{
		width: 100%;
	}
	.recordView .headView{
		padding: 18rpx 46rpx 22rpx 40rpx;
		height: 88rpx;
		line-height: 48rpx;
		display: inline-flex;
		width: 100%;
	}
	.recordView .headView .title {
		font-family: PingFangSC-Medium;
		width: 170rpx;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		font-weight: bold;
	}
	.recordView .headView .ruleView{
		flex: 1;
		text-align: right;
		font-family: PingFangSC-Medium;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
	}
	.recordView .recordItem{
		height: 140rpx;
		margin-left: 40rpx;
		border-bottom: 2rpx solid #f1f1f1;
		display: flex;
		padding-top: 32rpx;
	}
	.recordView .recordItem .left{
		flex: 1;
	}
	.recordView .recordItem .left .title{
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(0,0,0,.9);
		line-height: 44rpx;
	}
	.recordView .recordItem .left .time{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.5);
		line-height: 28rpx;
		margin-top: 12rpx;
	}
	.recordView .recordItem .right{
		text-align: right;
		width: 200rpx;
		padding-right: 70rpx;
		line-height: 80rpx;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #ED3535;
	}
	
	.buylView {
		padding: 42rpx 48rpx;
	}
	.buylView .title{
		width: 100%;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
	}
	
	.buylView .tips{
		margin-top: 32rpx;
	}
	.buylView .tips .tips-item {
		font-size: 24rpx;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
	}
	.buylView .tips .tips-item text{
		font-family: PingFangSC-Regular, PingFang SC;
		color: rgba(0,0,0,.7);
	}
	.buylView .power{
		margin-top: 16rpx;
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,0.5);
		line-height: 28rpx;
	}
	.buylView .btnActions{
		height: 78rpx;
	}
	.buylView .btnActions button{
		width: 100%;
		height: 48rpx;
		line-height: 48rpx;
		/* border-radius: 46rpx; */
		background-color: #ffffff;
		color: #352026;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
	}
	.buylView .btnActions button::after{
		border: 0;
	}
	
	.loadmore{
		margin: 50rpx 0;
	}
</style>
