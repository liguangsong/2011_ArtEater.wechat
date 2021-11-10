<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import config from 'static/config/index.js'
	// var WXBizDataCrypt = require('/js/WXBizDataCrypt')
	
	export const getOpenId = (code) => {
		return new Promise((resolve, reject) => {
			var _config = config
			uni.request({
				method: 'POST',
				url: `${_config.parseRestBaseUrl}/wx/getOpenId`,
				data: { code },
				header: {
					'X-Parse-Application-Id': _config.ParseAppId,
					'X-Parse-REST-API-Key': _config.parseRestApiKey,
				},
				success: async res => {
					if (res.data.code === 200) {
						resolve(res.data)
					}
				},
				fail: (error) => {
					uni.showToast({
						icon: 'none',
						title: '登录失败',
						duration: 2000
					})
					console.log(error)
				}
			});
		})
	}
	export default {
		onLaunch: function() {
			
			uni.showShareMenu({
				withShareTicket: true,
				  menus: ['shareAppMessage', 'shareTimeline']
			})
			console.log('App onLaunch')
			// uni.reLaunch({
			// 	url:'/pages/index/lunch'
			// })
			// uni.checkSession({
			// 	success(e) {
			// 		// 已登录
			// 	},
			// 	fail(e) {
				uni.getStorage({
					key:'openid',
					success:function(openidres){
					},
					fail: function(error){
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
			// 	}
			// })
		},
		onLoad() {
			
		},
		onShow: function() {// 隐藏原生底部tab导航
		   uni.getSystemInfo({
			   success: res => {
				   	this.globalData.paddingBottomHeight=0;
				   let model = ['X', 'XR', 'XS', '11', '12', '13', '14', '15'];
				model.forEach(item => {
				    //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
				    if(res.model.indexOf(item) != -1 && res.model.indexOf('iPhone') != -1) {
						this.globalData.paddingBottomHeight=40;
				    }
				})
				this.globalData.windowHeight = res.windowHeight;
				
			   }
			})
			// uni.getSystemInfo({
			//     success: function (res) {
			        
			//     }
			// });
			uni.hideTabBar({
				animation: false
			});		
			// var self = this
			// var ExamRecords = new self.Parse.Object.extend('ExamRecord')
			// var query = new self.Parse.Query("TestQuestions")
			
			// query.doesNotExist('accuracy')
			// query.limit(10000)
			// query.find().then(questions=>{
			// 	questions.forEach(_question=>{
			// 		var examRecordQuery = new self.Parse.Query(ExamRecords)
			// 		examRecordQuery.equalTo('questionId', _question.id)
			// 		examRecordQuery.count().then(examCount=>{
			// 			var examRecordRightQuery = new self.Parse.Query(ExamRecords)
			// 			examRecordRightQuery.equalTo('questionId', _question.id)
			// 			examRecordRightQuery.equalTo('result', true)
			// 			examRecordRightQuery.count().then(rightCount=>{
			// 				console.log('正确率：'+ rightCount+'/'+ examCount)
			// 				_question.set('accuracy', 0)
			// 				_question.save()
			// 			})
			// 		})
			// 	})
			// })
			var self = this
			// var query = new self.Parse.Query("CouponInfo");
			// var CouponRecords = self.Parse.Object.extend("CouponRecord");
			// query.greaterThan('useEndTime', new Date())
			// query.find().then(coupons=>{
			// 	coupons.forEach(couponInfo=>{
			// 		var query1 = new self.Parse.Query("CouponRecord");
			// 		query1.equalTo('mode', 'all')
			// 		query1.first().then(record=>{
			// 			if(record) { // 已全部发送
			// 				var couponRecord = new CouponRecords();
			// 				couponRecord.set("couponName", couponInfo.get('couponName'));
			// 				couponRecord.set("amount", parseFloat(couponInfo.get('amount')));
			// 				couponRecord.set("useEndTime", couponInfo.get('useEndTime'));
			// 				couponRecord.set("tipName", couponInfo.get('tipName'));
			// 				couponRecord.set("tipContent", couponInfo.get('tipContent'));
			// 				couponRecord.set("openid", 'aaaaa');
			// 				couponRecord.set("mode", 'all');
			// 				couponRecord.set("productType", couponInfo.get('productType'));
			// 				couponRecord.set("state", 0);
			// 				couponRecord.set("orderNo", '');
			// 				couponRecord.set("useTime", new Date());
			// 				couponRecord.save()
			// 			}
			// 		})
			// 	})
			// })
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	text, view {
		font-family: 'PingFang';
	}
</style>
