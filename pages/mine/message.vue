<template>
	<view class="myPage u-demo-area">
		<view class="readAllView">
			<button v-if="notReadCount > 0" @click="handleReadAll">全部已读</button>
			<button v-else class="read">全部已读</button>
		</view>
		<view class="msgItem u-badge-wrap" v-for="msg in msgList" @click="handleMsgClick" :data-item="msg">
			<view class="conView">
				<view class="head">
					<view class="title">{{msg.title}}</view>
					<view class="date">{{msg.CreateTime}}</view>
				</view>
				<view class="content">{{msg.content}}</view>
			</view>
			<view class="icon">
				<image  v-if="msg.isRead==0" src="../../static/icon/icon_dot.png"></image>
			</view>
		</view>
		<view class="loadmore" v-if="msgList.length >= pageSize">
			<u-loadmore @loadmore="handleLoadMore" :status="status" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	import {dateFormat} from '../../js/common.js'
	export default {
		data() {
			return {
				userInfo:{},
				page: 1,
				pageSize: 20,
				status:'loadmore',
				loadText:{
					loadmore: '点击加载更多',
					loading:'正在拼命加载中',
					nomore:'没有更多了'
				},
				notReadCount: 0,
				msgList:[],
				readHistory:[]
			}
		},
		onLoad() {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success: res => {
					self.userInfo = res.data
					
					self.bindData()
				}
			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		methods: {
			handleLoadMore(){
				this.status = 'loading'
				this.page= this.page+1
				this.bindData()
			},
			bindData(){
				var self = this
				var query =  new this.Parse.Query('MessageReadHistory')
				query.equalTo('openid', self.userInfo.openid)
				query.first().then(res=>{
					if(res){
						self.readHistory = res
					}
					var msgQuery = new this.Parse.Query("Message")
					msgQuery.descending('createdAt')
					msgQuery.skip((this.page - 1) * this.pageSize)
					msgQuery.limit(this.pageSize)
					msgQuery.find().then(mres=>{
						if(mres.length > 0) {
							mres.forEach((item)=>{
								item.set('msgid', item.id)
								if(res&&res.get('MessageIds').indexOf(item.id)!=-1) {
									item.set('isRead', 1)
								} else {
									item.set('isRead', 0)
									self.notReadCount += 1
								}
								item.set('CreateTime', dateFormat(item.createdAt,'yyyy-MM-dd'))
							})
							self.status = 'loadmore'
							self.msgList = self.msgList.concat(mres)
						} else {
							self.status = 'nomore'
						}
					})
				})
			},
			/*点击消息查看详情*/
			handleMsgClick(e){
				var self = this
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'./msgdetail?mid=' + item.objectId,
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('content', { title: item.title,data: item.content,createdAt: item.CreateTime })
						self.readMsg(item.objectId)
					}
				})
			},
			/* 阅读消息 */
			readMsg(msgid){
				var self = this
				var query =  new this.Parse.Query('MessageReadHistory')
				query.equalTo('openid', self.userInfo.openid)
				query.first().then(his=>{
					if(his){
						var ids = his.get('MessageIds')
						var id = ids.find(t=>{
							return t==msgid
						})
						if(!id){
							ids.push(msgid)
							his.set('MessageIds', ids)
							his.save().then(res=> {
								self.msgList = []
								self.bindData()
							})
						}
					} else{
						var dbHistory = this.Parse.Object.extend("MessageReadHistory")
						var _history = new dbHistory()
						_history.set('openid', this.userInfo.openid)
						_history.set('MessageIds', [msgid])
						_history.save().then(his => {
							self.readHistory = his
							self.msgList = []
							self.bindData()
						})						
					}
				})
			},
			/*阅读全部消息*/
			handleReadAll(){
				var self= this
				var ids = []
				self.msgList.forEach((item)=>{
					ids.push(item.id)
				})
				var dbHistory = this.Parse.Object.extend("MessageReadHistory")
				var _history = new dbHistory()
				if(self.readHistory) {
					_history.set('id', self.readHistory.id)
				}
				_history.set('openid', this.userInfo.openid)
				_history.set('MessageIds', ids)
				_history.save().then(his => {
					self.msgList = []
					self.notReadCount = 0
					self.bindData()
				})	
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.myPage{
		padding: 40rpx;
	}
	.myPage .readAllView{
		width: 100%;
		padding: 20rpx 0;
		text-align: right;
	}
	.myPage .readAllView button{
		width: 154rpx;
		height: 50rpx;
		line-height: 48rpx;
		border-radius: 50rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #ff9d83;
		border: 2rpx solid #ff9d83;
		background-color: #ffffff;
		display: inline-block;
		padding: 0;
	}
	.myPage .readAllView button::after{
		border: 0;
	}
	.myPage .readAllView button.read{
		width: 154rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 50rpx;
		text-align: center;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #d6d6d6;
		border: solid 2rpx #d6d6d6;
		background-color: #ffffff;
		display: inline-block;
		padding: 0;
		
	}
	.myPage .msgItem{
		position: relative;
		display: flex;
		border-radius: 20rpx;
		/* background-color: #ffffff; */
		/* padding: 20rpx 0; */
		/* margin: 22rpx 0; */
		border-bottom: 1rpx solid #f4f4f4;
		height: 170rpx;
	}
	.myPage .msgItem .conView{
		flex: 1;
		padding-top: 32rpx;
		padding-bottom: 34rpx;
	}
	.myPage .msgItem .conView .head{
		display: inline-flex;
		width: 100%;
	}
	.myPage .msgItem .conView .head .title{
		flex: 1;
		font-size: 34rpx;
		height: 48rpx;
		line-height: 48rpx;
		font-weight: bold;
		color: #352026;
		font-family: PingFangSC-Medium;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.myPage .msgItem .conView .head .date{
		width: 160rpx;
		text-align: right;
		height: 42rpx;
		line-height: 42rpx;
		font-size: 26rpx;
		color: #143a44;
		font-family: PingFangSC-Medium;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.myPage .msgItem .conView .content{
		margin-top: 14rpx;
		font-size: 30rpx;
		height: 42rpx;
		line-height: 42rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.myPage .msgItem .icon{
		width: 50rpx;
		height: 170rpx;
		line-height: 170rpx;
		text-align: right;
	}
	.myPage .msgItem .icon image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.myPage .loadmore{
		margin: 50rpx 0;
	}
</style>
