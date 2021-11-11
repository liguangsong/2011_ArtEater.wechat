<template>
	<view class='curriculum-item'>
		<view class="content">
			<view class='font'>
				<view class="title" @click='jumpDefault(item)'>{{item.subjectName}}</view>
				<view class="info">
					<text v-if='item.subTitle1'>{{item.subTitle1}}</text>
					<text>{{item.subTitle2}}</text>
				</view>
			</view>
			<view class="teacher">
				<view class='img'>
					<image :src="item.portrait[0]" mode='aspectFill'></image>
					<text>{{item.lecturerName}}</text>
				</view>
				<view class="btn" v-if='item.vip' :class='{study: item.vip && vip }'>
					<text v-if='vip' @click='jumpDefault(item)'>学习</text>
					<text v-else @click='unlockFn'>解锁</text>
				</view>
				<view class="btn study" v-else>
					<text @click='jumpDefault(item)'>学习</text>
				</view>
			</view>
		</view>
		<view class="vip" v-if='item.vip'>
			<image v-if='item.vip && vip' :src="unlock" />
			<image v-else :src="lock" />
		</view>
	</view>
</template>

<script>
	import Curriculum from '@/js/utils/curriculum.js'
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			},
			vip: {
				type: Boolean
			}
		},
		data() {
			return {
				lock: '../../static/vip-lock.png',
				unlock: '../../static/vip-unlock.png',
			}
		},
		methods: {
			async jumpDefault(item) {
				let toUrl=await Curriculum.configUrl({course:item}, this.vip)
				uni.navigateTo({
					url:toUrl
				})
			},
			unlockFn() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
			}
		}
	}
</script>

<style scoped>
	.curriculum-item {
		width: 690rpx;
		height: 220rpx;
		margin: 0 auto 24rpx;
		background: #fff;
		border-radius: 12rpx;
		box-shadow: rgba(0,0,0,.1) 0 4rpx 10rpx 0;
		position: relative;
	}
	.content {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 32rpx 48rpx 20rpx;
		justify-content: space-between;
	}
	.title {
		width: 100%;
		font-size: 32rpx;
		font-weight: 900;
		line-height: 44rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	.info {
		margin-top: 8rpx;
		font-size: 20rpx;
		line-height: 28rpx;
		opacity: .5;
	}
	.info text:first-child {
		margin-right: 24rpx;
	}
	.teacher {
		display: flex;
		justify-content: space-between;
		font-size: 20rpx;
	}
	.teacher .img {
		display: flex;
		align-items: center;
	}
	.teacher image {
		width: 48rpx;
		height: 48rpx;
		margin-right: 12rpx;
		border-radius: 50%;
	}
	.btn {
		width: 100rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 20rpx;
		overflow: hidden;
		background: rgba(0,0,0,.1);
	}
	.vip {
		position: absolute;
		top: -6rpx;
		right: -6rpx;
	}
	.vip image {
		width: 116rpx;
		height: 116rpx;
	}
	.study {
		border: 2rpx solid #FF6867;
		background: #fff;
		color: #FF6867;
	}
</style>
