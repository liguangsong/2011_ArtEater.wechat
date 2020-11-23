<template>
	<view>
		<view class="editForm">
			<u-form :model="form" ref="uForm" :rules="rules">
				<u-form-item label="真实姓名" :label-width="150" prop="realname">
					<u-input v-model="form.realname" maxlength='10' placeholder="请输入真实姓名" />
				</u-form-item>
				<u-form-item label="手机号码" :label-width="150" prop="phone">
					<u-input v-model="form.phone" maxlength='11' placeholder="请输入手机号码" />
				</u-form-item>
				<u-form-item label="报考专业" :label-width="150" prop="speciality">
					<u-input v-model="form.speciality" maxlength='20' placeholder="请输入报考专业" />
				</u-form-item>
				<u-form-item label="目标院校" :label-width="150" prop="university">
					<u-input v-model="form.university" maxlength='30' placeholder="请输入目标院校" />
				</u-form-item>
				<u-form-item label="所在地区" :label-width="150" prop="areaTxt">
					<u-select v-model="isShowArea" mode="mutil-column-auto" value-name="code" label-name="name" :list="provices" @confirm="confirm"></u-select>
					<u-input v-model="form.areaTxt" type="select" maxlength='30' placeholder="请选择所在地区"  @click="bindOpenArea" />
				</u-form-item>
			</u-form>
			<u-button @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	import provice from '../../js/provinces.js'
	import cities from '../../js/cities.js'
	export default {
		data() {
			return {
				userInfo: {},
				isShowArea: false,
				provices: provice,
				cities: cities,
				form:{
					realname:'',
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
		onReady() {
			var self = this
			uni.getStorage({
				key:'userInfo',
				success: function(res){
					self.userInfo = res.data
					self.form.realname = res.data.realname
					self.form.phone = res.data.phone
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
			confirm(array){
				this.form.areaTxt = array[0].label + '/' + array[1].label
				this.form.areaVaue = array[0].value + '/' + array[1].value
				this.form.area = array
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
</style>
