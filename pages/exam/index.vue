<template>
	<view class="myPage">
		<!-- <view class="testView" v-if="tab=='tab1'">
			<view style="text-align: center;padding-top: 200rpx;">
				<view style="text-align: center;">
					<image mode="aspectFit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%8B%9F%E8%80%83%E8%AF%95%E7%A9%BA%E7%99%BD%E9%A1%B5%E6%8F%92%E5%9B%BE%403x.png" style="width:598rpx;height: 366rpx;"></image>
				</view>
				<view style="height: 50rpx;font-family: PingFangSC-Medium;font-size: 34rpx;color: #352026;margin-top: 84rpx;margin-bottom: 28rpx;">稍等... 一大堆试卷正在向你飞来</view>
			</view>
		</view> -->
		
		<view class="tabView">
			<view :class="'tabItem ' + (tab=='tab1'? 'curr':'')"  @click="tab = 'tab1'">
				<view class="title">单元测试</view>
				<view class="icon" v-if="tab=='tab1'">
					<image src="../../static/icon/icon_tab_bg.png"></image>
				</view>
			</view>
			<view :class="'tabItem ' + (tab=='tab2'? 'curr':'')"  @click="tab = 'tab2'">
				<view class="title">历年真题</view>
				<view class="icon" v-if="tab=='tab2'">
					<image src="../../static/icon/icon_tab_bg.png"></image>
				</view>
			</view>
		</view>
		<view class="testView" v-if="tab=='tab1'">
			<view v-if="tests&&tests.length==0" style="text-align: center;padding-top: 200rpx;">
				<view style="text-align: center;">
					<image mode="aspectFit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%8B%9F%E8%80%83%E8%AF%95%E7%A9%BA%E7%99%BD%E9%A1%B5%E6%8F%92%E5%9B%BE%403x.png" style="width:598rpx;height: 366rpx;"></image>
				</view>
				<view style="height: 50rpx;font-family: PingFangSC-Medium;font-size: 34rpx;color: #352026;margin-top: 84rpx;margin-bottom: 28rpx;">稍等... 一大堆试卷正在向你飞来</view>
			</view>
			<view v-else class="testItem" v-for="(test) in tests">
				<view class="testCon">
					<view class="testName">{{test.test_paper_name}}</view>
					<view class="time">考试时间：{{test.time_count}}分钟</view>
				</view>
				<view class="action">
					<button @click="handleTestClick" :data-item="test">
						<view class="icon">
							<image src="../../static/icon/icon_pencle_red.png"></image>
						</view>
						<view class="title">开始考试</view>
					</button>
				</view>
			</view>
		</view>
		<view class="testView" v-if="tab=='tab2'">
			<view v-if="tests1&&tests1.length==0" style="text-align: center;padding-top: 200rpx;">
				<view style="text-align: center;">
					<image mode="aspectFit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/%E6%A8%A1%E6%8B%9F%E8%80%83%E8%AF%95%E7%A9%BA%E7%99%BD%E9%A1%B5%E6%8F%92%E5%9B%BE%403x.png" style="width:598rpx;height: 366rpx;"></image>
				</view>
				<view style="height: 50rpx;font-family: PingFangSC-Medium;font-size: 34rpx;color: #352026;margin-top: 84rpx;margin-bottom: 28rpx;">稍等... 一大堆试卷正在向你飞来</view>
			</view>
			<view v-else class="testItem" v-for="(test) in tests1">
				<view class="testCon">
					<view class="testName">{{test.name}}</view>
				</view>
				<view class="action">
					<button @click="handleTestClick1" :data-item="test">
						<view class="icon">
							<image src="../../static/icon/icon_test_detail.png"></image>
						</view>
						<view class="title">查看试卷</view>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: 'tab1',
				tests:[],
				tests1: []
			}
		},
		onLoad() {			
			var self = this
			const exams = this.Parse.Object.extend("ExamPaper")
			const query = new this.Parse.Query(exams)
			query.ascending('createdAt')
			query.find().then(list => {
				self.tests = list
			})
			const OldExams = this.Parse.Object.extend("OldExams")
			const query1 = new this.Parse.Query(OldExams)
			query1.ascending('createdAt')
			query1.find().then(list => {
				self.tests1 = list
			})

		},
		methods: {
			handleTestClick(e){
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'./exam?tid=' + item.objectId
				})
			},
			handleTestClick1(e){
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'./oldexams?tid=' + item.objectId
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
		/* padding: 30rpx; */
	}
	.myPage{
		/* width: calc(100% - 80rpx); */
	}
	.tabView{
		padding: 20rpx 48rpx 10rpx 48rpx;
		display: flex;
		border-bottom: 4rpx solid #f4f4f4;
	}
	.tabView .tabItem{
		flex: 1;
		text-align: center;
		height: 50rpx;
	}
	.tabView .tabItem .title{
		height: 36rpx;
		font-family: PingFangSC-Medium;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
	}
	.tabView .tabItem.curr .title{
		color: #352026;
	}
	.tabView .tabItem .icon{
		width: 52rpx;
		height: 8rpx;
		text-align: center;
		display: inline-block;
		position: relative;
		top: -16rpx;
	}
	.tabView .tabItem .icon image{
		width: 52rpx;
		height: 8rpx;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		left: 0;
	}
	.testView{
		/* width: calc(100% - 30rpx); */
		padding-left: 30rpx;
		/* padding-top: 200rpx; */
		padding-bottom: 50rpx;
	}
	.testView .testItem{
		padding-left: 38rpx;
		display: flex;
		/* height: 140rpx; */
		line-height: 140rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.testView .testItem .testCon{
		flex: 1;
		padding: 28rpx 0;
	}
	.testView .testItem .testCon .testName{
		/* height: 48rpx; */
		line-height: 48rpx;
		width: 100%;
		font-size: 29rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #352026;
	}
	.testView .testItem .testCon .time{
		height: 36rpx;
		line-height: 36rpx;
		width: 100%;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.testView .testItem .action{
		width: 290rpx;
		text-align: right;
		padding-right: 30rpx;
	}
	.testView .testItem .action button{
		display: inline-block;
		vertical-align: middle;
		width: 190rpx;
		height: 74rpx;
		line-height: 70rpx;
		border-radius: 74rpx;
		border: 2rpx solid #ff6867;
		font-size: 0;
		font-family: PingFangSC-Medium;
		color: #ff5454;
		display: inline-flex;
		padding: 0;
		text-align: center;
	}
	.testView .testItem .action button::after{
		border: 0;
	}
	.testView .testItem .action button .icon{
		width: 34rpx;
		height: 74rpx;
		line-height: 70rpx;
		font-size: 0;
		width: 60rpx;
		text-align: right;
	}
	.testView .testItem .action button .icon image{
		width: 26rpx;
		height: 26rpx;
		display: inline-block;
		vertical-align: middle;
		margin-right: 8rpx;
	}
	.testView .testItem .action button .title{
		text-align: left;
		flex: 1;
		font-size: 26rpx;
	}
</style>
