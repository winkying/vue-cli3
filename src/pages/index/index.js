import Vue from 'vue'
import common from '../../common/common.js'
import a from '../../common/a'
import b from '../../common/b'
import c from '../../common/c'
import Index from './index.vue'
Vue.config.productionTip = false
console.log(common)
console.log(a)
console.log(b)
console.log(c)
new Vue({
  render: h=>h(Index)
}).$mount('#app')