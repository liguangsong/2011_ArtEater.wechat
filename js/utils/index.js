import Parse from '@/parse/index.js'
import store from '@/store'
import {
	dateFormat,
	GetRandomNum
} from '../../js/common.js'
export default {
	async getcount() {
			let userInfo={},msgCount= 0,couponCount= 0;
			let res=await uni.getStorageSync('userInfo');
			if(!res)return undefined;
			userInfo = res;
			
			var query =  new Parse.Query('MessageReadHistory')
			query.equalTo('openid', userInfo.openid)
			let qres=await query.first();
			var msgQuery = new Parse.Query("Message");  // 之前的消息
			var msgQuery1 = new Parse.Query("Opinions");	// 意见反馈消息表
			var msgQuery2 = new Parse.Query("CouponMessage");	// 优惠券消息表
			// msgQuery.equalTo('openid', userInfo.openid)
			msgQuery1.equalTo('openid', userInfo.openid)
			msgQuery1.notEqualTo('message', '')
			msgQuery2.equalTo('openid', userInfo.openid)
			if(qres){
				msgQuery.notContainedIn('objectId',qres.get('MessageIds'))
				msgQuery1.notContainedIn('objectId',qres.get('MessageIds'))
				msgQuery2.notContainedIn('objectId',qres.get('MessageIds'))
			}
			let count = await msgQuery.count() || 0
			let count1 = await msgQuery1.count() || 0
			let count2 = await msgQuery2.count() || 0
			msgCount = count + count1 + count2
			
			// 之前请求的是CouponRecord， 现在请求的是新的表
			let cquery = new Parse.Query('NewCouponRecord')
			cquery.equalTo('openid', userInfo.openid)
			cquery.equalTo('state', 0)
			cquery.greaterThan('useEndTime', new Date())
			cquery.descending('useEndTime', 'state')
			let wres = await cquery.count();
			couponCount = wres;
			store.commit('setMineDot',(msgCount+couponCount)>0);
			return {
				userInfo,
				msgCount,
				couponCount
			};
		},
	initiatePayment(prePayInfo, that, sFun) {
		let user = Parse.User.current();
		let cash = prePayInfo.cash * 100;
		if (cash == 0) {
			var orderNo = dateFormat(new Date(), 'yyyyMMddHHmmss') + GetRandomNum(5);
			that.PayCallBack(orderNo)
		} else {
			Parse.Cloud.run('initiatePayment', {
				price: cash
			}, {
				sessionToken: user.get('sessToken')
			}).then(async res => {
				var payload = res.payload
				var tradeId = res.tradeId
				uni.requestPayment({
					appId: payload.appId,
					timeStamp: payload.timeStamp,
					nonceStr: payload.nonceStr,
					package: payload.package,
					signType: payload.signType,
					paySign: payload.paySign,
					success(res) {
						that[sFun](tradeId)
					},
					fail(res) {
						uni.hideLoading();
						uni.showToast({
							title: '支付失败',
							icon: 'none'
						})
						console.log("支付失败" + JSON.stringify(res))
					}
				})
			})
		}
	}
}
