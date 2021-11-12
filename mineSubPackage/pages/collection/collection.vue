<template>
	<view class="myPage">
		<view v-if='!list.length' class='collection'>
			暂无收藏
		</view>
		<view style='height: 20rpx;'></view>
		<Item v-for='(item,i) in list' :key='i' :item='item' :vip='vip'/>
	</view>
</template>

<script>
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
			Item
		},

		async onShow() {
			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			if (member) {
				if (member.memberType != 2) {
					if (member.endTime > Date.now()) {
						this.vip = true;
					}
				}
			}
			
			var _this = this;
			uni.getStorage({
				key: 'userInfo',
				success: async res => {
					var query = new _this.Parse.Query('Collections')
					query.equalTo("openId", res.data.openid);
					var list = await query.find();
					var ids = list.map(item => JSON.parse(JSON.stringify(list)))[0][0].ids;
					var q = new _this.Parse.Query('CoursesModule')
					q.containedIn('objectId', ids)
					list = await q.find()
					_this.list = list.map(item => JSON.parse(JSON.stringify(item))).filter(item=>!item.has_down_level);
					_this.list.forEach(item => {
						if (item.level != undefined) {
							var q1 = new _this.Parse.Query('CoursesModule')
							q1.equalTo("objectId", item.rootId);
							q1.first().then(data => {
								data = data.attributes;
								item.portrait = data.portrait;
								item.lecturerName = data.lecturerName;
								item.subTitle1 = data.subTitle1;
								item.subTitle2 = data.subTitle2;
							})
						}
					})
				}
			})
		
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
		height: 100vh;
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

