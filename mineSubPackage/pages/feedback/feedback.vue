<template>
	<TopNavbar title='意见反馈'>
	<view style="padding: 0 30rpx;">
		<u-form :model="form" label-position="top" :border-bottom="false" ref="uForm" :rules="rules">
			<u-form-item :label-width="150" :border-bottom="false" prop="content">
				<u-input height="420"
					placeholder-style="font-size:26rpx;color:rgba(53,32,38,0.4);font-family:PingFangSC-Medium"
					:custom-style="{'background-color':'#ffffff','padding':'28rpx 32rpx','border-radius':'20rpx','border':'2rpx solid rgba(0,0,0,0.08)','font-size':'30rpx','color':'#352026','font-family':'PingFangSC-Medium','margin':'0 10rpx'}"
					v-model="form.content" :clearable="false" type="textarea" maxlength='300'
					placeholder="请在输入框内写下您的意见反馈" />
			</u-form-item>
		</u-form>
		<view class="message">
			消息回复请在消息中心查看
		</view>
		<view style="text-align: center;margin-top: 40rpx;">
			<button class="btnSubmit" @click="submit">确认提交</button>
		</view>
	</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				userInfo: {},
				form: {
					content: ''
				},
				rules: {
					content: [{
						required: true,
						message: '请在输入框内写下您的意见反馈',
						trigger: ['change', 'blur']
					}],
				}
			}
		},
		components: {
			TopNavbar
		},
		onLoad() {
			var self = this

			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					self.userInfo = res.data
				}
			})
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			submit() {
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
						opinion.set("message", '');
						opinion.save().then(res => {
							self.form.content = ''
							uni.showToast({
								title: '提交成功！'
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
	.input {
		border-radius: 20rpx;
		background-color: #ffffff;
	}

	.btnSubmit {
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 48rpx;
		width: 100%;
		height: 92rpx;
		line-height: 92rpx;
		background: #ED3535;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
		border-radius: 46rpx;
	}
	.message {
		font-size: 22rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.29);
		line-height: 32rpx;
		padding-left: 30rpx;
	}
</style>
