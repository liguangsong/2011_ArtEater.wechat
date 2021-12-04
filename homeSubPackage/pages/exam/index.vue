<template>
	<TopNavbar title='模拟考试'>
		<view class="tabView">
			<view :class="'tabItem ' + (tab=='tab1'? 'curr':'')"  @click="tab = 'tab1'">
				<view class="title">单元测试</view>
				<view class="icon" v-if="tab=='tab1'">
					<view class='redhr'></view>
				</view>
			</view>
			<view :class="'tabItem ' + (tab=='tab2'? 'curr':'')"  @click="tab = 'tab2'">
				<view class="title">历年真题</view>
				<view class="icon" v-if="tab=='tab2'">
					<view class='redhr'></view>
				</view>
			</view>
		</view>
		<view class="testView" v-if="tab=='tab1'">
			<view v-if="tests&&tests.length==0" style="text-align: center;padding-top: 100rpx;">
				<view style="text-align: center;">
					<image mode="aspectFit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E9%A2%98%E5%BA%93%E7%A9%BA%E7%99%BD%E9%A1%B5.png" style="width:598rpx;height: 366rpx;"></image>
				</view>
				<view style="height: 50rpx;font-family: PingFangSC-Medium;font-size: 34rpx;color: #352026;margin-top: 84rpx;margin-bottom: 28rpx;">稍等... 一大堆试卷正在向你飞来</view>
			</view>
			<view v-else class="testItem" v-for="(test) in tests">
				<view class="testCon">
					<view class="testName">{{test.test_paper_name}}</view>
					<view class="time">考试时间：{{test.time_count}}分钟</view>
				</view>
				<view class="action" @click="handleTestClick(test)">
					<view class="title">开始考试</view>
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
					<view class="testName margin0">{{test.name}}</view>
				</view>
				<view class="action" @click="handleTestClick1(test)">
						<view class="title">查看试卷</view>
				</view>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				tab: 'tab1',
				tests:[],
				tests1: []
			}
		},
		components: {
			TopNavbar
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
				console.log(111111, e.id);
				uni.navigateTo({
					url:'./exam?tid=' + e.id
				})
			},
			handleTestClick1(e){
				uni.navigateTo({
					url:'./oldexams?tid=' + e.id
				})
			}
		}
	}
</script>

<style>
	.tabView{
		padding: 20rpx 0 40rpx 0;
		display: flex;
	}
	.tabView .tabItem{
		flex: 1;
		text-align: center;
	}
	.tabView .tabItem .title{
		font-size: 24rpx;
		font-weight: 600;
		color: #000000;
		line-height: 34rpx;
	}
	.tabView .tabItem.curr .title{
		color: #D81E1F;
	}
	.tabView .tabItem .icon{
		width: 48rpx;
		margin: 1px auto 0;
	}
	.tabView .tabItem .icon .redhr{
		width: 48rpx;
		height: 4rpx;
		background: #D81E1F;
		border-radius: 2rpx;
	}
	
	
	/* .testView{
		padding-left: 30rpx;
		padding-bottom: 50rpx;
	} */
	.testView .testItem{
		width: 690rpx;
		height: 146rpx;
		background: #FFFFFF;
		box-shadow: 0 4rpx 10rpx 0 rgba(0,0,0,0.06);
		border-radius: 24rpx;
		margin: 0 auto;
		margin-bottom: 24rpx;
		padding: 0 40rpx 0 48rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.testView .testItem .testCon{
		flex: 0 1 450rpx;
		padding: 28rpx 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.testView .testItem .testCon .testName{
		font-size: 32rpx;
		font-weight: 500;
		color: rgba(0,0,0,.8);
		line-height: 44rpx;
		margin-bottom: 8rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.testView .testItem .testCon .time{
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.5);
		line-height: 28rpx;
	}
	.testView .testItem .action{
		margin-right: 10rpx;
		flex: 0 1 136rpx;
		height: 40rpx;
		border-radius: 20rpx;
		border: 2rpx solid #FF6867;
		font-size: 20rpx;
		font-weight: 500;
		color: #FF6867;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.margin0 {
		margin-bottom: 0;
	}
</style>
