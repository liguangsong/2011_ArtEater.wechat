<template>
	<TopNavbar title='食艺兽'>
		<view style='height: 134rpx'></view>
		<view class="myPage">
			<view class="boxView">
				<view class="editForm" >
					<view class="headIcon">
						<image v-if="form.avatarUrl" :src="form.avatarUrl"></image>
					</view>

				<u-form :model="form" ref="uForm" :border-bottom="false" label-position="top" :rules="rules">
						<u-form-item :border-bottom="false">
							<view class="inputItem">
								<u-input border='none' placeholder-style="font-size:24rpx;color:rgba(0,0,0,0.4)"
									v-model="form.nickname" maxlength='20' placeholder="请输入昵称" />
							</view>
						</u-form-item>
						<u-form-item prop="phone">
							<view class="inputItem">
								<button class="btngetphonenumber" open-type="getPhoneNumber"
									@getphonenumber="handleGetPhoneNumber"
									:style="{'color':(form.phone=='点击获取手机号'?'#ff7767':'#352026')}">{{form.phone}}</button>
							</view>
						</u-form-item>
						<u-form-item prop="realname" >
							<view class="inputItem">
								<u-input border='none' placeholder-style="font-size:24rpx;color:rgba(0,0,0,0.4)"
									v-model="form.realname" maxlength='10' placeholder="请输入真实姓名" />
							</view>
						</u-form-item>
						<u-form-item prop="areaTxt">
							<view class="inputItem">
								
								<u-input border='none' placeholder-style="font-size:24rpx;color:rgba(0,0,0,0.4)" v-model="form.areaTxt"
								 :disabled="true" maxlength='30' placeholder="请选择所在地区"
									@click="bindOpenArea" />
							</view>
						</u-form-item>
						<u-form-item prop="speciality">
							<view class="inputItem">
								
								<u-input border='none' placeholder-style="font-size:24rpx;color:rgba(0,0,0,0.4)"
									v-model="form.speciality" :disabled="true" maxlength='20'
									placeholder="请选择报考专业" @click="isShowSpeciality=true" />
							</view>
						</u-form-item>
						<u-form-item :label-width="150" prop="university">
							<view class="inputItem">
								
								<u-input border='none' placeholder-style="font-size:24rpx;color:rgba(0,0,0,0.4)"
									v-model="form.university" :disabled="true" maxlength='30'
									placeholder="请选择目标院校" @click="isShowUniversity=true" />
							</view>
						</u-form-item>
					</u-form>
					<view style='height: 500rpx;'></view>
				</view>
				<image class='writebg' src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/writeinfo.png" mode=""></image>
			</view>
		</view>
		<u-select v-model="isShowArea" mode="mutil-column-auto" confirm-color="#352026"
			value-name="code" label-name="name" :list="provices" @confirm="confirm"></u-select>
		<checkspecialitys @changeSpecialitys='changeSpecialitys' :visiable="isShowSpeciality" :list="specialitys" :val='form.speciality' />
		<checkunivercity :visiable="isShowUniversity" @cancle="handleCancel"
			@complate="handleComplate" :value="form.university" @changeVisiable='isShowUniversity = false'></checkunivercity>
		<view class="btnView" v-if='opacity'>
			<image class="btnSubmit" @click="submit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/journey.png" mode=""></image>
		</view>
		
		<view class="btnView" style='opacity: .4;' v-else>
			<image class="btnSubmit" @click="submit" src="https://art-eater.oss-cn-beijing.aliyuncs.com/photo/journey.png"></image>
		</view>
	</TopNavbar>
</template>

<script>
	import config from '../../static/config/index.js'
	var WXBizDataCrypt = require('./WXBizDataCrypt')
	import provice from '../../js/provinces.js'
	import cities from '../../js/cities.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	import checkunivercity from '@/components/checkunivercity/checkunivercity.vue'
	import checkspecialitys from '@/components/checkunivercity/checkspecialitys.vue'
	export default {
		data() {
			return {
				q: '',
				isShowUniversity: false,
				isShowSpeciality: false,
				customStyle: {
					'border-radius': '40rpx',
					'min-height': '10rpx',
					'height': '74rpx'
				},
				labelStyle: {
					'height': '36rpx',
					'margin-top': '30rpx',
					'margin-bottom': '-3rpx',
					'text-indent': '28rpx',
					'font-size': '26rpx',
					'color': 'rgba(53,32,38,0.7)',
					'font-family': 'PingFangSC-Medium'
				},
				openid: '',
				sessionKey: '',
				isShowArea: false,
				isShowSpeciality: false,
				isShowUniversity: false,
				specialitys: [{
						code: '美术学',
						name: '美术学'
					},
					{
						code: '艺术史论',
						name: '艺术史论'
					},
					{
						code: '实验艺术',
						name: '实验艺术'
					},
					{
						code: '艺术学理论',
						name: '艺术学理论'
					},
					{
						code: '艺术与设计管理（中法）',
						name: '艺术与设计管理（中法）'
					},
					{
						code: '艺术品保护与修复',
						name: '艺术品保护与修复'
					}
				],
				provices: provice,
				cities: cities,
				avatarUrl: '',
				hasLogin: false, // 已登录，需要补全信息
				form: {
					nickname: '',
					realname: '',
					phone: '点击获取手机号',
					speciality: '',
					university: '',
					avatarUrl: '',
					areaTxt: '',
					areaVaue: '',
					area: []
				},
				rules: {
					realname: [{
						required: true,
						message: '请输入真实姓名',
						trigger: ['change', 'blur']
					}],
					phone: [{
							required: true,
							message: '请输入手机号码',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							trigger: ['change', 'blur'],
						}
					],
					speciality: [{
						required: true,
						message: '请输入报考专业',
						trigger: ['change', 'blur']
					}],
					university: [{
						trigger: ['change', 'blur'],
						validator: (rule, value, callback) => {
							if (!value || value.length == 0) {
								callback(new Error('请选择目标院校'));
							} else {
								callback();
							}
						}
					}],
					areaTxt: [{
							required: true,
							message: '请选择所在地区',
							trigger: ['change', 'blur']
						},
						{
							validator: (rule, value, callback) => {
								if (!value || value == '请选择所在地区') {
									callback(new Error('请选择所在地区'));
								} else {
									callback();
								}
							}
						}
					]
				},
				userInfo: {},
				canIUse: uni.canIUse('button.open-type.getUserInfo'),
				// opacity: false
			}
		},
		components: {
			TopNavbar, checkunivercity, checkspecialitys
		},
		computed: {
			opacity() {
				let {realname, phone, speciality, university, area} = this.form;
				if (realname && phone && speciality && university && area[0].value) {
					return true
				}
				return false
			}
		},
		onLoad(options) {
			if (options.q) {
				this.q = options.q;
			}
			var self = this
			uni.getStorage({
				key: 'sessionKey',
				success: function(res) {
					self.sessionKey = res.data
				}
			})
			uni.getStorage({
				key: 'openid',
				success: function(res) {
					self.openid = res.data
				}
			})
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					self.userInfo = res.data
					self.form.avatarUrl = res.data.avatarUrl
					self.form.nickname = res.data.nickName
				}
			})
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			changeSpecialitys(e) {
				if (e) {
					this.form.speciality = e;
					var user = this.Parse.User.current()
					user.set("speciality", this.form.speciality);
					user.save().then(res=>{
						uni.setStorage({
							key:'userInfo',
							data: res
						})
					})
					this.isShowSpeciality = false;
				} else {
					this.isShowSpeciality = false;
				}
			},
			handleCancel() {
				this.isShowUniversity = false
			},
			/*完成选择*/
			handleComplate(codes) {
				this.form.university = codes
				this.isShowUniversity = false
				var user = this.Parse.User.current()
				user.set("university", this.form.university);
				user.save().then(res => {
					uni.setStorage({
						key: 'userInfo',
						data: res
					})
				})
			},
			handleGetuserinfo({
				detail
			}) {
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
									query.first().then(ures => {
										if (ures) { // 已注册，直接登录
											self.Parse.User.logIn(self.openid, self.openid)
												.then(lres => {
													uni.setStorage({
														key: 'userInfo',
														data: lres
													})
													uni.reLaunch({
														url: '/pages/index/index'
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
			handleGetPhoneNumber(e) {
				var self = this
				var _config = config
				var pc = new WXBizDataCrypt(_config.AppId, self.sessionKey)
				var data = pc.decryptData(e.detail.encryptedData, e.detail.iv)
				self.form.phone = data.phoneNumber
			},
			/*选择地区*/
			bindOpenArea() {
				this.isShowArea = true
				this.provices.forEach((item) => {
					item.children = this.cities[item.code]
				})
			},
			/*选择地区*/
			confirm(array) {
				this.form.areaTxt = array[0].label + '/' + array[1].label
				this.form.areaVaue = array[0].value + '/' + array[1].value
				this.form.area = array
			},
			/*选择专业*/
			spConfirm(array) {
				this.form.speciality = array[0].label
			},
			/* 选择目标院校 */
			unConfirm(array) {
				this.form.university = array[0].label
			},
			submit() {
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
						user.save().then((ruser) => {
							// console.log(ruser, 'ruser');
							uni.setStorage({
								key: 'userInfo',
								data: ruser
							})
							if (!self.q) {
								uni.reLaunch({
									url: '/pages/index/index'
								})
							} else {
								uni.navigateBack({
									delta: -1
								})
							}

							const eventChannel = self.getOpenerEventChannel()
							eventChannel.emit('back', {});
						}, (error) => {
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
	.boxView {
		margin: 0 10rpx;
		position: relative;
		height: 1042rpx;
	}

	.boxView .writebg {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
	}

	.boxView .editForm {
		position: relative;
		z-index: 8;
		padding-top: 180rpx;
	}
	.headIcon {
		position: absolute;
		top: -60rpx;
		left: 286rpx;
		border: 2rpx solid rgba(237, 53, 53, 1);
		border-radius: 50%;
		width: 160rpx;
		height: 160rpx;
		overflow: hidden;
	}
	.headIcon image {
		width: 100%;
		height: 100%;
	}
	.u-form {
		height: 682rpx;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    align-content: space-between;
    justify-content: space-between;
	}
	.inputItem {
		height: 82rpx;
		width: 100%;
		padding-right: 114rpx;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.u-input--border {
		border: none !important;
		height: 85rpx !important;
		text-align: right !important;
		
	}
	.u-input__input {
		font-size: 24rpx !important;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(0,0,0,.8) !important;
	}
	.u-form-item__message {
		display: none !important;
	}
	.u-input {
		padding: 0 !important;
	}
	.u-form-item {
		padding: 0 !important;
		display: block !important;
		/* margin-bottom: 38rpx; */
		height: 82rpx;
		line-height: 82rpx;
	}
	.u-form-item--left {
		margin-bottom: 0 !important;
	}
	.btngetphonenumber {
		color: #ff776f;
		background-color: #ffffff;
		border: none;
		text-align: left;
		padding: 0;
		margin: 0;
		font-size: 24rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #D81E1F;
		text-decoration: underline;
	}
	.u-border-bottom:after, .u-border:after {
		border: none !important;
	}
	.btngetphonenumber::after{
		border: 0;
	}
	
	.btnView {
		width: 100%;
		height: 236rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 20;
		/* background: #f7f7f7; */
	}
	.btnView image {
		width: 100%;
		height: 100%;
	}
	.u-input {
		display: flex;
		align-items: center;
	}
	.u-input__right-icon {
		margin-top: 10rpx;
	}
	.u-input__input {
		display: flex !important;
		align-items: center !important;
	}
</style>
