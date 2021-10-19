<template>
	<view class='curriculum-item'>
		<view class="content">
			<view>
				<view class="title" @click='jumpItem'>{{item.title}}</view>
				<view class="info">
					<text>{{item.info}}</text>
				</view>
			</view>
			<view class="teacher">
				<image :src="item.img"></image>
				<text>{{item.teacher_name}}</text>
			</view>
		</view>
		<view class="btn">
			<text v-if='isVip' class='study' @click='jumpStudy'>学习</text>
			<text v-else class='locking' @click='unlock'>解锁</text>
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
				isVip: this.item.isVip
			}
		},
		methods: {
			jumpItem() {
				uni.navigateTo({
					url: '/curriculumSubPackage/pages/study/study?isVip=' + this.isVip
				})
			},
			unlock() {
				this.isVip = true;
			},
			jumpStudy() {
				uni.navigateTo({
					url: '/curriculumSubPackage/pages/study/study?isVip=' + this.isVip
				})
			}
		}
	}
</script>

<style scoped>
	.curriculum-item {
		width: 680rpx;
		height: 200rpx;
		margin: 0 auto 22rpx;
		background: #fff;
		border-radius: 10rpx;
		box-shadow: #c9c9c9 0 4rpx 10rpx 0;
		display: flex;
	}
	.content {
		flex: 1 0 70%;
		display: flex;
		flex-direction: column;
		padding-left: 20rpx;
		justify-content: space-around;
	}
	.title {
		font-size: 30rpx;
		font-weight: 900;
	}
	.info {
		font-size: 18rpx;
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
	.btn {
		flex: 1 0 30%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.btn text {
		height: 40rpx;
		width: 80rpx;
		border-radius: 20rpx;
		font-size: 20rpx;
		line-height: 40rpx;
		text-align: center;
	}
	.btn .study {
		background: #eee;
	}
	.btn .locking {
		background: #bbb;
		color: #fff;
	}
</style>
