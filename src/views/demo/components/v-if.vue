<template>
  <div>
    <button v-if="ifShow">新建文字</button>
    <div v-else>具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情</div>
    <button @click="ifShow = !ifShow">切换显示</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            ifShow: false,//是否显示
        }
    }
}
</script>

<style lang="scss" scoped>

</style>