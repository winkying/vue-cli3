export default function(Vue){
  console.log('browser2')
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
    }
  }
}