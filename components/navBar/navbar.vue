<template>
	<view class="tabbar" :style='{height: height ? height: tabbarheight+"rpx"}'>
		<slot></slot>
<!-- 		<image v-if='img' :src="img" mode='scaleToFill'></image> -->
		<view class="navbar" 
			:style='{background: navbarBg, height: navbarheight + "rpx", top: tabbarheight - navbarheight + "rpx", color: navbarColor, fontSize: fontSize + "rpx" }'
		>
			<view class="icon" v-if='icon'>
				<u-icon :name="iconName" :color="iconColor" :size="iconSize"></u-icon>
			</view>
			<view class="title" :style="{color:titleStyle.color,padding:titleStyle.padding}">
				<text>{{title}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			navbarBg: {
				type: String,
				default: 'rgba(255,255,255,0)'
			},
			height: {
				type: String,
				default: '400rpx'
			},
			title: {
				type: String,
				default: '课程'
			},
			fontSize: {
				type: Number,
				default: 32
			},
			icon: {
				type: Boolean,
				default: true
			},
			iconName: {
				type: String,
				default: 'arrow-left'
			},
			iconColor: {
				type: String,
				default: '#fff'
			},
			iconSize: {
				type: Number,
				default: 28
			},
			titleStyle: {
				type: Object,
				default:{color:'#fff',padding:'0 0 0 62rpx'}
			},
			navbarColor: {
				type: String,
				default: '#fff'
			}
		},
		data() {
			return {
				tabbarheight: 0,
				navbarheight: 0
			}
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					let statusBar = 0
					let customBar = 0
					statusBar = e.statusBarHeight
					let custom = wx.getMenuButtonBoundingClientRect()
					customBar = custom.bottom + custom.top - e.statusBarHeight
					this.tabbarheight = customBar * 2;
					this.navbarheight = customBar * 2 - e.statusBarHeight * 2;
				}
			})
		}
	}
</script>

<style>
	.tabbar {
		width: 100%;
		overflow: hidden;
		background: #eee;
		position: relative;
	}
	.navbar {
		position: absolute;
		width: 100%;
		display: flex;
		align-items: center;
		color: #fff;
	}
	.icon {
		flex: 0 1 50rpx;
		text-align: center;
	}
	.title {
		flex: 1 1 auto;
		padding-right: 50rpx;
	}
	image {
		width: 100%;
	}
</style>
