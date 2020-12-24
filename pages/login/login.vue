<template>
	<view class="myPage">
		<view class="boxView">
			<!-- <view :class="'loginView '+ (hasLogin?'hide':'')">
				<view v-if="!hasLogin" class="headIcon">
					<image v-if="avatarUrl" :src="avatarUrl"></image>
					<image v-else src="../../static/header.png"></image>
				</view>
				<view v-if="!hasLogin" style="text-align: center;margin-top: 20rpx;">
					<button class="btnLogin" v-if="canIUse" type="default" size="mini" open-type="getUserInfo" @getuserinfo="handleGetuserinfo">授权登录</button>
				</view>
			</view> -->
			<view class="editForm">
				<view class="headIcon">
					<image v-if="form.avatarUrl" :src="form.avatarUrl"></image>
				</view>
				<u-form :model="form" ref="uForm" :border-bottom="false" label-position="top" :rules="rules">
					<u-form-item label="昵称" :label-width="150" :border-bottom="false" :label-style="labelStyle">
						<u-input placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4)" v-model="form.nickname" :border="true" maxlength='20' placeholder="请输入昵称" />
					</u-form-item>
					<u-form-item label="手机号码" :label-width="150" prop="phone" :border-bottom="false" :label-style="labelStyle">
						<!-- <u-input placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4)" :disabled="true" v-model="form.phone" :border="true" maxlength='11' placeholder="请点击右侧按钮绑定手机号" /> -->
						<button class="btngetphonenumber" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber" :style="{'color':(form.phone=='点击获取手机号'?'#ff7767':'#352026')}">{{form.phone}}</button>
					</u-form-item>
					<u-form-item label="真实姓名" :label-width="150" prop="realname" :border-bottom="false" :label-style="labelStyle">
						<u-input placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4)" v-model="form.realname" :border="true" maxlength='10' placeholder="请输入真实姓名" />
					</u-form-item>
					<u-form-item label="所在地区" :label-width="150" prop="areaTxt" :border-bottom="false" :label-style="labelStyle">
						<u-select v-model="isShowArea" mode="mutil-column-auto" confirm-color="#352026" value-name="code" label-name="name" :list="provices" @confirm="confirm"></u-select>
						<u-input placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4)" v-model="form.areaTxt" :border="true" :disabled="true" maxlength='30' placeholder="请选择所在地区"  @click="bindOpenArea" />
					</u-form-item>
					<u-form-item label="报考专业" :label-width="150" prop="speciality" :border-bottom="false" :label-style="labelStyle">
						<u-select v-model="isShowSpeciality" mode="single-column" confirm-color="#352026" value-name="code" label-name="name" :list="specialitys" @confirm="spConfirm"></u-select>
						<u-input placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4)" v-model="form.speciality" :border="true" :disabled="true" maxlength='20' placeholder="请选择报考专业"  @click="isShowSpeciality=true" />
					</u-form-item>
					<u-form-item label="目标院校" :label-width="150" prop="university" :border-bottom="false" :label-style="labelStyle">
						<!-- <u-select v-model="isShowUniversities" mode="single-column" value-name="code" label-name="name" :list="universities" @confirm="unConfirm"></u-select> -->
						<checkunivercity :visiable="isShowUniversity" @cancle="handleCancel" @complate="handleComplate" :value="form.university"></checkunivercity>
						<u-input placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4)" v-model="form.university" :border="true" :disabled="true" maxlength='30' placeholder="请选择目标院校"  @click="isShowUniversity=true" />
					</u-form-item>
				</u-form>
				<view class="btnView">
					<!-- <u-button type='primary' size='medium' @click="submit">登录学习</u-button> -->
					<button class="btnSubmit" @click="submit">登录学习</button>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import config from '../../static/config/index.js'
	var WXBizDataCrypt = require('./WXBizDataCrypt')
	import provice from '../../js/provinces.js'
	import cities from '../../js/cities.js'
	export default {
		data() {
			return {
				customStyle:{'border-radius':'40rpx','min-height':'10rpx','height':'74rpx'},
				labelStyle:{'height':'36rpx','margin-top':'30rpx','margin-bottom':'-3rpx','text-indent':'28rpx','font-size':'26rpx','color':'rgba(53,32,38,0.7)','font-family':'PingFangSC-Medium'},
				openid:'',
				sessionKey:'',
				isShowArea: false,
				isShowSpeciality: false,
				isShowUniversity: false,
				specialitys:[
					{code:'实验艺术',name:'实验艺术'},
					{code:'艺术史论',name:'艺术史论'}
				],
				universities:[
					{code:'中央美术学院',name:'中央美术学院'},
					{code:'中国美术学院',name:'中国美术学院'},
					{code:'清华美术学院',name:'清华美术学院'},
					{code:'西安美术学院',name:'西安美术学院'},
					{code:'四川美术学院',name:'四川美术学院'},
					{code:'鲁迅美术学院',name:'鲁迅美术学院'},
					{code:'湖北美术学院',name:'湖北美术学院'},
					{code:'天津美术学院',name:'天津美术学院'},
					{code:'广州美术学院',name:'广州美术学院'},
					{code:'其它',name:'其它'}
				],
				provices: provice,
				cities: cities,
				avatarUrl:'',
				hasLogin: false, // 已登录，需要补全信息
				form:{
					nickname:'',
					realname:'',
					phone:'点击获取手机号',
					speciality:'',
					university:'',
					avatarUrl:'',
					areaTxt:'',
					areaVaue: '',
					area:[]
				},
				rules: {
					realname: [{ required: true, message: '请输入真实姓名', trigger: ['change','blur']}],
					phone: [{ required: true, message: '请输入手机号码', trigger: ['change','blur']},
						{validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',trigger: ['change','blur'],
						}
					],
					speciality: [{ required: true, message: '请输入报考专业', trigger: ['change','blur']}],
					university: [{ trigger: ['change','blur'],
						validator: (rule, value, callback) => {
							if(!value||value.length==0) {
								callback(new Error('请选择目标院校'));
							} else {
								callback();
							}
						}
					}],
					areaTxt:[{ required: true,message: '请选择所在地区', trigger: ['change','blur']},
						{ validator: (rule, value, callback) => {
							if(!value||value=='请选择所在地区'){
								callback(new Error('请选择所在地区'));
							} else {
								callback();
							}
						}
					}]
				},
				userInfo:{},
				canIUse: uni.canIUse('button.open-type.getUserInfo')
			}
		},
		onLoad() {
			var self = this
			uni.getStorage({
				key:'sessionKey',
				success: function(res){
					self.sessionKey = res.data
				}
			})
			uni.getStorage({
				key:'openid',
				success:function(res){
					self.openid = res.data
				}
			})
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					self.userInfo = res.data
					self.form.avatarUrl = res.data.avatarUrl
					self.form.nickname = res.data.nickName
				}
			})
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.aoekids.cn/font/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			handleCancel(){
				this.isShowUniversity = false
			},
			/*完成选择*/
			handleComplate(codes){
				this.form.university=codes
				this.isShowUniversity = false
				var user = this.Parse.User.current()
				user.set("university", this.form.university);
				user.save().then(res=>{
					uni.setStorage({
						key:'userInfo',
						data: res
					})
				})
			},
			handleGetuserinfo({detail}){
				var self = this
				// 获取用户信息
				uni.getSetting({
					success: sres => {
						if (sres.authSetting['scope.userInfo']) {
							// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
							uni.getUserInfo({
							  success: res => {
									let app = getApp()
									self.avatarUrl = res.userInfo.avatarUrl
									self.form.nickname = res.userInfo.nickName
									var query = new self.Parse.Query(self.Parse.User)
									// self.hasLogin = true
									query.equalTo('openid', self.openid)
									query.first().then(ures=>{
										if(ures){ // 已注册，直接登录
											self.Parse.User.logIn(self.openid,self.openid).then(lres=>{
												uni.setStorage({
													key:'userInfo',
													data: lres
												})
												uni.reLaunch({
													url:'/pages/index/index'
												})
											})
										} else {
											self.hasLogin = true // 打开补全信息界面
										}
									})
							  }
							})
						} else {
							// 未授权
						}
					}
				})
			},
			/*获取手机号码*/
			handleGetPhoneNumber(e){
				var self = this
				var _config = config
				var pc = new WXBizDataCrypt(_config.AppId, self.sessionKey)
				var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
				self.form.phone = data.phoneNumber
			},
			/*选择地区*/
			bindOpenArea(){
				this.isShowArea = true
				this.provices.forEach((item)=>{
					item.children = this.cities[item.code]
				})
			},
			/*选择地区*/
			confirm(array){
				this.form.areaTxt = array[0].label + '/' + array[1].label
				this.form.areaVaue = array[0].value + '/' + array[1].value
				this.form.area = array
			},
			/*选择专业*/
			spConfirm(array){
				this.form.speciality= array[0].label
			},
			/* 选择目标院校 */
			unConfirm(array){
				this.form.university= array[0].label
			},
			submit(){
				var self = this
				self.$refs.uForm.validate(valid => {
					if (valid) {
						var user = self.Parse.User.current();
						user.set("realname", self.form.realname);
						user.set("phone", self.form.phone);
						user.set("speciality", self.form.speciality);
						user.set("university", self.form.university);
						user.set("proviceId", self.form.area[0].value);
						user.set("proviceName", self.form.area[0].label);
						user.set("cityId", self.form.area[1].value);
						user.set("cityName", self.form.area[1].label);
						user.save().then((ruser)=> {
							uni.setStorage({
								key:'userInfo',
								data: ruser
							})
							uni.reLaunch({
								url:'/pages/index/index'
							})
							const eventChannel = self.getOpenerEventChannel()
							eventChannel.emit('back', {});
						},(error)=> {
						  console.log("Error: " + error.code + " " + error.message);
						});
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.myPage{
		position: relative;
		width: 100%;
		/* height: 1250rpx; */
		/* overflow: hidden; */
	}
	.myPage .boxView{
		width: 100%;
		height: 200%;
		position: absolute;
		top: 0;
	}
	.myPage .boxView .loginView.hide{
		/* animation:1s myfirst forwards; */
		/* -moz-animation:1s myfirst forwards; /* Firefox */ 
		/* -webkit-animation:1s myfirst forwards; /* Safari and Chrome */ 
		/* -o-animation:1s myfirst forwards; /* Opera */
	}
	.loginView{
		height: 100%;
		line-height: 500rpx;
	}
	.headIcon{
		padding-top: 20rpx;
		padding-bottom: 30rpx;
		width: 128rpx;
		height: 178rpx;
		text-align: center;
		margin: auto;
	}
	.headIcon image{
		width: 128rpx;
		height: 128rpx;
		border-radius: 50%;
		display: inline-block;
		vertical-align: middle;
	}
	.btnLogin{
		margin: auto;
	}
	
	.editForm{
		padding: 40rpx;
	}
	.editForm .btnView{
		text-align: center;
		margin-top: 30rpx;
		/* position: fixed;
		bottom: 100rpx;
		width:calc(100% - 80rpx) */
	}
	.btnSubmit{
		width: 100%;
		height: 94rpx;
		line-height: 94rpx;
		background-color: #ff776f;
		border-radius: 94rpx;
		color: #ffffff;
	}
	.u-input{
		border-radius: 20rpx!important;
		background-color: #ffffff;
		border: 2rpx solid #efefef;
		height: 74rpx;
		line-height: 74rpx;
		font-size: 30rpx;
		color: #352026;
		font-family: PingFangSC-Medium;
	}
	.u-input input{
		line-height: 74rpx;
		font-family: PingFangSC-Medium;
		font-size: 30rpx!important;
		color: #352026!important;
	}
	.u-form-item{
		padding: 0!important;
	}
	.u-drawer-content{
		border-top-left-radius: 46rpx;
		border-top-right-radius: 46rpx;
	}
	.btngetphonenumber{
		color: #ff776f;
		font-size: 30rpx;
		background-color: #ffffff;
		border-radius: 20rpx;
		border: 2rpx solid #efefef;
		text-align: left;
		font-family: PingFangSC-Medium;
	}
	.btngetphonenumber::after{
		border: 0;
	}
</style>
