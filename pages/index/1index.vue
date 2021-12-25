<template>
	<view class="">
		<view style='height:100rpx'></view>
		123
		<image :src="maskData"></image>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				maskData: null
			}
		},
		created() {
			this.getData()
		},
		onLoad(options) {
			console.log(options);
		},
		methods: {
			getData(e) {
				//获取accessToken
				let that = this;
				const APP_ID = 'wx8bef88e5b3f056be'; // 小程序appid
				const APP_SECRET = 'b5d651459568855faa3b6a43faba3d6e'; // 小程序app_secret
				let access_token = '';
				uni.request({
					url: "https://api.weixin.qq.com/cgi-bin/token", //固定链接，不用改
					data: {
						grant_type: 'client_credential',
						appid: APP_ID,
						secret: APP_SECRET
					},
					success: function(res) {
						console.log('获取accessToken', res)
						access_token = res.data.access_token;
						// 接口B：适用于需要的码数量极多的业务场景 生成的是小程序码
						that.getQrCode(access_token);
					}
				})
			},
			//获取二维码
			getQrCode(access_token) {
				var that = this;
				uni.request({
					url: "https://api.weixin.qq.com/wxa/getwxacode?access_token=" +
						access_token, //固定链接，不用改
					method: 'POST',
					responseType: 'arraybuffer', //设置响应类型
					data: {
						path: 'pages/index/index?code=' + 666666666, // 必须是已经发布的小程序存在的页面（否则报错）
						width: 298,
						auto_color: false, // 自动配置线条颜色，如果颜色依然是黑色，则说明不建议配置主色调
						line_color: {
							"r": "0",
							"g": "0",
							"b": "0"
						} // auto_color 为 false 时生效，使用 rgb 设置颜色
					},
					success: function(res) {
						console.log('获取二维码', res)
						that.maskData = "data:image/PNG;BASE64," + uni.arrayBufferToBase64(res
							.data); //以图片的形式展示
					}
				})
			}
		}
	}
</script>

<style>
	image {
		width: 300rpx;
		height: 300rpx;
	}
	
</style>
