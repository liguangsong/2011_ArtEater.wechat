<template>
	<view class="myView" :style="{'height':windowHeight + 'px','overflow-y': 'scroll','padding-bottom':pdbtm+'rpx'}">
		<view-tabbar :current="3" @tabbarChange="tabbarChange"></view-tabbar>
		<view class="headView">
			<view class="headCon" @click="handleInfoClick">
				<view class="headIconView">
					<image v-if="userInfo&&userInfo.avatarUrl" :src="userInfo.avatarUrl"></image>
				</view>
				<view class="nickName">{{userInfo.nickName}}</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#f4f4f4" size="32"></u-icon>
				</view>
			</view>
			<view class="scoreView">
				<view class="content">
					<view class="scoreItem">
						<view class="score">{{rightCount}}</view>
						<view class="title">答题量</view>
					</view>
					<view class="scoreItem" @click="handleNoteClick">
						<view class="score">{{errorCount}}</view>
						<view class="title">错题集</view>
					</view>
					<view class="scoreItem" @click="handleScoreRecord">
						<view class="score">{{userInfo.score}}</view>
						<view class="title">总积分</view>
					</view>
				</view>
			</view>
		</view>
		<view class="actionView vip">
			<text>课程大会员</text>
			<view @click='jumpvip'>立即开通</view>
		</view>
		<view class="actionView">
			<view class="actionItem" @click="handleSignInClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_daka.png"></image>
				</view>
				<view class="cont">
					<view class="title">签到</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="actionItem" @click="handleScoreListClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_paihang.png"></image>
				</view>
				<view class="cont">
					<view class="title">积分排行榜</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="actionItem" @click="handleOrderClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_yigou.png"></image>
				</view>
				<view class="cont">
					<view class="title">会员中心</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="actionItem" @click="handleCouponClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_mycoupon.png"></image>
				</view>
				<view class="cont">
					<view class="title" style="position: relative;">我的优惠券
						<u-badge v-if="couponCount > 0" type="error" bgColor="#ff7c7c" :offset="[39,0]" :count="couponCount"></u-badge>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="actionItem" @click="handleTestHisClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_kaoshijilu.png"></image>
				</view>
				<view class="cont">
					<view class="title">考试记录</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="actionView">
			<view class="actionItem" @click="handleInvitationClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_share.png"></image>
				</view>
				<view class="cont">
					<view class="title">
						<view style="position: relative;width: 140rpx;">分享给好友</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="actionItem" @click="handleMessageClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_xiaoxi.png"></image>
				</view>
				<view class="cont">
					<view class="title">
						<view style="position: relative;">消息中心
							<u-badge v-if="msgCount > 0" type="error" bgColor="#ff7c7c" :offset="[39,0]" :count="msgCount"></u-badge>
						</view>
					</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
			<view class="actionItem" @click="handleFeedBackClick">
				<view class="licon">
					<image src="../../static/icon/icon_action_fankui.png"></image>
				</view>
				<view class="cont">
					<view class="title">意见反馈</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import Tabbar from '@/components/tabBar/tabBar.vue'
	export default {
		data() {
			return {
                pdbtm:0,//兼容iphonexr+
				windowHeight:0,
				userInfo: {},
				rightCount: 0,
				errorCount: 0,
				msgCount: 0,
				couponCount: 0,
			}
		},
		components: {
			'view-tabbar': Tabbar
		},
		onShow() {
			uni.hideTabBar({
				animation: false
			});	
			var self = this
			var userQuery = new self.Parse.Query(self.Parse.User)
			userQuery.equalTo('openid',self.Parse.User.current().get('openid'))
			userQuery.first().then(res=>{
				uni.setStorage({
					key:'userInfo',
					data:res
				})
				self.userInfo = res
				var query = new self.Parse.Query("ErrorHistory")
				query.equalTo('openid',self.userInfo.get('openid'))
				query.count().then(count=>{
					self.errorCount = count
				})
				var query = new self.Parse.Query("RightHistory")
				query.equalTo('openid',self.userInfo.get('openid'))
				query.first().then(r=>{
					if(r){
						self.rightCount = r.get('questions').length
					}
				})
			})
			uni.getStorage({
				key:'openid',
				success(ores) {
					var query =  new self.Parse.Query('MessageReadHistory')
					query.equalTo('openid', ores.data)
					query.first().then(res=>{
						var msgQuery = new self.Parse.Query("Message")
						if(res){
							self.readHistory = res
							msgQuery.notContainedIn('objectId',res.get('MessageIds'))
						}
						msgQuery.count().then(count=>{
							self.msgCount = count
						})
					})
					let cquery = new self.Parse.Query('CouponRecord')
					cquery.equalTo('openid', ores.data)
					cquery.equalTo('state', 0)
					cquery.greaterThan('useEndTime', new Date())
					cquery.descending('useEndTime', 'state')
					cquery.count().then(count=>{
						self.couponCount = count
					})
				}
			})
		},
		onLoad() {
			let app = getApp();
			this.windowHeight = app.globalData.windowHeight;
			this.pdbtm=125+app.globalData.paddingBottomHeight;
			// uni.getSystemInfo({
			// 			   success: res => {
			// 				this.windowHeight = res.windowHeight;
			// 			   }
			// 			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		methods: {
			jumpvip() {
				uni.navigateTo({
					url: '/mineSubPackage/pages/vip/vip'
				})
			},
			tabbarChange(item) {
				uni.switchTab({
					url:item.path
				})
			},
			/*查看已购项目*/
			handleOrderClick(){
				uni.navigateTo({
					url:'./order'
				})
			},
			/*查看我的优惠券*/
			handleCouponClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/mycoupon/mycoupon'
				})
			},
			/*签到*/
			handleSignInClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/signin/signin'
				})
			},
			/*积分排行榜*/
			handleScoreListClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/score/score'
				})
			},
			/*查看考试记录*/
			handleTestHisClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/testhistory/testhistory'
				})
			},
			handleInvitationClick(){
				uni.navigateTo({
					url: '/mineSubPackage/pages/invitation/invitation'
				})
			},
			/* 消息中心 */
			handleMessageClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/message/message'
				})
			},
			/* 查看详情 */
			handleInfoClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/info/info'
				})
			},
			/*反馈*/
			handleFeedBackClick(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/feedback/feedback'
				})
			},
			/*错题集*/
			handleNoteClick(){
				if(this.userInfo&&this.userInfo.get('openid')){
					if(this.userInfo.get('phone')){
						uni.navigateTo({
							url:'/homeSubPackage/pages/error/index'
						})
					} else {
						uni.reLaunch({
							url:'/pages/login/login'
						})
					}
				} else {
					this.isShowLogin = true
					this.toUrl = '/homeSubPackage/pages/error/index'
				}
			},
			handleScoreRecord(){
				uni.navigateTo({
					url:'/mineSubPackage/pages/scorerecord/scorerecord'
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.vip {
		display: flex;
		justify-content: space-between;
		/* align-content: center; */
		align-items: center;
		height: 100rpx;
		font-size: 28rpx;
		font-weight: 900;
	}
	.vip view {
		font-size: 20rpx;
		font-weight: 700;
		background: #ff4a4a;
		color: #fff;
		border-radius: 25rpx;
		height: 50rpx;
		width: 150rpx;
		text-align: center;
		line-height: 50rpx;
	}
	.myView{
		/* width: calc(100% - 40rpx); */
		padding: 10rpx 30rpx;
	}
	.myView .headView{
		height: 320rpx;
		border-radius: 40rpx;
		background-color: #ffffff;
		padding: 40rpx 40rpx 22rpx 40rpx;
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(238, 160, 160, 0.05);
		border-radius: 40rpx;
	}
	.myView .headView .headCon{
		display: flex;
	}
	.myView .headView .headCon .headIconView{
		width: 128rpx;
		height: 128rpx;
	}
	.myView .headView .headCon .headIconView image{
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		line-height: 128rpx;
	}
	.myView .headView .headCon .nickName{
		flex: 1;
		padding-left: 30rpx;
		height: 128rpx;
		line-height: 128rpx;
		font-size: 38rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.myView .headView .headCon .icon{
		width: 50rpx;
		height: 128rpx;
		line-height: 128rpx;
		text-align: center;
	}
	.myView .headView .scoreView{
		/* width: calc(100% - 40rpx); */
		padding-top: 40rpx;
	}
	.myView .headView .scoreView .content{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}
	.myView .headView .scoreView .content .scoreItem{
		width: 142rpx;
		text-align: center;
		height: 100rpx;
	}
	.myView .headView .scoreView .content .scoreItem .title{
		font-size: 22rpx;
		height: 32rpx;
		line-height: 32rpx;
		color: rgba(53,32,38, 0.6);
		font-family: PingFangSC-Medium;
	}
	.myView .headView .scoreView .content .scoreItem .score{
		font-size: 46rpx;
		font-weight: bold;
		color: #ff6867;
		height: 64rpx;
		line-height: 64rpx;
		font-family: PingFangSC-Medium;
	}
	.myView .actionView{
		margin-top: 24rpx;
		padding: 8rpx 40rpx;
		border-radius: 40rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(238, 160, 160, 0.05);
		border-radius: 40rpx;
	}
	.myView .actionView .actionItem{
		display: flex;
		height: 108rpx;
		line-height: 108rpx;
	}
	.myView .actionView .actionItem:last-child .cont{
		border: 0;
	}
	.myView .actionView .actionItem .licon{
		width: 64rpx;
		height: 64rpx;
		line-height: 108rpx;
	}
	.myView .actionView .actionItem .licon image{
		width: 64rpx;
		height: 64rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.myView .actionView .actionItem .cont{
		flex: 1;
		padding-left: 28rpx;
		display: flex;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.myView .actionView .actionItem .cont .title{
		flex: 1;
		font-size: 28rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.myView .actionView .actionItem .cont .icon{
		width: 50rpx;
		height: 108rpx;
		line-height: 108rpx;
		text-align: right;
	}
	.u-badge-dot{
		border-radius: 50%!important;
	}
	.u-badge{
		min-width: 32rpx;
	}
</style>
