<template>
	<view class="details">
		<view class="header">
			<view class='mp4'>
				<k-video :src='url'></k-video>
			</view>
			<view class="info">
				<view class="info-title">魏晋南北朝美术</view>
				<view class="bottom">
					<view class="teacher">
						<image src="../../static/audio.png" mode=""></image>
						<text>王一山</text>
					</view>
					<view class="btn">
						<view>
							<view class="img">
								<image src="../../static/video.png" mode=""></image>
							</view>
							<text>课表</text>
						</view>
						<view>
							<view class="img">
								<image src="../../static/video.png" mode=""></image>
							</view>
							<text>分享</text>
						</view>
						<view>
							<view class="img">
								<image src="../../static/video.png" mode=""></image>
							</view>
							<text>收藏</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="type">
				<k-audio v-if='item.type == "mp3"' :src='url'></k-audio>
			</view>
		</view>
		
		<view class="html">
			<view v-html='html'></view>
		</view>
		<view class="recommend">
			<view class="recommend-item">
				<view class='font'>
					<view class="title">中国美术史重点精讲</view>
					<view class="info">
						<text>共36次课</text>
						<text>央美实验艺术考研</text>
					</view>
				</view>
				<view class="teacher">
					<view class='img'>
						<image src='../../static/audio.png'></image>
						<text>王一山</text>
					</view>
					<view class="btn">
						<text>学习</text>
					</view>
				</view>
			</view>
		</view>
		<view class="timetable">
				<view class="bg"></view>
				<view class="">
					<view class="icon">
						<uni-icons type=""></uni-icons>
					</view>
				</view>
				<view class="timetable-title">
					<text>中国美术史重点精讲系列课程</text>
				</view>
				<view class="list">
					<view class="item">
						<view class="">
							<text>课程二级标题名字名称</text>
						</view>
						<view class="">
							<text>当前课程</text>
							<image src="../../static/audio.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="close">
					<view class="btn">
						关闭
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import kAudio from '../../../components/audio/audio.vue'
	import kVideo from '../../../components/video/kVideo.vue'
	export default {
		components: {
			kAudio, kVideo
		},
		data() {
			return {
				html: '<p>sd</p>',
				audioPlay: false,
				item: {},
				url: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
			}
		},
		onLoad(option) {
			this.item = {
				label: '课程二级标题名字名称',
				// type: Math.random() > 0.5 ? 'mp3' : 'mp4',
				type: 'mp3'
			}
		}
	}
</script>

<style>
	.details {
		position: relative;
		background: #fff;
	}
	.header {
		position: fixed;
		width: 100%;
		top: 0;
	}
	.header .info {
		padding: 48rpx 24rpx 0 48rpx;
	}
	
	
	/* .header .header-title {
		font-size: 36rpx;
		line-height: 50rpx;
		margin: 14rpx 0;
		color: #D81E1F;
		font-weight: 600;
	}
	.header .bottom {
		display: flex;
		justify-content: space-between;
		align-content: center;
		font-size: 20rpx;
		height: 64rpx;
		line-height: 64rpx;
	}
	.header .bottom .teacher {
		flex: 0 1 278rpx;
		display: flex;
		align-content: center;
	}
	.header .bottom .teacher image {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	.header .bottom .btn {
		flex: 1 0 auto;
		display: flex;
		justify-content: space-between;
	}
	.header .bottom .btn > view {
		display: flex;
		align-content: center;
	}
	.header .bottom .btn .img {
		width: 64rpx;
		height: 64rpx;
		border: 1px dashed #ccc;
		padding: 7rpx;
	}
	.header .bottom .btn image {
		width: 50rpx;
		height: 50rpx;
	}
	.header .bottom text {
		
	} */
	
	.type {
		
	}
	
	.html {
		
	}
	
	.recommend {
		
	}
	.recommend .recommend-title {
		
	}
	.recommend .recommend-item {
		
	}
	.recommend .recommend-item .font {
		
	}
	.recommend .recommend-item .font .title {
		
	}
	.recommend .recommend-item .font .info {
		
	}
	.recommend .recommend-item .teacher {
		
	}
	.recommend .recommend-item .teacher .img {
		
	}
	.recommend .recommend-item .teacher .btn {
		
	}
	
	.timetable {
		
	}
	.timetable .bg {
		
	}
	.timetable .icon {
		
	}
	.timetable .timetable-title {
		
	}
	.timetable-title .list {
		
	}
	.timetable-title .list .item {
		
	}
	.timetable-title .list .item .item-title {
		
	}
	.timetable-title .list .item .item-icon {
		
	}
	.timetable-title .close{
		
	}
	.timetable-title .close view{
		
	}
</style>
