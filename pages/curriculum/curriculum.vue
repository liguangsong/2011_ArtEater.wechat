<template>
	<view class="myPage" :style="{'overflow-y': 'scroll'}">
		<TopNavbar title='课程' bg='#f7f7f7'  :icon='false'>
			<view :style="{'padding-bottom':pdbtm+'rpx'}">
				<view style='height:20rpx;'></view>
				<FirstItem :listImg1='listImg1'/>
				<Item v-for='(item,i) in list' :key='i' :item='item' :vip='vip' />
			</view>
		</TopNavbar>
		<view-tabbar :current="1" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue';
	import FirstItem from './firstItem.vue';
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import {parseSrc} from '../../js/srcToCdnSrc.js'
	export default {
		data() {
			return {
				windowHeight: 0,
				pdbtm: 0, //兼容iphonexr+
				list: [],
				vip: false,
				listImg1: []
			}
		},
		components: {
			'view-tabbar': Tabbar,
			Item,
			FirstItem,
			TopNavbar
		},
		onLoad() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm = 125 + app.globalData.paddingBottomHeight;
		},
		async onShow() {
			
			var q = new this.Parse.Query('DailyTeacher')
			q.find().then(data => {
				this.listImg1 = data
			})
			
			if (!this.list.length) {
				uni.showLoading({
					title: '加载中……'
				})
			}

			var query = new this.Parse.Query('CoursesModule')
			query.notEqualTo('hide', true)
			query.notEqualTo('dailyCourse', true)
			query.equalTo("level", 0);
			var res1 = await query.find();
			query.equalTo("level", undefined);
			var res2 = await query.find();
			this.list = [...res1, ...res2].sort((a,b)=>a.attributes.order-b.attributes.order);
			uni.hideLoading()
			uni.hideTabBar({
				animation: false
			});

			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			if (member && member.memberType != 2) {
				if (member.endTime > Date.now()) {
					this.vip = true;
				}
			}

		},
		methods: {
			tabbarChange(item) {
				uni.switchTab({
					url: item.path
				})
			}
		}
	}
</script>

<style scoped>
	.myPage {
		height: 100vh;
		background: #F7F7F7;
	}

	.collection {
		height: 600rpx;
		font-family: PingFangSC-Medium;
		font-size: 20px;
		color: rgba(53, 32, 38, 0.4);
		line-height: 600rpx;
		text-align: center;
	}
</style>
