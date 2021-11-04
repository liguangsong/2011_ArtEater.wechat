<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<Item v-for='(item, i) in subjects' :item='item' :key='i'/>
		<view-tabbar :current="2" @tabbarChange="tabbarChange"></view-tabbar>
	</view>
</template>

<script>
	import Tabbar from '@/components/tabBar/tabBar.vue';
	import Item from './item.vue'
	export default {
		data() {
			return {
				scrollTop: 0,
				userInfo: null,
				
				count: 0,
				subjects:[],
				subjectProgress:[],
				
				pdbtm:0,//兼容iphonexr+
				windowHeight:0,
				list: [
					{
						img: 'https://img1.baidu.com/it/u=82323508,2412665068&fm=26&fmt=auto',
						title: '中国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},	{
						img: 'https://img1.baidu.com/it/u=2548045501,3373948589&fm=26&fmt=auto',
						title: '外国美术史题库',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},	{
						img: 'https://img2.baidu.com/it/u=2151359767,1164216166&fm=26&fmt=auto',
						title: '艺术概论',
						total: '2000',
						complete: '189',
						successRate: '37%',
						src: ''
					},
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
					_this.bindSubjectTree()
				},
			})
		},
		onShow() {
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
			bindSubjectTree(){
				var _this = this
				uni.showLoading({
					title:'加载中……'
				})
				var query = new this.Parse.Query("Subjects")
				// query.equalTo("parent_ID", this.subjectId)
				query.ascending('createdAt')
				query.limit(10000)
				query.find().then(res=>{
					// var tree = _this.initSubjectTree(res, '0')
					// _this.subjects = tree
					console.log(res);
				})
				uni.hideLoading({
					title:'加载中……'
				})
			},
			handleImportantClick(){
				uni.navigateTo({
					url:'../important/index'
				})	
				// if(this.userInfo&&this.userInfo.openid){
				// 	if(this.userInfo.phone){ // 已绑定手机号
				// 		if(this.zdtkConfig.get('isNeedPay')==1&&!this.hasBuyedZDTK){ // 需要购买，但是没买
				// 			// this.isShowImportBuy = true
				// 			uni.navigateTo({
				// 				url:'/pages/buy/buy?subjectId=' + this.zdtkConfig.id,
				// 				event:{
				// 					reloadOrder: function(data){
				// 						self.bindOrder()
				// 					}
				// 				}
				// 			})
				// 		} else {
				// 			uni.navigateTo({
				// 				url:'../important/index'
				// 			})							
				// 		}
				// 	} else { // 未绑定手机号，跳转至绑定页
				// 		uni.reLaunch({
				// 			url:'/pages/login/login'
				// 		})
				// 	}
				// } else {
				// 	this.isShowLogin = true
				// 	this.toAction = 'important'
				// }
			},
		}
	}
</script>

<style lang="scss" scoped>
.myPage{
	background: #F7F7F7;
}
</style>
