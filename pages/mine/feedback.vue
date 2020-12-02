<template>
	<view style="padding: 40rpx;">
		<u-form :model="form" label-position="top" :border-bottom="false" ref="uForm" :rules="rules">
			<u-form-item label="意见反馈" :label-width="150" :border-bottom="false">
				<u-input :border="true" v-model="form.nickname" :clearable="false" type="textarea" maxlength='300' placeholder="请在输入框内写下您的意见反馈" />
			</u-form-item>
		</u-form>
		<view style="text-align: center;margin-top: 40rpx;">
			<u-button type='primary' size='default' @click="submit">提交</u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
