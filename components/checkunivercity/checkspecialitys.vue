<template>

		<u-popup border-radius="24" v-model="visiable" height="748rpx" mode="bottom" @close='close'>
			<view class="box">
				<view class="button">
					<view class="close" @click='$emit("changeSpecialitys")'>
						取消
					</view>
					<view class="sure" @click='$emit("changeSpecialitys", list[checked].code)'>
						确认
					</view>
				</view>

					<view class="checkGroup">
						<view class="checkItem" :class='{checked:checked==index}' v-for="(item, index) in list" @click="checked=index" :data-item="item">
							<view class="title">
								{{item.name}}
								<image v-if='checked==index' src="../../static/icon/icon_sure.png">
							</view>
						</view>
					</view>
				
			</view>
		</u-popup>

</template>

<script>
	export default {
		props:{
			visiable:{
				type: Boolean,
				default: false
			},
			value:{
				type: Array,
				default: []
			},
			list: {
				type: Array,
				default: []
			},
			val: {
				type: String
			}
		},
		data() {
			return {
				checked: 0
			}
		},
		methods: {
			close() {
				this.$emit("changeSpecialitys");
				this.checked = this.list.findIndex(item => this.val == item.code);
			}
		},
		mounted() {
			this.checked = this.list.findIndex(item => this.val == item.code);
		}
	}
</script>

<style>
	.box {
		display: flex;
		flex-direction: column;
		border-top-right-radius: 24rpx;
		border-top-left-radius: 24rpx;
	}
	.button {
		display: flex;
		flex-direction: row;
		padding: 48rpx;
		justify-content: space-between;
		font-size: 24rpx;
		font-weight: 400;
		color: rgba(0,0,0,.9);
		line-height: 34rpx;
	}
	.button text {
		font-family: PingFangSC-Regular, PingFang SC;
	}
	.checkGroup{
		margin-top: 42rpx;
		text-align: center;
		height: 100%;
	}
	.checkGroup .checkItem{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.checkGroup .checkItem .title {
		font-size: 28rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0,0,0,.5);
		line-height: 80rpx;
		position: relative;
	}
	.checkGroup .checkItem image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.checkGroup .checkItem.checked .title image {
		position: absolute;
		right: -40rpx;
		top: 24rpx;
	}
	.checkGroup .checkItem.checked{
		background: rgba(232, 232, 232, .39);
	}
	.checkGroup .checkItem.checked view {
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: rgba(0,0,0,.9);
	}
</style>
