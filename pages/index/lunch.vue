<template>
	<view>
		<view class="bg" :style="{'height':screenHeight+'rpx;text-align:center'}">
			<image mode="heightFix" src="https://art-eater.oss-cn-beijing.aliyuncs.com/WechatIMG2460.png"></image>
		</view>
		<view class="contains" @click="handlejump">跳过</view>
	</view>
</template>
<script>
	var timer = null
	export default {
		data() {
			return {
				timer: null,
				screenHeight: 0,
			}
		},
		onLoad(options) {
			var self = this
			uni.getSystemInfo({
				success: res => {
					let factor = 750/res.screenWidth
					self.screenHeight = res.windowHeight * factor
				}
			})
			timer = setTimeout(function(){
				uni.reLaunch({
					url:'./index'
				})
			}, 3000)
			const scene = decodeURIComponent(options.scene)
			console.log("scene:" + scene)
			if(scene){
				var invitation = (scene.split('=') && scene.split('=').length > 0)? scene.split('=')[1] : ''
				if(invitation) {
					uni.setStorage({
						key: 'invitation',
						data: invitation
					})
				}
			}
			// const scene = decodeURIComponent(query.scene)
		},
		methods: {
			handlejump(){
				clearTimeout(timer)
				uni.reLaunch({
					url:'./index'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #ffffff;
	}
	.bg{
		position: relative;
		width: 100%;
		overflow: hidden;
		/* min-height: 1340rpx; */
	}
	.bg image{
		/* width: 100%; */
		height: 100%;
	}
	.contains{
		position: absolute;
		right: 40rpx;
		top: 22rpx;
		width: 106rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 50rpx;
		color: #d6d6d6;
		border: 2rpx solid #d6d6d6;
		text-align: center;
		font-size: 26rpx;
	}
</style>
