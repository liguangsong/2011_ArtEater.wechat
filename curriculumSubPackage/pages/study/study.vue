<template>
	<view class='study'>
		<view class="head">
			<view class="content">
				<view>
					<view class="title">中国美术史重点精讲</view>
					<view class="info">
						<text>共16次课 央美实验艺术考验</text>
					</view>
				</view>
				<view class="teacher">
					<image src="../../../static/bg_null.png"></image>
					<text>王一山</text>
				</view>
			</view>
		</view>
		<view class="tab">
			<view class="tabber">
				<text :class='{text: tabbar}' @click='tabbar = true'>课表</text>
				<text :class='{text: !tabbar}' @click='tabbar = false'>详情</text>
			</view>
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
	.head {
		border-bottom: 10rpx solid #eee;
		height: 200rpx;
	}
 .content {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 0 30rpx;
		justify-content: space-around;
	}
	.title {
		font-size: 36rpx;
		font-weight: 900;
	}
	.info {
		font-size: 20rpx;
	}
	.teacher {
		display: flex;
		align-items: center;
	}
	.teacher image {
		width: 50rpx;
		height: 50rpx;
		margin-right: 12rpx;
		border-radius: 50%;
	}
	.teacher text {
		font-size: 18rpx;
	}
	
	.tab {
		padding: 0 30rpx;
	}
	.tab .tabber {
		display: flex;
		justify-content: space-around;
		padding: 12rpx 0 20rpx;
	}
	.tab .tabber .text {
		border-bottom: 2px solid #aaa;
	}
	
	
</style>
