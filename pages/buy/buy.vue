<template>
	<view>
		<view class="myView" :style="{height:(windowHeight - 450)+'rpx',paddingBottom:'30rpx'}">
			<view class="buyView">
				<view class="productItem" v-for="product in buySubjects" :key="product.id">
					<view class="iconView" @click="handleProductCheckedChange(product)">
						<image v-if="product.checked==true" src="../../static/icon/icon_check_checked.png"></image>
						<image v-else src="../../static/icon/icon_check_normal.png"></image>
					</view>
					<view class="contentView">
						<view class="titleView">
							<view class="title" @click="handleProductCheckedChange(product)">{{product.productName}}</view>
							<view class="comments" @click="showComments(product.comments)">查看介绍</view>
						</view>
						<view class="titleView">
							<view class="price" @click="handleProductCheckedChange(product)">¥{{product.price}}</view>
							<view v-if="product.price < product.originalPrice" class="oPrice" @click="handleProductCheckedChange(product)">¥{{product.originalPrice}}</view>
							<view class="intro">
								<text v-if="product.maxScoreMoney>0">最多抵现{{product.maxScoreMoney}}元</text><text v-if="product.minScore>0">，积分限制:{{product.minScore}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="recommendView" v-if="reCommandSubjects && reCommandSubjects.length>0">
				<view class="headView">
					<view class="head">推荐项目</view>
				</view>
				<view class="productItem" v-for="product in reCommandSubjects" :key="product.id">
					<view class="iconView" @click="handleProductCheckedChange(product)">
						<image v-if="product.checked==true" src="../../static/icon/icon_check_checked.png"></image>
						<image v-else src="../../static/icon/icon_check_normal.png"></image>
					</view>
					<view class="contentView">
						<view class="titleView">
							<view class="title" @click="handleProductCheckedChange(product)">{{product.productName}}</view>
							<view class="comments" @click="showComments(product.comments)">查看介绍</view>
						</view>
						<view class="titleView">
							<view class="price" @click="handleProductCheckedChange(product)">¥{{product.price}}</view>
							<view v-if="product.price < product.originalPrice" class="oPrice" @click="handleProductCheckedChange(product)">¥{{product.originalPrice}}</view>
							<view class="intro">
								<text v-if="product.maxScoreMoney>0">最多抵现{{product.maxScoreMoney}}元</text><text v-if="product.minScore>0">，积分限制:{{product.minScore}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="">
				
			</view>
		</view>
		<view class="buyConfirmView">
			<view class="couponItem">
				<view class="left">优惠券</view>
				<view class="right" @click="handleChooseCoupon">
					<text v-if="couponAmount>0" >-{{couponAmount}}</text>
					<text v-else-if="couponCount > 0">去选择优惠券</text>
					<text v-else>暂无优惠券</text>
				</view>
				<view class="icon">
					<u-icon name="arrow-right" color="#352026" style="opacity:0.65" size="32"></u-icon>
				</view>
			</view>
			<view class="couponItem">
				<view class="left">可花费{{canScore}}积分抵现¥{{scoreCanAmount?scoreCanAmount:0}}元</view>
				<view class="right" @click="handleChangeRadio">
					<image v-if="!isUseScore" src="../../static/icon/icon_answer_nocheck.png"></image>
					<image v-else src="../../static/icon/icon_answer_checked.png"></image>
				</view>
			</view>
			<view class="couponItem">
				<view class="heji">合计：<view class="price">¥{{cash}}</view></view>
				<view class="shuoming" @click="isShowBuyTips = true">查看支付说明</view>
			</view>
			<view class="youhui" v-if="discountPrice > 0">已优惠：¥{{discountPrice}}</view>
			<view class="btnView">
				<button class="btnPay" @click="handleSubmit">确认支付</button>
			</view>
		</view>
		<!--购买须知-->
		<u-popup v-model="isShowBuyTips" height="365rpx" width="640rpx" :closeable="false" mode="center" border-radius="40">
			<view class="buylView" style="padding:54rpx 48rpx;">
				<view class="title">
					您将购买的商品为虚拟内容服务，购买后不支持退订、转让、退换，请酌情确认。
				</view>
				<view class="tips">
					购买后可在【个人中心-会员中心-已购项目】中查看
				</view>
				<view class="btnActions">
					<button @click="isShowBuyTips=false">确定</button>
				</view>
			</view>
		</u-popup>
		<!--产品说明-->
		<u-popup v-model="isShowProductDetail" width="674rpx" mode="center" border-radius="40">
			<view class="detailView" style="padding:74rpx 30rpx;">
				<scroll-view scroll-y="true" :style="'max-height:'+(windowHeight - 600)+'rpx;'">
					<view style="margin: 0 20rpx;">
						<u-parse :html="comments"></u-parse>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import { formatDate, dateFormat, GetRandomNum, toDateFromString} from '../../js/common.js'
	export default {
		data() {
			return {
				userInfo: {},
				subjectId: '', // 购买项目Id
				products: [], // 产品
				subjectType: 0, // 1:科目，2：视频课程，3：收费项目，4：活动
				buySubjects: [], // 跳转过来需要购买的项目
				reCommandSubjects: [], // 推荐购买
				// subjects: [], // 科目
				// courses: [], // 套课
				// actionConfigs:[], // 价格配置
				// activitys:[], // 活动配置
				windowHeight: 0,
				config: {},
				isShowBuyTips: false, // 设置是否打开提示页
				isShowProductDetail: false, // 查看产品须知
				isUseScore: false,
				comments: '',
				price: 0, // 所选商品总价
				couponId: '', // 所选优惠券Id
				couponAmount:0, // 优惠券抵用价格
				scoreAmount:0, // 积分已抵用价格
				scoreCanAmount:0, // 积分可抵用价格
				canScore: 0, // 可使用的积分
				discountPrice: 0, // 优惠金额
				cash: 0, // 需要支付的总价格
				chooseProducts:[], // 选中的商品
				couponCount: 0, // 可用优惠券数量
				loading: false,
				selectedProductTye: ['','all'], // 已选项目类型
				couponProductType: ''
			}
		},
		onLoad(options) {
			var self = this
			uni.getSystemInfo({
				success: res => {
					let factor = 750/res.screenWidth
					self.windowHeight = res.windowHeight * factor
				}
			})
			uni.getStorage({
				key:'userInfo',
				success(u) {
					self.userInfo = u.data
					self.bindCoupons()
					var query = new self.Parse.Query('Order')
					query.equalTo('openId', self.userInfo.openid)
					query.equalTo('state', 1)
					query.find().then(orders=>{
						var _productIds = []
						orders.forEach(t=>{
							t.get('subjectId').split(',').forEach(subjectId=>{
								_productIds.push(subjectId)
							})
						})
						self.Parse.Config.get().then(async config=>{
							self.config = config
							if(options.subjectId) {
								self.subjectId = options.subjectId;
								await self.bindSubjects(_productIds);
								await self.bindActionConfigs(_productIds)
								await self.bindCourses(_productIds)
								await self.bindActivitys(_productIds)
							}
						})
					})
				}
			})
		},
		methods: {
			/* 加载科目 */
			async bindSubjects(buyedSubjectIds) {
				console.log('1')
				var self = this
				var query = new self.Parse.Query('Subjects')
				query.equalTo('parent_ID', '0')
				query.ascending('createdAt')
				await query.find().then(subjects => {
					console.log('2')
					var _products = []
					subjects.forEach(t=>{
						_products.push({id:t.id, type:'subject', price:t.get('price'), originalPrice: t.get('price'), checked: false, productName: t.get('subject_name'), maxScoreMoney: t.get('maxScoreMoney'), minScore: t.get('minScore'), comments:t.get('comments')})
					})
					self.products = JSON.parse(JSON.stringify(self.products)).concat(_products)
					var subject = _products.find(t=>{
						return t.id == self.subjectId
					})
					if(subject) { // 科目购买
						self.subjectType = 1
						if(self.config.get('isSubjectAllBuy')){ //判断是否全科购买
							_products.forEach(item=>{
								item.checked = true
							})
							_products.forEach(t=>{
								if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
									self.buySubjects.push(t)
								}
							})
							// self.buySubjects = self.buySubjects.concat(_products)
						} else {
							_products.forEach(t=>{
								if(t.id == subject.id){
									subject.checked = true
									self.buySubjects = [subject]
								} else {
									if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
										self.reCommandSubjects.push(t)
									}
								}
							})
							
						}
						self.calc()
					} else {
						_products.forEach(t=>{
							if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
								self.reCommandSubjects.push(t)
							}
						})
					}
				})
			},
			/*加载价格配置的收费项目*/
			async bindActionConfigs(buyedSubjectIds) {
				var self = this
				var query = new self.Parse.Query('ActionConfig')
				query.ascending('createdAt')
				await query.find().then(actionConfigs => {
					var _products = []
					actionConfigs.forEach(t=>{
						_products.push({id:t.id, type:'actionConfig', price:t.get('price'), originalPrice: t.get('price'), checked: false, productName: t.get('action'), maxScoreMoney: t.get('maxScoreMoney'), minScore: t.get('minScore'), comments:t.get('comments')})
					})
					self.products = JSON.parse(JSON.stringify(self.products)).concat(_products)
					var subject = _products.find(t=>{
						return t.id == self.subjectId
					})
					if(subject) { // 按收费项目购买
						self.subjectType = 3
						_products.forEach(t=>{
							if(t.id == subject.id){
								subject.checked = true
								self.buySubjects = [subject]
							} else {
								if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
									self.reCommandSubjects.push(t)
								}
							}
						})
						// self.buySubjects = [subject]
						self.calc()
					} else{
						_products.forEach(t=>{
							if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
								self.reCommandSubjects.push(t)
							}
						})
					}
				})
			},
			/* 加载套课 */
			async bindCourses(buyedSubjectIds){
				var self = this
				var query = new self.Parse.Query('Courses')
				query.equalTo('parent_ID', '0')
				query.ascending('createdAt')
				await query.find().then(courses => {
					var _products = []
					courses.forEach(t=>{
						_products.push({id:t.id, type:'course', price:t.get('price'), originalPrice: t.get('price'), checked: false, productName: t.get('courseName'), maxScoreMoney: t.get('maxScoreMoney'), minScore: t.get('minScore'), comments:t.get('comments')})
					})
					self.products = JSON.parse(JSON.stringify(self.products)).concat(_products)
					var course = _products.find(t=>{
						return t.id == self.subjectId
					})
					if(course) { // 科目购买
						self.subjectType = 2
						if(self.config.get('isCoursesAllBuy')){ //判断套课是否合并购买
							_products.forEach(item=>{
								item.checked = true
							})
							_products.forEach(t=>{
								if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
									self.buySubjects.push(t)
								}
							})
							// self.buySubjects = self.buySubjects.concat(_products)
						} else {
							_products.forEach(t=>{
								if(t.id == course.id){
									course.checked = true
									self.buySubjects = [course]
								} else {
									if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
										self.reCommandSubjects.push(t)
									}
								}
							})
							
						}
						self.calc()
					} else {
						_products.forEach(t=>{
							if(buyedSubjectIds.indexOf(t.id) == -1 && t.price > 0){
								self.reCommandSubjects.push(t)
							}
						})
					}
				})
			},
			/* 加载活动 */
			async bindActivitys(buyedSubjectIds){
				var self = this
				var query = new self.Parse.Query('Activity')
				query.ascending('createdAt')
				await query.find().then(activitys => {
					var _products = []
					activitys.forEach(t=>{
						let _pName = ''
						let _oPrice = 0
						if(t.get('products') && t.get('products').length > 1){
							t.get('products').forEach(product=>{
								var _product = self.products.find(function(t){
									return t.id == product
								})
								if(_product){
									_pName += _product.productName + ','
									_oPrice += _product.price
								}
							})
							if(_pName && _pName.length > 0) {
								_pName = _pName.substring(0, _pName.length - 1)
							}
							_products.push({id:t.id, type:'activity', price:t.get('price'), originalPrice: _oPrice, products: t.get('products'), checked: false, productName: t.get('title') + '('+_pName+')', maxScoreMoney: t.get('maxScoreMoney'), minScore: t.get('minScore'), comments:t.get('comments')})
						}
						if(t.get('products') && t.get('products').length == 1){ // 如果活动中只有一个项目，则改变这个项目的活动价格
							let _itemId = t.get('products')[0]
							if(self.buySubjects && self.buySubjects.length > 0){
								self.buySubjects.forEach(bt=>{
									if(bt.id == _itemId){
										bt.price = t.get('price')
									}
								})
							}
							if(self.reCommandSubjects && self.reCommandSubjects.length > 0){
								self.reCommandSubjects.forEach(bt=>{
									if(bt.id == _itemId){
										bt.price = t.get('price')
									}
								})
							}
						}
					})
					var activity = _products.find(t=>{
						return t.id == self.subjectId
					})
					if(activity) { // 按收费项目购买
						self.subjectType = 4
						_products.forEach(t=>{
							if(t.id == activity.id){
								activity.checked = true
								self.buySubjects = [activity]
							} else {
								if(buyedSubjectIds.indexOf(t.id)==-1){
									self.reCommandSubjects.unshift(t)
								}
							}
						})
						self.calc()
					} else{
						_products.forEach(t=>{
							if(buyedSubjectIds.indexOf(t.id)==-1){
								self.reCommandSubjects.unshift(t)
							}
						})
					}
				})
			},
			
			/*加载优惠券*/
			bindCoupons(){
				var self = this
				var couponRecord = new self.Parse.Query('CouponRecord')
				couponRecord.equalTo('openid', self.userInfo.openid)
				couponRecord.containedIn('productType', self.selectedProductTye)
				couponRecord.equalTo('state', 0)
				couponRecord.greaterThan('useEndTime', new Date())
				couponRecord.count().then(count=>{
					self.couponCount = count
				})
			},
			/* 去选择优惠券 */
			handleChooseCoupon(){
				var self = this
				uni.navigateTo({
					url:'./choosecoupon',
					success: function(res) {
						// 通过eventChannel向被打开页面传送数据
						res.eventChannel.emit('selectedProductType', self.selectedProductTye)
						res.eventChannel.emit('selectedCoupon', self.couponId)
					},
					events: {
						choosed: function(data) {
							if(data){
								self.couponAmount = data.amount
								self.couponId = data.objectId
								self.couponProductType = data.productType
								self.calc()
							} else {
								self.couponAmount = 0
								self.couponId = ''
								self.couponProductType = ''
								self.calc()
							}
						}
					}
				})
			},
			/* 计算价格 */
			calc(){
				var self = this
				var _products = []
				var _oprice = 0
				var _price = 0
				var _maxScoreMoney = 0
				var _maxScore = 0
				var bili = self.config.get('scoreMoneyPercent') // 积分兑换人民币的比例
				var selectedProductTye = ['', 'all']
				self.buySubjects.forEach(t=>{
					if(t.checked){
						if(t.type == 'subject'){
							selectedProductTye.push('subjectAll')
						} else {
							selectedProductTye.push(t.id)
						}
						_price += t.price
						_oprice += t.originalPrice
						_maxScoreMoney += t.maxScoreMoney
						if(self.userInfo.score >= t.minScore) {
							_maxScore += t.maxScoreMoney * bili
						}
						_products.push(t)
					}
				})
				self.reCommandSubjects.forEach(t=>{
					if(t.checked){
						if(t.type == 'subject'){
							selectedProductTye.push('subjectAll')
						} else {
							selectedProductTye.push(t.id)
						}
						_price += t.price
						_oprice += t.originalPrice
						_maxScoreMoney += t.maxScoreMoney
						if(self.userInfo.score >= t.minScore) {
							_maxScore += t.maxScoreMoney * bili
						}
						_products.push(t)
					}
				})
				self.selectedProductTye = selectedProductTye
				let coupon = self.selectedProductTye.find(function(t){ // 查询当前优惠券是否可用
					return t == self.couponProductType
				})
				if(!coupon){ // 不可用
					self.couponProductType=''
					self.couponAmount = 0
					self.couponId = ''
				}
				self.chooseProducts = _products
				self.price = _price
				let canScore = _maxScore <= self.userInfo.score ? _maxScore : self.userInfo.score
				self.canScore = canScore
				self.scoreCanAmount = parseFloat((canScore / bili).toFixed(2))
				if(self.isUseScore) {
					self.scoreAmount = self.scoreCanAmount
				} else {
					self.scoreAmount = 0
				}
				let _cash = parseFloat((_price - self.couponAmount - self.scoreAmount).toFixed(2))
				self.cash = _cash > 0 ? _cash : 0
				self.discountPrice = parseFloat((_oprice - self.cash).toFixed(2))
				self.bindCoupons()
			},
			/* 选中/取消选中商品 */
			handleProductCheckedChange(pro){
				var self = this
				let _checked = JSON.parse(JSON.stringify(pro)).checked
				if(self.config.get('isSubjectAllBuy') && pro.type == 'subject') { // 如果购买的是科目，且设置了科目必须全部购买
					self.buySubjects.forEach(t=>{
						if(t.type=='subject'){
							t.checked = !_checked
						}
					})
					self.reCommandSubjects.forEach(t=>{
						if(t.type=='subject'){
							t.checked = !_checked
						}
					})
				} else if(self.config.get('isCoursesAllBuy') && pro.type == 'course') { // 如果购买的是逃课，且设置了逃课必须全部购买
					self.buySubjects.forEach(t=>{
						if(t.type=='course'){
							t.checked = !_checked
						}
					})
					self.reCommandSubjects.forEach(t=>{
						if(t.type=='course'){
							t.checked = !_checked
						}
					})
				} else {
					pro.checked = !_checked
				}
				self.calc()
			},
			/* 选中/取消选中积分 */
			handleChangeRadio(){
				this.isUseScore = !this.isUseScore
				this.calc()
			},
			/* 查看详情 */
			showComments(comments){
				if(comments){
					this.comments = comments
					this.isShowProductDetail= true
				} else {
					uni.showToast({
						title:'暂无内容',
						icon:'none'
					})
				}
			},
			/* 确认支付 */
			handleSubmit() {
				var self = this
				if(!self.loading) {
					self.loading = true
					uni.showLoading()
					var _subjectId = '';
					var _subjectName = ''
					var _items = []
					self.chooseProducts.forEach(t=> {
						if(t.products && t.products.length > 0) {
							t.products.forEach(p => {
								_subjectId += p + ','
								_items.push(p)
							})
						}
						_items.push(t.id)
						_subjectId += t.id + ','
						_subjectName += t.productName + ','
					})
					_items.sort()
					let _doubleItem = null
					for(var i = 0; i < _items.length - 1; i++) {
					  if(_items[i] == _items[i + 1]) {
						_doubleItem = _items[i]
					  }
					}
					if(_doubleItem) {
						uni.showToast({
							title: '选择了重复的项目，请检查',
							icon: 'none'
						})
						self.loading = false
						return false
					}
					if(_subjectId){
						_subjectId = _subjectId.substring(0, _subjectId.length - 1)
						_subjectName = _subjectName.substring(0, _subjectName.length - 1)
					} else {
						uni.showToast({
							title: '请选择要购买的项目',
							icon: 'none'
						})
						self.loading = false
						return false
					}
					var user = self.Parse.User.current()
					var cash = self.cash * 100
					
					if(cash == 0){
						var orderNo = dateFormat(new Date(), 'yyyyMMddHHmmss')+GetRandomNum(5)
						self.PayCallBack(orderNo, _subjectId, _subjectName)
					} else {
						this.Parse.Cloud.run('initiatePayment',
							{price: cash,},
							{sessionToken: user.get('sessToken'),}).then(res=>{
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
								  self.PayCallBack(tradeId, _subjectId, _subjectName)
							  },
							  fail (res) {
								uni.hideLoading()
								self.loading = false
								console.log("支付失败"+ JSON.stringify(res))
							  }
							})
						})
					}
				}
			},
			PayCallBack(tradeId,_subjectId,_subjectName){
				var self = this
				var dbOrder = self.Parse.Object.extend("Order")
				var order = new dbOrder()
				order.set('orderNo', tradeId)
				order.set("subjectId",  _subjectId)
				order.set("subjectName",  _subjectName)
				order.set("price",  self.price)
				order.set("cash",  self.cash)
				order.set('couponAmount', self.couponAmount)
				order.set('scoreAmount', self.scoreAmount)
				order.set('couponId', self.couponId)
				order.set("openId", self.userInfo.openid)
				order.set("state", 1)
				order.set("wechatPayOrderId", '') // 支付流水号
				order.save().then(_order => {
					uni.hideLoading()
					uni.showModal({
						content:'恭喜，购买成功',
						showCancel: false
					})
					const eventChannel = self.getOpenerEventChannel()
					eventChannel.emit('reloadOrder', {});
					setTimeout(function(){
						uni.navigateBack()
					}, 500)
				},(error)=>{
					uni.hideLoading()
					console.log(error)
				})
				let _score_remove = parseFloat((self.scoreAmount * self.config.get('scoreMoneyPercent')).toFixed(1)) // 需要扣除的积分
				/* 积分使用记录 */
				if(self.scoreAmount>0) { // 使用积分记录
					var ScoreRecords = self.Parse.Object.extend('ScoreRecord')
					var scoreRecord = new ScoreRecords()
					scoreRecord.set('openid', self.userInfo.openid)
					scoreRecord.set('channel', 'shop')
					scoreRecord.set('extend', tradeId)
					scoreRecord.set('score', -_score_remove)
					scoreRecord.save()
				}
				var userQuery = new self.Parse.Query(self.Parse.User)
				userQuery.get(self.Parse.User.current().id).then(user=>{
					user.set('amount', user.get('amount') + self.cash)
					if(self.config.get('shopScore')&&self.config.get('shopScore')>0){
						var _score = parseFloat((self.cash * parseInt(self.config.get('shopScore'))).toFixed(1))
						user.set('score', (user.get('score') + _score - _score_remove))
						if(user.score > 0 && (!user.get('score_all') || user.get('score_all') == 0)) {
							user.set('score_all', user.get('score') + _score)
						} else {
							user.set('score_all', user.get('score_all') + _score)
						}
						/* 积分赠送记录 */
						if(_score > 0) { // 使用积分记录
							var _ScoreRecords = self.Parse.Object.extend('ScoreRecord')
							var _scoreRecord = new _ScoreRecords()
							_scoreRecord.set('openid', self.userInfo.openid)
							_scoreRecord.set('channel', 'shop')
							_scoreRecord.set('extend', tradeId)
							_scoreRecord.set('score', _score)
							_scoreRecord.save()
						}
					}
					user.save().then(ruser=>{
						uni.setStorage({
							key: 'userInfo',
							data: ruser
						})
					})
				})
				/* 使用优惠券 */
				if(self.couponId){
					var crquery = new self.Parse.Query('CouponRecord')
					crquery.get(self.couponId).then(record=>{
						record.set('state', 1)
						record.set('orderNo', tradeId)
						record.set('useTime', new Date())
						record.save()
					})
				}
				self.loading = false
			}
		}
	}
</script>

<style>
	page{
		background-color: #fbfbfa;
	}
	.myView{
		padding: 0 30rpx;
		overflow-y: auto;
	}
	.buyView,.recommendView{
		padding: 20rpx 0;
		padding-top: 0;
	}
	.recommendView{
		background-color: #ffffff;
		box-shadow: 0rpx 8rpx 16rpx 0rpx 
				rgba(238, 160, 160, 0.05);
		border-radius: 40rpx;
	}
	.recommendView .headView{
		height: 84rpx;
		line-height: 84rpx;
		/* padding-top: 12rpx; */
		margin-left: 10rpx;
		margin-right: 10rpx;
		border-bottom: 2rpx solid #f4f4f4;
	}
	.recommendView .headView .head{
		height: 84rpx;
		line-height: 84rpx;
		color: #ff9d83;
		font-size: 26rpx;
		padding-left: 8rpx;
		font-family: PingFangSC-Medium;
	}
	.productItem{
		display: flex;
		padding: 24rpx 0;
		border-bottom: 2rpx solid #f4f4f4;
		margin: 0 10rpx;
	}
	.buyView .productItem:last-child,.recommendView .productItem:last-child{
		border: 0;
	}
	.productItem .iconView{
		width: 62rpx;
		text-align: center;
		height: 48rpx;
		line-height: 48rpx;
	}
	.productItem .iconView image{
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.productItem .contentView{
		flex: 1;
	}
	.productItem .contentView .titleView{
		display: flex;
		/* height: 48rpx; */
		line-height: 48rpx;
		padding-right: 18rpx;
	}
	.productItem .contentView .titleView .title{
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #1c1c1c;
		flex: 1;
	}
	.productItem .contentView .titleView .comments{
		width: 104rpx;
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		color: #1c1c1c;
	}
	.productItem .contentView .titleView .price{
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: #ed3535;
		/* width: 100rpx; */
	}
	.productItem .contentView .titleView .oPrice{
		font-family: PingFangSC-Medium;
			/* height: 36rpx; */
		font-family: PingFangSC-Regular;
		font-size: 26rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0rpx;
		color: rgba(53, 32, 38, 0.3);
		text-decoration: line-through;
		padding-left: 5rpx;
	}
	.productItem .contentView .titleView .intro{
		width: 104rpx;
		font-size: 22rpx;
		font-family: PingFangSC-Medium;
		color: rgba(53,32,38,0.4);
		flex: 1;
		text-align: right;
	}
	
	.buyConfirmView{
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 0 30rpx;
	}
	.buyConfirmView .couponItem{
		display: flex;
		height: 70rpx;
		line-height: 70rpx;
		border-top: 2rpx solid #f4f4f4;
	}
	.buyConfirmView .couponItem .left{
		/* flex: 1; */
		text-align: left;
		font-size: 30rpx;
		color: #212121;
		font-family: PingFangSC-Medium;
		width: 500rpx;
	}
	.buyConfirmView .couponItem .right{
		flex: 1;
		text-align: right;
		font-size: 22rpx;
		color: rgba(53,32,38,0.4);
		font-family: PingFangSC-Medium;
	}
	.buyConfirmView .couponItem .right image{
		text-align: right;
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
		vertical-align: middle;
	}
	.buyConfirmView .couponItem .icon{
		width: 50rpx;
		text-align: right;
	}
	.buyConfirmView .couponItem .heji{
		flex: 1;
		font-size: 38rpx;
		color: #212121;
		font-family: PingFangSC-Medium;
	}
	.buyConfirmView .couponItem .heji .price{
		color: #ed3535;
		display: inline;
	}
	.buyConfirmView .couponItem .shuoming{
		font-size: #26rpx;
		color: #1c1c1c;
		font-family: PingFangSC-Medium;
	}
	.buyConfirmView .youhui{
		color: rgba(33,33,33,0.4);
		font-size: 26rpx;
		font-family: PingFangSC-Medium;
		position: relative;
		top: -10rpx;
	}
	.btnView{
		padding-top: 22rpx;
		padding-bottom: 104rpx;
	}
	.btnPay{
		width: 690rpx;
		height: 92rpx;
		line-height: 92rpx;
		text-align: center;
		background-color: #ed3535;
		border-radius: 46rpx;
		color: #ffffff;
		font-size: 34rpx;
		font-family: PingFangSC-Medium;
	}
	
	.buylView {
		width: 100%;
	}
	.buylView .title{
		font-size: 30rpx;
		/* font-weight: bold; */
		font-family: PingFangSC-Medium;
		color: #352026;
	}
	.buylView .price{
		font-size: 34rpx;
		margin-top: 12rpx;
		font-family: PingFangSC-Medium;
		color: #ed3535;
	}
	.buylView .tips{		
		font-size: 26rpx;
		margin-top: 26rpx;
		font-family: PingFangSC-Medium;
		color: rgba(53,32,38,0.4);
	}
	.buylView .btnActions{
		margin-top: 34rpx;
	}
	.buylView .btnActions button{
		width: 100%;
		height: 48rpx;
		line-height: 48rpx;
		/* border-radius: 46rpx; */
		background-color: #ffffff;
		color: #352026;
		font-family: PingFangSC-Medium;
		font-size: 34rpx;
	}
	.buylView .btnActions button::after{
		border: 0;
	}
</style>
