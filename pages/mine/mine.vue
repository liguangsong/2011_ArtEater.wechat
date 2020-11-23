<template>
	<view class="myView">
		<view class="headView">
			<view class="headIconView">
				<image v-if="userInfo&&userInfo.avatarUrl" :src="userInfo.avatarUrl"></image>
			</view>
			<view class="nickName">颜欢</view>
			<view class="icon">
				<u-icon name="arrow-right" color="#c8c9cc" size="30"></u-icon>
			</view>
		</view>
		<view class="scoreView">
			<view class="content">
				<view class="scoreItem">
					<view class="title">答题量</view>
					<view class="score">3</view>
				</view>
				<view class="scoreItem">
					<view class="title">错题集</view>
					<view class="score">3</view>
				</view>
				<view class="scoreItem">
					<view class="title">总积分</view>
					<view class="score">3</view>
				</view>
			</view>
		</view>
		<view class="actionView">
			<view class="actionItem">
				<view class="title">签到</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#c8c9cc" size="30"></u-icon>
				</view>
			</view>
			<view class="actionItem">
				<view class="title">积分排行榜</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#c8c9cc" size="30"></u-icon>
				</view>
			</view>
			<view class="actionItem" @click="handleOrderClick">
				<view class="title">已购项目</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#c8c9cc" size="30"></u-icon>
				</view>
			</view>
			<view class="actionItem">
				<view class="title">消息中心</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#c8c9cc" size="30"></u-icon>
				</view>
			</view>
			<view class="actionItem">
				<view class="title">意见反馈</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#c8c9cc" size="30"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				userInfo:{}
			}
		},
		onLoad() {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					self.userInfo = res.data
				}
			})
		},
		methods: {
			/*查看已购项目*/
			handleOrderClick(){
				uni.navigateTo({
					url:'order'
				})
			}
		}
	}
</script>

<style>
	.myView{
		/* width: calc(100% - 40rpx); */
		padding: 20rpx;
	}
	.myView .headView{
		display: flex;
	}
	.myView .headView .headIconView{
		width: 100rpx;
		height: 100rpx;
	}
	.myView .headView .headIconView image{
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.myView .headView .nickName{
		flex: 1;
		padding: 0 20rpx;
		height: 100rpx;
		line-height: 100rpx;
	}
	.myView .headView .icon{
		width: 50rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
	}
	.myView .scoreView{
		/* width: calc(100% - 40rpx); */
		padding: 20rpx;
	}
	.myView .scoreView .content{
		width: 100%;
		display: flex;
	}
	.myView .scoreView .content .scoreItem{
		flex: 1;
		text-align: center;
	}
	.myView .scoreView .content .scoreItem .title{
		font-size: 30rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.myView .scoreView .content .scoreItem .score{
		font-size: 22rpx;
		height: 50rpx;
		line-height: 50rpx;
	}
	.myView .actionView{
		/* width: calc(100% - 40rpx); */
		padding: 20rpx;
		border: 1rpx solid #333333;
		border-radius: 20rpx;
	}
	.myView .actionView .actionItem{
		display: flex;
		height: 70rpx;
		line-height: 70rpx;
		border-bottom: 1rpx solid #eeeeee;
	}
	.myView .actionView .actionItem:last-child{
		border: 0;
	}
	.myView .actionView .actionItem .title{
		flex: 1;
	}
	.myView .actionView .actionItem .icon{
		width: 50rpx;
		height: 70rpx;
		line-height: 70rpx;
	}
</style>
