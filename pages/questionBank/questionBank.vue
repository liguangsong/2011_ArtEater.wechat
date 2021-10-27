<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<Item v-for='(item, i) in list' :item='item' :key='i'/>
		<Item v-for='(item, i) in list' :item='item' :key='i'/>
		<Item v-for='(item, i) in list' :item='item' :key='i'/>
		<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	export default {
		data() {
			return {
				scrollTop: 0,
				arr: [
					'https://img2.baidu.com/it/u=2151359767,1164216166&fm=26&fmt=auto',
					'https://img1.baidu.com/it/u=2548045501,3373948589&fm=26&fmt=auto',
					'https://img1.baidu.com/it/u=82323508,2412665068&fm=26&fmt=auto'
				],
				img: '../../static/1.png',
				pdbtm:0,//兼容iphonexr+
				windowHeight:0,
				list: [
					{
						img: 'https://img1.baidu.com/it/u=82323508,2412665068&fm=26&fmt=auto',
						title: '中国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},	{
						img: 'https://img1.baidu.com/it/u=2548045501,3373948589&fm=26&fmt=auto',
						title: '中国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},	{
						img: 'https://img2.baidu.com/it/u=2151359767,1164216166&fm=26&fmt=auto',
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
			Item
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
		// onPageScroll(e) {
		// 	if (e.scrollTop < 400) {
		// 		this.scrollTop = Math.ceil(e.scrollTop / 400 * 10)/10;
		// 	}
		// },
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
	background: #F7F7F7;
}
</style>
