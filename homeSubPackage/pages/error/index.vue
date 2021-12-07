<template>
	<TopNavbar title='错题集'>
		<view class="blankpage" v-if='dates.length'>
			<view class="blankpage-info">
				<image src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/%E9%94%99%E9%A2%98%E9%9B%86%E7%A9%BA%E7%99%BD%E9%A1%B5%E6%8F%92%E5%9B%BE.png"></image>
				<view class="kill">
					<text>错题已灭杀</text>
				</view>
				<view class="info">
					<text>今日公共错题灭杀行动已完成\n</text>
					<text>做错的题目已转入你的个人错题集</text>
				</view>
			</view>
			<view class="btn">
				<view class='back' @click='back'>返回</view>
			</view>
		</view>
		<view v-else>
			<view class="title-info title-margin">
				<view class="left">
					<view class="red-block"></view>
					个人错题集
				</view>
				<view class="right">连续答对3遍，它们就会从这里消失</view>
			</view>
			<view class="actionView">
				<view class="actionItem" @click="handleMyNoteClick">
					<view class="licon">
						<image src="../../../static/icon/icon_note.png"></image>
					</view>
					<view class="cont">
						<view class="title">{{userInfo.realname?userInfo.realname:''}} 错题集</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#ccc" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>
			<view class="title-info title-margin">
				<view class="left">
					<view class="red-block"></view>
					公共错题集
				</view>
				<view class="right">每天10道错误率最高的全民公敌，大家一起来消灭它们</view>
			</view>
			<view class="actionView"  @click="handlePubNoteClick" :data-item="date" v-for="date in dates" :key="date">
				<view class="actionItem">
					<view class="licon">
						<image src="../../../static/icon/icon_note.png"></image>
					</view>
					<view class="cont">
						<view class="title">{{date.y}}-{{date.m}}-{{date.d}} TOP10</view>
						<view class="icon">
							<u-icon name="arrow-right" color="#ccc" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import { addDays } from '@/js/common.js';
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				userInfo: {},
				dates:[]
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {			
			var self = this
			var now = new Date()
			self.dates = []
			for(let i = 1;i <= 7;i++){
				let curr = addDays(now, -i)
				self.dates.push({y:curr.getFullYear(),m: self.PrefixInteger((curr.getMonth()+1),2),d:self.PrefixInteger(curr.getDate(), 2)})
			}

			uni.getStorage({
				key:'userInfo',
				success(res) {
					self.userInfo = res.data
				}
			})
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			/* 我的错题集 */
			handleMyNoteClick(){
				uni.navigateTo({
					url:'/homeSubPackage/pages/error/note'
				})
			},
			/*公共错题集*/
			handlePubNoteClick(e){
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'./error?y=' +  item.y + '&m=' + (parseInt(item.m)-1) + '&d=' + parseInt(item.d)
				})
			},
			PrefixInteger(num, n) {
				return (Array(n).join(0) + num).slice(-n);
			}
		}
	}
</script>

<style scoped lang='scss'>
	.blankpage {
		position: relative;
		height: 100%;
	}
	.blankpage-info {
		padding-top: 206rpx;
		width: 100%;
		text-align: center;
		color: #000000;
	}
	.blankpage-info image {
		width: 228rpx;
		height: 228rpx;
	}
	.kill {
		margin: 34rpx auto 54rpx;
		font-size: 30rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		line-height: 42rpx;
	}
	.info {
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 34rpx;
		opacity: .6;
	}
	.btn {
		width: 750rpx;
		height: 140rpx;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.back {
		width: 690rpx;
		height: 92rpx;
		border-radius: 46rpx;
		text-align: center;
		border: 2rpx solid #D81E1F;
		margin: 8rpx auto auto;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #D81E1F;
		line-height: 92rpx;
	}
	.title-margin {
		margin: 48rpx 0 26rpx;
	}
	.actionView{
		width: 690rpx;
		height: 84rpx;
		background: #FFFFFF;
		box-shadow: 0 2rpx 6rpx 0 rgba(0,0,0,0.04);
		border-radius: 16rpx;
		margin: 0 auto 16rpx;
		padding: 0 32rpx 0 34rpx;
	}
	.actionView .actionItem{
		display: flex;
		height: 100%;
		align-items: center;
	}
	.actionView .actionItem .licon{
		width: 36rpx;
		height: 34rpx;
	}
	.actionView .actionItem .licon image{
		width: 100%;
		height: 100%;
	}
	.actionView .actionItem .cont{
		flex: 1;
		height: 100%;
		padding-left: 18rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.actionView .actionItem .cont .title{
		flex: 1;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0,0,0,.7);
	}
	.actionView .actionItem .cont .icon{
		width: 50rpx;
		text-align: right;
	}
</style>
