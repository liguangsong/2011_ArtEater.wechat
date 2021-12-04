<template>
	<TopNavbar title='考试记录' bg='#f7f7f7'>
		<view style='height:28rpx'></view>
		<view v-if='!testHistory.length' class='testHistory'>
			暂无记录
		</view>
		<view class="myView">
			<view class="hisItem" v-for="(item, index) in testHistory" @click="handleItemClick" :data-item="item">
				<view class="contView">
					<view class="mView">
						<view class="name">{{item.examName}}</view>
						<view class="score">{{item.score}}分</view>
					</view>
					<view class="tView">
						<view class="time">{{item.createdDate}}</view>
						<view class="seconds">用时：{{item.minutes}}</view>
					</view>
				</view>
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import {dateFormat} from '../../../js/common.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				userInfo:{},
				testHistory: []
			}
		},
		onLoad() {

			var self = this
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					self.userInfo = res.data
					self.bindData()
				}
			})
		},
		components: {
			TopNavbar
		},
		methods: {
			bindData(){
				var self = this
				const history = this.Parse.Object.extend("TestHistory")
				const query = new this.Parse.Query(history)
				query.descending('createdAt')
				query.equalTo('openid',self.userInfo.openid)
				query.find().then(list => {
					list.forEach(item=>{
						item.set('createdDate', dateFormat(item.createdAt,'yyyy-MM-dd HH:mm:ss'))
						item.set('minutes', self.createMinutes(item.get('seconds')))
					})
					self.testHistory = list
				})
			},
			createMinutes(seconds){
				return Math.floor(seconds/60)+'分钟'+(seconds%60)+'秒'
			},
			handleItemClick(e){
				var _item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'/pages/mine/testresult?eid=' + _item.objectId
				})
			}
		}
	}
</script>

<style>
	.testHistory {
		height: 600rpx;
		font-family: PingFangSC-Medium;
		font-size: 20px;
		color: rgba(53, 32, 38, 0.4);
		line-height: 600rpx;
		text-align: center;
	}
	.myView .hisItem{
		display: flex;
		height: 142rpx;
		line-height: 142rpx;
		margin-left: 48rpx;
		border-bottom: 2rpx solid rgba(0,0,0,.06);
	}
	.myView .hisItem .contView{
		flex: 1;
		padding-top: 32rpx;
		padding-right: 76rpx;
	}

	.mView{
		display: flex;
		width: 100%;
		height: 42rpx;
		line-height: 42rpx;
	}
	.myView .hisItem:last-child {
		border-bottom: none;
	}
	.tView{
		display: flex;
		width: 100%;
		margin-top: 6rpx;
	}
	.mView .name{
		flex: 1;
		padding-right: 100rpx;
		text-align: left;
		font-size: 32rpx;
		font-weight: bold;
		color: rgba(0,0,0,.9);
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1!important;
		-webkit-box-orient: vertical!important;
	}
	.mView .score{
		text-align: right;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #D81E1F;
		line-height: 48rpx;
	}
	.tView .time{
		flex: 1;
		text-align: left;
		font-size: 20rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(0,0,0,.29);
		line-height: 28rpx;
	}
	.tView .seconds{
		flex: 1;
		text-align: right;
		font-size: 20rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(0,0,0,.29);
		line-height: 28rpx;
	}
</style>
