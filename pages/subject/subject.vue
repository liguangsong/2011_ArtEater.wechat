<template>
	<view class="myPage" :style="{'height':windowHeight + 'px','overflow-y': isShowTips ? 'auto' : 'scroll'}">
		<view class="treeView">
			<!--一级-->
			<view class="treeItem" style="margin-left: 16rpx;margin-top: 12rpx;margin-bottom: 60rpx;">
				<view class="content">
					<view class="conView">
						<view class="listTxt" @click="handleNameClick" :data-item="subjectDetail">{{subjectDetail.subject_name}}</view>
						<view class="listAction">
							<view class="action" @click="handleNameClick" :data-item="subjectDetail">
								<image v-if="subjectDetail.content" src="../../static/icon/icon_order.png"></image>
							</view>
							<view class="action" @click="handleTestClick" :data-item="subjectDetail">
								<image v-if="subjectDetail.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!--二级-->
			<view v-for="(subject,index) in subjectTree" class="treeItem">
				<view class="listIcon">
					<template v-if="subject.has_down_level">
						<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;left: 10rpx;" @click="handleExtend(subject)">
							<image v-if="!subject.extend" src="../../static/icon/icon_add.png"></image>
							<image v-else src="../../static/icon/icon_remove.png"></image>
						</view>
					</template>
				</view>
				<view class="content">
					<view class="conView">
						<view class="listTxt" @click="handleNameClick" :data-item="subject">{{subject.subject_name}}</view>
						<view class="listAction">
							<view class="action" @click="handleNameClick" :data-item="subject">
								<image v-if="subject.content" src="../../static/icon/icon_order.png"></image>
							</view>
							<view class="action" @click="handleTestClick" :data-item="subject">
								<image v-if="subject.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
							</view>
						</view>
					</view>
					<!--三级-->
					<view class="children" v-if="subject.extend">
						<view v-for="(sub,idx) in subject.children" class="treeItem">
							<view class="listIcon">
								<template v-if="sub.has_down_level">
									<view class="actionExtend"  @click="handleExtend(sub)">
										<image v-if="!sub.extend" src="../../static/icon/icon_add_child.png"></image>
										<image v-else src="../../static/icon/icon_remove_children.png"></image>
									</view>
								</template>
								<template v-else>
									<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
										<image src="../../static/icon/icon_nochild.png"></image>
									</view>
								</template>
							</view>
							<view class="content">
								<view class="conView">
									<view class="listTxt" @click="handleNameClick" :data-item="sub">{{sub.subject_name}}</view>
									<view class="listAction">
										<view class="action" @click="handleNameClick" :data-item="sub">
											<image v-if="sub.content" src="../../static/icon/icon_order.png"></image>
										</view>
										<view class="action" @click="handleTestClick" :data-item="sub">
											<image v-if="sub.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
										</view>
									</view>
								</view>
								<!--四级-->
								<view class="children" v-if="sub.extend">
									<view v-for="sub1 in sub.children" class="treeItem">
										<view class="listIcon">
											<template v-if="sub1.has_down_level">
												<view class="actionExtend" @click="handleExtend(sub1)">
													<image v-if="!sub1.extend" src="../../static/icon/icon_add_child.png"></image>
													<image v-else src="../../static/icon/icon_remove_children.png"></image>
												</view>
											</template>
											<template v-else>
												<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
													<image src="../../static/icon/icon_nochild.png"></image>
												</view>
											</template>
										</view>
										<view class="content">
											<view class="conView">
												<view class="listTxt" @click="handleNameClick" :data-item="sub1">{{sub1.subject_name}}</view>
												<view class="listAction">
													<view class="action" @click="handleNameClick" :data-item="sub1">
														<image v-if="sub1.content" src="../../static/icon/icon_order.png"></image>
													</view>
													<view class="action" @click="handleTestClick" :data-item="sub1">
														<image v-if="sub1.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
													</view>
												</view>
											</view>
											
											<!--5级-->
											<view class="children" v-if="sub1.extend">
												<view v-for="sub2 in sub1.children" class="treeItem">
													<view class="listIcon">
														<template v-if="sub2.has_down_level">
															<view class="actionExtend" @click="handleExtend(sub2)">
																<image v-if="!sub2.extend" src="../../static/icon/icon_add_child.png"></image>
																<image v-else src="../../static/icon/icon_remove_children.png"></image>
															</view>
														</template>
														<template v-else>
															<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																<image src="../../static/icon/icon_nochild.png"></image>
															</view>
														</template>
													</view>
													<view class="content">
														<view class="conView">
															<view class="listTxt" @click="handleNameClick" :data-item="sub2">{{sub2.subject_name}}</view>
															<view class="listAction">
																<view class="action" @click="handleNameClick" :data-item="sub2">
																	<image v-if="sub2.content" src="../../static/icon/icon_order.png"></image>
																</view>
																<view class="action" @click="handleTestClick" :data-item="sub2">
																	<image v-if="sub2.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
																</view>
															</view>
														</view>
														<!--6级-->
														<view class="children" v-if="sub2.extend">
															<view v-for="sub3 in sub2.children" class="treeItem">
																<view class="listIcon">
																	<template v-if="sub3.has_down_level">
																		<view class="actionExtend" @click="handleExtend(sub3)">
																			<image v-if="!sub3.extend" src="../../static/icon/icon_add_child.png"></image>
																			<image v-else src="../../static/icon/icon_remove_children.png"></image>
																		</view>
																	</template>
																	<template v-else>
																		<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																			<image src="../../static/icon/icon_nochild.png"></image>
																		</view>
																	</template>
																</view>
																<view class="content">
																	<view class="conView">
																		<view class="listTxt" @click="handleNameClick" :data-item="sub3">{{sub3.subject_name}}</view>
																		<view class="listAction">
																			<view class="action" @click="handleNameClick" :data-item="sub3">
																				<image v-if="sub3.content" src="../../static/icon/icon_order.png"></image>
																			</view>
																			<view class="action" @click="handleTestClick" :data-item="sub3">
																				<image v-if="sub3.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
																			</view>
																		</view>
																	</view>
																	<!--7级-->
																	<view class="children" v-if="sub3.extend">
																		<view v-for="sub4 in sub3.children" class="treeItem">
																			<view class="listIcon">
																				<template v-if="sub4.has_down_level">
																					<view class="actionExtend" @click="handleExtend(sub4)">
																						<image v-if="!sub4.extend" src="../../static/icon/icon_add_child.png"></image>
																						<image v-else src="../../static/icon/icon_remove_children.png"></image>
																					</view>
																				</template>
																				<template v-else>
																					<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																						<image src="../../static/icon/icon_nochild.png"></image>
																					</view>
																				</template>
																			</view>
																			<view class="content">
																				<view class="conView">
																					<view class="listTxt" @click="handleNameClick" :data-item="sub4">{{sub4.subject_name}}</view>
																					<view class="listAction">
																						<view class="action" @click="handleNameClick" :data-item="sub4">
																							<image v-if="sub4.content" src="../../static/icon/icon_order.png"></image>
																						</view>
																						<view class="action" @click="handleTestClick" :data-item="sub4">
																							<image v-if="sub4.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
																						</view>
																					</view>
																				</view>
																				
																				<!--8级-->
																				<view class="children" v-if="sub4.extend">
																					<view v-for="sub5 in sub4.children" class="treeItem">
																						<view class="listIcon">
																							<template v-if="sub5.has_down_level">
																								 <view class="actionExtend" @click="handleExtend(sub5)">
																									<image v-if="!sub5.extend" src="../../static/icon/icon_add_child.png"></image>
																									<image v-else src="../../static/icon/icon_remove_children.png"></image>
																								</view>
																							</template>
																							<template v-else>
																								<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																									<image src="../../static/icon/icon_nochild.png"></image>
																								</view>
																							</template>
																						</view>
																						<view class="content">
																							<view class="conView">
																								<view class="listTxt" @click="handleNameClick" :data-item="sub5">{{sub5.subject_name}}</view>
																								<view class="listAction">
																									<view class="action" @click="handleNameClick" :data-item="sub5">
																										<image v-if="sub5.content" src="../../static/icon/icon_order.png"></image>
																									</view>
																									<view class="action" @click="handleTestClick" :data-item="sub5">
																										<image v-if="sub5.quesCount > 0" src="../../static/icon/icon_pencle.png"></image>
																									</view>
																								</view>
																							</view>
																						</view>
																					</view>
																				</view>
																			</view>
																		</view>
																	</view>
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="isShowSubjectDetail" width="674rpx" mode="center" border-radius="40">
			<view class="detailView" style="padding:74rpx 30rpx;">
				<scroll-view scroll-y="true" :style="'max-height:'+(screenHeight - 600)+'rpx;'">
					<view style="margin: 0 20rpx;">
						<u-parse :html="currSubjectDetail.content"></u-parse>
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="isShowSubjectBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
			<view class="buylView" style="padding:74rpx 40rpx;">
				<view class="title">{{subjectDetail.subject_name}}</view>
				<view class="price">¥{{subjectDetail.price}}</view>
				<view class="tips">
					您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
				</view>
				<view class="tips">
					购买后可在【个人中心-已购项目】中查看
				</view>
				<view class="btnActions">
					<button @click="handleBuyBtnClick">确认购买</button>
				</view>
			</view>
		</u-popup>
		<u-mask :custom-style="{'background': 'rgba(255, 255, 255, 0.7)'}" :show="isShowTips" :mask-click-able="false" :zoom="false" @click="show = false">
			<view v-show="step==1" class="step step1">
				<view class="action">
					<image src="../../static/icon/icon_order.png"></image>
				</view>
			</view>
			<view v-show="step==1" class="tooltip tip1">
				<view class="timg" style="left: 150rpx;">
					<image src="../../static/icon/icon_tips_right.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>单元知识摘要</text>
					</view>
					<view class="action" @click="handleStep">我知道了</view>
				</view>
			</view>
			<view v-show="step==2" class="step step2">
				<view class="action">
					<image src="../../static/icon/icon_pencle.png"></image>
				</view>
			</view>
			<view v-show="step==2" class="tooltip tip2">
				<view class="timg" style="left: 124rpx;">
					<image src="../../static/icon/icon_tips_right.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>单元练习题</text>
					</view>
					<view class="action" @click="handleStep">我知道了</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import config from '../../static/config/index.js'
	import { dateFormat, GetRandomNum, createWechatPay } from '../../js/common.js'
	export default {
		data() {
			return {
				subjectTree:[],
				userInfo: null,
				isShowTips: false,
				step: 1,
				subjectId:'',
				subjectDetail: null,
				currSubjectDetail: null,
				isShowSubjectDetail: false,
				isShowSubjectBuy: false,
				screenHeight:0,
				hasBuyed: false,
				windowHeight: 0
			}
		},
		onShow() {
		},
		onLoad(options) {
			var self = this
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			
			uni.getSystemInfo({
			   success: res => {
			 	self.windowHeight = res.windowHeight
			   }
			})
			uni.getStorage({
				key:'hasSubjectTiped',
				success:(res)=>{
					self.isShowTips = res.data ? false : true
				},
				fail() {
					self.isShowTips = true
				}
			})
			if(options.sid){
				this.subjectId = options.sid
				uni.getStorage({
					key:'userInfo',
					success: res => {
						self.userInfo = res.data
						self.bindOrder()
						self.bindSubjectDetail()
						self.bindSubjectTree()
					}
				})
			}
			uni.getSystemInfo({
			  success: res => {
				console.log(res)
				let screenWidth = res.screenWidth
				this.screenHeight = res.screenHeight*750/res.screenWidth
			  }
			})
		},
		methods: {
			/*加载科目详情*/
			bindSubjectDetail(){
				var self = this
				var query = new this.Parse.Query("Subjects")
				query.get(this.subjectId).then(res=>{
					self.subjectDetail = res
				})
			},
			/*查询是否已购买本章节*/
			bindOrder(){
				var self = this
				var query = new this.Parse.Query("Order")
				query.equalTo('openId', self.userInfo.openid)
				query.equalTo('subjectId',this.subjectId)
				query.equalTo('state', 1)
				query.first().then(res=>{
					if(res){
						self.hasBuyed = true
					}
				})
			},
			/* 加载科目树*/
			bindSubjectTree(){
				var self = this
				uni.showLoading({
					title:'加载中……'
				})
				var query = new this.Parse.Query("Subjects")
				// query.equalTo("parent_ID", this.subjectId)
				query.ascending('createdAt')
				query.limit(10000)
				query.find().then(res=>{
					var ids = []
					res.forEach(t=>{
						ids.push(t.id)
					})
					var quesQuery = new self.Parse.Query("TestQuestions")
					quesQuery.containedIn('subjects', ids)
					quesQuery.limit(10000)
					quesQuery.select('objectId','subjects')
					quesQuery.find().then(ques=>{
						res.forEach(item => {
							let questions = ques.filter(t=>{
								return t.get('subjects').indexOf(item.id)!=-1
							})
							item.quesCount = questions.length
						})
						var tree = self.initSubjectTree(res, self.subjectId)
						self.subjectTree = tree
						uni.hideLoading()
					})
				})
			},
			/** 构造树形科目 */
			initSubjectTree(subjects, parentId){
				var self = this
				var treeValue = []
				let _subjects = subjects.filter((_item)=>{
					return _item.get('parent_ID') == parentId
				})
				_subjects.forEach((_subject, _index)=> {
					let subject = {
						subject_name: _subject.get('subject_name'),
						content: _subject.get('content'),
						price: _subject.get('price'),
						quesCount: _subject.quesCount,
						extend: false,
						has_down_level: _subject.get('has_down_level'),
						value: _subject.id,
					}
					let childrens = subjects.filter(_item=>{
						return _item.get('parent_ID') == _subject.id
					})
					if(childrens.length>0){
						subject.children = self.initSubjectTree(subjects, _subject.id)
					}
					treeValue.push(subject)
				})
				return treeValue
			},
			/*展开关闭*/
			handleExtend(subject){
				subject.extend = !subject.extend
			},
			/*查看详情*/
			handleNameClick(e){
				var item = e.currentTarget.dataset.item
				if(item.content){
					this.currSubjectDetail = item
					this.isShowSubjectDetail = true
				}
			},
			/*弹出购买界面*/
			handleBuyClick(){
				this.isShowSubjectBuy = true
			},
			/*点击购买按钮*/
			handleBuyBtnClick(){
				var self = this
				uni.showLoading()
				var _subject = this.currSubjectDetail
				var user = self.Parse.User.current()
				var price = self.subjectDetail.get('price') * 100
				this.Parse.Cloud.run('initiatePayment',
					{price: price,},
					{sessionToken: user.get('sessToken'),}).then(res=>{
					var payload = res.payload
					var tradeId = res.tradeId
					uni.requestPayment({
					  appId: payload.appId,
					  timeStamp: payload.timeStamp,
					  nonceStr: payload.nonceStr,
					  package: payload.package,
					  signType: payload.signType,
					  paySign: payload.paySign,
					  success (res) {
						var dbOrder = self.Parse.Object.extend("Order")
						var order = new dbOrder()
						order.set('orderNo', tradeId)
						order.set("subjectId",  self.subjectId)
						order.set("subjectName",  self.subjectDetail.get('subject_name'))
						order.set("price",  self.subjectDetail.get('price'))
						order.set("openId", self.userInfo.openid)
						order.set("state", 1)
						order.set("wechatPayOrderId", '') // 支付流水号
						order.save().then(_order => {
							uni.hideLoading()
							uni.showModal({
								content:'恭喜，购买成功',
								showCancel: false
							})
							self.isShowSubjectBuy = false
							self.bindOrder()
						},(error)=>{
							uni.hideLoading()
						  	console.log(error)
						})
						var user = self.Parse.User.current()
						user.set('amount', user.get('amount') + parseFloat(self.subjectDetail.get('price')))
						user.save().then(ruser=>{
							uni.setStorage({
								key: 'userInfo',
								data: ruser
							})
						})
					  },
					  fail (res) {
						uni.hideLoading()
						console.log("支付失败"+ JSON.stringify(res))
					  }
					})
				})
			},
			/*做题*/
			handleTestClick(e){
				var self = this
				var item = e.currentTarget.dataset.item
				if(item.price > 0 && !self.hasBuyed) {
					this.isShowSubjectBuy = true
				} else {
					var item = e.currentTarget.dataset.item
					uni.navigateTo({
						url:'exam?bsid='+self.subjectId+'&sid=' + item.value,
						events: {
							buySuccess: function(data) {
								debugger
								self.bindOrder()
							}
						}
					})
				}
			},
			handleStep(){
				this.step += 1
				if(this.step > 2){
					uni.setStorage({
						key:'hasSubjectTiped',
						data: true
					})
					this.isShowTips = false	
				}
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
		overflow: hidden;
	}
	.treeView{
		padding: 30rpx;
		line-height: 66rpx;
	}
	.treeView .treeItem {
		display: flex;
		margin-bottom: 66rpx;
	}
	.treeView .treeItem:last-child {
		margin-bottom: 0;
	}
	.treeView .treeItem .listIcon {
		width: 70rpx;
		height: 50rpx;
		line-height: 40rpx;
		text-align: right;
	}
	.treeView .treeItem .listIcon .actionExtend{
		width: 50rpx;
		position: relative;
		left: -30rpx;
		text-align: center;
	}
	.treeView .treeItem .listIcon .actionExtend image{
		display: inline-block;
		vertical-align: middle;
		width: 32rpx;
		height: 32rpx;
		justify-items: legacy;
	}
	.treeView .treeItem .content{
		flex: 1;
	}
	.treeView .treeItem .content .conView{
		display: flex;
	}
	.treeView .treeItem .content .conView .listTxt{
		flex: 1;
		font-size: 34rpx;
		color: #352026;
		font-weight: bold;
		/* height: 50rpx; */
		line-height: 50rpx;
		/* overflow: hidden; */
		text-overflow: ellipsis;
		/* display: -webkit-box; */
		-webkit-line-clamp: 1!important;
		-webkit-box-orient: vertical!important;
		font-family: PingFangSC-Medium;
	}
	.treeView .treeItem .content .conView .listAction{
		width: 164rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
		display: flex;
	}
	.children{
		margin-top: 20rpx;
	}
	.children .treeItem{
		margin-bottom: 32rpx;
	}
	.children .treeItem .listIcon{
		font-weight: bold;
		width: 20rpx;
		line-height: 50rpx;
		text-align: center;
	}
	.children .treeItem .content .conView .listTxt{
		font-size: 30rpx;
		font-weight: normal;
		-webkit-line-clamp: 2;
		font-family: PingFangSC-Medium;
	}
	.treeItem .listAction .action image{
		/* margin-left: 40rpx; */
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
	}
	/* .treeItem .listAction image:last-child{
		margin-right: 20rpx;
	} */
	.buylView {
		width: 100%;
	}
	.buylView .title{
		font-size: 38rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.buylView .price{
		font-size: 34rpx;
		margin-top: 12rpx;
		font-family: PingFangSC-Medium;
		color: #ed3535;
	}
	.buylView .tips{		
		font-size: 26rpx;
		margin-top: 54rpx;
		font-family: PingFangSC-Medium;
		color: rgba(53,32,38,0.4);
	}
	.buylView .btnActions{
		margin-top: 96rpx;
	}
	.buylView .btnActions button{
		width: 100%;
		height: 92rpx;
		border-radius: 46rpx;
		background-color: #ED3535;
		color: #ffffff;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
	}
	.listAction .action{
		width: 80rpx;
		height: 50rpx;
		text-align: center;
		display: inline-block;
	}
	.tooltip {
	    position: absolute;
	    display: inline-block;
	}
	.tooltip .timg{
		position: relative;
		top: 18rpx;
		left: 35rpx;
	}
	.tooltip .timg image{
		width: 32rpx;
		height: 32rpx;
	}
	.tooltip .tooltiptext {
	    visibility: visible;
	    background-color: #ff6867;
	    color: #ffffff;
	    text-align: center;
		border-radius: 30rpx;
	    z-index: 1;
	}
	.tooltip .tooltiptext .content{
		padding: 20rpx 32rpx 10rpx 32rpx;
		font-size: 26rpx;
		color: #fbfbfa;
		text-align: left;
	}
	
	.tooltip .tooltiptext .action{
		padding-top: 10rpx;
		padding-bottom: 20rpx;
		font-size: 26rpx;
	}
	.step .action image{
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
	}
	.step1{
		position: absolute;
		left: 586rpx;
		top: 36rpx;
	}
	.step2{
		position: absolute;
		left: 664rpx;
		top: 36rpx;
	}
	.tip1{
		position: absolute;
		top: 60rpx;
		left: 405rpx;
	}
	.tip2{
		position: absolute;
		top: 60rpx;
		left: 510rpx;
	}
</style>
