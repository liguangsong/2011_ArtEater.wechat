<template>
	<view class="myPage" :style="{'overflow-x':'hidden', 'height':windowHeight + 'px','overflow-y': isShowTips ? 'auto' : 'scroll'}">
		<view class="headView">
			<image :src="subjectDetail.headImg" style="width: 750rpx;height: 396rpx;"></image>
		</view>
		<view class="baseProgress">
			<u-line-progress :percent="subjectTree.progress*100/subjectTree.childrenCount" :show-percent="false" height="10" active-color="#ff6867"></u-line-progress>
			<view class="tips">{{subjectTree.progress?subjectTree.progress:0}}/{{subjectTree.childrenCount?subjectTree.childrenCount:0}} 题目已完成</view>
		</view>
		<view class="treeView">
			<!--二级-->
			<view v-for="(subject,index) in subjectTree.children">
				<view class="treeItem">
					<view class="listIcon" style="padding-left: 0;">
						<template v-if="subject.has_down_level">
							<view class="actionExtend" style="text-align: center;height: 50rpx;line-height: 50rpx;position: relative;left: 10rpx;" @click="handleExtend(subject)">
								<image v-if="!subject.extend" src="../../../static/icon/icon_add.png"></image>
								<image v-else src="../../../static/icon/icon_remove.png"></image>
							</view>
						</template>
					</view>
					<view class="content" style="padding-left: 0;">
					<view class="conView">
						<view class="listTxt" @click="handleNameClick" :data-item="subject">{{subject.subject_name}}
						<!-- ({{subject.progress}}/{{subject.childrenCount}}) -->
							<view v-if="subject.price==0" class="free">免费</view>
						</view>
						<view class="listAction">
							<view class="action" @click="handleNameClick" :data-item="subject">
								<image v-if="subject.content" src="../../../static/icon/icon_order.png"></image>
							</view>
							<!-- <view v-if="subject.quesCount > 0" class="action" @click="handleTestClick" :data-item="subject"> -->
							<view class="action" @click="handleTestClick" :data-item="subject">
								<image src="../../../static/icon/icon_pencle.png"></image>
								<view class="progress">
									<u-line-progress :percent="subject.progress*100/subject.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
								</view>
							</view>
						</view>
					</view>
					<!--三级-->
					<view class="children" v-if="subject.extend">
						<view v-for="(sub,idx) in subject.children" class="treeItem">
							<view class="listIcon">
								<template v-if="sub.has_down_level">
									<view class="actionExtend"  @click="handleExtend(sub)">
										<image v-if="!sub.extend" src="../../../static/icon/icon_add_child.png"></image>
										<image v-else src="../../../static/icon/icon_remove_children.png"></image>
									</view>
								</template>
								<template v-else>
									<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
										<image src="../../../static/icon/icon_nochild.png"></image>
									</view>
								</template>
							</view>
							<view class="content">
								<view class="conView">
									<view class="listTxt" @click="handleNameClick" :data-item="sub">{{sub.subject_name}}</view>
									<view class="listAction">
										<view class="action" @click="handleNameClick" :data-item="sub">
											<image v-if="sub.content" src="../../../static/icon/icon_order.png"></image>
										</view>
										<view class="action" @click="handleTestClick" :data-item="sub">
											<image src="../../../static/icon/icon_pencle.png"></image>
											<view class="progress">
												<u-line-progress :percent="sub.progress*100/sub.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
											</view>
										</view>
									</view>
								</view>
								<!--四级-->
								<view class="children" v-if="sub.extend">
									<view v-for="sub1 in sub.children" class="treeItem">
										<view class="listIcon">
											<template v-if="sub1.has_down_level">
												<view class="actionExtend" @click="handleExtend(sub1)">
													<image v-if="!sub1.extend" src="../../../static/icon/icon_add_child.png"></image>
													<image v-else src="../../../static/icon/icon_remove_children.png"></image>
												</view>
											</template>
											<template v-else>
												<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
													<image src="../../../static/icon/icon_nochild.png"></image>
												</view>
											</template>
										</view>
										<view class="content">
											<view class="conView">
												<view class="listTxt" @click="handleNameClick" :data-item="sub1">{{sub1.subject_name}}</view>
												<view class="listAction">
													<view class="action" @click="handleNameClick" :data-item="sub1">
														<image v-if="sub1.content" src="../../../static/icon/icon_order.png"></image>
													</view>
													<view class="action" @click="handleTestClick" :data-item="sub1">
														<image src="../../../static/icon/icon_pencle.png"></image>
														<view class="progress">
															<u-line-progress :percent="sub1.progress*100/sub1.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
														</view>
													</view>
												</view>
											</view>
											
											<!--5级-->
											<view class="children" v-if="sub1.extend">
												<view v-for="sub2 in sub1.children" class="treeItem">
													<view class="listIcon">
														<template v-if="sub2.has_down_level">
															<view class="actionExtend" @click="handleExtend(sub2)">
																<image v-if="!sub2.extend" src="../../../static/icon/icon_add_child.png"></image>
																<image v-else src="../../../static/icon/icon_remove_children.png"></image>
															</view>
														</template>
														<template v-else>
															<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																<image src="../../../static/icon/icon_nochild.png"></image>
															</view>
														</template>
													</view>
													<view class="content">
														<view class="conView">
															<view class="listTxt" @click="handleNameClick" :data-item="sub2">{{sub2.subject_name}}</view>
															<view class="listAction">
																<view class="action" @click="handleNameClick" :data-item="sub2">
																	<image v-if="sub2.content" src="../../../static/icon/icon_order.png"></image>
																</view>
																<view class="action" @click="handleTestClick" :data-item="sub2">
																	<image src="../../../static/icon/icon_pencle.png"></image>
																	<view class="progress">
																		<u-line-progress :percent="sub2.progress*100/sub2.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
																	</view>
																</view>
															</view>
														</view>
														<!--6级-->
														<view class="children" v-if="sub2.extend">
															<view v-for="sub3 in sub2.children" class="treeItem">
																<view class="listIcon">
																	<template v-if="sub3.has_down_level">
																		<view class="actionExtend" @click="handleExtend(sub3)">
																			<image v-if="!sub3.extend" src="../../../static/icon/icon_add_child.png"></image>
																			<image v-else src="../../../static/icon/icon_remove_children.png"></image>
																		</view>
																	</template>
																	<template v-else>
																		<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																			<image src="../../../static/icon/icon_nochild.png"></image>
																		</view>
																	</template>
																</view>
																<view class="content">
																	<view class="conView">
																		<view class="listTxt" @click="handleNameClick" :data-item="sub3">{{sub3.subject_name}}</view>
																		<view class="listAction">
																			<view class="action" @click="handleNameClick" :data-item="sub3">
																				<image v-if="sub3.content" src="../../../static/icon/icon_order.png"></image>
																			</view>
																			<view class="action" @click="handleTestClick" :data-item="sub3">
																				<image src="../../../static/icon/icon_pencle.png"></image>
																				<view class="progress">
																					<u-line-progress :percent="sub3.progress*100/sub3.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
																				</view>
																			</view>
																		</view>
																	</view>
																	<!--7级-->
																	<view class="children" v-if="sub3.extend">
																		<view v-for="sub4 in sub3.children" class="treeItem">
																			<view class="listIcon">
																				<template v-if="sub4.has_down_level">
																					<view class="actionExtend" @click="handleExtend(sub4)">
																						<image v-if="!sub4.extend" src="../../../static/icon/icon_add_child.png"></image>
																						<image v-else src="../../../static/icon/icon_remove_children.png"></image>
																					</view>
																				</template>
																				<template v-else>
																					<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																						<image src="../../../static/icon/icon_nochild.png"></image>
																					</view>
																				</template>
																			</view>
																			<view class="content">
																				<view class="conView">
																					<view class="listTxt" @click="handleNameClick" :data-item="sub4">{{sub4.subject_name}}</view>
																					<view class="listAction">
																						<view class="action" @click="handleNameClick" :data-item="sub4">
																							<image v-if="sub4.content" src="../../../static/icon/icon_order.png"></image>
																						</view>
																						<view class="action" @click="handleTestClick" :data-item="sub4">
																							<image src="../../../static/icon/icon_pencle.png"></image>
																							<view class="progress">
																								<u-line-progress :percent="sub4.progress*100/sub4.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
																							</view>
																						</view>
																					</view>
																				</view>
																				
																				<!--8级-->
																				<view class="children" v-if="sub4.extend">
																					<view v-for="sub5 in sub4.children" class="treeItem">
																						<view class="listIcon">
																							<template v-if="sub5.has_down_level">
																								 <view class="actionExtend" @click="handleExtend(sub5)">
																									<image v-if="!sub5.extend" src="../../../static/icon/icon_add_child.png"></image>
																									<image v-else src="../../../static/icon/icon_remove_children.png"></image>
																								</view>
																							</template>
																							<template v-else>
																								<view class="actionExtend" style="text-align: center;height: 50rpx;position: relative;">
																									<image src="../../../static/icon/icon_nochild.png"></image>
																								</view>
																							</template>
																						</view>
																						<view class="content">
																							<view class="conView">
																								<view class="listTxt" @click="handleNameClick" :data-item="sub5">{{sub5.subject_name}}</view>
																								<view class="listAction">
																									<view class="action" @click="handleNameClick" :data-item="sub5">
																										<image v-if="sub5.content" src="../../../static/icon/icon_order.png"></image>
																									</view>
																									<view class="action" @click="handleTestClick" :data-item="sub5">
																										<image src="../../../static/icon/icon_pencle.png"></image>
																										<view class="progress">
																											<u-line-progress :percent="sub5.progress*100/sub5.childrenCount" :show-percent="false" height="4" active-color="#ff6867"></u-line-progress>
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
				<u-line style="position: relative;top: -32rpx;left: 70rpx;" :hair-line="false" class="u-line" color="#f6f6f6"></u-line>
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
		<u-mask :custom-style="{'background': 'rgba(255, 255, 255, 0.7)'}" :show="isShowTips" :mask-click-able="true" :zoom="false" @click="handleStep">
			<view v-show="step==1" class="step step1">
				<view class="action">
					<image src="../../../static/icon/icon_order.png"></image>
				</view>
			</view>
			<view v-show="step==1" class="tooltip tip1">
				<view class="timg" style="left: 150rpx;">
					<image src="../../../static/icon/icon_tips_right.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>单元知识摘要</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
			<view v-show="step==2" class="step step2">
				<view class="action">
					<image src="../../../static/icon/icon_pencle.png"></image>
				</view>
			</view>
			<view v-show="step==2" class="tooltip tip2">
				<view class="timg" style="left: 124rpx;">
					<image src="../../../static/icon/icon_tips_right.png"></image>
				</view>
				<view class="tooltiptext">
					<view class="content">
						<text>单元练习题</text>
					</view>
					<view class="action">我知道了</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	// import config from '../../../../static/config/index.js'
	// import { dateFormat, GetRandomNum, createWechatPay } from '../../../../js/common.js'
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
				windowHeight: 0,
				subjects: [],
				questionHistory: [],
				subjectProgress: [],
				isMember: false
			}
		},
		onShow() {
			var app = getApp();
			var member = app.globalData.member;
			// 判断是不是会员
			console.log(member);
			if (member) {
				if (member.memberType == 0 || member.memberType == 2) {
					if (member.endTime > Date.now()) {
						this.isMember = true;
						console.log(this.isMember, '///');
					}
				}
			}
		},
		onLoad(options) {
			var self = this
			
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
					res.set('progress', 0)
					res.set('childrenCount', 0)
					self.subjectDetail = res
					self.bindSubjectTree()
				})
			},
			/*查询是否已购买本章节*/
			bindOrder(){
				var self = this
				var query = new this.Parse.Query("Order")
				query.equalTo('openId', self.userInfo.openid)
				query.contains('subjectId',this.subjectId)
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
					self.subjects = res
					var queryProgress = new self.Parse.Query("SubjectProgress")
					queryProgress.equalTo('openid',self.userInfo.openid)
					queryProgress.equalTo('isImportant', 0)
					queryProgress.limit(10000)
					queryProgress.find().then(pres=>{
							self.subjectProgress = pres
							var hisQuery = new self.Parse.Query("QuestionHistory")
							hisQuery.equalTo("isImportant", 0)
							hisQuery.equalTo("openid", self.userInfo.openid)
							hisQuery.find().then(questionHistory=>{
								self.questionHistory = questionHistory
								var tree = self.initSubjectTree(res, self.subjectId, pres)
								self.subjectTree = {
									subject_name: self.subjectDetail.get('subject_name'),
									content: self.subjectDetail.get('content'),
									price: self.subjectDetail.get('price'),
									quesCount: self.subjectDetail.quesCount,
									extend: false,
									has_down_level: self.subjectDetail.get('has_down_level'),
									value: self.subjectDetail.id,
									progress: 0,
									childrenCount: 0,
									children: tree
								}
								self.handleGetTestCount(self.subjectTree)
								uni.hideLoading()
							})
					})
				})
			},
			/** 构造树形科目 */
			initSubjectTree(subjects, parentId, subjectProgress){
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
						progress: 0,
						childrenCount: 0
					}
					let childrens = subjects.filter(_item=>{
						return _item.get('parent_ID') == _subject.id
					})
					subject.progress = 0
					subject.childrenCount = 0
					if(childrens.length > 0) { // 有子集
						subject.children = self.initSubjectTree(subjects, _subject.id, subjectProgress)
						let subjectIds = []
						if(subject.children&&subject.children.length>0){
							subject.children.forEach(t=>{
								subjectIds.push(t.value)
							})
							let quesIndex = 0
							let quesCount = 0
							subjectProgress.forEach(t=>{
								if(subjectIds.indexOf(t.get('subjectId'))!=-1){
									quesIndex+= t.get('subjectIndex')
									quesCount+= t.get('quesCount')
								}
							})
							subject.progress = (quesIndex ? quesIndex : 0)
							if(quesCount>0){
								subject.childrenCount = quesCount
							}
						}
					}
					treeValue.push(subject)
				})
				return treeValue
			},
			getSubjectIds(tree, subjectId, subjectIds){
				var self = this
				if(tree){
					tree.forEach(item=>{
						if(item.value == subjectId){
							subjectIds.push(item.value)
							self.getSubjectChildIds(item.children, subjectIds)
						} else {
							if(item.children){
								self.getSubjectIds(item.children, subjectId, subjectIds)
							}
						}
					})
				}
			},
			getSubjectChildIds(tree, subjectIds){
				var self = this
				if(tree){
					tree.forEach(item=>{
						subjectIds.push(item.value)
						if(item.children){
							self.getSubjectChildIds(item.children, subjectIds)
						}
					})
				}
			},
			/*展开关闭*/
			handleExtend(subject){
				subject.extend = !subject.extend
				if(subject.extend&&!subject.loadCount){
					this.handleGetTestCount(subject)
					subject.loadCount = true
				}
			},
			/*查看科目下题目数量*/
			handleGetTestCount(subject){
				var self = this
				var ids = []
				ids.push(subject.value)
				self.getSubjectChildIds(subject.children, ids)
				uni.showLoading({
					title:'加载中……'
				})
				var quesQuery = new self.Parse.Query("TestQuestions")
				quesQuery.containedIn('subjects', ids)
				quesQuery.limit(10000)
				quesQuery.find().then(ques=>{
					subject.childrenCount = ques.length
					self.subjectProgress.forEach(t=>{
						if(t.get('subjectId') == subject.value){
							if(t.get('subjectIndex')){
								subject.progress = t.get('subjectIndex')
							} else {
								subject.progress = 0
							}
						}
					})
					let subIndex = 0
					if(subject.children && subject.children.length > 0) {
						subject.children.forEach(item => {
							let _quesCount = 0
							let _ids = []
							_ids.push(item.value)
							self.getSubjectChildIds(item.children, _ids)
							ques.forEach(t=>{
								_ids.forEach(id=>{
									if(t.get('subjects').indexOf(id)!=-1){
										_quesCount++
									}
								})
							})
							item.quesCount = _quesCount //questions.length
							if(item.quesCount > 0) {
								item.childrenCount = item.quesCount
								let quesIndex = 0
								self.subjectProgress.forEach(t=>{
									if(t.get('subjectId') == item.value){
										if(t.get('subjectIndex')){
											quesIndex += t.get('subjectIndex')
										}
									}
								})
								item.progress = (quesIndex ? quesIndex : 0)
							}
							subIndex+=item.progress
						})
					}
					if(subIndex>0&&subject.progress==0){
						subject.progress = subIndex
					}
					uni.hideLoading()
				})
			},
			/*查看详情*/
			handleNameClick(e){
				var item = e.currentTarget.dataset.item
				// console.log(item);
				if(item.content){
					this.currSubjectDetail = item
					this.isShowSubjectDetail = true
				}
			},
			/*做题*/
			handleTestClick(e){
				var self = this
				var item = e.currentTarget.dataset.item
				if(item.price > 0 && !self.hasBuyed) {
					if (this.isMember) {
						var item = e.currentTarget.dataset.item
						uni.navigateTo({
							url:'exam?bsid='+self.subjectId+'&sid=' + item.value,
							success(res) {
								res.eventChannel.emit('subjectTree', item)
							},
							events: {
								buySuccess: function(data) {
									self.bindOrder()
									self.bindSubjectTree()
								}
							}
						})
						return
					}
					var self = this
					uni.navigateTo({
						url:'/pages/buy/buy?subjectId=' + this.subjectDetail.id,
						event:{
							reloadOrder: function(data){
								self.bindOrder()
							}
						}
					})
				} else {
					var item = e.currentTarget.dataset.item
					uni.navigateTo({
						url:'exam?bsid='+self.subjectId+'&sid=' + item.value,
						success(res) {
							res.eventChannel.emit('subjectTree', item)
						},
						events: {
							buySuccess: function(data) {
								self.bindOrder()
								self.bindSubjectTree()
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
	.headView{
		display: inline-flex;
	}
	.baseProgress{
		padding: 0 40rpx;
		position: relative;
		top: -17rpx;
		height: 46rpx;
	}
	.baseProgress .tips{
		font-family: PingFangSC-Regular;
		font-size: 18rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.7);
	}
	.treeView{
		padding: 30rpx;
		padding-left: 20rpx;
		line-height: 66rpx;
		padding-bottom: 100rpx;
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
		padding-left: 14rpx;
	}
	.treeView .treeItem .listIcon .actionExtend{
		width: 50rpx;
		position: relative;
		left: -30rpx;
		text-align: center;
		font-size: 0;
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
		padding-left: 14rpx;
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
		/*进度？*/
		/* background-color: #007AFF;
		border-radius: 20rpx;
		position: relative;
		left:-10rpx;
		text-indent: 10rpx; */
	}
	.treeView .treeItem .content .conView .listTxt .free{
		width: 44rpx;
		height: 22rpx;
		line-height: 22rpx;
		text-align: center;
		background-color: #ffe8e8;
		border-radius: 4rpx;
		font-family: PingFangSC-Medium;
		font-size: 14rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ff6867;
		display: inline-block;
		position: relative;
		top: -20rpx;
		left: 15rpx;
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
		/* position: absolute; */
	}
	.treeItem .listAction .action .progress{
		width: 32rpx;
		height: 4rpx;
		position: relative;
		text-align: center;
		left: 25rpx;
		top: -35rpx;
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
		line-height: 50rpx;
		text-align: center;
		display: inline-block;
		position: relative;
	}
	.tooltip {
	    position: absolute;
	    display: inline-block;
	}
	.tooltip .timg{
		position: relative;
		top: 20rpx;
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
		left: 582rpx;
		top: 484rpx;
	}
	.step2{
		position: absolute;
		left: 662rpx;
		top: 484rpx;
	}
	.tip1{
		position: absolute;
		top: 511rpx;
		left: 407rpx;
	}
	.tip2{
		position: absolute;
		top: 511rpx;
		left: 507rpx;
	}
</style>
