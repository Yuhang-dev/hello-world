<template>
  <div class="box">
      <div class="msg" :class="{ 'msg-green': isShowMsgClass }">{{ msg }}</div>
      <ul>
          <li>name: {{ obj.name }}</li>
          <li>name: {{ obj.age }}</li>
      </ul>
      <button @click="obj.age++">改变age</button>
      <button @click="isShowMsgClass = !isShowMsgClass">点击改变msg的class颜色</button>
  </div>
</template>

<script>
export default {
    data(){//data(){} es6语法 等价于 data: function(){}
        return {
            msg: 'hello data',
            obj: {
                name: '钉钉',
                age: 10
            },

            isShowMsgClass: false,//是否显示msg的新的class
        }
    },
    created(){
        this.msg = '我是Data';
    },
    watch: {//监听变量，变化时触发
        msg(newValue, oldValue){
            console.log(newValue, oldValue,9999, this.obj)
        },
        ['obj.age'](newValue, oldValue){
            console.log(newValue, oldValue,8888, this.msg)
        }
    }
}
</script>

<style lang="scss" scoped>
.box{
    background: #ccc; 
    margin-top: 10px;
    .msg{
        color: #f00;
    }
    .msg-green{
        color: green;
    }
}
</style>