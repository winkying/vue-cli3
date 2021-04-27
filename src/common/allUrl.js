/**
 * @description 请求接口列表
 * @exports allUrl
 * @param {Object} Vue vue实例
 * @example
* Vue.allUrl.UserLogin //登录接口地址
 */
export default function allUrl(Vue) {
  Vue.allUrl = {
    // 查看协议
    queryAgreement: '/oms-api/agreement/queryByOrderCode',
    // 签署接口
    userSign: '/oms-api/agreement/userSign',
    // 签署完成
    userSignConfirm: '/oms-api/agreement/userSignConfirm',
    // 认购协议
    createAgreement: '/oms-api/agreement/createByOrderCode',
    // 新订单提交接口
    newOrderSubmit: '/api/checkout/submitOrderNew.do',
    // 新订单详情查询
    newOrderDetail: '/oms-api/order/query/get.do',
    // 房源认购状态
    getStockStatusOptimize: '/back-product-web2/extra/merchantProduct/getStockStatusOptimize',
    // 去除收藏
    newDelete: '/ouser-web/api/favorite4house/delete.do',
    // 新加入收藏
    newAdd: '/ouser-web/api/favorite4house/add.do',
    // 新批量查询收藏
    newBatchCountFavorite: '/ouser-web/api/favorite4house/batchCountFavorite.do',
    // 获取支付appID
    getWxpayAppId: '/opay-web/getWxpayAppId.do',
    // 获取实时价格库存
    getPriceStockList: '/api/realTime/getPriceStockList',
    // 请求接口完成预绑定，并返回unionid及是否已关注微信公众号等信息
    getWxUserInfo: '/agent-wx-web/weixinShare/getWxUserInfo.do',
    // 获取微信签名
    weixinGetSign: '/api/weixin/getSign?url=',
    // 发送手机验证码 type:10认购,11认筹,12开盘
    sendCaptchasCodeForm: '/ouser-web/mobileRegister/sendCaptchas.do',
    productBaseInfoOptimize: '/back-product-web2/extra/merchantProduct/getMerchantProductBaseInfoByIdOptimize', //
    // 查询当前进行中的卷活动列表
    couponThemeList: '/api/promotion/coupon/couponThemeList',
    // 领取优惠券
    receiveCoupon: '/api/promotion/coupon/receiveCoupon',
    // 可领取与可使用优惠券
    couponThemeList4DirectReceive: '/api/promotion/coupon/couponThemeList4DirectReceive',
    // 图片等文件上传接口
    putStringWithForm: '/api/fileUpload/putStringWithForm.do',
    // 判断用户是否已收藏商品/文章等
    checkFavorite: '/ouser-web/api/favorite4house/queryIsFavorite.do', // /api/my/favorite/checkFavorite
    // 订单详细
    orderDetail: '/oms-api/order/query/get',
    // 订单取消
    orderCancel: '/oms-api/so/cancel',
    // 帮助中心
    h5HelpList: '/cms/view/h5/helpList',
    // 头条列表
    headlinesList: '/cms/view/h5/headlinesList',
    // 获取APP首页数据
    getAppHomePage: '/cms/page/getAppHomePage',
    // 检查登录状态
    getUserInfo: '/ouser-web/mobileLogin/getUserInfo.do',
    // 订单列表
    orderList: '/oms-api/order/query/list',
    // 收藏夹商品列表分页查询
    favoriteGoods: '/ouser-web/api/favorite4house/queryFavoriteDetailPage.do', // /api/my/favorite/goods
    // 文章列表
    articleList: '/api/social/live/article/list',
    // 订单各状态数量
    orderSummary: '/oms-api/order/so/my/summary',
    getUserInfoDetail: '/crm-web/api/userInfo/getDetail.do',
    // 订单支付
    getPayInfoByOrderNo: '/opay-web/getPayInfoByOrderNo.do',
    // 搜索订单
    orderSearch: '/api/seller/order/search',
    // 请求图片验证码
    checkImageForm: '/ouser-web/mobileRegister/checkImageForm.do',
    // 校验验证码
    checkCaptchasForm: '/ouser-web/mobileRegister/checkCaptchasForm.do',
    // 提交订单
    submitOrder: '/api/checkout/submitOrder',
    // 订单支付金额
    queryPayOrder: '/opay-web/queryPayOrder.do',
    // 发送验证码
    sendCaptchasForm: '/ouser-web/mobileRegister/sendCaptchas.do',
    // 获取所有渠道
    getAllChannel: '/ouser-web/api/channel/queryChannelMap.do',
    // 新增添加收藏接口
    addFavorite: '/ouser-web/api/favorite/add.do',
    // 获取商品是否上下架
    getItemCansale: '/search/rest/queryMpCanSale',
    // 查询楼盘对应单元
    getBuildingInfoAcrrodingHouse: '/back-product-web2/extra/merchantProduct/getBuildingInfoAcrrodingHouse.do',
    getBuildingInfoAcrrodingHouseOptimize: '/back-product-web2/extra/merchantProduct/getBuildingInfoAcrrodingHouseOptimize.do',
    // 查询楼盘下房源信息
    listProductByBuildingUnit: '/back-product-web2/extra/merchantProduct/listProductByBuildingUnit.do',
    listProductByBuildingUnitOptimize: '/back-product-web2/extra/merchantProduct/listProductByBuildingUnitOptimize.do',
    // 查询认筹单列表
    listRenchouOrder: '/oms-api/openOrder/listRenchouOrder',
    // 添加认筹单
    addRenchouOrder: '/oms-api/openOrder/addRenchouOrder',
    // 开盘公告
    getBuildingOpenNotice: '/ouser-web/api/store/getBuildingOpenNotice.do',
    getBuildingRenGouNotice: '/ouser-web/api/store/getBuildingRenGouNotice.do',
    // 获取当前选房人数
    onlineSelectHousePersonNum: '/oms-api/openOrder/onlineSelectHousePersonNum',
    // 选房校验认筹单使用人
    checkRenchouUser: '/oms-api/openOrder/checkRenchouUser',
    // 开盘选房成功轮播
    listBuySuccess: '/oms-api/openOrder/listBuySuccess',
    // 重新选房接口
    reconfirmOrder: '/api/checkout/reconfirmOrder',
    // 选房确认
    houseOrderConfirm: '/api/checkout/houseOrderConfirm',
    // 开盘签署协议倒计时
    getByType: '/oms-api/order/timeout/getByType',
    // 协议短信接口
    smsCheck: '/oms-api/agreement/sms/check',
    // 查看订单数量
    countOrderNum: '/oms-api/order/query/countOrderNum.do',
    //在线开盘成功提示
    // getBuildingBuySuccessTip:'/ouser-web/api/store/getBuildingBuySuccessTip.do',
    //查询用户可关联订单列表
    listRelateOrders:"/oms-api/order/so/listRelateOrders.do",
    //确认关联订单
    doRelateOrders:"/oms-api/order/so/doRelateOrders.do",
    //查询房源产品类型数量
    //获取当前登录用户手机号
    getCurrentUserMobile:"/ouser-web/user/getCurrentUserMobile",
    //获取认购资金账户信息是否完整
    checkMingyuanOrderStatus:"/oms-api/openOrder/checkMingyuanOrderStatus",
    valiUserInfo:"/api/checkout/valiUserInfo",
    //获取楼盘开盘时间，户型等基础信息
    getOpenTime:"/backapi/prod/onlineOpening/v1/h5/detail/",
    //获取楼盘认证公告
    buildingAnnouncement:"/omc/external/buildingAnnouncement/queryAll",
    //查询楼盘认购成功提示
    onlineOpeningSuccess:"/backapi/prod/onlineOpening/v1/app/detail",
    //房源列表查询优惠活动
    batchPromotionProduct:"/backapi/activity/appapi/v1/promotion/activity/product",
    //房源搜索词添加
    saveLog:"/backapi/prod/roomList/saveLog",
    //房源搜索词查找
    getRoomSearchLogList:"/backapi/prod/roomList/getRoomSearchLogList",
    // 楼盘开盘时间以及门店id
    getBuildingOpenInfo: '/backapi/prod/onlineOpening/v1/getBuildingOpenInfo',
    //搜索房源列表
    searchListOptimize: '/backapi/prod/roomList/querySubscribeRoomList', // 
    //查询认购配置金额
    queryProductByTypes: '/backapi/dictionary/appapi/sysconfig/v1/queryProductByTypes',
    //查询认筹楼盘金额
    findSingleRenchouingByBuildId: '/omc/external/buildingRenchouController/findSingleRenchouingByBuildId'
  }
}
