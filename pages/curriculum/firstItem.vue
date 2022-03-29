<template>
	<view>
		<view class="curriculum-item" @click='jump1'>
			<view class='img'>
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E6%AF%8F%E6%97%A5%E6%96%B0%E7%9F%A5.jpg">
				</image>
			</view>
			<view class="content">

				<view class='font'>
					<view class="title">每日新知</view>
				</view>
				<view class="teacher">
					<view class='img1'>
						<image v-for='(attr,i) in listImg1' :style='{zIndex: 10-i, left: 32*i+"rpx"}' :src="attr.portrait[0]"
							mode='aspectFill'></image>
					</view>

					<view class="btn study">
						<text style='transform: translateY(-1px); display: inline-block;'>学习</text>
					</view>
				</view>
			</view>
		</view>
		<view class="curriculum-item" @click='jump2'>
			<view class='img'>
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E5%85%8D%E8%B4%B9%E8%AF%95%E5%90%AC.jpg">
				</image>
			</view>
			<view class="content">

				<view class='font'>
					<view class="title">免费试听</view>
				</view>
				<view class="teacher">
					<view class='img1'>
						<image v-for='(attr,i) in item.listImg' :style='{zIndex: 10-i, left: 36*i+"rpx"}' :src="attr"
							mode='aspectFill'></image>
					</view>

					<view class="btn study">
						<text style='transform: translateY(-1px); display: inline-block;'>学习</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listImg2: []
			}
		},
		props: {
			listImg1: {
				type: Array
			}
		},
		// onShow() {
		// 	var query = new this.Parse.Query('DailyTeacher')
		// 	query.find().then(data => {
		// 		this.listImg1 = data
		// 	})
		// },
		methods: {
			jump1() {
				uni.navigateTo({
					url: '/homeSubPackage/pages/curriculumList/daily'
				})
			},
			jump2() {
				uni.navigateTo({
					url: '/homeSubPackage/pages/curriculumList/curriculumList?moduleName=免费试听'
				})
			},
		}
	}
</script>

<style scoped>
	.curriculum-item {
		width: 690rpx;
		height: 220rpx;
		margin: 0 auto 28rpx;
		display: flex;
		box-shadow: 0 4rpx 10rpx 0 rgba(0, 0, 0, 0.1);
		border-radius: 24rpx;
		padding: 20rpx;
		background: #fff;
	}

	.curriculum-item .img {
		min-width: 180rpx;
		height: 180rpx;
		margin-right: 28rpx;
	}

	.curriculum-item .img image {
		border-radius: 20rpx;
		width: 100%;
		height: 100%;
	}
	
	.title {
		width: 400rpx;
		font-size: 32rpx;
		font-weight: 500;
		line-height: 44rpx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.content {
		display: flex;
		flex-direction: column;
		flex: 1 0 auto;
		justify-content: space-between;
	}
	.teacher {
		display: flex;
		justify-content: space-between;
		/* align-items: center; */
		font-size: 20rpx;
		/* height: 92rpx; */
	}

	.teacher .box {
		height: 70rpx;
		width: 150rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}

	.teacher .img1 {
		display: flex;
		flex: 0 1 40%;
		align-items: center;
		color: rgba(23, 23, 23, .6);
		position: relative;
		height: 48rpx;
	}

	.teacher image {
		width: 48rpx;
		height: 48rpx;
		box-shadow: 2rpx 0 4rpx 0 rgba(0, 0, 0, 0.22);
		border-radius: 50%;
		position: absolute;
	}

	.btn {
		width: 100rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border-radius: 20rpx;
		overflow: hidden;
		background: rgba(0, 0, 0, .1);
		transform: translate(4rpx, 6rpx);
		color: rgba(0, 0, 0, .5);
		margin-right: 26rpx;
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
