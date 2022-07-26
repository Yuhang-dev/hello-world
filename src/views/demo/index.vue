<template>
  <div ref="divNode">
    {{ msg }}
    <button @click="changeMsg">改变msg的值</button>
    <router-link to="/">Resource Page</router-link>
    <button @click="$router.push('/')">Resource Page</button>

    <data-html></data-html>
    <dataHtml></dataHtml>

    <methodsHtml></methodsHtml>
    <vIf></vIf>
    <vShow></vShow>
    <vFor></vFor>
    <vTextHtml></vTextHtml>
    <vModel></vModel>
    {{slotValue}}
    <vSolt v-model="slotValue">
      <ul>
        <li>aaa</li>
      </ul>
      <div>div</div>
      <template #header>
          <ul>
            <li>header 11111111</li>
          </ul>
          <div>div header </div>
      </template>
      <template v-slot:footer>
          <ul>
            <li>footer 11111111</li>
          </ul>
          <div>div footer </div>
      </template>
    </vSolt>
  </div>
</template>

<script>
//import 变量名 from '包名';//包从node_modules中找
//import 变量名 from '相对路径或绝对路径';//通过路径查找
import dataHtml from './components/data.vue';
import methodsHtml from './components/methods.vue'
import vIf from './components/v-if.vue'
import vShow from './components/v-show.vue'
import vFor from './components/v-for.vue'
import vTextHtml from './components/v-textHtml'
import vModel from './components/v-model'
import vSolt from './components/v-slot'

export default {
  name: 'Demo',
  components: {//注册组件
    dataHtml,//{ dataHtml } es6语法，等价于 { dataHtml: dataHtml 
    methodsHtml,
    vIf,
    vShow,
    vFor,
    vTextHtml,
    vModel,
    vSolt
  },
  data(){
      //存放组件的变量的
      return {
          msg: 'hello demo',
          slotValue: 'slot的值'
      }
  },
  methods: {
    //存放组件的方法的
    changeMsg(){
        var time = new Date().getTime()
        this.msg = 'hello demo' + time;
    }
  },
  //生命周期； this就是实例对象，组件实例对象
  beforeCreate(){
    //此时实例对象存在，但是无法得到其他变量及方法等
    console.log('beforeCreate',this.msg);
  },
  created(){
    //此时可以得到实例对象的变量与方法等，但得不到节点
    console.log('created',this.msg, this.$refs.divNode);

    //$router路由实例对象(路由跳转等动作)，$route路由信息对象（获取当前路由的信息等）
    console.log(this.$router, this.$route);
  },
  beforeMount(){
      //此时可以得到实例对象的变量与方法等，但得不到节点
    console.log('beforeMount',this.msg, this.$refs.divNode);
  },
  mounted(){
      //此时可以得到实例对象的变量与方法等，但得节点
    console.log('mounted',this.msg, this.$refs.divNode);
  },
  beforeUpdate(){
    //在组件变量等发生变化时触发, 变量等变化之前, 得到的变量是变化之后的
    console.log('beforeUpdate',this.msg, this.$refs.divNode);
  },  
  updated(){
    //在组件变量等发生变化时触发，变量等变化之后, 得到的变量是变化之后的
    console.log('updated',this.msg, this.$refs.divNode);
  },
  beforeDestroy() {
      //组件销毁前触发, 可以得到节点、变量、方法
      console.log('beforeDestroy',this.msg, this.$refs.divNode);
  },
  destroyed(){
      //组件销毁之后触发，可以的变量、方法，无法得到节点
      console.log('destroyed',this.msg, this.$refs.divNode);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>