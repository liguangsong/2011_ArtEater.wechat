<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view class="">
			<Item v-for='(item,i) in list' v-if='!item.isHideCourse' :key='i' :item='item' :vip='vip'/>
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
			this.list = await query.find();
			var app = getApp();
			var member = app.globalData.member;
			if (member && member.blockGold) {
				if (member.blockGold.endTime > Date.now() || member.permanent) {
					this.vip = true;
					return ;
				}
			}
			if (member && member.whiteGold) {
				if (member.whiteGold.endTime > Date.now() || whiteGold.permanent) {
					this.vip = true;
				}
			}
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
			tabbarChange(item) {
				uni.switchTab({
					url:item.path
				})
			}
		}
	}
</script>

