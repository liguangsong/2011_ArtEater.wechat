<template>
	<view class="myPage" :style="{'overflow-y': 'scroll'}">
		<view v-if='!list.length' class='collection'>
			暂无课程
		</view>
		<!-- <Navbar v-else navbarBg='#F7F7F7' title='课程' :icon='false' align='center' fontColor="#000" iconColor='#000'> -->
		<TopNavbar title='课程' bg='#f7f7f7'  :icon='false'>
			<view :style="{'padding-bottom':pdbtm+'rpx'}">
				<view style='height:20rpx;'></view>
				<Item v-for='(item,i) in list' v-if='!item.hide' :key='i' :item='item' :vip='vip' />
				<!-- <view style='height:33rpx'></view> -->
			</view>
		</TopNavbar>
		<view-tabbar :current="1" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue';
	// import Navbar from '../../components/navBar/navbar.vue';
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				windowHeight: 0,
				pdbtm: 0, //兼容iphonexr+
				list: [],
				vip: false,
			}
		},
		components: {
			'view-tabbar': Tabbar,
			Item,
			TopNavbar
		},
		onLoad() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm = 125 + app.globalData.paddingBottomHeight;
		},
		async onShow() {
			if (!this.list.length) {

				uni.showLoading({
					title: '加载中……'
				})
			}

			var query = new this.Parse.Query('CoursesModule')
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
