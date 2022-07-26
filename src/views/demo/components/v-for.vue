<template>
  <div style="background:#333;">
    <ul>
        <li v-for="(item,index) in arr" :key="index">
          编号：{{ index }}
          名字：{{ item.name }}
          年龄：{{ item.age }}
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    data(){
        return {
            arr: [
              { name: '甲', age: 11 },
              { name: '乙', age: 12 },
              { name: '丙', age: 13 },
              { name: '丁', age: 14},
            ]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>