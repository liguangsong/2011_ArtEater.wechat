<template>
	<TopNavbar title='食艺兽'>
		<view class="register">
			<view style='height: 250rpx'></view>
			<view class="boxView">
				<view class="headIcon">
					<image src='../../static/mine-head.png'></image>
				</view>
				<view class="editForm">
					<input type="text" v-model="tel" placeholder="请输入手机号" />
				</view>
				<view class="editForm">
					<input type="text" v-model="code" placeholder="请输入验证码" />
					<view class="getCode" :class='{codebg: time==60}' @click='getCode'>
						{{code_txt}}
					</view>
				</view>
				<view class="agreement">
					<view class="select" @click='checked=!checked'>
						<image v-if='checked' src="../../static/login_checked.png" mode=""></image>
						<image v-else src="../../static/login_nochecked.png" mode=""></image>
					</view>
					<view class="agreement-info">
						<text>我已阅读《食艺兽相关隐私政策》和《食艺兽会员注册协议》，并同意本小程序根据《食艺兽相关隐私政策》收集必要个人信息。</text>
					</view>
				</view>
			</view>
		</view>
		<view class="submit">
			<view class="btn" :style='{opacity: opacity}' @click='signup'>
				注册
			</view>
		</view>
	</TopNavbar>
</template>

<script>
	import TopNavbar from '@/components/navBar/topNavbar.vue'

	export default {
		data() {
			return {
				tel: '',
				code: '',
				checked: false,
				time: 60,
				code_txt: '获取验证码',
				opacity: 0.4
			}
		},
		components: {
			TopNavbar
		},
		methods: {
			getCode() {
				let rule = /^1[35789]\d{9}$/;
				if ((rule.test(this.tel))) {
					uni.showToast({
						icon: 'none',
						title: '手机号格式不正确'
					})
					return ;
				}
				this.code_txt = '重新获取（'+ this.time-- +'）'
				let timer = setInterval(() => {
					if (this.time == 0) {
						clearInterval(timer);
						this.code_txt = '获取验证码';
						this.time = 60;
					} else {
						this.code_txt = '重新获取（'+ this.time-- +'）'
					}
				}, 1000)
			},
			signup() {
				if (this.opacity == 1) {
					uni.showToast({
						icon: 'none',
						title: '注册成功'
					})
				}
			}
		},
		watch: {
			code() {
				if (this.code.length == 4) {
					this.opacity = 1;
				} else {
					this.opacity = 0.4;
				}
			}
		}
	}
</script>

<style>
	.register {}

	.boxView {
		width: 690rpx;
		height: 598rpx;
		background: #FFFFFF;
		box-shadow: 0 4rpx 12rpx 0 rgba(0, 0, 0, 0.08);
		border-radius: 24rpx;
		margin: 0 auto;
		position: relative;
		padding: 160rpx 46rpx 0;
	}

	.boxView .headIcon {
		width: 160rpx;
		height: 160rpx;
		position: absolute;
		top: -80rpx;
		left: 266rpx;
		border-radius: 50%;
		border: 2px solid #B42739;
	}

	.boxView .headIcon image {
		width: 100%;
		height: 100%;
		border-radius: 50%;
	}

	.boxView .editForm {
		display: flex;
		align-items: center;
		flex-direction: row;
		width: 598rpx;
		height: 82rpx;
		border: 2rpx solid rgba(0, 0, 0, .1);
		background: #FFFFFF;
		border-radius: 41rpx;
		margin-bottom: 38rpx;
		padding: 0 10rpx 0 50rpx;
		justify-content: space-between;
	}

	
	.boxView .editForm .getCode {
		width: 222rpx;
		height: 62rpx;
		line-height: 62rpx;
		text-align: center;
		background: rgba(0, 0, 0, .1);
		border-radius: 31rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0,0,0,.4);
	}
	
	.boxView .editForm .codebg {
		background: rgba(237, 53, 53, 1);
		color: #fff;
	}

	.boxView .editForm input {
		flex: 1;
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .4);
		line-height: 34rpx;
	}

	.input-placeholder {
		font-size: 24rpx;
		font-weight: 500;
		color: rgba(0, 0, 0, .4);
		line-height: 34rpx;
	}

	.boxView .agreement {
		display: flex;
		flex-direction: row;
	}
	.boxView .agreement .select {
		
	}
	.boxView .agreement .select image {
		width: 32rpx;
		height: 32rpx;
		vertical-align: text-bottom;
	}
	.boxView .agreement .agreement-info {
		margin-left: 16rpx;
		padding-right: 36rpx;
	}
	.boxView .agreement .agreement-info text {
		font-size: 20rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.79);
		line-height: 30rpx;
	}
	.submit {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 140rpx;
		background: #f7f7f7;
	}
	.submit .btn {
		margin: 8rpx auto 0;
		width: 690rpx;
		height: 92rpx;
		text-align: center;
		line-height: 92rpx;
		background: #ED3535;
		box-shadow: 0 4rpx 8rpx 0 rgba(0,0,0,0.2);
		border-radius: 46rpx;
		color: #fff;
		font-size: 34rpx;
		font-family: PingFangSC-Semibold, PingFang SC;
	}
</style>
