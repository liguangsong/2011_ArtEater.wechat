<template>
	<view>
		<view class="resultView">
			<view class="tips">您的得分为：</view>
			<view class="scoreView">
				<view class="score">{{history.score}}</view>
				<view class="txt">分</view>
			</view>
			<view class="tips">及格分数为：{{history.pass_score}}</view>
			<view class="tips">满分分数为：{{history.allscore}}</view>
		</view>
		<view class="view1">
			<view class="title">答题卡</view>
			<view class="rView">
				<view @click="handleResultClick" :class="'resultItem '+ ((item.answer.length==0||item.answer==null)? '': (item.result?'right':'error'))" 
					v-for="(item, index) in history.answers" :data-index="index">{{index + 1}}</view>
			</view>
		</view>
		<button open-type="share" class="btnShare">分享</button>
		<button v-if="from=='exam'" @click="handHomePage" class="btnPrev">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				history:{},
				from:'',
				examId:''
			}
		},
		onLoad(options) {
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			if(options.from){
				this.from = options.from
			}
			if(options.eid){
				var self = this
				self.examId = options.eid
				const history = this.Parse.Object.extend("TestHistory")
				const query = new this.Parse.Query(history)
				query.get(options.eid).then(res => {
					self.history = res
				})
			}
			uni.showShareMenu({
				withShareTicket: true,
				  menus: ['shareAppMessage', 'shareTimeline']
			})
		},
		
		  /**
		   * 生命周期函数--监听页面隐藏
		   */
		onHide: function () {
			debugger
		},
		
		  /**
		   * 生命周期函数--监听页面卸载
		   */
		onUnload: function () {
			// var routers =  getCurrentPages()
			// var prevRouter = routers[routers.length-2]
			// if(prevRouter.route == 'pages/exam/exam'){
			// 	uni.navigateBack({
			// 		delta: 1
			// 	})
			// }
		},
		methods: {
			/*点击题目*/
			handleResultClick(e){
				var _index = e.currentTarget.dataset.index
				uni.navigateTo({
					url:'./testdetail?tid=' + this.examId + '&index=' + _index
				})
			},
			/*返回首页*/
			handHomePage(){
				uni.reLaunch({
					url:'/pages/exam/index'
				})
			}
		},
		/**
		   * 用户点击右上角分享
		   */
		onShareAppMessage: function (e) {
			return {
			  path: '/pages/exam/share?hid=' + this.history.id,
			  success: (res) => {
				// 分享成功
			  },
			  fail: (res) => {
				// 分享失败
			  }
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.resultView{
		padding-top: 52rpx;
		height: 412rpx;
		border-bottom: 2rpx solid #f2f2f2;
		margin: 0 30rpx;
	}
	.resultView .tips{
		padding-left: 78rpx;
		font-size: 26rpx;
		height: 42rpx;
		line-height: 42rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.resultView .scoreView{
		height: 154rpx;
		text-align: center;
		margin-bottom: 56rpx;
	}
	.resultView .scoreView .score{
		height: 154rpx;
		display: inline;
		font-size: 110rpx;
		font-weight: bold;
		color: #ff6867;
		font-family: PingFangSC-Medium;
	}
	.resultView .scoreView .txt{
		display: inline;
		font-size: 34rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.view1{
		padding-top:44rpx;
		padding-left: 4rpx;
	}
	.view1 .title{
		padding-left: 40rpx;
		font-size: 26rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.view1 .rView{
		margin-top: 26rpx;
	}
	.view1 .rView .resultItem{
		display: inline-block;
		margin-left: 36rpx;
		margin-top: 22rpx;
		width: 82rpx;
		height:82rpx;
		line-height:82rpx;
		text-align: center;
		border-radius: 50%;
		background-color: #fbfbfb;
		font-size: 34rpx;
		color: rgba(53,32,38,0.4);
		font-family: PingFangSC-Medium;
	}
	.view1 .rView .resultItem.error{
		background-color: #ffefef;
		color: rgba(250,81,81,0.8);
	}
	.view1 .rView .resultItem.right{
		background-color: #eaf1f4;
		color: #3CC0DA;
	}
	.btnShare{
		height: 92rpx;
		line-height: 92rpx;
		border-radius: 92rpx;
		background-color: #ff776f;
		border-radius: 94rpx;
		color: #ffffff;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		margin: 32rpx;
	}
	.btnPrev{
		height: 92rpx;
		line-height: 92rpx;
		border: 2rpx solid #ff776f;
		border-radius: 92rpx;
		background-color: #ffffff;
		border-radius: 94rpx;
		color: #ff776f;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
		margin: 32rpx;
	}
</style>
