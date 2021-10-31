<template>
	<Navbar navbarBg='#000' :height='height' title='课程' fontColor="#000" iconColor='#000'>
		<template v-slot:img>
			<image style='width: 100%;' src="../../static/bg.png" mode='aspectFill'></image>
		</template>
	</Navbar>
</template>

<script>
	import Navbar from '../../../curriculumSubPackage/components/navbar/navbar.vue'
	export default {
		data() {
			return {
				showFixed: false
			}
		},
		components: {
			Navbar
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	
</style>

