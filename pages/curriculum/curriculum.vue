<template>
	<view class="myPage" :style="{'overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view class="">
			<Item v-for='(item,i) in list' v-if='!item.isHideCourse' :key='i' :item='item' :vip='vip'/>
			<view style='height:33rpx'></view>
		</view>
		<view-tabbar :current="1" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	export default {
		data() {
			return {
				windowHeight:0,
				pdbtm:0,//兼容iphonexr+
				list: [],
				vip: false,
			}
		},
		components:{
			'view-tabbar': Tabbar,
			Item
		},
		async created() {
			var query = new this.Parse.Query('coursesModule')
			query.containedIn('level', [0,undefined])
			// query.containedIn('level', [0,undefined])
			this.list = await query.find();
			console.log(this.list);
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
			var app = getApp();
			var member = app.globalData.member;
			if (member && member.memberType != 2) {
				if (member.endTime > Date.now()) {
					this.vip = true;
				}
			}
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

<style scoped>
	.myPage {
		background: #F7F7F7;
	}
</style>

