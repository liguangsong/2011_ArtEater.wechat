<template>
	<view>
		<template v-if="videoList && videoList.length > 0">
			<view class="mainVideo">
				<video v-if="currVideo.videoSrc" :custom-cache="false" :autoplay="true" :src="currVideo.videoSrc"></video>
			</view>
			<view class="currTitle">{{currVideo.title}}</view>
			<view class="tabView">
				<view :class="'tabItem ' + (tab=='tab1'? 'curr':'')"  @click="tab = 'tab1'">
					<view class="title">课程列表</view>
					<view class="icon" v-if="tab=='tab1'">
						<image src="../../static/icon/icon_tab_bg.png"></image>
					</view>
				</view>
				<view :class="'tabItem ' + (tab=='tab2'? 'curr':'')"  @click="tab = 'tab2'">
					<view class="title">课程简介</view>
					<view class="icon" v-if="tab=='tab2'">
						<image src="../../static/icon/icon_tab_bg.png"></image>
					</view>
				</view>
			</view>
			<view v-if="tab=='tab1'">
				<view class="videoList">
					<view class="videoItem" v-for="item in videoList" @click="handleItemClick" :data-item="item">
						<view class="video">
							<view class="cover">
								<image :src="item.coverUrl" mode="aspectFill"></image>
							</view>
							<view class="playing" v-if="item.objectId==currVideo.objectId">
								<image src="../../static/icon/icon_playing.png"></image>
								<view>正在播放</view>
							</view>
							<view class="lock" v-else-if="currCourse.price > 0 && !hasBuyed">
								<image src="../../static/icon/icon_lock_big.png"></image>
							</view>
						</view>
						<view class="content">
							<view class="title" :style="{color:(item.objectId == currVideo.objectId ? '#ff6867' : '#352026')}">{{item.title}}</view>
							<view class="action" v-if="currCourse.price>0&&!hasBuyed">立即解锁</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="tab=='tab2'">
				<view class="comments">
					<u-parse :html="currVideo.remark?currVideo.remark:''"></u-parse>
				</view>
			</view>
		</template>
		<template v-else>
			<view style="text-align: center;padding-top: 200rpx;">
				<view style="text-align: center;">
					<image mode="aspectFit" src="/static/icon_video_null.png" style="width:422rpx;height: 362rpx;"></image>
				</view>
				<view style="font-family: PingFangSC-Medium;font-size: 38rpx;line-height: 42rpx;margin-top:20rpx;color: rgba(53, 32, 38, 0.7);">
				暂无视频课程</view>
			</view>
			<view style="position: fixed;bottom: 180rpx;padding: 0 30rpx;">
				<view class="btnBack" @click="handleGoBack">返回</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: 'tab1',
				baseCourse: {}, // 顶级套课
				currCourse: {}, // 当前套课
				recommend: {}, // 推荐
				currVideo: {},
				videoList: [],
				hasBuyed: false,
			}
		},
		onLoad(options) {
			var self = this
			if(options.rid){
				var recommendQuery = new this.Parse.Query('Recommend')
				recommendQuery.get(options.rid).then(async recommend=>{
					if(recommend){
						var videoQuery = new this.Parse.Query('Video')
						if(!recommend.get('videoId')){
							return
						}
						await videoQuery.get(recommend.get('videoId')).then(video=>{
							self.currVideo = video
						})
						var query = new this.Parse.Query('Video')
						query.containsAll('courseIds',[recommend.get('courseId')])
						query.ascending('createdAt')
						await query.find().then(videos=>{
							self.videoList = videos
						})
						var query1 = new this.Parse.Query('Courses')
						await query1.get(recommend.get('courseId')).then(course=>{
							self.currCourse = course
						})
						self.bindBaseCourse(recommend.get('courseId'))
					}
					// self.recommend = recommend
				})
			}
			
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
		},
		methods: {
			bindBaseCourse(id){
				var self = this
				var query = new self.Parse.Query('Courses')
				query.get(id).then(course=>{
					if(course.get('parent_ID') == '0'){ // 顶级
						self.baseCourse = course
					} else {
						self.bindBaseCourse(course.get('parent_ID'))
					}
				})
			},
			/*查询是否购买了本套课*/
			bindOrder(){
				var self = this
				var query = new self.Parse.Query("Order")
				query.equalTo('openId', self.userInfo.openid)
				query.contains('subjectId', self.baseCourse.id)
				query.equalTo('state', 1)
				query.first().then(res=>{
					if(res){
						self.hasBuyed = true
					}
				})
			},
			/*点击视频项*/
			handleItemClick(e){
				var _item = e.currentTarget.dataset.item
				var self = this
				if(self.baseCourse.get('price') == 0 || self.hasBuyed){ // 免费或者已购买
					self.currVideo = _item
				} else {
					uni.navigateTo({
						url:'../buy/buy?subjectId='+ self.baseCourse.id
					})
				}
			},
			handleGoBack(){
				wx.navigateBack()
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfa;
	}
	.mainVideo{
		width: 100%;
		height: 422rpx;
	}
	.mainVideo video{
		width: 100%;
		height: 100%;
	}
	.currTitle{
		line-height: 48rpx;
		font-family: PingFangSC-Semibold;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		font-weight: bold;
		padding: 20rpx 40rpx 6rpx 40rpx;
	}
	.tabView{
		padding: 20rpx 48rpx 10rpx 48rpx;
		display: flex;
		/* border-bottom: 4rpx solid #f4f4f4; */
	}
	.tabView .tabItem{
		flex: 1;
		text-align: center;
		height: 50rpx;
	}
	.tabView .tabItem .title{
		height: 36rpx;
		font-family: PingFangSC-Medium;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
	}
	.tabView .tabItem.curr .title{
		color: #352026;
	}
	.tabView .tabItem .icon{
		width: 52rpx;
		height: 8rpx;
		text-align: center;
		display: inline-block;
		position: relative;
		top: -16rpx;
	}
	.tabView .tabItem .icon image{
		width: 52rpx;
		height: 8rpx;
		display: inline-block;
		vertical-align: middle;
		position: absolute;
		left: 0;
	}
	.videoList{
		padding: 0 30rpx;
		padding-top: 8rpx;
	}
	.videoList .videoItem{
		width: 690rpx;
		height: 214rpx;
		margin-bottom: 30rpx;
		background-color: #ffffff;
		box-shadow: 0rpx 16rpx 44rpx 0rpx 
			rgba(226, 171, 166, 0.21);
		border-radius: 40rpx;
		display: flex;
	}
	.videoList .videoItem .video{
		margin: 26rpx 26rpx 22rpx 28rpx;
		width: 208rpx;
		height: 164rpx;
		position: relative;
	}
	.videoList .videoItem .video video{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
	}
	.videoList .videoItem .video .cover{
		width: 208rpx;
		height: 164rpx;
		position: absolute;
	}
	.videoList .videoItem .video .cover image{
		width: 100%;
		height: 100%;
		border-radius: 10rpx;
		background-color: #000000;
	}
	.videoList .videoItem .video .lock{
		text-align: center;
		width: 208rpx;
		height: 164rpx;
		line-height: 164rpx;
		position: absolute;
		background-color: rgba(53, 32, 38, 0.5);
		border-radius: 10rpx;
	}
	.videoList .videoItem .video .lock image{
		width: 44rpx;
		height: 44rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.videoList .videoItem .video .playing{
		text-align: center;
		width: 208rpx;
		height: 164rpx;
		position: absolute;
		background-color: rgba(53, 32, 38, 0.5);
		border-radius: 10rpx;
		padding-top: 50rpx;
	}
	.videoList .videoItem .video .playing image{
		width: 30rpx;
		height: 26rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.videoList .videoItem .video .playing view{
		height: 32rpx;
		font-family: PingFangSC-Medium;
		font-size: 22rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ffffff;
		margin-top: 10rpx;
	}
	.videoList .videoItem .content{
		flex: 1;
		padding: 28rpx 28rpx 30rpx 0;
	}
	.videoList .videoItem .content .title{
		height: 84rpx;
		line-height: 42rpx;
		font-family: PingFangSC-Medium;
		font-size: 30rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.videoList .videoItem .content .action{
		width: 138rpx;
		text-align: center;
		height: 50rpx;
		line-height: 48rpx;
		margin-top: 22rpx;
		background-color: #ffffff;
		border-radius: 25rpx;
		border: solid 2rpx #ff6867;
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867;
		float: right;
	}
	.comments{
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		line-height: 54rpx;
		letter-spacing: 0rpx;
		color: #352026;
		padding: 16rpx 30rpx 50rpx 40rpx;
	}
	.btnBack{
		width: 690rpx;
		background-color: #ffffff;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		border-radius: 46rpx;
		border: solid 2rpx #ff6867;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #352026;
	}
</style>
