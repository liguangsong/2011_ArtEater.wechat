<template>
	<view class='login modalvip'>
		<u-popup mode="center" width="578rpx" height="246rpx" :mask-close-able='cancleIcon' border-radius="24" @close="handleCancle" v-model="isShow">
			<view class="content">
					<view class="up">
						<view class="info">
							<view class="title">
								温馨提示
							</view>
							<view class="txt">
								<view>您将要开启的是食艺兽VIP专享内容，</view>
								<view>请先移步食艺兽大会员页面了解详情。</view>
							</view>
						</view>
						<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E7%99%BD%E8%89%B2%E5%8D%A1%E7%89%87.png" mode=""></image>
					</view>
					<view class="down">
						<view class="info">
							<view class="cancel" @click="handleCancle">
								取消
							</view>
							<view @click="submitFn">
								好的
							</view>
						</view>
							
							<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E9%BB%84%E8%89%B2%E5%8D%A1%E7%89%87.png" mode=""></image>
					</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean
			},
			title: {
				type: String,
			},
			submit: {
				type: String,
			},
			cancleIcon: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			handleCancle(){
				if (this.cancleIcon) {
					this.$emit('cancle')
				}
			},
			submitFn() {
				this.$emit('submitFn')
			}
		}
	}
</script>

<style lang='scss'>
	.login {
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 99999;
	}
	.content{
		text-align: center;
		position: relative;
		height: 100%;
		margin: 0 100rpx;
		z-index: 1000000;
	}
	.up {
		margin: 0 24rpx;
		position: absolute;
		top: 0;
		width: 502rpx;
		height: 240rpx;
		z-index: 500;
	}
	.up .info {
		position: relative;
		z-index: 502;
	}
	.up .title {
		font-size: 28rpx;
		font-weight: 500;
		color: #995D05;
		line-height: 40rpx;
		margin-top: 44rpx;
	}
	.up .txt {
		font-size: 22rpx;
		font-weight: 400;
		color: rgba(153, 93, 5, .8);
		line-height: 32rpx;
		margin-top: 24rpx;
	}
	.txt view {
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.up image, .down image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.down {
		position: absolute;
		z-index: 400;
		top: 108rpx;
		width: 550rpx;
		height: 204rpx;
	}
	.down .info {
		position: absolute;
		z-index: 450;
		bottom: 26rpx;
		display: flex;
		width: 100%;
		font-size: 24rpx;
		font-weight: 500;
		color: #995D05;
		line-height: 34rpx;
	}
	.cancel {
		color: rgba(153, 93, 5, 0.44);
	}
	.down .info view {
		width: 100%;
	}
</style>
