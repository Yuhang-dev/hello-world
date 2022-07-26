<template>
  <div style="background:#555;">
    <div v-text="string"></div>
    <div v-html="string"></div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            string: `<ul>
                <li>aaaaa</li>
                 <li>bbbb</li>
            </ul>`
        }
    }
}
</script>

<style lang="scss" scoped>

</style>