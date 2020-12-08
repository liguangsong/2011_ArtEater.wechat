<template>
	<view class="myPage">
		<view class="treeView">
			<view v-for="(subject,index) in subjectTree" class="treeItem">
				<view class="listIcon"  @click="handleExtend(subject)">
					<template v-if="subject.has_down_level">
						<image v-if="!subject.extend" src="../../static/icon/icon_add.png"></image>
						<image v-else src="../../static/icon/icon_remove.png"></image>
					</template>
				</view>
				<view class="content">
					<view class="conView">
						<view class="listTxt" @click="handleNameClick" :data-item="subject">{{subject.subject_name}}</view>
						<view class="listAction">
							<image v-if="subjectDetail.price>0&&!hasBuyed" @click="handleBuyClick" src="../../static/icon/icon_order.png"></image>
							<image v-if="subject.price==0" @click="handleTestClick" :data-item="subject" src="../../static/icon/icon_pencle.png"></image>
						</view>
					</view>
					<view class="children" v-if="subject.extend">
						<view v-for="(sub,idx) in subject.children" class="treeItem">
							<view class="listIcon">·</view>
							<view class="content">
								<view class="conView">
									<view class="listTxt" @click="handleNameClick" :data-item="sub">{{sub.subject_name}}</view>
									<view class="listAction">
										<image v-if="subjectDetail.price>0&&!hasBuyed" @click="handleBuyClick" src="../../static/icon/icon_order.png"></image>
										<image v-if="sub.price==0" @click="handleTestClick" :data-item="sub" src="../../static/icon/icon_pencle.png"></image>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<u-popup v-model="isShowSubjectDetail" width="674rpx" :closeable="true" mode="center" border-radius="40">
			<view class="detailView" style="padding:74rpx 50rpx;">
				<scroll-view scroll-y="true" :style="'max-height:'+(screenHeight - 600)+'rpx;'">
					<view>
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
				subjectId:'',
				subjectDetail: null,
				currSubjectDetail: null,
				isShowSubjectDetail: false,
				isShowSubjectBuy: false,
				screenHeight:0,
				hasBuyed: false
			}
		},
		onLoad(options) {
			uni.getStorage({
				key:'userInfo',
				success: res => {
					this.userInfo = res.data
				}
			})
			if(options.sid){
				this.subjectId = options.sid
				this.bindOrder()
				this.bindSubjectDetail()
				this.bindSubjectTree()
			}
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			var self = this
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
				var query = new this.Parse.Query("Subjects")
				// query.equalTo("parent_ID", this.subjectId)
				query.ascending('createdAt')
				query.find().then(res=>{
					var tree = self.initSubjectTree(res, self.subjectId)
					self.subjectTree = tree
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
				// if(item.content){
					this.currSubjectDetail = item
					this.isShowSubjectDetail = true
				// }
			},
			/*弹出购买界面*/
			handleBuyClick(){
				this.isShowSubjectBuy = true
			},
			/*点击购买按钮*/
			handleBuyBtnClick(){
				var self = this
				var _subject = this.currSubjectDetail
				var user = self.Parse.User.current()
				var price = 1 //self.subjectDetail.get('price') * 100
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
						order.set("subjectId",  this.subjectId)
						order.set("subjectName",  this.subjectDetail.get('subject_name'))
						order.set("price",  this.subjectDetail.get('price'))
						order.set("openId", this.userInfo.openid)
						order.set("state", 1)
						order.set("wechatPayOrderId", '') // 支付流水号
						order.save().then(_order => {
							debugger
							this.$Message.success('支付成功')
						},(error)=>{
							debugger
						  	console.log(error)
						  	// this.$Message.error('失败')
						})
						debugger
					  },
					  fail (res) {
						console.log("支付失败"+ JSON.stringify(res))
					  }
					})
				})
				// var dbOrder = this.Parse.Object.extend("Order")
				// var order = new dbOrder()
				// var orderNo = dateFormat(new Date(),'yyyyMMddHHmmss'+ GetRandomNum(3))
				// order.set('orderNo', orderNo)
				// order.set("subjectId",  this.subjectId)
				// order.set("subjectName",  this.subjectDetail.get('subject_name'))
				// order.set("price",  this.subjectDetail.get('price'))
				// order.set("openId", this.userInfo.openid)
				// order.set("state", 0)
				// order.set("wechatPayOrderId", '') // 支付流水号
				// order.save().then(_order => {
				// 	this.$Message.success('保存成功')
				// },(error)=>{
				// 	console.log(error)
				// 	this.$Message.error('保存失败')
				// })
			},
			/*做题*/
			handleTestClick(e){
				var self = this
				var item = e.currentTarget.dataset.item
				uni.navigateTo({
					url:'exam?bsid='+self.subjectId+'&sid=' + item.value
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
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
		text-align: center;
	}
	.treeView .treeItem .listIcon image{
		display: inline-block;
		vertical-align: middle;
		width: 30rpx;
		height: 30rpx;
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
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		font-family: PingFangSC-Medium;
	}
	.treeView .treeItem .content .conView .listAction{
		width: 164rpx;
		height: 50rpx;
		line-height: 50rpx;
		text-align: right;
	}
	.children{
		margin-top: 20rpx;
	}
	.children .treeItem{
		margin-bottom: 32rpx;
	}
	.children .treeItem .listIcon{
		font-weight: bold;
		width: 30rpx;
		line-height: 50rpx;
		text-align: left;
	}
	.children .treeItem .content .conView .listTxt{
		font-size: 30rpx;
		font-weight: normal;
		-webkit-line-clamp: 2;
		font-family: PingFangSC-Medium;
	}
	.treeItem .listAction image{
		margin-left: 40rpx;
		display: inline-block;
		width: 32rpx;
		height: 32rpx;
		vertical-align: middle;
	}
	.treeItem .listAction image:last-child{
		margin-right: 20rpx;
	}
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
</style>
