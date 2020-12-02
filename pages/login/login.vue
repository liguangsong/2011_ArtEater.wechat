<template>
	<view class="myPage">
		<view class="boxView">
			<view :class="'loginView '+ (hasLogin?'hide':'')">
				<view v-if="!hasLogin" class="headIcon">
					<image v-if="avatarUrl" :src="avatarUrl"></image>
					<image v-else src="../../static/header.png"></image>
				</view>
				<view v-if="!hasLogin" style="text-align: center;margin-top: 20rpx;">
					<button class="btnLogin" v-if="canIUse" type="default" size="mini" open-type="getUserInfo" @getuserinfo="handleGetuserinfo">授权登录</button>
				</view>
			</view>
			<view v-show="hasLogin" class="editForm">
				<view class="headIcon">
					<image v-if="avatarUrl" :src="avatarUrl"></image>
				</view>
				<u-form :model="form" ref="uForm" :rules="rules">
					<u-form-item label="昵称" :label-width="150">
						<u-input v-model="form.nickname" maxlength='20' placeholder="请输入昵称" />
					</u-form-item>
					<u-form-item label="手机号码" :label-width="150" prop="phone">
						<u-input :disabled="true" v-model="form.phone" maxlength='11' placeholder="请点击右侧按钮绑定手机号" />					
						<u-button slot="right" type="default" size="mini" open-type="getPhoneNumber" @getphonenumber="handleGetPhoneNumber">获取手机号码</u-button>
					</u-form-item>
					<u-form-item label="真实姓名" :label-width="150" prop="realname">
						<u-input v-model="form.realname" maxlength='10' placeholder="请输入真实姓名" />
					</u-form-item>
					<u-form-item label="所在地区" :label-width="150" prop="areaTxt">
						<u-select v-model="isShowArea" mode="mutil-column-auto" value-name="code" label-name="name" :list="provices" @confirm="confirm"></u-select>
						<u-input v-model="form.areaTxt" type="select" maxlength='30' placeholder="请选择所在地区"  @click="bindOpenArea" />
					</u-form-item>
					<u-form-item label="报考专业" :label-width="150" prop="speciality">
						<u-select v-model="isShowSpeciality" mode="single-column" value-name="code" label-name="name" :list="specialitys" @confirm="spConfirm"></u-select>
						<u-input v-model="form.speciality" type="select" maxlength='20' placeholder="请选择报考专业"  @click="isShowSpeciality=true" />
					</u-form-item>
					<u-form-item label="目标院校" :label-width="150" prop="university">
						<u-select v-model="isShowUniversities" mode="single-column" value-name="code" label-name="name" :list="universities" @confirm="unConfirm"></u-select>
						<u-input v-model="form.university" type="select" maxlength='30' placeholder="请选择目标院校"  @click="isShowUniversities=true" />
					</u-form-item>
				</u-form>
				<view style="text-align: center;margin-top: 40rpx;">
					<u-button type='primary' size='medium' @click="submit">登录学习</u-button>
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
				openid:'',
				sessionKey:'',
				isShowArea: false,
				isShowSpeciality: false,
				isShowUniversities: false,
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
					phone:'',
					speciality:'',
					university:'',
					areaTxt:'',
					areaVaue: '',
					area:[]
				},
				rules: {
					realname: [{ required: true, message: '请输入真实姓名', trigger: ['change','blur']}],
					phone: [{ required: true, message: '请输入手机号码', trigger: ['change','blur','input']},
						{validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',trigger: ['change','blur','input'],
						}
					],
					speciality: [{ required: true, message: '请输入报考专业', trigger: ['change','blur']}],
					university: [{ required: true,message: '请输入目标院校', trigger: ['change','blur']}],
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
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
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
									let user = new self.Parse.Query(self.Parse.User)
									// self.hasLogin = true
									user.equalTo('openid', self.openid)
									user.first().then(ures=>{
										if(ures){ // 已注册，直接登录
											self.Parse.User.logIn(self.openid,self.openid).then(lres=>{
												uni.setStorage({
													key:'userInfo',
													data: lres
												})
												uni.navigateBack()
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
						var user = new self.Parse.User();
						user.set('openid', self.openid)
						user.set('avatarUrl', self.avatarUrl)
						user.set('nickName', self.form.nickname)
						user.set('username', self.openid)
						user.set('password', self.openid)
						
						user.set("realname", self.form.realname);
						user.set("phone", self.form.phone);
						user.set("role", 'student');
						user.set("score", 0);
						user.set("amount", 0);
						user.set("speciality", self.form.speciality);
						user.set("university", self.form.university);
						user.set("proviceId", self.form.area[0].value);
						user.set("proviceName", self.form.area[0].label);
						user.set("cityId", self.form.area[1].value);
						user.set("cityName", self.form.area[1].label);
						user.signUp().then((ruser)=> {
							var postACL = new self.Parse.ACL();
							postACL.setRoleWriteAccess("admin", true);
							postACL.setRoleReadAccess("admin", true);
							postACL.setRoleReadAccess("teacher", true);
							ruser.setACL(postACL);
							ruser.save().then(res=>{
								self.Parse.User.logIn(self.openid,self.openid).then(lres=>{
									uni.setStorage({
										key:'userInfo',
										data: lres
									})
									uni.navigateBack()
								})
							},error=>{
								console.log('设置角色权限失败')
								console.log(error)
							})
							
							const role = self.Parse.Role
							let query1 = new self.Parse.Query(role);
							query1.equalTo('name','student')
							query1.first().then(role=>{
								role.getUsers().add(ruser);
								role.save().then(res=>{
									console.log('设置角色成功')
								},error=>{
									console.log('设置角色失败')
									console.log(error)
								})
							})
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
	.myPage{
		position: relative;
		width: 100%;
		height: 1250rpx;
		overflow: hidden;
	}
	.myPage .boxView{
		width: 100%;
		height: 200%;
		position: absolute;
		top: 0;
	}
	.myPage .boxView .loginView.hide{
		animation:1s myfirst forwards;
		-moz-animation:1s myfirst forwards; /* Firefox */
		-webkit-animation:1s myfirst forwards; /* Safari and Chrome */
		-o-animation:1s myfirst forwards; /* Opera */
	}
	@keyframes myfirst
	{
	0%   {height:30%;}
	100% {height:0;display: none;}
	}
	
	@-moz-keyframes myfirst /* Firefox */
	{
	0%   {height:30%;}
	100% {height:0;display: none;}
	}
	
	@-webkit-keyframes myfirst /* Safari and Chrome */
	{
	0%   {height:30%;}
	100% {height:0;display: none;}
	}
	
	@-o-keyframes myfirst /* Opera */
	{
	0%   {height:30%;}
	100% {height:0;display: none;}
	}
	.loginView{
		height: 100%;
		line-height: 500rpx;
	}
	.headIcon{
		width: 300rpx;
		height: 150rpx;
		text-align: center;
		margin: auto;
	}
	.headIcon image{
		width: 150rpx;
		height: 150rpx;
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
</style>
