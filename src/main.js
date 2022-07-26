import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.scss';//@表示src路径

import App from './App.vue' //页面路口
import router from './router' //路由
import store from './store'

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//全局注册此组件
Vue.use(VueQuillEditor, /* { default global options } */)

Vue.config.productionTip = false


//全局注册此element组件
Vue.use(ElementUI); 

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
