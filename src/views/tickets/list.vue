<template>
  <div class="list">
    <div class="list-header">
      <el-button type="primary" @click="$router.push('/tickets/new')">New Ticket</el-button>
    </div>

    <el-table
      v-loading="loading"
      class="list-content"
      :data="tableData"
      style="width: 100%"
      @row-click="rowClick">
      <el-table-column
        prop="id"
        label="ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="title"
        label="Summary"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type">
        <template slot-scope="scope">
          {{ TYPE[scope.row.type] }}
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="pageData.currentPage"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageData.pageSize"
      layout="sizes, prev, pager, next"
      :total="pageData.total">
    </el-pagination>
  </div>
</template>

<script>
import {TYPE} from './utils/dict';
import { getTicket } from '@/api/ticket'

export default {
  data(){
    return {
      TYPE,

      loading: false,//加载动画，false不出现动画，true出现动画

      tableData: [],

      //分页对象
      pageData:{
        currentPage: 1, //当前的页面
        pageSize: 1, //，每页有几条
        total: 0 //总数
      }
    }
  },
  created(){
    this.getTicket(this.pageData.currentPage,this.pageData.pageSize)
  },
  methods: {
    rowClick(row){
      this.$router.push(`/tickets/${row.id}`)
    },
    handleSizeChange(pageSize){
      console.log(pageSize)
      //每页条数发生变化触发
      this.getTicket(1, pageSize)
    },
    handleCurrentChange(currentPage){
      //当前页码发生变化触发
      this.getTicket(currentPage,this.pageData.pageSize)
    },
    getTicket(currentPage, pageSize){
      if(this.loading){
        return;
      }
      this.loading = true;
      getTicket({
        currentPage,
        pageSize,
      }).then(res =>{
        let data = res.data.data;
        this.tableData = data.table;
        this.pageData.total = data.total;
        this.pageData.currentPage = currentPage;
        this.pageData.pageSize = pageSize;
        this.loading = false;
      }).catch(err=>{
        this.loading = false;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.list{
  box-sizing: border-box;
  padding: 14px;
  width: 1200px;
  margin: 15px auto 0;
  background: #fff;
  border: 1px solid rgba(0,0,0,0.15);
  .list-header{
    text-align: right;
  }
}
</style>