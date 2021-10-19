<template>
	<view  class="myPage" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<!-- <view class="" @click="gotoQbankdetail">题库详情</view> -->
		<!-- <Item v-for='(item, i) in list' :item='item' :key='i'/> -->
		<Vip/>
		<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	import Vip from './vip.vue'
	export default {
		data() {
			return {
				pdbtm:0,//兼容iphonexr+
				windowHeight:0,
				list: [
					{
						img: '../../static/bg_null.png',
						title: '中国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},	{
						img: '../../static/bg_null.png',
						title: '中国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},	{
						img: '../../static/bg_null.png',
						title: '中国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},
				]
			}
		},
		components:{
			'view-tabbar': Tabbar,
			Item,
			Vip
		},
		onLoad() {
		},
		onShow() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm=125+app.globalData.paddingBottomHeight;
			uni.hideTabBar({
				animation: false
			});
		},
		methods: {
			// 切换tab
			tabbarChange(item) {
				uni.switchTab({
					url:item.path
				})
			},
			gotoQbankdetail() {
				uni.navigateTo({
					url:'/qbankSubPackage/pages/qBankDetail/qBankDetail'
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
