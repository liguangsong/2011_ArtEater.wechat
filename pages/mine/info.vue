<template>
	<view>
		<view class="editForm">
			<u-form :model="form" ref="uForm" :rules="rules">
				<u-form-item label="头像" :label-width="150" prop="realname">
					<image class="headIcon" slot="right" :src="form.avatarUrl"></image>
				</u-form-item>
				<u-form-item label="昵称" :label-width="150">
					<label slot="right">{{form.nickName}}</label>
				</u-form-item>
				<u-form-item label="手机号码" :label-width="150" prop="phone">
					<label slot="right">{{form.phone}}</label>
				</u-form-item>
				<u-form-item label="真实姓名" :label-width="150" prop="realname">
					<label slot="right">{{form.realname}}</label>
				</u-form-item>
				<u-form-item label="所在地区" :label-width="150" prop="areaTxt">
					<u-select v-model="isShowArea" mode="mutil-column-auto" value-name="code" label-name="name" :list="provices" @confirm="confirm"></u-select>
					<u-input v-model="form.areaTxt" type="select" input-align="right" maxlength='30' placeholder="请选择所在地区"  @click="bindOpenArea" />
				</u-form-item>
				<u-form-item label="报考专业" :label-width="150" prop="speciality">
					<u-select v-model="isShowSpeciality" mode="single-column" value-name="code" label-name="name" :list="specialitys" @confirm="spConfirm"></u-select>
					<u-input v-model="form.speciality" type="select" input-align="right" maxlength='20' placeholder="请选择报考专业"  @click="isShowSpeciality=true" />
				</u-form-item>
				<u-form-item label="目标院校" :label-width="150" prop="university">
					<u-select v-model="isShowUniversities" mode="single-column" value-name="code" label-name="name" :list="universities" @confirm="unConfirm"></u-select>
					<u-input v-model="form.university" type="select" input-align="right" maxlength='30' placeholder="请选择目标院校"  @click="isShowUniversities=true" />
				</u-form-item>
				<u-form-item label="消费金额" :label-width="150">
					<label slot="right">{{form.amount}}</label>
				</u-form-item>
				<u-form-item label="积分" :label-width="150">
					<label slot="right">{{form.score}}</label>
				</u-form-item>
			</u-form>
			<!-- <u-button @click="submit">提交</u-button> -->
		</view>
	</view>
</template>

<script>
	import config from '../../static/config/index.js'
	import provice from '../../js/provinces.js'
	import cities from '../../js/cities.js'
	export default {
		data() {
			return {
				userInfo: {},
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
				form:{
					avatarUrl:'',
					realname:'',
					nickName:'',
					phone:'',
					speciality:'',
					university:'',
					areaTxt:'',
					areaVaue: '',
					area:[]
				},
				rules: {
					realname: [
						{ 
							required: true, 
							message: '请输入真实姓名', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					phone: [
						{ 
							required: true, 
							message: '请输入手机号码', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
					speciality: [
						{ 
							required: true, 
							message: '请输入报考专业', 
							// 可以单个或者同时写两个触发验证方式 
							trigger: ['change','blur'],
						}
					],
					university: [
						{
							required: true,
							message: '请输入目标院校', 
							trigger: ['change','blur'],
						}
					],
					areaTxt:[
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								if(!value||value=='请选择所在地区'){
									callback(new Error('请选择所在地区'));
								} else {
									callback();
								}
							}
						}
					]
				}
			}
		},
		onLoad() {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success: function(res){
					self.userInfo = res.data
					self.form.avatarUrl = res.data.avatarUrl
					self.form.nickName = res.data.nickName
					self.form.realname = res.data.realname
					self.form.phone = res.data.phone
					self.form.score = res.data.score
					self.form.amount = res.data.amount
					self.form.speciality = res.data.speciality
					self.form.university = res.data.university
					self.form.areaTxt = res.data.proviceId?(res.data.proviceName+'/'+ res.data.cityName):'请选择所在地区'
					self.form.areaVaue = res.data.proviceId+'/'+ res.data.cityId
					self.form.area = [{
						label: res.data.proviceName,
						value: res.data.proviceId,
					},{
						label: res.data.cityName,
						value: res.data.cityId,
					}]
				}
			})
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
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
				var user = this.Parse.User.current()
				user.set("proviceId", this.form.area[0].value);
				user.set("proviceName", this.form.area[0].label);
				user.set("cityId", this.form.area[1].value);
				user.set("cityName", this.form.area[1].label);
				user.save().then(res=>{
					uni.setStorage({
						key:'userInfo',
						data: res
					})
				})
			},
			/*选择专业*/
			spConfirm(array){
				this.form.speciality= array[0].label
				var user = this.Parse.User.current()
				user.set("speciality", this.form.speciality);
				user.save().then(res=>{
					uni.setStorage({
						key:'userInfo',
						data: res
					})
				})
			},
			/* 选择目标院校 */
			unConfirm(array){
				this.form.university= array[0].label
				var user = this.Parse.User.current()
				user.set("university", this.form.university);
				user.save().then(res=>{
					uni.setStorage({
						key:'userInfo',
						data: res
					})
				})
			},
			submit(){
				var self = this
				this.$refs.uForm.validate(valid => {
					if (valid) {
						var userInfo = this.Parse.Object.extend("UserInfo");
						var query = new this.Parse.Query(userInfo);
						query.get(self.userInfo.objectId).then(user=>{
							user.set("realname", self.form.realname);
							user.set("phone", self.form.phone);
							user.set("role", '学生');
							user.set("score", 0);
							user.set("amount", parseFloat(0));
							user.set("speciality", self.form.speciality);
							user.set("university", self.form.university);
							user.set("proviceId", self.form.area[0].value);
							user.set("proviceName", self.form.area[0].label);
							user.set("cityId", self.form.area[1].value);
							user.set("cityName", self.form.area[1].label);
							user.save().then(gameScore=> {
								uni.setStorage({
									key: 'userInfo',
									data: gameScore
								})
								uni.showToast({
									title:'保存成功',
									icon:'success'
								})
								uni.reLaunch({
									url:'../index/index'
								})
							})
						})
					} else {
						console.log('验证失败');
					}
				});
			}
		}
	}
</script>

<style>
	.editForm{
		padding: 40rpx;
	}
	.headIcon{
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
</style>
