<template>
	<view class="myPage">
		<view class="testItem" v-for="(test) in tests">
			<view class="testCon">
				<view class="testName">{{test.test_name}}</view>
				<view class="time">考试时间：{{test.minutes}}分钟</view>
			</view>
			<view class="action">
				<u-button  @click="handleTestClick" :data-item="test" type="primary">开始考试</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tests:[
					{ objectId:'fdjgysa', test_name:'期中考试', minutes:'45' },
					{ objectId:'sUJHljg8', test_name:'期末考试', minutes:'45' },
					{ objectId:'1Gkdlskl', test_name:'9月份考试', minutes:'45' },
				]
			}
		},
		onLoad() {			
			var self = this
			// const Subjects = this.Parse.Object.extend("Subjects")
			// const query = new this.Parse.Query(Subjects)
			// query.startsWith("parent_ID", "0")
			// query.find().then(list => {
			// 	self.subjects = list
			// })
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
					url:'./exam?tid=' //+item.objectId
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
		padding: 22rpx 36rpx;
	}
	.myPage{
		width: calc(100% - 80rpx);
		padding: 40rpx;
		background-color: #FFFFFF;
		border-radius: 46rpx;
	}
	.myPage .testItem{
		padding: 0 36rpx;
		display: flex;
		height: 106rpx;
		line-height: 106rpx;
		border-bottom: 1rpx solid #eeeeee;
	}
	.myPage .testItem:last-child{
		border: 0;
	}
	.myPage .testItem .testCon{
		flex: 1;
	}
	.myPage .testItem .testCon .testName{
		height: 50rpx;
		line-height: 50rpx;
		width: 100%;
	}
	.myPage .testItem .testCon .time{
		height: 30rpx;
		line-height: 30rpx;
		width: 100%;
	}
	.myPage .testItem .action{
		width: 130rpx;
		text-align: right;
	}
	.myPage .testItem .action u-button{
		display: inline-block;
	}
</style>
