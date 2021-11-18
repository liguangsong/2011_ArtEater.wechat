<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow': 'scroll','padding-bottom':pdbtm+'rpx'}">
		
			<!-- <keep-alive> -->
		<Navbar navbarBg='#F7F7F7' :icon='false' title='题库' align='center' fontColor="#000" iconColor='#000'>
				<view style='height:20rpx;'></view>
				<Item v-for='(item, i) in subjects' :item='item' :img='arr[i]' :key='i'/>
				<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
		</Navbar>
			<!-- </keep-alice> -->
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	import Navbar from '../../components/navBar/navbar.vue';
	export default {
		data() {
			return {
				userInfo: null,
				subjects:[],
				pdbtm:0,//兼容iphonexr+
				windowHeight:0,
				arr: [
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E4%B8%AD%E5%9B%BD%E7%BE%8E%E6%9C%AF%E5%8F%B2%E5%9B%BE%E6%A0%87.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E5%A4%96%E5%9B%BD%E7%BE%8E%E6%9C%AF%E5%8F%B2%E5%9B%BE%E6%A0%87.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E8%89%BA%E6%9C%AF%E6%A6%82%E8%AE%BA%E5%9B%BE%E6%A0%87.png',
					'https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E7%A7%91%E6%8A%80%E5%9B%BE%E6%A0%87.png'
				]
			}
		},
		components:{
			'view-tabbar': Tabbar,
			Item,
			Navbar
		},
		created() {
			var _this = this;
			uni.getStorage({
				key:'userInfo',
				success: res => {
					_this.userInfo = res.data;
				},
			})
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm=125+app.globalData.paddingBottomHeight;
		},
		async onShow() {
			// this.subjects=[]
			await this.getSubject();
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
					// this.subjects = list.filter(item => item.attributes.subject_name != '科技文艺常识')
					this.subjects = list;
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
