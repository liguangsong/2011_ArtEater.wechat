<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import config from 'static/config/index.js'
	
	export const getOpenId = (code) => {
		return new Promise((resolve, reject) => {
			var _config = config
			uni.request({
				method: 'POST',
				url: `${_config.parseRestBaseUrl}/wx/getOpenId`,
				data: {
					code
				},
				header: {
					'X-Parse-Application-Id': _config.ParseAppId,
					'X-Parse-REST-API-Key': _config.parseRestApiKey,
				},
				success: async res => {
					if (res.data.code === 200) {
						resolve(res.data)
					}
				},
				fail: () => {
					uni.showToast({
						icon: 'none',
						title: '登录失败',
						duration: 2000
					})
				}
			});
		})
	}
	export default {
		onLaunch: function() {
			uni.checkSession({
				success(e) {
					// 已登录
				},
				fail(e) {
					uni.login({
						success: coderes => {
							var _config = config
							getOpenId(coderes.code).then(user=>{
								uni.setStorage({
									key:'openid',
									data: user.data.openid,
								})
								uni.setStorage({
									key:'sessionKey',
									data: user.data.session_key
								})
							})
						}
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
