<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import MyConfig from 'static/config/index.js'
	export default {
		onLaunch: function() {
			uni.login({
			  success: coderes => {
				  uni.request({
				  	url:'https://api.weixin.qq.com/sns/jscode2session',
					data: {
						appid: 'wxb4777d3c2ec9d3ae',
						secret: '515b595fed9971d71258e2c23def6119',
						js_code: coderes.code,
						grant_type: 'authorization_code'
					},
					success(res) {
						if(res.errcode || (res.errcode && res.errCode != '0')) {
							console.log('获取OpenId失败')
						} else{
							uni.setStorage({
								key:'openid',
								data: res.data.openid,
							})
						}
					}
				  })
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				// http.get({
				//   url: 'user/GetOpenIdByCode?code='+coderes.code,
				//   success: function (res) {
				// 	if (res.data && res.data.openid && res.data.session_key) {
				// 	  wx.setStorage({
				// 		key: 'openid',
				// 		data: res.data.openid
				// 	  })
				// 	  if (res.data.unionid){
				// 		wx.setStorage({
				// 		  key: 'unionid',
				// 		  data: res.data.unionid
				// 		})
				// 	  }
				// 	  // self.globalData.openid = res.data.openid;
				// 	  // self.globalData.unionid = res.data.union;
				// 	}
				//   },fail: function(e){
				// 	wx.showModal({
				// 	  content: JSON.stringify(e)
				// 	})
				//   }
				// })
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
