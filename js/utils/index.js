import Parse from '@/parse/index.js'
import store from '@/store'
import { dateFormat, GetRandomNum} from '../../js/common.js'
export default {
	async getcount() {
		let userInfo={},msgCount= 0,couponCount= 0;
		let res=await uni.getStorageSync('userInfo');
		    if(!res)return undefined;
			userInfo = res;
			var query =  new Parse.Query('MessageReadHistory')
			query.equalTo('openid', userInfo.openid)
			let qres=await query.first();
			var msgQuery = new Parse.Query("Message");
				if(qres){
					msgQuery.notContainedIn('objectId',qres.get('MessageIds'))
				}
				let count =await msgQuery.count();
				msgCount = count;
			
			let cquery = new Parse.Query('CouponRecord')
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
	initiatePayment(prePayInfo,that,sFun) {
		let user = Parse.User.current();
		let cash=prePayInfo.cash * 100;
		if(cash == 0){
			var orderNo = dateFormat(new Date(), 'yyyyMMddHHmmss')+GetRandomNum(5);
			that.PayCallBack(orderNo)
		} else {
			Parse.Cloud.run('initiatePayment',
				{price: cash},
				{sessionToken: user.get('sessToken')}).then(async res=>{
				var payload = res.payload
				var tradeId = res.tradeId
				uni.requestPayment({
				  appId: payload.appId,
				  timeStamp: payload.timeStamp,
				  nonceStr: payload.nonceStr,
				  package: payload.package,
				  signType: payload.signType,
				  paySign: payload.paySign,
				  success (res) {
					  that[sFun](tradeId)
				  },
				  fail (res) {
					uni.hideLoading();
					uni.showToast({
						title:'支付失败',
						icon:'none'
					})
					console.log("支付失败"+ JSON.stringify(res))
				  }
				})
			})
		}
	}
}