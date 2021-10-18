<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view class="">课程</view>
		<view-tabbar :current="1" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue'
	export default {
		data() {
			return {
				windowHeight:0,
				pdbtm:0,//兼容iphonexr+
			}
		},
		components:{
			'view-tabbar': Tabbar
		},
		onLoad() {
			// uni.getSystemInfo({
			// 			   success: res => {
			// 				this.windowHeight = res.windowHeight;
			// 			   }
			// 			})
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm=125+app.globalData.paddingBottomHeight;
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			});	
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
	
}
</style>
