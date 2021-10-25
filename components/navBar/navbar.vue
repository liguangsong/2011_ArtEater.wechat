<template>
	<scroll-view style='height:100%;' :scroll-y='true' @scroll='scroll'>
		<view class="tabbar" :style='{height: height ? height: tabbarheight+"rpx"}'>
			<slot name='img'></slot>
			<view class="navbar" 
				:style='{fontSize: fontSize + "rpx", height:tabbarheight + "rpx" }'
			>
				<view class='bg' :style='{background: navbarBg, opacity: opacity}'></view>
				<view class="nav" :style='{height:navbarheight + "rpx", top:tabbarheight - navbarheight + "rpx"}'>
					<view class="icon" v-if='icon'>
						<u-icon :name="iconName" :color="iconColor" :size="iconSize"></u-icon>
					</view>
					<view class="title" :style='{color: fontColor, textAlign: align, paddingLeft: icon ? 0 : titleLeft}'>
						<text>{{title}}</text>
					</view>
				</view>
			</view>
		</view>
		<slot name='other'></slot>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			// 导航栏的北京颜色
			navbarBg: {
				type: String,
				default: '#ccc'
			},
			// 字体的边距
			titleLeft: {
				type: String,
				default: "50rpx"
			},
			// header的高度
			height: {
				type: String
			},
			// 导航栏的标题
			title: {
				type: String
			},
			// 导航栏字体大小
			fontSize: {
				type: Number,
				default: 32
			},
			// 导航栏字体颜色
			fontColor: {
				type: String,
				default: '#fff'
			},
			// 是否显示icon
			icon: {
				type: Boolean,
				default: true
			},
			// 图标的样式
			iconName: {
				type: String,
				default: 'arrow-left'
			},
			// 图标的颜色
			iconColor: {
				type: String,
				default: '#fff'
			},
			// 图标的大小
			iconSize: {
				type: Number,
				default: 28
			},
			// 字体居中还是靠左
			align: {
				type: String,
				default: 'left'
			}
		},
		data() {
			return {
				tabbarheight: 0,
				navbarheight: 0,
				opacity: 0
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
		},
		methods: {
			scroll(e) {
				var {scrollTop, deltaY} = e.detail;
				if (scrollTop > 350) {
					this.opacity = 1
					return ;
				}
				if (scrollTop <= 10 || scrollTop <= 100 && deltaY > 100) {
					this.opacity = 0;
					return ;
				}
				if (deltaY <= 0) {
						this.opacity = Math.ceil(scrollTop / 300 * 100)/100;
				} else {
						this.opacity = Math.floor(scrollTop / 300 * 100)/100;
				}
			}
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
		position: fixed;
		width: 100%;
		color: #fff;
		top: 0;
		z-index: 10000;
	}
	.nav {
		width: 100%;
		display: flex;
		align-items: center;
		position: absolute;
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
	.bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
</style>
