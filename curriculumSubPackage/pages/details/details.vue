<template>
	<view class="details" :class='{"details-scroll": timetable}'>
		<view class="header">
			<view class="tabbar" :style='{height: tabbarheight+"rpx"}'>
				<view class="navbar" :style='{height: navbarheight + "rpx", top: tabbarheight - navbarheight + "rpx"}'>
					<view class="icon">
						<u-icon name="arrow-left" color="#000" size="34rpx"></u-icon>
					</view>
				</view>
			</view>
			<view class='mp4'>
				<k-video :src='url'></k-video>
			</view>
			<view class="info">
				<view class="info-title">魏晋南北朝美术</view>
				<view class="bottom">
					<view class="teacher">
						<image src="../../static/audio.png"></image>
						<text>王一山{{timetable}}</text>
					</view>
					<view class="btn">
						<view>
							<view class="img" @click='timetablefn'>
								<image src="../../static/video.png"></image>
							</view>
							<text>课表</text>
						</view>
						<view>
							<view class="img">
								<image src="../../static/video.png"></image>
							</view>
							<text>分享</text>
						</view>
						<view>
							<view class="img">
								<image src="../../static/video.png"></image>
							</view>
							<text>收藏</text>
						</view>
					</view>
				</view>
			</view>
			<view class="mp3">
				<k-audio :play.sync='play' :src='src'></k-audio>
			</view>
			<view class="br"></view>
		</view>
		<view class="html" :style='{paddingTop: infoTop + 4 + "px"}'>
			<view v-html='html'></view>
		</view>
		<view class="recommend">
			<view class="recommend-title">
				推荐学习
			</view>
			<view class="recommend-item" v-for='(item,i) in [1,2,3]' :key='i'>
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
		<view class="timetable" :class='{"show-timetable": timetable}'>
			<view class="bg" @click='timetable = false'></view>
			<view class="content">
				<view class="content-header">
					<view class="icon">
						<u-icon name="arrow-up"></u-icon>
					</view>
					<view class="timetable-title">
						<text>中国美术史重点精讲系列课程</text>
					</view>
				</view>
				<view class="list">
					<view class="item" v-for='(item,i) in [1,2,4,5,6,7,8,89,5,3]' :key='i' :class='{active: i==2}'>
						<view class="item-title">
							<text>课程二级标题名字名称</text>
						</view>
						<view class="item-type">
							<text v-if='i==2'>当前课程</text>
							<image src="../../static/audio.png" mode=""></image>
						</view>
					</view>
				</view>
				<view class="close">
					<view class="btn" @click='timetable = false'>
						关闭
					</view>
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
				tabbarheight: 0,
				navbarheight: 0,
				infoTop: 0,
				timetable: false,	// 课表是否显示
				html: '<p>术查市资建务周二非称向给子走选。</p><img style="width:100%;" src="https://img1.baidu.com/it/u=127595235,810379725&fm=26&fmt=auto"></img>',
				play: false,
				item: {},
				src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				url: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4',
			}
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					let custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight
					this.tabbarheight = customBar * 2;
					this.navbarheight = customBar * 2 - e.statusBarHeight * 2;
				}
			})
		},
		mounted() {
			const query = uni.createSelectorQuery().in(this);
			query.select('.header').boundingClientRect(data => {
				this.infoTop = data.height;
			}).exec();
		},
		methods: {
			timetablefn() {
				console.log(12);
				this.timetable = true
			}
		}
	}
</script>

<style>
	rich-text {
		line-height: 80rpx;
	}
	.details {
		position: relative;
		background: #fff;
	}
	.details-scroll {
		height: 100vh;
		overflow: hidden;
	}
	.header {
		position: fixed;
		width: 100%;
		background: #fff;
	}
	.header .tabbar {
		width: 100%;
		overflow: hidden;
	}
	.header .tabbar .navbar {
		position: absolute;
		width: 100%;
		z-index: 1000;
		display: flex;
		align-items: center;
	}
	.header .tabbar .navbar .icon {
		padding-left: 34rpx;
	}
	.header .info {
		padding: 48rpx 24rpx 28rpx 48rpx;
	}
	.header .info-title {
		font-size: 36rpx;
		line-height: 50rpx;
		color: #D81E1F;
		font-weight: 600;
		margin-bottom: 14rpx;
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
	.mp3 {
		margin: 0 16rpx 28rpx;
		height: 148rpx;
		border-radius: 24rpx;
		padding: 28rpx;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.05), 0 -4rpx 8rpx 0 rgba(0,0,0,0.05);
	}
	.br {
		border-bottom: 1px solid #ccc;
		margin: 0 24rpx;
	}
	
	.html {
		width: 100%;
		/* margin-top: 200rpx; */
		padding: 28rpx 40rpx;
		line-height: 40rpx;
		font-size: 24rpx;
		overflow: hidden;
		box-shadow: 0 0 8rpx 2rpx rgba(0,0,0,0.08);
	}
	.html image, .html img {
		width: 100%;
	}
	
	.recommend {
		padding: 48rpx 30rpx;
		background: rgba(0, 0, 0, 0.05);
	}
	.recommend .recommend-title {
		font-size: 28rpx;
		font-weight: 500;
		margin-bottom: 24rpx;
	}
	.recommend .recommend-title:before {
		content: "";
		display: inline-block;
		width: 10rpx;
		height: 24rpx;
		margin-right: 8rpx;
		background: #D81E1F;
		
	}
	.recommend .recommend-item {
		width: 690rpx;
		height: 220rpx;
		background: #fff;
		box-shadow: 0 4rpx 10rpx 0 rgba(0,0,0,0.06);
		border-radius: 24rpx;
		padding: 32rpx 48rpx 20rpx 40rpx;
		margin-bottom: 24rpx;
	}
	.recommend .recommend-item .font {
		margin-bottom: 40rpx;
	}
	.recommend .recommend-item .font .title {
		font-size: 32rpx;
		font-weight: 500;
		line-height: 44rpx;
	}
	.recommend .recommend-item .font .info {
		font-size: 20rpx;
		font-weight: 400;
		color: #555;
		line-height: 28rpx;
		margin-top: 8rpx;
	}
	.recommend .recommend-item .font .info {
		font-size: 20rpx;
		font-weight: 400;
		color: #555;
		line-height: 28rpx;
	}
	.recommend  .info text:first-child {
		margin-right: 10rpx;
	}
	.recommend .recommend-item .teacher {
		display: flex;
		justify-content: space-between;
		height: 48rpx;
		font-size: 20rpx;
		line-height: 48rpx;
		align-items: center;
	}
	.recommend .recommend-item .img {
		display: flex;
		align-content: center;
	}
	.recommend .recommend-item .teacher image {
		width: 48rpx;
		height: 48rpx;
		border-radius: 50%;
		margin-right: 12rpx;
	}
	.recommend .recommend-item .teacher .btn {
		color: #FF6867;
		width: 100rpx;
		height: 40rpx;
		border-radius: 20rpx;
		border: 2rpx solid #FF6867;
		text-align: center;
		line-height: 40rpx;
	}
	.show-timetable {
		display: block !important;
	}
	.show-timetable view.content {
		transform: translateY(0);
		transiiton: 1s;
	}
	.show-timetable view.bg {
		display: block;
	}
	.timetable {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 10000;
		overfloy: hidden;
		display: none;
	}
	.timetable .bg {
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
		overflow: hidden;
		display: none;
	}
	.timetable .content {
		position: absolute;
		width: 100%;
		height: 836rpx;
		background: #fff;
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		bottom: 0;
		overflow: hidden;
		transform: translateY(100%);
		transition: 1s;
	}
	.timetable .content-header {
		position: absolute;
		top: 0;
		padding-top: 24rpx;
		height: 160rpx;
		width: 100%;
		background: #fff;
	}
	.timetable .icon {
		width: 100%;
		text-align: center;
		font-size: 20rpx;
		opacity: .2;
	}
	.timetable .timetable-title {
		padding-top: 40rpx;
		padding-left: 48rpx;
		font-size: 28rpx;
		font-weight: 600;
		color: #D81E1F;
		line-height: 40rpx;
	}
	.timetable .list {
		height: 512rpx;
		margin-top: 160rpx;
		padding-left: 48rpx;
		overflow-y: auto;
	}
	.timetable .list .item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 84rpx;
		border-bottom: 1px solid rgba(0,0,0,.1);
		font-size: 24rpx;
		color: rgba(0,0,0,.7);
	}
	.timetable .list .item .item-type {
		margin-right: 20rpx;
	}
	.timetable .list .item .item-type text {
		margin-right: 30rpx;
	}
	.timetable .list .item .item-type image {
		width: 24rpx;
		height: 24rpx;
		vertical-align: middle;
	}
	.timetable .list view.active {
		font-size: 24rpx;
		font-weight: 600;
		color: #000000;
	}
	.timetable .list view.active .item-type text{
		font-size: 16rpx;
		opacity: .3;
	}
	.timetable .close {
		height: 164rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.timetable .close view{
		width: 690rpx;
		height: 94rpx;
		line-height: 94rpx;
		font-size: 34rpx;
		font-weight: 600;
		color: #D81E1F;
		text-align: center;
		border-radius: 46rpx;
		border: 2rpx solid #D81E1F;
	}
</style>
