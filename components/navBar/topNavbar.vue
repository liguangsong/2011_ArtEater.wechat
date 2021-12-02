<template>
	<view class='top-navbar' :style='{background: tabbarBg ? bg : "none", paddingTop: paddingTop ? paddingTop + "rpx" : tabbarheight + "rpx"}'>
		<view class="tabbar" :style='{background: tabbarBg ? bg : "none", height: tabbarheight+"rpx"}'>	
			<view class="nav" :style='{height:navbarheight + "rpx", top:tabbarheight - navbarheight + "rpx"}'>
				<view  @click='back' class="icon" v-if='!iconFn'>
					<u-icon :name="iconName" v-if='icon' :color="iconColor" :size="iconSize"></u-icon>
				</view>
				<view class="icon" v-else @click='$emit("closeNavbar")'>
					<u-icon :name="iconName" v-if='icon' :color="iconColor" :size="iconSize"></u-icon>
				</view>
				<view class="title" :style='{fontSize: fontSize + "rpx", color: fontColor, textAlign: align}'>
					<text>{{title}}</text>
				</view>
			</view>
		</view>
		<slot></slot>
	</view>
</template>

<script>
	export default {
		props: {
			// 导航栏的北京颜色
			bg: {
				type: String,
				default: '#f7f7f7'
			},
			tabbarBg: {
				type: Boolean,
				default: true
			},
			// 导航栏的标题
			title: {
				type: String
			},
			// 导航栏字体大小
			fontSize: {
				type: Number,
				default: 34
			},
			// 导航栏字体颜色
			fontColor: {
				type: String,
				default: '#000'
			},
			// 是否显示icon
			icon: {
				type: Boolean,
				default: true
			},
			iconFn: {
				type: Boolean,
				default: false
			},
			// 图标的样式
			iconName: {
				type: String,
				default: 'arrow-left'
			},
			// 图标的颜色
			iconColor: {
				type: String,
				default: '#000'
			},
			// 图标的大小
			iconSize: {
				type: Number,
				default: 30
			},
			// 字体居中还是靠左
			align: {
				type: String,
				default: 'center'
			},
			paddingTop: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				tabbarheight: 0,
				navbarheight: 0,
				screenHeight: 0
			}
		},
		created() {
			uni.getSystemInfo({
				success: (e) => {
					this.screenHeight = e.screenHeight;
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style scoped>
	.top-navbar {
		height: 100vh;
		overflow-y: auto;
	}
	.tabbar {
		width: 100%;
		overflow: hidden;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 10000;
	}
	.nav {
		width: 100%;
		display: flex;
		align-items: center;
		position: absolute;
	}
	.icon {
		height: 100%;
		flex: 0 1 60rpx;
		display: flex;
		padding-left: 30rpx;
		align-items: center;
	}
	.title {
		flex: 1 1 auto;
		padding-right: 60rpx;
	}
	.bg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.img {
		width: 100%;
	}
</style>
