<template>
	<view class="myView">
		<view class="head">{{title}}</view>
		<view class="body">{{content}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mid:'',
				title:'',
				content:''
			}
		},
		onLoad(options) {
			if(options.mid){
				this.mid = options.mid
			}
			var self = this
			// 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
			const eventChannel = this.getOpenerEventChannel()
			eventChannel.on('content', function(res) {
				self.title = res.title
				self.content = res.data
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
			
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.myView{
		padding: 46rpx;
	}
	.head {
		height: 52rpx;
		line-height: 52rpx;
		margin:12rpx 0;
		font-size: 38rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.body{
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
</style>
