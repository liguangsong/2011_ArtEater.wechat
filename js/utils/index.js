import Parse from '@/parse/index.js'
import store from '@/store'
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
	}
}