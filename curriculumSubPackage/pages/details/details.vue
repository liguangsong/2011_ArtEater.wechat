<template>
	<view class="details">
		<view class="header">
			<view class="title">
				<text>魏晋南北朝美术</text>
				<view class="bottom">
					<view class="teacher">
						<image src="../../static/audio.png" mode=""></image>
						<text>王一山</text>
					</view>
					<view class="btn">
						<view>
							<image src="../../static/video.png" mode=""></image>
							<text>课表</text>
						</view>
						<view>
							<image src="../../static/video.png" mode=""></image>
							<text>课表</text>
						</view>
						<view>
							<image src="../../static/video.png" mode=""></image>
							<text>课表</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="type">
			<k-audio v-if='item.type == "mp3"' :src='url'></k-audio>
			<k-video v-else :src='url'></k-video>
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
			// console.log(JSON.parse(decodeURIComponent(option.item)))
			this.item = {
				label: '课程二级标题名字名称',
				// type: Math.random() > 0.5 ? 'mp3' : 'mp4',
				type: 'mp3'
			}
		}
	}
</script>

<style>
	.video-info {
		border-bottom: 10rpx solid #ccc;
	}
	.video-info video {
		width: 100%;
	}
	.video-info .content {
		width: 100;
		padding: 20rpx;
	}
	.content .title {
		font-size: 28rpx;
		font-weight: 900;
	}
	.content .teacher {
		height: 80rpx;
		display: flex;
		align-items: center;
	}
	.content .teacher image {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}
	.explain {
		width: 100%;
		padding: 20rpx;
		box-sizing: border-box;
		text-align: center;
	}
</style>
