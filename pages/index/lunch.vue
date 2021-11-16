<template>
	<view class='box'>
		<view class="lunch-title" :style="{heigth:height+'px','line-height':height+'px',top:top+'px'}">食艺兽</view>
		<view class="bg" :style="{'height':screenHeight+'rpx;text-align:center', top:top + height+'px'}">
			<!-- <image mode="heightFix" src="https://art-eater.oss-cn-beijing.aliyuncs.com/WechatIMG2460.png"></image> -->
			<image mode="aspectFill" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/lunchbg.png"></image>
		</view>
			<view class="contains" :style="{bottom:66+paddingBottom+'rpx'}" @click="handlejump"></view>
	</view>
</template>
<script>
	var timer = null
	export default {
		data() {
			return {
				top:uni.getMenuButtonBoundingClientRect().top,
				height:uni.getMenuButtonBoundingClientRect().height,
				timer: null,
				screenHeight: 0,
				paddingBottom:getApp().globalData.paddingBottomHeight,
				translateY: 'translateY(0)'
			}
		},
		onLoad(options) {
			var self = this
			uni.getSystemInfo({
				success: res => {
					let factor = 750/res.screenWidth
					self.screenHeight = res.windowHeight * factor - (self.top + self.height)*factor;
				}
			})
			timer = setTimeout(function(){
				uni.reLaunch({
					url:'./index'
				})
			}, 3000)
			const scene = decodeURIComponent(options.scene)
			// console.log("scene:" + scene)
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
	.box {
		height: 100vh;
		background-color: #ffffff;
		position: relative;
	}
	.lunch-title{
		font-size: 34rpx;
		font-family: SFProDisplay-Medium, SFProDisplay;
		font-weight: 500;
		color: #000000;
		text-align: center;
		position: absolute;
		width: 100%;
		z-index: 1;
	}
	/* .bg {
		width: 750rpx;
		height: 1344rpx;
		position: absolute;
		top: 224rpx;
	}
	.bg image {
		width: 100%;
		height: 100%;
	} */
	.bg{
		position: relative;
		width: 100%;
		/* height: 100vh; */
		overflow: hidden;
	}
	.bg image{
		height: 100%;
		/* position: absolute;
		bottom: 0; */
	}
	.contains{
		position: absolute;
		right: 66rpx;
		width: 108rpx;
		height: 48rpx;
		background: url('../../static/jump.png') no-repeat;
		background-size:cover;
	}
</style>
