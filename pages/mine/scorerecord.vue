<template>
	<view>
		<view class="scoreView">
			<view class="title">当前积分：</view>
			<view class="score">{{userInfo.score}}</view>
			<view class="intro">累计积分：{{userInfo.score_all?userInfo.score_all:userInfo.score}}</view>
		</view>
		<view class="recordView">
			<view class="headView">
				<view class="title">积分记录</view>
				<view class="ruleView" @click="isShowBuyTips=true">查看积分规则</view>
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
		<u-popup v-model="isShowBuyTips" height="960rpx" width="670rpx" :closeable="true" mode="center" border-radius="40">
			<view class="buylView">
				<view class="title">
					<text>
						在小程序中存在四种积分获取方式：
					</text>
				</view>
				<view class="tips">
					<text>
						1、签到积分：每次签到可获得{{signUpScore}}积分，每天只能签到一次。
						2、刷题积分：首次完成一道题可获得{{firstExamScore}}积分，重复刷题时每道题可获得{{secondExamScore}}积分，不限制刷题的重复次数。
						3、分享拉新积分：分享小程序内置的分享页面，会生成个人专属的拉新二维码，每成功引入一名新用户，可获得{{shareScore}}积分。
						4、消费积分：每消费1元，可获得{{shopScore}}积分。
						
						声明：小程序的积分获取规则会根据运营状况不定期进行修改，以维护社区良性健康发展为原则，并以站内消息的方式向每一个用户发布通知，最终解释权归运营方所有。
					</text>
				</view>
				<!-- <view class="btnActions">
					<button @click="isShowBuyTips=false">确定</button>
				</view> -->
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {dateFormat} from '../../js/common.js'
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
		onLoad() {
			var self = this
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
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
	page{
		background-color: #fbfbfa;
	}
	.scoreView{
		margin: 18rpx auto;
		padding-top: 40rpx;
		margin-bottom: 36rpx;
		width: 690rpx;
		height: 292rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(238, 160, 160, 0.05);
		border-radius: 40rpx;
	}
	.scoreView .title{
		height: 48rpx;
		line-height: 48rpx;
		margin-left: 36rpx;
		/* padding-top: 40rpx; */
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		font-weight: bold;
	}
	.scoreView .score{
		width: 100%;
		height: 108rpx;
		line-height: 108rpx;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 78rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867;
		font-weight: bold;
	}
	.scoreView .intro{
		height: 36rpx;
		line-height: 36rpx;
		text-align: center;
		font-family: PingFangSC-Medium;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
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
		font-family: PingFangSC-Medium;
		font-size: 30rpx;
		/* font-weight: bold; */
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
	}
	.recordView .recordItem .left .time{
		font-family: PingFangSC-Medium;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.4);
	}
	.recordView .recordItem .right{
		text-align: right;
		width: 200rpx;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #143a44;
		padding-right: 46rpx;
		line-height: 80rpx;
	}
	
	.buylView {
		width: 100%;
		padding: 64rpx 50rpx;
	}
	.buylView .title{
		width: 570rpx;
		height: 54rpx;
		font-family: PingFangSC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 54rpx;
		letter-spacing: 0rpx;
		color: #352026;
	}
	.buylView .tips{
		margin-top: 36rpx;
		width: 570rpx;
		height: 590rpx;
		font-family: PingFangSC-Regular;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 54rpx;
		letter-spacing: 0rpx;
		color: #352026;
	}
	.buylView .btnActions{
		margin-top: 70rpx;
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
