<template>
	<view class="myPage">
		<view class="testItem" v-for="(test) in tests">
			<view class="testCon">
				<view class="testName">{{test.test_paper_name}}</view>
				<view class="time">考试时间：{{test.time_count}}分钟</view>
			</view>
			<view class="action">
				<!-- <u-button  @click="handleTestClick" :data-item="test" type="primary">开始考试</u-button> -->
				<button @click="handleTestClick" :data-item="test">
					<image src="../../static/icon/icon_pencle_red.png"></image>
					开始考试
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tests:[]
			}
		},
		onLoad() {			
			var self = this
			const exams = this.Parse.Object.extend("ExamPaper")
			const query = new this.Parse.Query(exams)
			query.find().then(list => {
				self.tests = list
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
			handleTestClick(e){
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'./exam?tid=' + item.objectId
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
		padding: 30rpx;
	}
	.myPage{
		width: calc(100% - 80rpx);
	}
	.myPage .testItem{
		padding-left: 38rpx;
		display: flex;
		height: 140rpx;
		line-height: 140rpx;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.myPage .testItem .testCon{
		flex: 1;
		padding: 28rpx 0;
	}
	.myPage .testItem .testCon .testName{
		height: 48rpx;
		line-height: 48rpx;
		width: 100%;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		font-weight: bold;
		color: #352026;
	}
	.myPage .testItem .testCon .time{
		height: 36rpx;
		line-height: 36rpx;
		width: 100%;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.myPage .testItem .action{
		width: 200rpx;
		text-align: right;
	}
	.myPage .testItem .action button{
		display: inline-block;
		vertical-align: middle;
		width: 190rpx;
		height: 74rpx;
		border-radius: 74rpx;
		border: 2rpx solid #ff6867;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #ff5454;
	}
	.myPage .testItem .action button image{
		width: 26rpx;
		height: 26rpx;
		display: inline-block;
		vertical-align: middle;
	}
</style>
