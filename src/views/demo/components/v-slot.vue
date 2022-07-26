<template>
  <div>
      <!--slot是插槽-->
      <slot name="header"></slot>
      <div>
          你们好啊 <button @click="$emit('input', 1111)">按钮</button>
          <slot></slot>
      </div>
      <slot name="footer"></slot>
  </div>
</template>

<script>
//$emit子传父，通讯
//实现v-model固定的$emit('input')语法
export default {
    props:{
        //props父传子，通讯
        value: {
            //实现v-model双向绑定的道具名只能叫value
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>

</style>