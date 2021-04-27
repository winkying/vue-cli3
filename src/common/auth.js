
export default function auth(Vue) {
  /**
    * Vue.auth 认证登录相关
    *
    * @exports Vue.auth
    */
  Vue.auth = {
    // user token name
    utName: 'ut',
    distributorId: 'distributorId',
    distributorType: 'distributorType', // 0接口获取1地址栏获取2登录成功后获取

    /**
         * @description 判断用户是否已登录
         * @returns {boolean} {true | false}
         * @example
         * Vue.auth.loggedIn()
         */
    loggedIn: function() {
      // 优先判断后端写入的ut是否存在
      var ut = this.getUserToken()
      return ut && ut.length > 0
    },

    /**
         * @description 用户登出
         * @example
         * Vue.auth.logout()
         */
    logout: function() {
      var url =  '/ouser-web/mobileLogin/exit.do'
      var param = {
        ut: this.getUserToken()
      }
      // 调取退出登录接口
      Vue.api.post(url, param, () => {
        // TODO logout
        this.deleteUserToken()// 清除UT
        Vue.distribution.clearCurrentDistributionData()// 清除分销商的信息
        Vue.utils.goUrl('/my/home.html', '://logout')
      }, () => {
        // TODO logout
        this.deleteUserToken()// 清除UT
        Vue.distribution.clearCurrentDistributionData()// 清除分销商的信息
        Vue.utils.goUrl('/my/home.html', '://logout')
      })
    },

    /**
         * @description 获取用户登录UT
         * @returns {string}
         * @example
         * Vue.auth.getUserToken()
         * @returns {String} ut
         */
    getUserToken: function() {
      // 优先判断后端写入的ut是否存在

      var ut = Vue.cookie.getCookie(this.utName)

      if (Vue.browser.isApp()) {
        if (!ut) { // 部分手机不能正常写入cookie
          ut = Vue.browser.getUaParams().ut
          if (ut) Vue.cookie.setCookie(this.utName, ut)
        }
      }
      return ut
    },

    /**
         * @description 获取distributorId 分销商ID
         * @returns {string}
         * @ignore
         * @example
         * Vue.auth.getDistributorId()
         * @returns {string} distributorId的cookie
         */
    getDistributorId: function() {
      return Vue.cookie.getCookie(this.distributorId)
    },

    /**
         * @description 设置分销商ID
         * @ignore
         * @example
         * @param {number} type ''
         * @param {number} id ''
         * Vue.auth.setDistributorId(type, id);
         */
    setDistributorId: function(type, id) {
      const dtype = Vue.cookie.getCookie(this.distributorType)
      if (type >= dtype) { // 优先级按照type大小  覆盖原有值
        Vue.cookie.setCookie(this.distributorType, type)
        Vue.cookie.setCookie(this.distributorId, id || '')
      }
    },

    /**
         * @description 设置用户登录UT，nginx做了限制，导致后端不能存取cookie，需要前端手动存取cookie
         * @example
         * @param {string} ut ut
         * Vue.auth.setUserToken(ut)
         */
    setUserToken: function(ut) {
      Vue.cookie.setCookie(this.utName, ut)
    },

    /**
         * @description 清空用户登录UT
         * @example
         * Vue.auth.deleteUserToken()
         */
    deleteUserToken: function() {
      Vue.cookie.delUt()
      Vue.cookie.delCookie('hdb-unionId')
      Vue.cookie.delCookie('hdb-Authorization')
    },

    // 心跳
    heartbeat: function() {
    }
  }

  /**
     * 如果用户访问需要登录的页面会自动跳转到登录页面
     *
     * 例子：<body v-need-login>...</body>
     */
  Vue.directive('needLogin', {
    priority: 3000,
    bind: function() {
      if (!Vue.auth.loggedIn()) {
        if (Vue.browser.isApp()) {
          // 跳转到app登录页面
          window.location.href = '://login'
        } else {
          const from = Vue.utils.getRelatedUrl()
          window.location.href = '/login.html?from=' + encodeURIComponent(from)
        }
      }
    }
  })
}
