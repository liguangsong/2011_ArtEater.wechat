<template>
	<view  class="myPage" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view class="">请问</view>
		<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue'
	export default {
		data() {
			return {
				pdbtm:0,//兼容iphonexr+
				windowHeight:0
			}
		},
		components:{
			'view-tabbar': Tabbar
		},
		onLoad() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			
			// uni.getSystemInfo({
			// 			   success: res => {
			// 				this.windowHeight = res.windowHeight;
			// 			   }
			// 			})
		},
		onShow() {
			let app = getApp();
			this.pdbtm=125+app.globalData.paddingBottomHeight;
			uni.hideTabBar({
				animation: false
			});	
			console.log(123)
		},
		methods: {
			tabbarChange(item) {
				uni.switchTab({
					url:item.path
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.myPage{
	// padding-bottom: 125rpx;
}
</style>
