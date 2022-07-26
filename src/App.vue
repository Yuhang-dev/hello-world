<template>
  <div id="app">
    <HeaderNav></HeaderNav>
    <router-view/>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav'

export default {
  name: 'App',
  components: {//注册组件
    HeaderNav
  },
  props: {
    msg: String
  }
}
</script>
<style lang="scss"></style>
