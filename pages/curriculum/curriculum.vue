<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view class="" @click="gotoDetail">
			<Item v-for='(item,i) in arr' :key='i' :item='item'/>
			<!-- <Audition /> -->
		</view>
		<view-tabbar :current="1" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	import Audition from '@/components/audition/audition.vue'
	export default {
		data() {
			return {
				windowHeight:0,
				pdbtm:0,//兼容iphonexr+
				arr: [
					{
						title: '中国美术史重点精讲1',
						info: '共16次课 央美实验艺术考验',
						img: '../../static/bg_null.png',
						teacher_name: '王一山1',
						isVip: false
					},{
						title: '中国美术史重点精讲2',
						info: '共32次课 央美实验艺术考验',
						img: '../../static/bg_null.png',
						teacher_name: '王一山2',
						isVip: true
					},{
						title: '中国美术史重点精讲3',
						info: '共36次课 央美实验艺术考验',
						img: '../../static/bg_null.png',
						teacher_name: '王一山3',
						isVip: false
					},{
						title: '中国美术史重点精讲4',
						info: '共3次课 央美实验艺术考验',
						img: '../../static/bg_null.png',
						teacher_name: '王一山4',
						isVip: true
					},
				]
			}
		},
		components:{
			'view-tabbar': Tabbar,
			Item,
			Audition
		},
		onLoad() {
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
			gotoDetail() {
				uni.navigateTo({
					url:'/curriculumSubPackage/pages/curriculumDetail/curriculumDetail'
				})
			},
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
