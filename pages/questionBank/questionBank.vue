<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<Item v-for='(item, i) in subjects' :item='item' :img='arr[i]' :key='i'/>
		<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	export default {
		data() {
			return {
				userInfo: null,
				subjects:[],
				pdbtm:0,//兼容iphonexr+
				windowHeight:0,
				arr: [
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask/c1.png?versionId=CAEQIBiBgICC4Zq95xciIDI4OWRmNTBjMzVjNDRiZDI5YTRhZmQyNDA1NWM3ZTBj',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask/c2.png?versionId=CAEQIBiBgIDQ35q95xciIDk2ZDdiMmVhYjkxZDRjOTZiNmFlZTQzMTAwYjVlZmJk',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/mask/c3.png?versionId=CAEQIBiBgMDP35q95xciIDFhYTRkMjY3NWI4MTRmNjJiZGNiM2E5MWM5OGExZGJl'
				]
			}
		},
		components:{
			'view-tabbar': Tabbar,
			Item
		},
		created() {
			var _this = this;
			uni.getStorage({
				key:'userInfo',
				success: res => {
					_this.userInfo = res.data;
				},
			})
		},
		async onShow() {
			this.subjects=[]
			await this.getSubject();
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
			// 获取数据
			getSubject() {
				const query = new this.Parse.Query('Subjects');
				query.ascending("createdAt")
				query.equalTo("parent_ID", "0")
				query.find().then(list => {
					this.subjects = list.filter(item => item.attributes.subject_name != '科技文艺常识')
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
