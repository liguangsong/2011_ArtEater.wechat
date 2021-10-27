<template>
	<view class='questionbank-item'>
		<view class='img'>
			<image :src="item.img"></image>
		</view>
		<view class="content">
			<view class="title" @click='jump'>{{item.title}}</view>
			<view class="info">
				<view>
					<view>已完成{{item.complete}}/{{item.total}}</view>
					<view>正确率：{{item.successRate}}</view>
				</view>
				<view class="btn" @click='jump'>
					<text>练习</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default: {}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: '/curriculumSubPackage/pages/study/study'
				})
			}
		}
	}
</script>

<style scoped>
	.questionbank-item {
		width: 690rpx;
		height: 220rpx;
		margin: 0 auto 24rpx;
		display: flex;
		box-shadow: 0 4rpx 10rpx 0 rgba(0,0,0,0.1);
		border-radius: 24rpx;
		padding: 20rpx;
	}
	.questionbank-item .img {
		width: 180rpx;
		height: 180rpx;
		margin-right: 28rpx;
	}
	.questionbank-item .img image {
		border-radius: 20rpx;
		width: 100%;
		height: 100%;
	}
	.questionbank-item .content {
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
	}
	.questionbank-item .content .title {
		font-size: 32rpx;
		font-weight: 600;
		line-height: 44rpx;
		margin-bottom: 64rpx;
	}
	.questionbank-item .content .info {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: flex-end;
		font-size: 20rpx;
		font-weight: 400;
		line-height: 32rpx;
	}
	.questionbank-item .btn{
		width: 100rpx;
		height: 40rpx;
		border-radius: 20rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 40rpx;
		color: #FF6867;
		border: 2rpx solid #FF6867;
		margin-right: 12rpx;
	} 
</style>
