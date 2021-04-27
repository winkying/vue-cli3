

export default function browser(Vue) {
  Vue.browser = {
    env: function(){
      let url = window.location.host
      if(url.indexOf('-dev')>-1){
        return 'dev'
      }else if(url.indexOf('-sit')>-1){
        return 'sit'
      }else if(url.indexOf('-sit2')>-1){
        return 'sit2'
      }else if(url.indexOf('-uat')>-1){
        return 'uat'
      }else if(url.indexOf('shop-house')>-1){
        return 'prd'
      }
    },
    hostMapping: function(){
      let env = this.env()
      let clientType = this.clientType()
      let h5Host = {
        'dev':{
          'B_USER':'broker-dev-m.fcb.com.cn',
          'C_USER':'m-dev.fcb.com.cn'
        },
        'sit':{
          'B_USER':'broker-sit-m.fcb.com.cn',
          'C_USER':'m-sit.fcb.com.cn'
        },
        'sit2':{
          'B_USER':'broker-sit2-m.fcb.com.cn',
          'C_USER':'m-sit2.fcb.com.cn'
        },
        'uat':{
          'B_USER':'broker-uat-m.fcb.com.cn',
          'C_USER':'m-uat.fcb.com.cn'
        },
        'prd':{
          'B_USER':'broker-m.fcb.com.cn',
          'C_USER':'m.fcb.com.cn'
        }
      }
      return location.protocol + '//'+h5Host[env][clientType]
    },
    BChostMapping: function(){
      let clientType = this.clientType()
      let client = {
        "B_USER":"broker",
        "C_USER":"customer"
      }
      let dsEnv = location.host.match(/(-(dev|sit2?|uat))/i)
      dsEnv = (dsEnv&&dsEnv[1])||''
      return `${location.protocol}//${client[clientType]}${dsEnv}-api.fcb.com.cn`
    },
    h5HostSuffix: function(){
      let dsEnv = location.host.match(/(-(dev|sit|uat))/i)
      dsEnv = (dsEnv&&dsEnv[1])||''
      return `${dsEnv}.fcb.com.cn`
    },
    clientType: function(){
      if(Vue.browser.isHdApp()){
        return ((/consumerApp/i.test(window.navigator.userAgent)) ? 'C_' : 'B_') + 'USER'
      }else{//h5 miniprogram
        return Vue.cookie.getCookie('hdb-clientType') || 'C_USER'
      }
    },
    RSAkey: function(){
      //默认测试环境公钥key
      let key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbsAhtq82pNlz7G16LuHiyLmbMVn1+AqzHBqVzSZ9cFZSrNqZdT+ZFMOSK/LoXIPbyawRtHkAkQW1t8bDPueoy95W1xF7x2VijUp4YpL5bdNrKScWj+GcvhiV1JhELQy7tAb5W25sNaj6DdnuQ5I3JFe7MlTeqp2JKlnVoBCOlQQIDAQAB'
      switch(this.env()){
        case 'dev':
          key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCDVHtxWWdvz0GLQSD/Wd0Jp4MPtuSUVsWQczQl7iMB368YSvujHmjDUNYD+pVeqdR0qzDSsajDY2stXYQKaf8haS0R57gki20a8OX8yqDSwFld1BrUX5/HjT+v+NxzGEuSU287vav/8LWZKmJxqrvrWLnaUWS2hEn7rqw4eIhXdwIDAQAB'
          break;
        case 'sit':
          key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbsAhtq82pNlz7G16LuHiyLmbMVn1+AqzHBqVzSZ9cFZSrNqZdT+ZFMOSK/LoXIPbyawRtHkAkQW1t8bDPueoy95W1xF7x2VijUp4YpL5bdNrKScWj+GcvhiV1JhELQy7tAb5W25sNaj6DdnuQ5I3JFe7MlTeqp2JKlnVoBCOlQQIDAQAB'
          break;
        case 'uat':
          key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5DGBAUSHWZbCtVBX0n2H9CT2YuU2AK/HhTCpbqM5C20tYLTSxx94PONn1Vg8MzOWeQYBV/ujxCmaouSQdaPqwepWTcAeqZTgJsd8hqpJ1fHD8O8NHoLT07HNemHFVayYgNr3cbK8Uqs3XkRQMHHmNQOlRPumjvEs/+8CAG7nymaorFZ50O/QnMyTxHchwn3lIuR8G4Rrzzb1yTxonANCERvOVNPCF1U8xpXmVNttV/6Cyh0pQMaVMUl6OlveJDb9JQ9oO9Bgv3NahVGtkBnTQcxsgOc0O9jp3rrW7x+W4QqxoOzC5hS0bpafa402twdSvJdu2/gxbG1Be0rNQNkrZQIDAQAB'
          break;
        case 'prod':
          key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxydNA/16fehqoByFgZB+u2WcL8V/GnRgfpoghqqFntLYj+Vrec2dQjyqqMXMO7+0OW5hFOlGHyqxTtfjVwESbh0aZAS51HMGzDtTCXJdH8N2TsKh35QR6uvOZ47z50Bsq6dfJxmNl8Vkv3Ocm9ONk74EKf/f4P+sTalp3nzbjF8l9iQSVnnXRvM/fQz7FDlH3uCPTfCIuzjdzNoiZ9j9ncieLv/0Uk/qjQdo8agWRPjN3dww6iY5fAaUIbSVCUvvbPNCeBjPEBNN2V6JAAQeLB8amx3PP7ZBiRJWHltxh4q3ssEQir+88UBTOt57nz2/4UPNRwk03bhY96yb0iD+0wIDAQAB'
          break;
        default:
          key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCbsAhtq82pNlz7G16LuHiyLmbMVn1+AqzHBqVzSZ9cFZSrNqZdT+ZFMOSK/LoXIPbyawRtHkAkQW1t8bDPueoy95W1xF7x2VijUp4YpL5bdNrKScWj+GcvhiV1JhELQy7tAb5W25sNaj6DdnuQ5I3JFe7MlTeqp2JKlnVoBCOlQQIDAQAB'
          break;
      }
      return '-----BEGIN PUBLIC KEY-----' + key + '-----END PUBLIC KEY-----'
    },
    RSAkey4Mobile: function(){
      return {
        publicKey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCiGQL0FA/3AvhRgBnRBUgkdA4nXa1UGA64Pp01k00jIswr4SW4ZNW33Efoy51/dTeLZGtLOB4Dt9Na69mj5FrAP0EnQtmi+YQfJoDG9LiSj66UgkTb+YPz85ZYN4ccwmc6YiPbMqjRYFfmPIWRfuBaLDZVdvv8Ok7/lEDlW27z3QIDAQAB',
        privateKey:'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAKIZAvQUD/cC+FGAGdEFSCR0DiddrVQYDrg+nTWTTSMizCvhJbhk1bfcR+jLnX91N4tka0s4HgO301rr2aPkWsA/QSdC2aL5hB8mgMb0uJKPrpSCRNv5g/Pzllg3hxzCZzpiI9syqNFgV+Y8hZF+4FosNlV2+/w6Tv+UQOVbbvPdAgMBAAECgYBW7ebhkmjFZThaLMKrj5OSyRJWFiy/7m7ma93PP4GcmCq6VXHvI1Rh16ZQt/FsyyXQgTfxDNU71TdpiRYciHgJxkY64pbOBcoF+7Ciy9mhXgj/4wqcB3PFN8NQJI96USYUcq5N78YXJKSm3vn9U3CAN3iub4qsEBu4zBwvPC7pGQJBAPoes8ue8avyvInK29oV2qk4HJgqVeyXa/NRalAIAz6eYg6nTOQVwgfjx2Y8eAgTttVZOARsMyDDTUVUanAdD2sCQQCl6JCQ9VD2OBJYfC7A3Z8m6HZIVs/ddqiFEMNALGgLlS0MAuy/2n5ntSPdm1yVA6YI2LsVhgrlmTV2pJt9ekPXAkEAoOMW7Ce1dNGTDV97w/DC0o7Rdd/lnWZZfg4kwI4m6CShFqPvBdgpE0IlhVHoM+nadaoKKm4fBTgbgDkori1DOQJAQmgsNVl75pHbBf/u1tPeeDxj2+Cjowlzuo9TF8SugLRdK4mgKcrS/b/Lc1BUZnDnbHMTrzHP+sawV6TbeAYQUQJBAMyGBu2LTeVQET5NWtyy43IkzgwcMS+12Tqhb93k15WZCFfIyZ5XMIQ3JBimQ5YKYJaS8a76Gs9vLH4doiMFy90='
      }
    },
    RSAencrypt: function(val){
      if(val){
        let publicKey = this.RSAkey4Mobile().publicKey
        let encrypt = new window.JSEncrypt();
        encrypt.setKey(publicKey);
        return encrypt.encrypt(val)
      }
    },
    RSAdecrypt: function(val){
      if(val){
        let privateKey = this.RSAkey4Mobile().privateKey
        let encrypt = new window.JSEncrypt();
        encrypt.setKey(privateKey);
        return encrypt.decrypt(val)
      }
    },
    ua: navigator.userAgent.toLowerCase(),
    /**
     * @description 是否是IE内核
     * @returns {boolean}
     * @example
     * @returns {boolean} 布尔
     * Vue.browser.trident()
     */
    trident: function() {
      return /Trident/ig.test(this.ua)
    },
    /**
     * @description 是否是Opera前内核 (已废弃)
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.presto()
     */
    presto: function() {
      return /Presto/ig.test(this.ua)
    },
    /**
     * @description 是否是Safari内核
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.webKit()
     */
    webKit: function() {
      return /AppleWebKit/ig.test(this.ua)
    },
    /**
     * @description 是否是Firefox内核
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.gecko()
     */
    gecko: function() {
      return /gecko.*khtml.*/ig.test(this.ua)
    },
    /**
     * @description 是否是移动端
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.mobile()
     */
    mobile: function() {
      return /AppleWebKit.*Mobile.*/ig.test(this.ua)
    },
    /**
     * @description 是否是ios
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.ios()
     */
    ios: function() {
      return this.iPhone() || this.iPad()
      // return !!this.ua.match(/\(i[^;]+;( U;)? CPthis.ua.+Mac OS X/);
    },
    /**
     * @description 是否是android
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.android()
     */
    android: function() {
      return /android|linux/ig.test(this.ua)
    },
    /**
     * @description 是否是iPhone
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.iPhone()
     */
    iPhone: function() {
      return /iphone/ig.test(this.ua)
    },
    /**
     * @description 是否是iPad
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.iPad()
     */
    iPad: function() {
      return /ipad/ig.test(this.ua)
    },
    /**
     * @description 是否是qq浏览器
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.qq()
     */
    qq: function() {
      return /qqbrowser/ig.test(this.ua)
    },
    /**
     * @description 是否是小程序
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.miniProgram()
     */
    miniProgram: function() {
      let flag = false
      if (/miniprogram/gi.test(this.ua)) {
        // android
        Vue.sessionStorage.setItem('isMiniProgram', true)
        flag = true
      } else if (window.__wxjs_environment === 'miniprogram') {
        // ios 异步
        Vue.sessionStorage.setItem('isMiniProgram', true)
        flag = true
      } else if (Vue.sessionStorage.getItem('isMiniProgram')) {
        // 异步
        flag = true
      } else {
        // todo
        // 没有weixin对象有2种情况：1微信没初始化好，2不是微信浏览器
        if (!window.WeixinJSBridge || !window.WeixinJSBridge.invoke) {
          // 异步
          // 非微信浏览器环境先把小程序设置成false，如果是微信再异步设置成true
          Vue.sessionStorage.setItem('isMiniProgram', false)
          flag = false
          document.addEventListener(
            'WeixinJSBridgeReady',
            function() {
              if (window.__wxjs_environment == 'miniprogram') {
                Vue.sessionStorage.setItem('isMiniProgram', true)
                flag = true
              } else {
                Vue.sessionStorage.setItem('isMiniProgram', false)
                flag = false
              }
            },
            false
          )
        }
      }
      return flag
    },
    /**
     * 判断是否是微信
     * @returns {boolean} true | false
     * @example
     * Vue.browser.weixin()
     */
    weixin: function() {
      return /MicroMessenger/ig.test(this.ua)
    },
    /**
     * @description 是否是app
     * @returns {boolean} 布尔
     * @example
     * Vue.browser.isApp()
     */
    isApp: function() {
      return /ody/ig.test(this.ua)
    },
    isHuawei: function(){
      return /huawei/ig.test(this.ua)
    },
    isHdApp: function() {
      return !!/from app/i.test(this.ua)
    },
    /**
     * @description 是否是hhb2b
     * @returns {boolean} 布尔
     * @ignore
     * @example
     * Vue.browser.hhb2b()
     */
    isHhB2b: function() {
      return this.ua.indexOf('hhb2b') > -1
    },

    /**
     * @description 判断是否云中台
     * @returns {boolean} 布尔
     * @ignore
     * @example
     * Vue.browser.isB2bApp()
     */
    isB2bApp: function() {
      return this.ua.indexOf('hhb2b') > -1 && !!this.getUaParams().version
    },
    /**
     * @description 获得浏览器参数
     * @returns {object} 布尔
     * @example
     * Vue.browser.getUaParams()
     */
    getUaParams: function() {
      var matchers = this.ua.match(/--\[([\s\S]+?)\]--/i)
      if (matchers && matchers.length > 1) {
        var uaObj = JSON.parse(matchers[1])
        return uaObj
      }

      return {}
    },
    /**
     * @description 自动登录
     * @example
     * Vue.browser.autoLogin()
     */
    autoLogin: function() {
      if (this.isApp()) {
        var ut = this.getUaParams().ut
        // ios 默认ut为default
        if (ut && ut !== 'default') {
          Vue.auth.setUserToken(ut)
          Vue.cookie.setCookie('ut', ut)
        }
      }
    },

    /**
     * @description 获取ios浏览器主版本号
     * @returns {number} 数字
     * @example
     * Vue.browser.getIosVersion()
     */
    getIosVersion: function() {
      var ver = this.ua.match(/OS (\d+)_(\d+)_?(\d+)?/)
      if (ver && ver.length > 1) {
        return parseInt(ver[1], 10)
      } else {
        return -1
      }
    },
    //判断是hdapp则读取token并写入cookie，
  // 从url中读取token，并存如cookie中
  //小程序从url读取
  //app则从方法中获取
  paramsFormat: function(url) {
    url = url || window.location.href
    var qInd = url.indexOf('?')
    var sharpInd = url.indexOf('#') // 路由
    var search = ''
    var paramsObj = {}
    function _deal(search, paramsObj) {
      var paramsList = []
      paramsList = search.split('&')
      for (var ind = 0; ind < paramsList.length; ind++) {
        var param = paramsList[ind]
        if (param) {
          var pind = param.indexOf('=')
          if (pind >= 0) {
            const key = param.substring(0, pind)
            let value = param.substr(pind + 1)
            if (value === 'undefined' || value === 'null') value = null// 过滤字符串，否则接口报错
            paramsObj[key] = value
          } else {
            paramsObj[param] = ''
          }
        }
      }
    }
    if (qInd >= 0) {
      if (sharpInd > 0) {
        search = url.substring(qInd + 1, sharpInd)
      } else {
        search = url.substring(qInd + 1)
      }
      // from跳转链接，不需要解析其他参数
      const reg = /\?(from(?:url)?)=(.*\.html)/i
      if (reg.test(search)) {
        const matches = search.match(reg)
        paramsObj[matches[1]] = matches[2]
      } else {
        _deal(search, paramsObj)
      }
    }
    return paramsObj
  },
    isSend:false,//是否已调用getuserinfo 发送过gdpx('send')事件，该事件重复发送会导致认购列表点击立即认购页面无法跳转，因为hybrid sdk重写了location.replaceState）
    getCityCode: function(){
      return new Promise((resolve)=>{
        //h5，小程序从url传递
        let {cityCode} = this.paramsFormat(location.href)
        try{
          let hdbLocation = JSON.parse(Vue.sessionStorage.getItem('hdb-location'))
          if(hdbLocation){
              resolve(hdbLocation)
          }else{
            if(Vue.browser.isHdApp()){
              window.dsBridge.call('common.notifityCall',{
                'methodName': 'getCityInfo',
                'data':{}
              },function(data){
                let dataObj = JSON.parse(data)
                if(dataObj){
                  Vue.sessionStorage.setItem('hdb-location',JSON.stringify(dataObj.data))
                  resolve(dataObj.data)
                }else{
                  resolve({})
                }
              })
            }else{
              Vue.sessionStorage.setItem('hdb-location',JSON.stringify({"cityCode":cityCode||""}))
              resolve({"cityCode":cityCode||""})
            }
          }
        }catch(e){
          resolve({})
          console.warn(e)
        }
      })
    },
    getUserInfo: function(){
      const self = this
      return new Promise((resolve)=>{
        //用户唯一标示，认证标示，定位地址，经纪人id，楼盘id B/C端，（android）经纪人id ，场次id ,场次名称
        let {address, prodId, sessionId, sessionName,prodType, local, mp, client} = this.paramsFormat(location.href)
        if(local){
          Vue.cookie.setCookie('local',1)
        }
        local = local || Vue.cookie.getCookie('local')
        //小程序判断c/b端
        if(mp=='agent'){//小程序中中台h5只有C端，默认C端
          Vue.cookie.setCookie('hdb-clientType','B_USER')
        }else if(mp == 'customer'){
          Vue.cookie.setCookie('hdb-clientType','C_USER')
        }
        if(client){ //H5 参数
          Vue.cookie.setCookie('hdb-clientType',client)
        }
        let env = Vue.browser.env()
        let client2 = Vue.browser.clientType()
        try{
          window.FCBDsbridge.GetToken({env,client:client2}).then((result)=>{
            let {unionId, token, brokerId, customerId, Authorization} = result
            Authorization = token
            console.log('u'+unionId)
            console.log('A'+Authorization)
            console.log('bi'+brokerId)
            console.log('si'+sessionId)
            console.log('sn'+sessionName)
            console.log('pt'+prodType)
            console.log('ci'+customerId)
            console.log('local'+local)
            console.log('mp'+mp)
            if (/-sit/i.test(location.host)){
              let url = location.href
              if(url.indexOf('Authorization')>-1){
                url = url.replace(/Authorization=([^&]+)/im,'Authorization='+Authorization)
              }else{
                url += '&local=1&Authorization='+Authorization
              }
              if(url.indexOf('unionId')>-1){
                url = url.replace(/unionId=([^&]+)/im,'unionId='+unionId)
              }else{
                url += '&unionId='+unionId
              }
              console.log(url+'&brokerId='+brokerId+'&customerId='+customerId+'&sessionId='+sessionId+'&sessionName='+sessionName+'&prodType='+prodType)
            }
            self.setUserInfo(unionId,Authorization,brokerId,prodId,address,sessionId,sessionName,prodType,customerId,mp)
            resolve({unionId,Authorization,brokerId,prodId,address,sessionId,sessionName,prodType,customerId,mp})
          }).catch(err=>{
            console.log(err)
            resolve(null)
          })
          if(local == 1){
            let {unionId, Authorization,brokerId, customerId} = this.paramsFormat(location.href)
            unionId = unionId || Vue.cookie.getCookie('hdb-unionId')
            Authorization = Authorization || Vue.cookie.getCookie('hdb-Authorization')
            self.setUserInfo(unionId,Authorization,brokerId,prodId,address,sessionId,sessionName,prodType,customerId,mp)
            resolve({unionId,Authorization,brokerId,prodId,address,sessionId,sessionName,prodType,customerId,mp})
          }
        }catch(e){
          console.log(e)
          resolve(null)
        }
      })
    },
    setUserInfo: function(unionId,Authorization,brokerId,prodId,address,sessionId,sessionName,prodType,customerId,mp){
      if (unionId && Authorization) {
        Vue.cookie.setCookie('hdb-unionId', unionId)
        Vue.cookie.delUt()
        Vue.cookie.setCookie('ut', unionId)
        Vue.cookie.setCookie('hdb-Authorization', Authorization)
        if(prodType){
          Vue.cookie.setCookie('hdb-prodType',prodType)
        }
        if(brokerId){
          Vue.cookie.setCookie('hdb-brokerId',brokerId)
        }
        if(customerId){
          Vue.cookie.setCookie('hdb-customerId',customerId)
        }
      }
      if(sessionId){
        Vue.cookie.setCookie('ssionId',sessionId||'')
      }
      if(sessionName){
        Vue.cookie.setCookie('sessionName',sessionName)
      }
      if(mp){
        console.log(mp)
      }
      if (window.gdpx && !Vue.browser.isSend) {
        try {
          if(unionId){
            window.gdpx('setUserId', unionId)
          }
          Vue.browser.isSend = true;
          window.gdpx('send')
          console.log('send------')
        }catch (e) {
          console.log(e)
        }
      }
      if(prodId){
        Vue.cookie.setCookie('hdb-prodId', prodId)
      }
      if(address){
        Vue.cookie.setCookie('miniAddress',address)
      }
    }
  }
  if(window.config && window.config.isO2O && location.host.indexOf('admin')==-1) { //房商城&&前台域名调用接口需要走拦截
    console.log('iso2o-----')
    Vue.browser.getUserInfo()
  }
}
