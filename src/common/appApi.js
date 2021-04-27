/**
 * @description 访问app的API工具类
 * @param {Object} Vue 实例
 * @exports appApi
 */
export default function appApi(Vue) {
  /**
   * 访问app的API工具类
   */
  Vue.app = {
    openWindow: function (options, cb) {
      let opt = Object.assign(
        {},
        {
          methodName: "openWindow",
          url: "",
          navType: "1",
          hideBack: "1",
          isWhite: "0",
          namespaces: ["img", "pay"],
        },
        options
      );
      if (window.dsBridge) {
        try {
          window.dsBridge.call("common.openWindow", opt, function (result) {
            if (typeof cb == "function") {
              cb(result);
            }
          });
          if (Vue.cookie.getCookie("local") == 1) {
            //本地
            location.href = opt.url;
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    goBuildingList: function(){
      if (Vue.browser.isHdApp()) {
        if (window.dsBridge) {
          window.dsBridge.call("common.goNativeFn", {
            'methodName': 'common.goNativeFn',
            "fncode":"buildingList",
            "isReturn":false,
            "data":{}
          },function(){})
        }
      }else if(Vue.browser.miniProgram()){
        wx.miniProgram.redirectTo({url:'/pages/tabBar/build/index'})
      }
    },
    goBuildingDetail: function(){
      if (Vue.browser.isHdApp()) {
        if (window.dsBridge) {
            window.dsBridge.call('common.closeWindow', '', function() {})
        } else {
          history.back()
        }
      }else if(Vue.browser.miniProgram()){
        wx.miniProgram.redirectTo({url:'/pages/building/building-details/index?prodId='+Vue.cookie.getCookie('hdb-prodId')})
      }else{
        history.back()
      }
    },
    goNativeFn: function (options, cb) {
      let opt = Object.assign(
        {},
        {
          methodName: "common.goNativeFn",
          fncode: "",
          isReturn: false,
          data: {},
        },
        options
      );
      if (window.dsBridge) {
        window.dsBridge.call("common.goNativeFn", opt, function (result) {
          if (typeof cb == "function") {
            cb(result);
          }
        });
      }
    },
    setNavigationBar: function (sColor, cb) {
      if (window.dsBridge) {
        window.dsBridge.call(
          "common.setNavigationBar",
          {
            methodName: "common.setNavigationBar",
            statusBarColor: sColor || "black",
            hidden: true,
            title: "",
            hideBack: 1,
          },
          function (res) {
            if (typeof cb == "function") {
              cb(res);
            }
          }
        );
      }
    },
    configWebView: function (vueThis,isFalse) {
      const self = vueThis
      if (window.dsBridge) {
        window.dsBridge.call(
          "common.configWebView",
          {
            methodName: "common.configWebView",
            automaticallyAdjustsScrollViewInsets: !isFalse,
          },
          function (value) {
            const res = JSON.parse(value);
            if (res.success && res.data) {
              window.addHeight = (window.addHeight || 0) //否则undefined += 是NaN
              // res.data.bottomInsetsHeight = 34
              if(self.$refs.headerShiPei){
                self.$refs.headerShiPei.$el.style.top = res.data.statusBarHeight / 100 + 'rem'
              }
              if(self.$refs.headerStep){
                self.$refs.headerStep.$el.style.marginTop = (44 + res.data.statusBarHeight) / 100 + 'rem'
              }
              if(self.$refs.mainBoxMes){
                self.$refs.mainBoxMes.style.borderTop = (44 + res.data.statusBarHeight) / 100 + 'rem solid transparent'
              }
              if(self.$refs.tabWrapper){
                self.$refs.tabWrapper.style.top = (44 + res.data.statusBarHeight) / 100  + 'rem'
              }
              if(self.$refs.zhanweifu){
                self.$refs.zhanweifu.style.height = res.data.statusBarHeight / 100 + 'rem'
              }
              if(self.$refs.statusbar){
                self.$refs.statusbar.style.marginTop = res.data.statusBarHeight / 100 + 'rem'
              }
              if(self.$refs.headerTab){
                self.$refs.headerTab.style.top = (44 + res.data.statusBarHeight) / 100 + 'rem'
              }
              //高度是累加的
              //bottomInsetsHeight iphone x底部indicator预留高度34px
              //footer，底部选房列表和收藏列表悬浮高度49px
              //signTips, 底部有签署协议单子时悬浮的去签署横条高度38px
              //openSimulation模拟选房浮窗距离底部定位高度8px
              if(res.data.bottomInsetsHeight > 0){
                window.addHeight += res.data.bottomInsetsHeight
              }
              // self.$parent.$refs.bodyContent.style.height = 'calc(100vh - ' + bottomInsetsHeight + ')'
              if(self.$refs.footer || self.$parent.$refs.footer){ //开盘页面有底部房源列表和收藏列表footer按钮悬浮，iphone x中需要留出底部白边
                (self.$refs.footer || self.$parent.$refs.footer).style.borderBottom = ""+window.addHeight + "px solid #fff";
                window.addHeight +=  49
              }
              $('.open-help-icons-wrapper')[0] && $('.open-help-icons-wrapper')[0].style.setProperty('bottom', (window.addHeight+8) / 100 + 'rem', 'important')
              if(self.$refs.bodyContent || self.$parent.$refs.bodyContent){
                (self.$refs.bodyContent || self.$parent.$refs.bodyContent).style.height = 'calc(100vh - ' + res.data.bottomInsetsHeight + 'px)'
              }
              if (Vue.browser.isHuawei()) {
                //华为底部虚拟按键
                // self.$refs.bodyContent.style.paddingBottom = '0.44rem'
                // self.$refs.footer.style.bottom = '0.38rem'
              }
            }
          }
        );
      }
    },
  };
}
