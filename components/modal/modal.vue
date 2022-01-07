<template>
	<view class='login'>
		<u-popup mode="center" width="578rpx" height="246rpx" :mask-close-able='cancleIcon' border-radius="24" @close="handleCancle" v-model="isShow">
			<view class="content">
				<view class="title">{{title}}</view>
				<view class="action">
					<view class="btn-box">
						<view class="btn btnCancel" @click="handleCancle" v-if='cancleIcon'>
						  取消
						</view>
						<view class="btn btnConfirm" @click="submitFn" :style='{flex: cancleIcon?"0 1 50%":"0 1 100%" }'>
							{{submit}}
						</view>
					</view>
					
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean
			},
			title: {
				type: String,
			},
			submit: {
				type: String,
			},
			// submitFn: {
			// 	type: Object,
			// }
			cancleIcon: {
				type: Boolean,
				default: true
			}
		},
		methods: {
			handleCancle(){
				if (this.cancleIcon) {
					this.$emit('cancle')
				}
			},
			submitFn() {
				this.$emit('submitFn')
			}
		}
	}
</script>

<style>
	.login {
		position: relative;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 99999;
	}
	.content{
		position: relative;
		height: 100%;
	}
	.content .title{
		padding-top: 70rpx;
		text-align: center;
		height: 40rpx;
		font-size: 28rpx;
		font-weight: 500;
		color: #000000;
		line-height: 40rpx;
	}
	.content .action{
		border-top: 1rpx solid rgba(0,0,0,.1);
		width: 100%;
		position: absolute;
		bottom: 0;
	}
	.content .action .btn-box{
		justify-content: space-between;	
		display: flex;
    background: rgba(0,0,0,.1);
	}
	.content .action .btn{
		height: 78rpx;
		/* width: 288rpx; */
		flex: 0 1 50%;
		line-height: 78rpx;
		text-align: center;
		background-color: #ffffff;
		display: inline-block;
		vertical-align: middle;
		font-size: 24rpx;
		font-weight: 500;
	}
	.btnCancel{
		color: #000000;
	}
	.btnConfirm{
		border-left: 1rpx solid rgba(0,0,0,.1);
		color: #ED3535;
	}
	.btnConfirm::after{
		border: none;
	}
</style>
