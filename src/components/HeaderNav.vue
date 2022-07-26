<template>
  <header class="header">
    <div class="logo">
      <span class="logo-img"></span>
      <span class="logo-text">Control Panel Title</span>
    </div>
    <div class="nav">
      <el-menu mode="horizontal" :default-active="activeNav">
        <el-menu-item :index="index + ''" v-for="(item,index) in navData" :key="index" @click="changeNav(item,index)">{{ item.name }}</el-menu-item>
      </el-menu>
    </div>

    <div class="person">
      <el-avatar :size="32" :src="circleUrl"></el-avatar>
      <el-dropdown>
        <span class="el-dropdown-link">
          Admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>Logout</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
//图片等如放在src目录下，必须通过import、require方式引入
//图片等如放在publish目录下可以通过绝对路径引入
//import circleUrl from '@/assets/logo.png'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data(){
    return {
      activeNav: '0',
      navData: [
        { name: 'Resource', to: '/' },
        { name: 'Tickets', to: '/tickets' },
        { name: 'Forum', to: '/forum' },
        { name: 'FAQ', to: '/faq' },
        { name: '扫雷', to: '/sweep' },
      ],

      //circleUrl: circleUrl
      circleUrl: '/img/123.jpg'
    }
  },
  watch:{
    ['$route.path'](newValue){
      if(newValue){
        //修正刷新时，导航的激活问题
        var pathArr = newValue.split('/');
        this.navData.forEach((item,index) =>{
          if(item.to == '/'+pathArr[1]){
            this.activeNav = index.toString()
          }
        });
      }
    }
  },
  methods: {
    changeNav(item,index){
      this.$router.push(item.to);
      this.activeNav = index+'';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
//  ::v-deep //属性选择器钩子
.header{
  display: flex;
  align-items: center;
  background: #1890FF;
  display: flex;
  .logo{
    display: flex;
    align-items: center;
    font-size: 14px;
    color: rgba(255,255,255,0.85);
    margin-left: 33px;
  }
  .logo-img{
    width: 66px;
    height: 29px;
    background: #000;
    margin-right: 26px;
  }
  .logo-text{
    position: relative;
    &:before{
      position: absolute;
      left: -13px;
      top: 7px;
      content: '';
      width: 4px;
      height: 4px;
      border-radius: 4px;
      background: #fff;
    }
  }
}
.nav{
  margin: 0 auto;
  .el-menu{
    background: none;
    .is-active{
      background: rgba(255,255,255,0.30);
      border-color: transparent;
    }
  }
  .el-menu.el-menu--horizontal{
    border: 0 none;
  }
  .el-menu-item{
    padding: 0;
    width: 112px;
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-size: 18px;
    color: #FFFFFF;
  }
  .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus,.el-menu--horizontal>.el-menu-item:not(.is-disabled):hover{
    background: rgba(255,255,255,0.30);
    color: #fff;
    border-color: transparent;
  }
}
.person{
  display: flex;
  align-items: center;
  margin-right: 32px;
  .el-dropdown{
    margin-left: 10px;
    color: #fff;
    .el-dropdown-link{
      display: flex;
      align-items: center;
    }
    .el-icon-arrow-down{
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
