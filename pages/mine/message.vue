<template>
	<view class="myPage u-demo-area">
		<view class="readAllView">
			<button @click="handleReadAll">全部标记为已读</button>
		</view>
		<view class="msgItem u-badge-wrap" v-for="msg in msgList" @click="handleMsgClick" :data-item="msg">
			<u-badge v-if="msg.isRead==0" size="mini" type="error" is-dot :size="'default'" :offset="[-8, -8]"></u-badge>
			<view class="conView">
				<view class="title">{{msg.title}}</view>
				<view class="content">{{msg.content}}</view>
			</view>
			<!-- <view class="icon">
				<u-icon name="arrow-right" color="#f4f4f4" size="32"></u-icon>
			</view> -->
		</view>
		<view class="loadmore">
			<u-loadmore @loadmore="handleLoadMore" :status="status" :load-text="loadText" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:{},
				page: 1,
				pageSize: 20,
				status:'loadmore',
				loadText:{
					loadmore: '点击或上拉加载更多',
					loading:'正在拼命加载中',
					nomore:'没有更多了'
				},
				msgList:[],
				readHistory:[]
			}
		},
		onLoad() {
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
					this.bindData()
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
								}
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
						res.eventChannel.emit('content', { data: item.content })
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
							his.save().then(res=>{
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
		padding: 36rpx;
	}
	.myPage .msgItem{
		position: relative;
		display: flex;
		border-radius: 20rpx;
		background-color: #ffffff;
		padding: 20rpx 40rpx;
		margin: 22rpx 0;
	}
	.myPage .msgItem .conView{
		flex: 1;
	}
	.myPage .msgItem .conView .title{
		font-size: 34rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.myPage .msgItem .conView .content{
		font-size: 22rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	.myPage .msgItem .icon{
		width: 50rpx;
	}
</style>
