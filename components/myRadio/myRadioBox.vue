<template>
	<view>
		<view :class="'optionItem color' + state" @click="handlechange">
			<view class="icon">
				<image v-if="state==1" src="../../static/icon/icon_answer_nocheck.png"></image>
				<image v-if="state==2" src="../../static/icon/icon_answer_checked.png"></image>
				<image v-if="state==3" src="../../static/icon/icon_answer_errorn.png"></image>
				<image v-if="state==4" src="../../static/icon/icon_answer_errpr.png"></image>
				<image v-if="state==5" src="../../static/icon/icon_answer_rightn.png"></image>
				<image v-if="state==6" src="../../static/icon/icon_answer_rightc.png"></image>
			</view>
			<view :class="'txt color' + state">{{text}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'myRadio',
		props:{
			code: {
				type: String,
				default: ''
			},
			value:{
				type: String,
				default: ''
			},
			text: {
				type: String,
				default: ''
			},
			disabled:{
				type: Boolean,
				default: false
			},
			state:{
				type: Number,
				default: 1 // 1:未选中，2：已选中，3：未选中错误,4：已选中错误，5：未选中正确，6：已选中正确
			}
		},
		data() {
			return {
			};
		},
		methods:{
			handlechange(){
				if(!this.disabled){
					this.$emit('valueChange', {code: this.code, value: this.value, text: this.text, state: this.state})
				}
			}
		}
	}
</script>

<style>
	.optionItem{
		display: flex;
		min-height: 48rpx;
		line-height: 48rpx;
		padding: 10rpx 0 22rpx 0;
	}
	
	.optionItem .icon{
		width: 84rpx;
		text-align: center;
		padding-top: 5rpx;
		height: 48rpx;
		line-height: 54rpx;
		font-size: 0;
	}
	.optionItem .icon image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
		padding-top: 10rpx;
	}
	.optionItem .txt{
		flex: 1;
		/* height: 48rpx; */
		line-height: 48rpx;
		color: #352026;
		font-size: 34rpx;
		padding-top: 10rpx;
		font-family: PingFangSC-Medium;
	}
	.optionItem .txt.color3{
		color: #fa5151;
	}
	.optionItem .txt.color4{
		color: #fa5151;
	}
	.optionItem .txt.color5{
		color: #3cc0da;
	}
	.optionItem .txt.color6{
		color: #3cc0da;
	}
/* 	.optionItem.color2,.optionItem.color3,.optionItem.color4,.optionItem.color5,.optionItem.color6{
		padding: 0;
	}
	
	.optionItem.color2 .icon,.optionItem.color3 .icon,.optionItem.color4 .icon,.optionItem.color5 .icon,.optionItem.color6 .icon{
		height: 92rpx;
		line-height: 92rpx;
		font-size: 0;
	}
	.optionItem .txt.color2,.optionItem .txt.color3,.optionItem .txt.color4,.optionItem .txt.color5,.optionItem .txt.color6{
		height: 92rpx;
		line-height: 92rpx;
		padding-top: 0;
	} */
</style>
