<template>
	<view class="myPage">
		<view class="treeView">
			<view v-for="(subject,index) in subjectTree" class="treeItem">
				<view class="listIcon"  @click="handleExtend(subject)">
					<image v-if="!subject.extend" src="../../static/icon/icon_add.png"></image>
					<image v-else src="../../static/icon/icon_remove.png"></image>
				</view>
				<view class="content">
					<view class="conView">
						<view class="listTxt" @click="handleNameClick">{{subject.subject_name}}</view>
						<view class="listAction">
							<image @click="handleBuyClick" src="../../static/icon/icon_order.png"></image>
							<image @click="handleTestClick" src="../../static/icon/icon_pencle.png"></image>
						</view>
					</view>
					<view class="children" v-if="subject.extend">
						<view v-for="(sub,idx) in subject.children" class="treeItem">
							<view class="listIcon">·</view>
							<view class="content">
								<view class="conView">
									<view class="listTxt" @click="handleNameClick">{{sub.subject_name}}</view>
									<view class="listAction">
										<image @click="handleBuyClick" src="../../static/icon/icon_order.png"></image>
										<image @click="handleTestClick" src="../../static/icon/icon_pencle.png"></image>
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
						
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
						人生若只如初见，何事秋风悲画扇
					</view>
				</scroll-view>
			</view>
		</u-popup>
		<u-popup v-model="isShowSubjectBuy" height="680rpx" :closeable="true" mode="bottom" border-radius="40">
			<view class="buylView" style="padding:74rpx 40rpx;">
				<view class="title">中国美术史</view>
				<view class="price">¥299.99</view>
				<view class="tips">
					您购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
				</view>
				<view class="tips">
					购买后可在【个人中心-已购项目】中查看
				</view>
				<view class="btnActions">
					<button>确认购买</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				subjectTree:[
					{id:'2313dsa', subject_name:'原始、古代美术', extend: false, children:[
						{id:'2313dsa', subject_name:'17世纪巴洛克时代的美术风格要点分析', children:[]},
						{id:'2313dsa', subject_name:'20世纪的现代主义运动', children:[]},
						{id:'2313dsa', subject_name:'巴拉格斯学派', children:[]},
					]},
					{id:'2313dsa', subject_name:'欧洲中世纪的美术', extend: false, children:[
						{id:'2313dsa', subject_name:'17世纪巴洛克时代的美术风格要点分析', children:[]},
						{id:'2313dsa', subject_name:'20世纪的现代主义运动', children:[]},
						{id:'2313dsa', subject_name:'巴拉格斯学派', children:[]},
					]},
					{id:'2313dsa', subject_name:'欧洲文艺复兴时期的...风格', extend: false, children:[
						{id:'2313dsa', subject_name:'17世纪巴洛克时代的美术风格要点分析', children:[]},
						{id:'2313dsa', subject_name:'20世纪的现代主义运动', children:[]},
						{id:'2313dsa', subject_name:'巴拉格斯学派', children:[]},
					]},
					{id:'2313dsa', subject_name:'原始、古代美术ddasdsadsa萨达撒放大', extend: false, children:[]},
					{id:'2313dsa', subject_name:'原始、古代美术ddasdsadsa萨达撒放大', extend: false, children:[]},
					{id:'2313dsa', subject_name:'原始、古代美术ddasdsadsa萨达撒放大', extend: false, children:[]},
					{id:'2313dsa', subject_name:'原始、古代美术ddasdsadsa萨达撒放大', extend: false, children:[]}
				],
				isShowSubjectDetail: false,
				isShowSubjectBuy: false,
				screenHeight:0
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
			uni.getSystemInfo({
			  success: res => {
				console.log(res)
				let screenWidth = res.screenWidth
				this.screenHeight = res.screenHeight*750/res.screenWidth
			  }
			})
		},
		methods: {
			/*展开关闭*/
			handleExtend(subject){
				subject.extend = !subject.extend
			},
			/*查看详情*/
			handleNameClick(){
				this.isShowSubjectDetail = true
			},
			/*购买*/
			handleBuyClick(){
				this.isShowSubjectBuy = true
			},
			/*做题*/
			handleTestClick(){
				uni.navigateTo({
					url:'exam'
				})
			}
		}
	}
</script>

<style>
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
