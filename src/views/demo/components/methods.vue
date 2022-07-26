<template>
  <div style="background: #333;" >
      methods Html
      <span @mouseleave="funA(1,2,3)">1123</span>
  </div>
</template>

<script>
export default {
    created(){
        var v = this.funA();
        console.log(v);
    },
    methods: {
        funA(a,b,c){
           var d =  a + b + c;
           console.log(d,111)
           return d;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>