<template>
	<view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				src:''
			}
		},
		onLoad(options) {
			if(options.url){
				this.src = options.url
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
