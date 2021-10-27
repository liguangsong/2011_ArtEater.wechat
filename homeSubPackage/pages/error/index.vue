<template>
	<view class="myPage">
		<view class="groupTitle">个人错题集</view>
		<view class="tips">连续答对3遍，它们就会从这里消失。</view>
		<view class="actionView">
			<view class="actionItem" @click="handleMyNoteClick">
				<view class="licon">
					<image src="../../../static/icon/icon_note.png"></image>
				</view>
				<view class="cont">
					<view class="title">{{userInfo.realname?userInfo.realname:''}} 错题集</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view class="groupTitle">公共错题集</view>
		<view class="tips">每天10道错误率最高的全民公敌，大家一起来消灭它们！</view>
		<view class="actionView"  @click="handlePubNoteClick" :data-item="date" v-for="date in dates" :key="date">
			<view class="actionItem">
				<view class="licon">
					<image src="../../../static/icon/icon_note.png"></image>
				</view>
				<view class="cont">
					<view class="title">{{date.y}}-{{date.m}}-{{date.d}} TOP10</view>
					<view class="icon">
						<u-icon name="arrow-right" color="#f4f4f4" size="30"></u-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { addDays } from '@/js/common.js'
	export default {
		data() {
			return {
				userInfo: {},
				dates:[]
			}
		},
		onLoad() {			
			var self = this
			var now = new Date()
			self.dates = []
			for(let i = 1;i <= 7;i++){
				let curr = addDays(now, -i)
				self.dates.push({y:curr.getFullYear(),m: self.PrefixInteger((curr.getMonth()+1),2),d:self.PrefixInteger(curr.getDate(), 2)})
			}
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			uni.getStorage({
				key:'userInfo',
				success(res) {
					self.userInfo = res.data
				}
			})
		},
		methods: {
			/* 我的错题集 */
			handleMyNoteClick(){
				uni.navigateTo({
					url:'../mine/note'
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

<style>
	page{
		background-color: #fbfbfa;
		padding: 30rpx;
		width: calc(100% - 60rpx);
	}
	.myPage{
		/* width: calc(100% - 60rpx); */
	}
	.groupTitle{
		margin-top: 42rpx;
		height: 48rpx;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
	}
	.tips{
		height: 36rpx;
		line-height: 36rpx;
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.4);
		padding-top: 5rpx;
		padding-bottom: 40rpx;
	}
	.actionView{
		margin-top: 18rpx;
		/* padding: 8rpx 40rpx; */
		padding-right: 30rpx;
		padding-left: 6rpx;
		border-radius: 40rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
			rgba(238, 160, 160, 0.05);
		border-radius: 20rpx;
	}
	.actionView .actionItem{
		display: flex;
		height: 108rpx;
		line-height: 108rpx;
	}
	.actionView .actionItem:last-child .cont{
		border: 0;
	}
	.actionView .actionItem .licon{
		width: 64rpx;
		height: 64rpx;
		line-height: 108rpx;
	}
	.actionView .actionItem .licon image{
		width: 64rpx;
		height: 64rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.actionView .actionItem .cont{
		flex: 1;
		padding-left: 8rpx;
		display: flex;
		border-bottom: 1rpx solid #f4f4f4;
	}
	.actionView .actionItem .cont .title{
		flex: 1;
		font-size: 30rpx;
		color: #352026;
		/* font-family: PingFangSC-Medium; */
	}
	.actionView .actionItem .cont .icon{
		width: 50rpx;
		height: 108rpx;
		line-height: 108rpx;
		text-align: right;
	}
</style>
