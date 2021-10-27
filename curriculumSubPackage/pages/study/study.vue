<template>
	<view class='study'>
		<Navbar navbarBg='#fff' :height='height' title='课程' fontColor="#000" iconColor='#000'>
			<template v-slot:img>
				<image style='width: 100%;' src="../../../static/1.png" mode='aspectFill'></image>
			</template>
			<view class="head radius" :style='{top: height ? "-20rpx": 0}'>
				<view class="title">中国美术史重点精讲2</view>
				<view class="info">
					<view>
						<text class='studynum'>共16次课</text>
						<text>央美实验艺术考验</text>
					</view>
					<view class="teacher">
						<image src="../../../static/bg_null.png"></image>
						<text>王一山</text>
					</view>
				</view>
				<view class="tabber">
					<view :class='{text: !tabbar}' @click='tabbar = false'>详情</view>
					<view :class='{text: tabbar}' @click='tabbar = true'>目录</view>
				</view>
			</view>
			<view class="tab">
				<Timetable v-if='tabbar' />
				<Details v-else />
			</view>
		</Navbar>
	</view>
</template>

<script>
	import Timetable from './timetable.vue';
	import Details from './details.vue';
	import Navbar from '@/components/navBar/navbar.vue';
	export default {
		data() {
			return {
				height: '400rpx',
				tabbar: false,
				isVip: null
			}
		},
		components: {
			Timetable,
			Details,
			Navbar
		},
		onLoad(options) {
			this.isVip = options.isVip == 'true' ? true : false;
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.study {
		background: #f7f7f7;
		height: 100vh;
	}
	.head {
		height: 256rpx;
		background: #fff;
		padding: 0 48rpx;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.1);
	}
	.radius {
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		position: relative;
	}
  .title {
		padding: 28rpx 0;
		font-size: 44rpx;
		font-weight: 900;
	}
	.info {
		font-size: 24rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48rpx;
	}
	.info .studynum {
		margin-right: 30rpx;
	}
	.info image {
		width: 48rpx;
		height: 48rpx;
	}
	.teacher {
		display: flex;
		align-items: center;
	}
	.teacher image {
		margin-right: 16rpx;
	}
	.tabber {
		display: flex;
		justify-content: space-around;
		margin-top: 30rpx;
	}
	.tabber view {
		height: 48rpx;
	}
	.tab {
		margin-top: 30rpx;
	}
	.text {
		color: #D81E1F;
		border-bottom: 3px solid #D81E1F;
	}
	
</style>
