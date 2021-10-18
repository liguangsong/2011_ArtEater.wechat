<template>
	<view class="myView">
		<view class="head">{{title}}</view>
		<view class="date">发布日期：{{CreateTime}}</view>
		<view class="body">
			<text>{{content}}</text>
			<!-- <u-parse :html="content?content:''"></u-parse> -->
		</view>
	</view>
</template>

<script>
	// import {dateFormat} from '../../../js/common.js'
	export default {
		data() {
			return {
				mid:'',
				CreateTime:'',
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
				self.CreateTime = res.createdAt
				self.title = res.title
				self.content = res.data
			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
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
	.date{
		height: 50rpx;
		line-height: 50rpx;
		font-size: 26rpx;
		color: #143a44;
		font-family: PingFangSC-Medium;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.body{
		font-size: 30rpx;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
</style>
