<template>
	<view>
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
				<view class="icon">
					<u-icon name="arrow-right" color="#e7e7e7" size="30"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {dateFormat} from '../../js/common.js'
	export default {
		data() {
			return {
				userInfo:{},
				testHistory: []
			}
		},
		onLoad() {
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			var self = this
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					self.userInfo = res.data
					self.bindData()
				}
			})
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
	page{
		background-color: #fbfbfb;
	}
	.myView{
	}
	.myView .hisItem{
		display: flex;
		height: 132rpx;
		line-height: 132rpx;
		margin: 0 30rpx;
		border-bottom: 2rpx solid #f1f1f1;
	}
	.myView .hisItem .contView{
		flex: 1;
		padding: 26rpx 0;
	}
	.myView .hisItem .icon{
		height: 132rpx;
		line-height: 132rpx;
		width: 50rpx;
		text-align: right;
	}
	.mView{
		display: flex;
		width: 100%;
		height: 42rpx;
		line-height: 42rpx;
	}
	.tView{
		display: flex;
		width: 100%;
		height: 36rpx;
		line-height: 36rpx;
	}
	.mView .name{
		flex: 1;
		text-align: left;
		font-size: 30rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1!important;
		-webkit-box-orient: vertical!important;
	}
	.mView .score{
		/* flex: 1; */
		width: 150rpx;
		text-align: right;
		font-size: 30rpx;
		font-weight: bold;
		color: #143a44;
		font-family: PingFangSC-Medium;
	}
	.tView .time{
		flex: 1;
		text-align: left;
		font-size: 26rpx;
		color: rgba(53,32,38, 0.7);
		font-family: PingFangSC-Medium;
	}
	.tView .seconds{
		flex: 1;
		text-align: right;
		font-size: 26rpx;
		color: rgba(53,32,38, 0.7);
		font-family: PingFangSC-Medium;
		
	}
</style>
