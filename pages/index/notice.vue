<template>
	<view class="">
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad(options) {
			console.log(options);
			this.title = options.title
		}
	}
</script>

<style>
</style>
