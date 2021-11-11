<template>
	<view class="myPage" :style="{'overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<Navbar navbarBg='#F7F7F7' title='课程' :icon='false' align='center' fontColor="#000" iconColor='#000'>
			<view style='height:20rpx;'></view>
			<Item v-for='(item,i) in list' v-if='!item.hide' :key='i' :item='item' :vip='vip'/>
			<view style='height:33rpx'></view>
		</Navbar>
		<view-tabbar :current="1" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue';
	import Navbar from '../../components/navBar/navbar.vue';
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
			Item,
			Navbar
		},
		onLoad() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm=125+app.globalData.paddingBottomHeight;
		},
		async onShow() {
			uni.showLoading({
				title:'加载中……'
			})
			var query = new this.Parse.Query('CoursesModule')
			// query.containedIn('level', [0, undefined])
			query.equalTo("level", 0);
			var res1 = await query.find();
			query.equalTo("level", undefined);
			var res2 = await query.find();
			this.list = [...res1, ...res2]
			uni.hideLoading()
			uni.hideTabBar({
				animation: false
			});
			
			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			if (member) {
				if (member.memberType != 2) {
					if (member.endTime > Date.now()) {
						this.vip = true;
					} else {
						var query = new this.Parse.Query('MemberList');
						var user1 = JSON.parse(JSON.stringify(user));
						query.equalTo("openId", user1.openid);
						var results = await query.first();
						results.set('memberType', '');
						results.save();
					}
				}
			} else {
				var user = await this.Parse.User.current();
				var query = new this.Parse.Query('MemberList');
				var user1 = JSON.parse(JSON.stringify(user));
				query.equalTo("openId", user1.openid);
				var results = await query.first();
				if (results) {
					var r = JSON.parse(JSON.stringify(results));
					app.globalData.member = r;
					if (r.memberType != 2) {
						if (r.endTime > Date.now()) {
							this.vip = true;
						} else {
							results.set('memberType', '');
							results.save();
						}
					}
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
		height: 100vh;
		background: #F7F7F7;
	}
</style>

