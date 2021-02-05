<template>
	<view style="padding: 20rpx 40rpx;">
		<u-form :model="form" label-position="top" :border-bottom="false" ref="uForm" :rules="rules">
			<u-form-item :label-width="150" :border-bottom="false" prop="content">
				<u-input height="420" placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4);font-family:PingFangSC-Medium"
					:custom-style="{'background-color':'#ffffff','padding':'30rpx 26rpx','border-radius':'20rpx','border':'2rpx solid rgba(53,32,38,0.2)','font-size':'30rpx','color':'#352026','font-family':'PingFangSC-Medium'}" 
					v-model="form.content" :clearable="false" type="textarea" maxlength='300' placeholder="请在输入框内写下您的意见反馈" />
			</u-form-item>
		</u-form>
		<view style="text-align: center;margin-top: 40rpx;">
			<button class="btnSubmit"  @click="submit">确认提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {},
				form: {
					content:''
				},
				rules:{
					content: [{ required: true, message: '请在输入框内写下您的意见反馈', trigger: ['change','blur']}],
				}
			}
		},
		onLoad() {
			var self = this
			uni.loadFontFace ({
			  family: 'PingFangSC-Medium',
			  source: 'url("https://www.arteater.cn/PingFangSCMedium.ttf")',
			  success: function(){
				  console.log('load font success')
			  }
			})
			uni.getStorage({
				key:'userInfo',
				success:function(res){
					self.userInfo = res.data
				}
			})
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit(){
				var self = this
				self.$refs.uForm.validate(valid => {
					if (valid) {
						var Opinion = self.Parse.Object.extend("Opinions");
						var opinion = new Opinion();
						opinion.set("isAnonymous", 0);
						opinion.set("nickName", self.userInfo.nickName);
						opinion.set("phone", self.userInfo.phone);
						opinion.set("openid", self.userInfo.openid);
						opinion.set("content", self.form.content);
						opinion.save().then(res=>{
							self.form.content = ''
							uni.showToast({
								title:'提交成功！'
							})
						})
					} else {
						console.log('验证失败');
					}
				})
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfb;
	}
	.input{
		border-radius: 20rpx;
		background-color: #ffffff;
	}
	.btnSubmit{
		height: 92rpx;
		border-radius: 92rpx;
		line-height: 92rpx;
		width: 100%;
		background-color: #ed3535;
		color: #ffffff;
		font-size: 34rpx;
		font-weight: bold;
		font-family: PingFangSC-Medium;
	}
</style>
