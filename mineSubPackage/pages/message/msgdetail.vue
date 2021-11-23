<template>
	<TopNavbar title='消息详情' paddingTop="224">
	<view class="myView">
		<view class="head">{{title}}</view>
		<!-- <view class="date">发布日期：{{CreateTime}}</view> -->
		<view class="body">
			<text>{{content}}</text>
			<!-- <u-parse :html="content?content:''"></u-parse> -->
		</view>
	</view>
	</TopNavbar>
</template>

<script>
	// import {dateFormat} from '../../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				mid:'',
				CreateTime:'',
				title:'',
				content:''
			}
		},
		components: {
			TopNavbar
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

		},
		methods: {
			
		}
	}
</script>

<style>

	.myView{
		padding: 0 40rpx;
	}
	.head {		
		font-size: 36rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 50rpx;
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
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.8);
		line-height: 40rpx;
	}
</style>
