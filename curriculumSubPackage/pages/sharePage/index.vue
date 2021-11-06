<template>
	<view>
		<button type="default" @click="scan">扫码</button>
	</view>
</template>

<script>
	import Curriculum from '../../js/curriculum.js'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			// Curriculum.scanCode();
		},
		methods: {
			scan() {
				Curriculum.scanCode();
			}
		}
	}
</script>

<style>

</style>
