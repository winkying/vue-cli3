<template>
  <div id="index">
    <input type="button" v-model="value" @click="go">
  </div>
</template>
<script>

export default {
  name:'index',
  data(){
    return {
      value:'点击跳转login'
    }
  },
  mounted:function(){
    console.log(Vue.allUrl.queryAgreement)
  },
  methods:{
    go(){
      location.href = '/subscribe/sub-list.html'
    }
  }
}
</script>
