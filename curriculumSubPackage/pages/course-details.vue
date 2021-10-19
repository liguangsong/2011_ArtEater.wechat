<template>
	<view class="accuracy">
		<view class="video-info">
			<video
				id="myVideo"
				:src='url'
				controls>
			</video>
			<!-- <a :href='url'>地方</a> -->
			<view class="content">
				<text class='title'>课题二级标题名字名称</text>
				<view class="teacher">					
					<image src="../../static/bg_null.png"></image>
					<text>王一山</text>
				</view>
			</view>
		</view>
		<view class="explain">
			<image src="../../static/dajxbg.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
				url: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4'
			}
		},
		onLoad(option) {
			console.log(JSON.parse(decodeURIComponent(option.item)))
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
