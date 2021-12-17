<template>
	<view class="myPage" :style="{'overflow': 'scroll'}">
		<TopNavbar title='题库' bg='#f7f7f7'  :icon='false'>
			<view class="questionbank" v-if='subjects.length == 0'>
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E9%A2%98%E5%BA%93%E7%A9%BA%E7%99%BD%E9%A1%B5.png" mode=""></image>
				<view class="soon">
					即将上线
				</view>
				<view class="text">
					<view>由央美史论名师团队在海量试题中</view>
					<view>锁定必考知识点，精选出必考题库，</view>
					<view>使复习有的放矢，大大节省你的学习时间。</view>
				</view>
			</view>
			<view v-else :style="{'padding-bottom':pdbtm+'rpx'}">
				<view style='height:20rpx;'></view>
				<Item v-for='(item, i) in subjects' :n='n' :item='item' :uid='item.objectId' :img='arr[i]' :key='i' :vip='vip'/>
				<!-- <view class="class" @click='navto'>
					信息页面
				</view> -->
			</view>
		</TopNavbar>
		<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Utils from '@/js/utils/index.js'
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	// import Navbar from '../../components/navBar/navbar.vue';
	import TopNavbar from '@/components/navBar/topNavbar.vue'
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
				],
				vip: false,
				n: 0
			}
		},
		components:{
			'view-tabbar': Tabbar,
			Item,
			TopNavbar
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
			this.n++;
			var app = getApp();
			let member = app.globalData.member;
			if (member) {
				if (member.memberType == 0 || member.memberType == 2) {
					this.vip = true
				}
			}
			// console.log(1);
			await this.getSubject();
			uni.hideTabBar({
				animation: false
			});
		},
		methods: {
			navto() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},
			// 切换tab
			tabbarChange(item) {
				uni.switchTab({
					url:item.path
				})
			},
			// 获取数据
			async getSubject() {
				const query = new this.Parse.Query('Subjects');
				query.ascending("createdAt")
				query.equalTo("parent_ID", "0")
				query.find().then(list => {
					this.subjects = JSON.parse(JSON.stringify(list));
					// list.forEach(async (item,i)=>{
					// 	var query = new this.Parse.Query("Order")
					// 	query.equalTo('openId', this.userInfo.openid)
					// 	query.contains('subjectId', item.id)
					// 	query.equalTo('state', 1)
					// 	let res = await query.first();
					// 	var index = this.subjects.findIndex(attr => attr.subject_name == item.attributes.subject_name);
					// 	if (res) {
					// 		this.vip1[index] = true;
					// 	}
					// })
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.myPage{
	background: #F7F7F7;
}
.questionbank {
	width: 750rpx;
	padding-top: 200rpx;
	text-align: center;
}
.questionbank image {
	width: 750rpx;
	height: 486rpx;
}
.questionbank .soon {
	height: 40rpx;
	font-size: 28rpx;
	font-family: PingFangSC-Medium, PingFang SC;
	font-weight: 500;
	color: rgba(0,0,0,.6);
}
.questionbank .text {
	margin-top: 28rpx;
	font-size: 24rpx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(0,0,0,0.5);
	line-height: 34rpx;
}
</style>
