<template>
  <div id="login">
    <input type="button" v-model="value" @click="go">
  </div>
</template>
<script>
export default {
  name:'index',
  data(){
    return {
      value:'点击跳转index'
    }
  },
  methods:{
    go(){
      location.href = '/index.html'
    }
  }
}
</script>
