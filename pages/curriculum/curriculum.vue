<template>
	<view class="myPage" :style="{'overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view class="">
			<Item v-for='(item,i) in list' v-if='!item.hide' :key='i' :item='item' :vip='vip'/>
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
			var query = new this.Parse.Query('CoursesModule')
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
		async onShow() {
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
						var query = new this.Parse.Query('member');
						var user1 = JSON.parse(JSON.stringify(user));
						query.equalTo("openId", user1.openid);
						var results = await query.first();
						results.set('memberType', '');
						results.save();
					}
				}
			} else {
				var user = await this.Parse.User.current();
				var query = new this.Parse.Query('member');
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
		background: #F7F7F7;
	}
</style>

