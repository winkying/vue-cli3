import Vue from 'vue'
import a from  './a'
import b from './b'
import c from './c'

Vue.prototype.$http = function(){
  console.log('$http')
}
Vue.allUrl = 'fcb.com.cn'
console.log(a)
console.log(b)
console.log(c)
window.Vue = Vue
console.log(window.Vue.allurl)
export default {
  a,
  b,
  c
}