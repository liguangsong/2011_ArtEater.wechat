<template>
	<TopNavbar title='信息公告' bg='#fafafa'>
		<view class="">
			<!-- {{notice.bulletinName}} -->
			<rich-text class='regular ql-editor' :nodes='detail | formatRichText'></rich-text>
		</view>
	</TopNavbar>
</template>

<script>
	import Curriculum from '../../curriculumSubPackage/js/curriculum.js'
	import TopNavbar from '@/components/navBar/topNavbar.vue'
	export default {
		data() {
			return {
				notice: null,
				detail: null
			}
		},
		components: {
			TopNavbar
		},
		onLoad(options) {
			var query = new this.Parse.Query('BulletinBoard');
			query.equalTo("isShow", true);
			query.equalTo("objectId", options.objectId);
			query.first().then(data => {
				this.notice = data;
				this.detail = data.attributes.informationBulletin;
			})
		},
		filters: {
			formatRichText(html) { //控制小程序中图片大小
				return Curriculum.formatRichText(html);
			}
		}
	}
</script>

<style>
</style>
