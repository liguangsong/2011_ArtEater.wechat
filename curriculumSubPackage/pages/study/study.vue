<template>
	<view class='study'>
		<view class="head">
			<view class="title">中国美术史重点精讲</view>
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
				<text :class='{text: !tabbar}' @click='tabbar = false'>详情</text>
				<text :class='{text: tabbar}' @click='tabbar = true'>目录</text>
			</view>
		</view>
		<view class="tab">
			<view>
				<Timetable v-if='tabbar' :isVip='isVip'/>
				<Details v-else/>
			</view>
		</view>
	</view>
</template>

<script>
	import Timetable from './timetable.vue';
	import Details from './details.vue';
	export default {
		data() {
			return {
				tabbar: false,
				isVip: null
			}
		},
		components: {
			Timetable,
			Details
		},
		onLoad(options) {
			this.tabbar = true;
			this.isVip = options.isVip == 'true' ? true : false;
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.study {
		background: #f7f7f7;
	}
	.head {
		height: 256rpx;
		background: #fff;
		padding: 0 48rpx;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.1);
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
	.tab {
		margin-top: 30rpx;
	}
</style>
