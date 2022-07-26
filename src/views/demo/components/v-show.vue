<template>
  <div style="background:#111;">
    <button v-show="isShow">新建文字</button>
    <div v-show="!isShow">具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情具体详情</div>
    <button @click="isShow = !isShow">切换显示</button>
  </div>
</template>

<script>
export default {
    data(){
        return {
            isShow: false,//是否显示
        }
    }
}
</script>

<style lang="scss" scoped>

</style>