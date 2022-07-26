<template>
  <div style="background:#333;">
      {{ msg }}
      <div>
          <input type="text" v-model="msg">
      </div>
      {{ val }}
      <div>
           <input type="text" :value="val" @input="inputVlaue">
      </div>
      <!--input 值发生变化时触发的事件，只有表单类元素才有此事件-->
  </div>
</template>

<script>
export default {
    data(){
        return {
            msg: '我是一个input',

            val: '12121'
        }
    },
    methods: {
        inputVlaue($event){
            //$event.target即为当前input节点
            this.val = $event.target.value;
        }
    }
}
</script>

<style lang="scss" scoped>

</style>