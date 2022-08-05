<template>
  <div id="app">
    <p><button @click="counts">You click me {{count}} times</button></p>
    <p><button @click="counts">You have {{left}} times left!</button></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      left: 100
    }
  },
  methods: {
    counts () {
      this.count++;
      this.left--;
    }
  }
}

</script>

<style>
</style>