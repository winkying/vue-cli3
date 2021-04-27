/**
 * 在Vue-Resource之上为restful API提供通常的错误处理
 * @ignore
 */

var ApiRequest = function(Vue) {
  this.loadingCount = 0
  this.timeoutMonitor = null

  /**
   * @description 发送Http Get请求
   * @param {String} url 请求url
   * @param {Object} params 请求参数（如果没有可以为null）
   * @param {Function} onsuccess 请求成功的回调函数
   * @param {Function} onerror 请求出错的回调函数(可选)
   * @param {Boolean} afterLoadingShow 请求成功后是否依然显示loading 默认false  afterLoadingShow
   * @example
   * Vue.api.get(url, params, onsuccess, onerror, afterLoadingShow)
   */
  this.get = function(url, params, onsuccess, onerror, afterLoadingShow) {
    function _dealUrl(url) {
      return config.isO2O && url !== Vue.allUrl.getProductListToApp &&
        url !== Vue.allUrl.promotionDetail && url !== Vue.allUrl.getStoreHotWord &&
        url !== Vue.allUrl.searchList &&
        url !== Vue.allUrl.getCustomerSiteInfo && url !== Vue.allUrl.getMerchantProductList &&
        url.indexOf('getModuleRefList') <= -1
    }

    var self = this

    Vue.utils.loadingShow()
    if (!params) {
      params = {}
    }
    Vue.http.get(self._getUrlWithParams(url, params)).then(function(response) {
      if (!afterLoadingShow) {
        Vue.utils.loadingHide()
      }

      var result = response.data

      if (result.code !== null && result.code !== undefined) {
        // 强制转换string
        result.code = result.code + ''
      }

      if (self.isSuccessful(result)) {
        if (onsuccess) {
          onsuccess(result)
        }
      } else if (onerror) {
        if (result && (result.code === '99' || result.code === 99 || result.code === 'G00008' || result.code === 'G00009') && url !== Vue.allUrl.referralCodeReceive) {
          // 删除用户UT
          Vue.auth.deleteUserToken()
          // locationUrl()
          Vue.utils.goLogin()
          return
        }
        onerror(result)
      } else {
        self._hanleError(result, url)
      }
    }, function(response) {
      var data = response.data
      if (!afterLoadingShow) {
        Vue.utils.loadingHide()
      }
      if (data && (data.hasOwnProperty('code') || data.hasOwnProperty('Code')) && (data.code === '10700101' || data.Code === '10700101')) {
        onerror(data)
      }
      self._showError(response)
    })
  }

  /**
   * @description 发送Http Post请求
   * @param {String} url 请求url
   * @param {Object} params 请求参数（如果没有可以为null）
   * @param {Function} onsuccess 请求成功的回调函数
   * @param {Function} onerror 请求出错的回调函数(可选)
   * @param {Boolean} afterLoadingShow 是否隐藏Loading
   * @example
   * Vue.api.post(url, params, onsuccess, onerror, afterLoadingShow)
   */
  this.post = function(url, params, onsuccess, onerror, afterLoadingShow) {
    this._doPostRequest('post', url, params, null, onsuccess, onerror, afterLoadingShow)
  }

  /**
   * @description 发送Http Post请求（以表单提交的格式，application/x-www-form-urlencoded）
   * @param {String} url 请求url
   * @param {Object} params 请求参数（如果没有可以为null）
   * @param {Function} onsuccess 请求成功的回调函数
   * @param {Function} onerror 请求出错的回调函数(可选)
   * @param {Boolean} afterLoadingShow 是否隐藏Loading
   * @example
   * Vue.api.postForm(url, params, onsuccess, onerror, afterLoadingShow)
   */
  this.postForm = function(url, params, onsuccess, onerror, afterLoadingShow) {
    this._doPostRequest('post', url, params, {
      emulateJSON: true
    }, onsuccess, onerror, afterLoadingShow)
  }

  /**
   * 判断请求返回是成功还是失败
   * @param {object} response 返回值
   * @returns {boolean} 布尔值
   * @ignore
   */
  this.isSuccessful = function(response) {
    function returnBoolean(data) {
      return data.code === '-8' || data.code === '0' || data.Code === '0' ||
        data.Code === '10200002' || data.code === '10200002' || data.Code === '001001000' ||
        data.code === '001001000' || data.code === '10700101' || data.Code === '10700101' ||
        data.Code === '000000' || data.code === '000000'
    }
    var data = response

    // JSON格式的数据
    if (data && (data.hasOwnProperty('code') || data.hasOwnProperty('Code'))) {
      return returnBoolean(data)
    }

    // 非JSON数据
    if (response.status === 200) {
      return true
    }

    return false
  }

  // 处理post api请求
  this._doPostRequest = function(method, url, params, options, onsuccess, onerror, afterLoadingShow) {
    function dealUrl(url) {
      return config.isO2O && url !== Vue.allUrl.getProductListToApp &&
        url !== Vue.allUrl.promotionDetail && url !== Vue.allUrl.getStoreHotWord &&
        url !== Vue.allUrl.searchList  &&
        url !== Vue.allUrl.getCustomerSiteInfo && url !== Vue.allUrl.getMerchantProductList &&
        url !== Vue.allUrl.getOwnerConsultAndQaList
    }

    var self = this
    if (!params) {
      params = {}
    }
    // self._startLoading()
    Vue.utils.loadingShow()
    Vue.http.post(url, params, options).then(function(response) {
      var result = response.data 
      if (typeof result === 'string') {
        try {
          result = JSON.parse(result)
        } catch (ex) {
          // console.error(ex)
        }
      }
      if (!afterLoadingShow) {
        Vue.utils.loadingHide()
      }

      if (result.code !== null && result.code !== undefined) {
        // 强制转换string
        result.code = result.code + ''
      }

      if (self.isSuccessful(result)) {
        if (onsuccess) {
          onsuccess(result)
        }
      } else if (onerror) {
        if (result && (result.code === '99' || result.code === 99 || result.code === 'G00008' || result.code === 'G00009') && url !== Vue.allUrl.referralCodeReceive) {
          // 删除用户UT
          Vue.auth.deleteUserToken()
          // locationUrl()
          Vue.utils.goLogin()
          return
        }
        onerror(result)
      } else {
        self._hanleError(result, url)
      }
    }, function(response) {
      if (!afterLoadingShow) {
        Vue.utils.loadingHide()
      }

      self._showError(response)
    })
  }

  // 开始加载
  // this._startLoading = function() {
  //   var self = this
  //   if (self.loadingCount++ > 0) {
  //     return
  //   }
  //   Vue.utils.loadingShow()
  //   // 设置超时10秒后自动隐藏loading mask
  //   // if (!self.timeoutMonitor) {
  //   //   self.timeoutMonitor = setTimeout(() => {
  //   //     self._clearLoading()
  //   //   }, 10000)
  //   // }
  // }

  // 结束加载
  // this._endLoading = function() {
  //   if (--this.loadingCount > 0) {
  //     return
  //   }
  //   this._clearLoading()
  // }

  // 清除Loading mask
  // this._clearLoading = function() {
  //   // if (this.timeoutMonitor) {
  //   //   clearTimeout(this.timeoutMonitor)
  //   //   this.timeoutMonitor = null
  //   // }
  //   Vue.utils.loadingHide()
  //   this.loadingCount = 0
  // }
  /**
   * 默认错误处理
   * @param {Object} data 请求的入参
   * @param {String} url 请求的url
   * @ignore
   */
  this._hanleError = function(data, url) {
    // function locationUrl() {
    //   if (Vue.browser.isHdApp()) {
    //     // 跳转到app登录页面
    //     if (window.dsBridge) {
    //       window.dsBridge.call('common.goNativeFn', { fncode: 'login', isReturn: true,urlPath:location.href  }, function() {})
    //       return
    //     }
    //   } else if(Vue.browser.miniProgram()){
    //     //未登录跳转小程序
    //     wx.miniProgram.redirectTo({url:`/pages/login/index?url=${encodeURIComponent(location.protocol+'//'+location.host+location.pathname)}&webview=1`})
    //   }
    // }
    // 未登录弹出提示并跳转到登录页面
    if (data && (data.code === '99' || data.code === 99 || data.code === 'G00008' || data.code === 'G00009') && url !== Vue.allUrl.referralCodeReceive) {
      // 删除用户UT
      Vue.auth.deleteUserToken()
      // locationUrl()
      Vue.utils.goLogin()
    } else {
      var msg = (data && (data.message || data.errorMessage))||'系统异常，请稍后再试';
      this._showError(msg)
    }
  }
  /**
   * 显示错误错误信息
   * @param {String} msg 错误参数
   * @ignore
   */
  this._showError = function(msg) {
    if(!msg)return
    if(typeof msg == 'string'){ //如果msg中包括英文单词，则视为异常返回
      if(/[a-zA-Z]+/i.test(msg) || msg.indexOf('异常')>-1 || msg.indexOf('超时')>-1 || msg.indexOf('系统错误')>-1){
      // if(msg.indexOf('异常')>-1 || msg.indexOf('超时')>-1 || msg.indexOf('code')>-1 || msg.indexOf('java')>-1 || msg.indexOf('sql')>-1){
        Vue.prototype.$dialog.alert({
          title:'温馨提示',
          message: '活动太火爆了，请再试试',
          showConfirmButton:true,
          confirmButtonText:'知道了',
          beforeClose:function(action,done){
            done()
          }
        })
      }else{
        Vue.prototype.$toast(msg)
      }
    }else{ //400，500，404等非200返回
      if(msg.status && msg.status != '200'){
        Vue.prototype.$dialog.alert({
          title:'温馨提示',
          message: '活动太火爆了，请再试试',
          showConfirmButton:true,
          confirmButtonText:'知道了',
          beforeClose:function(action,done){
            done()
          }
        })
      }
    }
    
  }

  /**
   * 构造请求url
   * @param {String} url 请求的url
   * @param {Object} params 请求入参
   * @returns {String} 返回url
   * @ignore
   */
  this._getUrlWithParams = function(url, params) {
    if (!params) {
      return url
    }

    // zeptojs function
    var str = $.param(params)

    if (!str) {
      return url
    }

    if (url.indexOf('?') < 0) {
      // url没有参数时
      url += '?'
    } else {
      // 有参数时
      url += '&'
    }

    return url + str
  }
}

// 全局api变量
export default function apiRequest(Vue, VueResource) {
// 1.所有请求从cookie中获取token，并拼接到header中，如果没有则读取app或者url（小程序）中

  // 初始化插件
  Vue.use(VueResource)
  Vue.api = new ApiRequest(Vue)
  // https://github.com/vuejs/vue-resource/issues/314
  Vue.http.interceptors.unshift(function(request, next) {
    if (window.config.isO2O && location.host.indexOf('admin')==-1) { //房商城&&前台域名调用接口需要走拦截
      // header拼接终端识别
      let terminalType = ''
      if (Vue.browser.isHdApp()) {
        if (Vue.browser.ios()) {
          terminalType = 'ios'
        } else if (Vue.browser.android()) {
          terminalType = 'android'
        }
      } else if (Vue.browser.miniProgram()) {
        terminalType = 'miniapp'
      }else{
        terminalType = 'web'
      }
      request.headers['terminalType'] = terminalType

      request.headers['clientType'] = Vue.browser.clientType()
      console.log('tt:' + terminalType)
      console.log('ct:' + Vue.browser.clientType())
      // token从cookie中读取，没有则从getUserInfo获取 //废弃掉，必须从getuserinfo()里取,不能从cookie取，app不会清cookie
      Vue.browser.getUserInfo().then(result => {
        if (result && result.unionId && result.Authorization) {
          request.headers['unionId'] = result.unionId
          request.headers['Authorization'] = result.Authorization
        }
        next(function(response) {
          if (typeof response.headers['content-type'] !== 'undefined') {
            response.headers['Content-Type'] = response.headers['content-type']
          }
        })
      })
    } else {
      next(function(response) {
        if (typeof response.headers['content-type'] !== 'undefined') {
          response.headers['Content-Type'] = response.headers['content-type']
        }
      })
    }
  })
}
