<template>
	<view class='questionbank-item'>
		<view class="content">
			<view>
				<image :src="item.img"></image>
			</view>
			<view>
				<view class="title" @click='jump'>{{item.title}}</view>
				<view>
					<text>已完成{{item.complete}}/{{item.total}}</text>
					<text>正确率{{item.successRate}}</text>
				</view>
			</view>
		</view>
		<view class="btn" @click='jump'>
			<text>练习</text>
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
				// uni.navigateTo({
				// 	url: ''
				// })
			}
		}
	}
</script>

<style scoped>
	.questionbank-item {
		width: 680rpx;
		height: 150rpx;
		margin: 30rpx auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.questionbank-item .content{
		flex: 0 1 80%;
		display: flex;
		align-items: center;
	}
	.questionbank-item .content image{
		width: 150rpx;
		height: 150rpx;
		margin-right: 30rpx;
		border-radius: 10rpx;
	}
	.questionbank-item .content text{
		line-height: 60rpx;
		font-size: 20rpx;
		margin-right: 20rpx;
	}
	.questionbank-item .content .title{
		font-size: 30rpx;
		font-weight: 800;
		margin: 0;
	}
	.questionbank-item .btn{
		width: 80rpx;
		height: 50rpx;
		border-radius: 25rpx;
		background: #ccc;
		font-size: 24rpx;
		text-align: center;
		line-height: 50rpx;
		color: #fff;
	}
</style>
