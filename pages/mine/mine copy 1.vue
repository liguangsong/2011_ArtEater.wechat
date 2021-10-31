<template>
	<view class="myView" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view-tabbar :current="3" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue'
	export default {
		components: {
			'view-tabbar': Tabbar
		},
	}
</script>

<style scoped lang='scss'>
	.myView{
		padding: 10rpx 30rpx;
	}
</style>