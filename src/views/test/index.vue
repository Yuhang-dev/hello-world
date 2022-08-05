<template>
  <div id="app">
    <p><button @click="count++;left--">You click me {{count}} times</button></p>
    <p><button @click="count++;left--">You have {{left}} times left!</button></p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      count: 0,
      left: 100
    }
  }
}

</script>

<style>
</style>